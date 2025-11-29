
// FIX: As per Gemini API guidelines, `GenerateContentRequest` is deprecated.
// The correct type is `GenerateContentParameters`.
import { GoogleGenAI, GenerateContentParameters, Part } from "@google/genai";
import { Message, GroundingInfo, ProfileData } from '../types';
import { AiMode } from "../App";
import { mockProfiles } from "../data/mockProfiles";

// Lazy initialization - only create when needed
let ai: GoogleGenAI | null = null;

const getAI = (): GoogleGenAI | null => {
    if (!ai) {
        // No Vite, use import.meta.env para variáveis de ambiente
        const apiKey = import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.GEMINI_API_KEY || (typeof process !== 'undefined' && (process.env?.API_KEY || process.env?.GEMINI_API_KEY));
        if (!apiKey) {
            console.warn('GEMINI_API_KEY não está definida. A funcionalidade de IA estará limitada.');
            return null;
        }
        try {
            ai = new GoogleGenAI({ apiKey });
        } catch (error) {
            console.error('Erro ao inicializar GoogleGenAI:', error);
            return null;
        }
    }
    return ai;
};

interface Location {
    latitude: number;
    longitude: number;
}

// Extracts a JSON object from a markdown code block (` ```json ... ``` `)
const extractJsonFromMarkdown = (text: string): any | null => {
    const regex = /```json\s*([\s\S]*?)\s*```/;
    const match = text.match(regex);
    if (match && match[1]) {
        try {
            return JSON.parse(match[1]);
        } catch (e) {
            console.error("Failed to parse extracted JSON:", e);
            return null;
        }
    }
    return null;
}

export const getAIResponse = async (
    prompt: string,
    history: Message[],
    mode: AiMode,
    imagePart?: Part,
    location?: Location,
    subscribers?: ProfileData[],
): Promise<Message> => {
    const aiInstance = getAI();
    if (!aiInstance) {
        return {
            id: Date.now().toString(),
            sender: 'ai',
            text: 'A funcionalidade de IA não está disponível no momento. Por favor, configure a GEMINI_API_KEY nas variáveis de ambiente para usar esta funcionalidade.',
        };
    }

    try {
        let modelName: string;
        const config: any = {};
        const tools: any[] = [{ googleSearch: {} }, { googleMaps: {} }];
        const toolConfig: any = {};

        const subscriberList = subscribers?.map(p => ({
             id: p.id,
             name: p.name,
             specialty: p.specialty,
             description: p.description,
             location: p.location,
             rating: p.rating,
        }));

        let locationInfoForPrompt: string;
        if (location) {
            locationInfoForPrompt = "A localização do usuário FOI FORNECIDA via geolocalização. Use-a para as buscas no Google Maps. NÃO peça pela localização novamente. Você pode mencionar a cidade ou bairro se for relevante para a resposta.";
        } else {
            locationInfoForPrompt = "A localização do usuário não foi fornecida. Você DEVE perguntar pela cidade ou região para fazer buscas.";
        }

        let systemInstruction = `Você é localizaqui, um assistente inteligente, amigável e eficiente, especializado em conectar usuários a prestadores de serviços locais. Sua principal função é recomendar os melhores profissionais da NOSSA PLATAFORMA (assinantes) que atendam na localização do usuário.

**Contexto de Localização:**
${locationInfoForPrompt}
SEMPRE priorize a localização mais recente mencionada explicitamente pelo usuário no chat (ex: "estou em Sorriso, MT"). Se o usuário corrigir a localização, use a nova localização para todas as buscas futuras.

**Formato da Resposta OBRIGATÓRIO:**
Sua resposta COMPLETA deve ser um único objeto JSON dentro de um bloco de código markdown (e.g., \`\`\`json ... \`\`\`).
A estrutura do JSON deve ser:
{
  "responseText": "Sua mensagem conversacional e amigável para o usuário. Pode conter markdown para formatação (ex: tabelas).",
  "recommendedProfileIds": ["id_assinante_1", "id_assinante_2"]
}

**Fluxo de Trabalho Lógico:**
1.  **Determinar a Localização do Usuário:**
    a. Verifique a mensagem mais recente do usuário por uma cidade/região explícita. Essa é a prioridade máxima.
    b. Se não houver, e se as coordenadas de geolocalização foram fornecidas, use a ferramenta do Google Maps para identificar a cidade do usuário.
    c. Se não houver nenhuma informação de localização, pergunte ao usuário.

2.  **Analisar o Pedido:** Entenda qual serviço o usuário precisa.

3.  **Formular a Resposta com Base na Localização:**
    a. **Ao usar a localização pela primeira vez (especialmente se for de geolocalização), seja cordial e convide a correção.** Exemplo de \`responseText\`: "Sua localização foi identificada como **[Cidade, UF]**. Se não estiver correto, por favor me informe sua cidade. Com base nesta localização, encontrei os seguintes profissionais...".
    b. **Filtrar Assinantes:** A partir da lista de assinantes abaixo, filtre APENAS os profissionais cuja localização corresponde à cidade/região do usuário.
    c. Dentre os profissionais filtrados por localização, encontre aqueles que correspondem ao serviço solicitado.
    d. Se encontrar assinantes que correspondem à LOCALIZAÇÃO e ao SERVIÇO, inclua seus IDs no array \`recommendedProfileIds\`. No \`responseText\`, apresente os resultados.

4.  **SE NENHUM ASSINANTE CORRESPONDER (na localização correta):**
    - Deixe o array \`recommendedProfileIds\` vazio (\`[]\`).
    - **ENTÃO, e somente então,** use suas ferramentas (Google Search, Google Maps) para encontrar outras opções locais relevantes NA CIDADE DO USUÁRIO.
    - No \`responseText\`, informe claramente que você não encontrou um assinante em nossa plataforma para essa necessidade em [Cidade do Usuário], mas que encontrou algumas outras opções na web.

**LISTA DE ASSINANTES DISPONÍVEIS PARA RECOMENDAÇÃO:**
${JSON.stringify(subscriberList, null, 2)}
`;

        switch (mode) {
            case 'fast':
                modelName = 'gemini-flash-lite-latest';
                break;
            case 'complex':
                modelName = 'gemini-2.5-pro';
                config.thinkingConfig = { thinkingBudget: 32768 };
                systemInstruction += " Você está no modo 'Complexo', use sua capacidade máxima de raciocínio para fornecer respostas detalhadas e precisas."
                break;
            case 'standard':
            default:
                modelName = 'gemini-2.5-flash';
                break;
        }

        if (location) {
             toolConfig.retrievalConfig = {
                latLng: {
                    latitude: location.latitude,
                    longitude: location.longitude,
                }
            };
        }
        
        const contents: GenerateContentParameters['contents'] = [
          ...history.flatMap(msg => {
            if(msg.sender === 'user') return { role: 'user', parts: [{ text: msg.text }] };
            if(msg.sender === 'ai') {
                const aiResponseContent = msg.rawAiResponse ? JSON.stringify(msg.rawAiResponse) : msg.text;
                return { role: 'model', parts: [{ text: aiResponseContent }] };
            }
            return [];
          })
        ];

        const currentMessageParts: Part[] = [];
        if (prompt.trim()) {
            currentMessageParts.push({ text: prompt });
        }
        if (imagePart) {
            currentMessageParts.push(imagePart);
            if (!prompt.trim()) {
                currentMessageParts.push({ text: "Analise esta imagem." });
            }
        }

        contents.push({ role: 'user', parts: currentMessageParts });

        config.systemInstruction = systemInstruction;
        config.tools = tools;

        const request: any = {
            model: modelName,
            contents,
        };

        if (Object.keys(config).length > 0) {
            request.config = config;
        }
        if (Object.keys(toolConfig).length > 0) {
            request.toolConfig = toolConfig;
        }

        const response = await aiInstance.models.generateContent(request);
        const rawText = response.text;
        
        const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
        const grounding: GroundingInfo[] = groundingChunks.map((chunk: any) => {
            if (chunk.maps) return { uri: chunk.maps.uri, title: chunk.maps.title };
            if (chunk.web) return { uri: chunk.web.uri, title: chunk.web.title };
            return null;
        }).filter((g): g is GroundingInfo => g !== null);

        const jsonResponse = extractJsonFromMarkdown(rawText);
        
        if (jsonResponse) {
            const recommendedProfiles = (jsonResponse.recommendedProfileIds || [])
                .map((id: string) => mockProfiles.find(p => p.id === id))
                .filter((p): p is ProfileData => p !== undefined);

            return {
                id: Date.now().toString(),
                sender: 'ai',
                text: jsonResponse.responseText,
                profiles: recommendedProfiles.length > 0 ? recommendedProfiles : undefined,
                grounding: grounding.length > 0 ? grounding : undefined,
                rawAiResponse: jsonResponse,
            };
        }
        
        // Fallback if JSON extraction fails
        console.warn("Could not extract JSON from AI response, returning raw text.");
        return {
            id: Date.now().toString(),
            sender: 'ai',
            text: rawText || "Não consegui processar a resposta. Tente novamente.",
            grounding: grounding.length > 0 ? grounding : undefined,
        };

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        return {
            id: Date.now().toString(),
            sender: 'ai',
            text: 'Desculpe, ocorreu um erro ao me comunicar com a IA. Por favor, verifique sua conexão e tente novamente.',
        };
    }
};
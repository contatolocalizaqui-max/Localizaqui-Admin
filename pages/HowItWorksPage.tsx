
import React from 'react';
import { motion } from 'framer-motion';
import { SparklesIcon } from '../components/icons/SparklesIcon';
import { ChatBubbleIcon } from '../components/icons/ChatBubbleIcon';
import { CheckIcon } from '../components/icons/CheckIcon';
import { BriefcaseIcon } from '../components/icons/BriefcaseIcon';
import { UserCircleIcon } from '../components/icons/UserCircleIcon';

// Visual Mockups (Simplified versions of the complex components for display purposes)
const ChatMockup = () => (
    <div className="bg-[#111111] border border-gray-800 rounded-2xl p-4 w-full max-w-sm shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#20FF82] to-transparent opacity-50"></div>
        <div className="space-y-3">
            <div className="flex gap-3">
                 <div className="w-8 h-8 rounded-full bg-gray-800 flex-shrink-0" />
                 <div className="bg-[#2a2a2a] p-3 rounded-2xl rounded-tl-none text-xs text-gray-300">
                     Preciso de um pintor para um apartamento de 50m².
                 </div>
            </div>
            <div className="flex gap-3 flex-row-reverse">
                 <div className="w-8 h-8 rounded-full bg-purple-600 flex-shrink-0 flex items-center justify-center">
                    <SparklesIcon className="w-4 h-4 text-white" />
                 </div>
                 <div className="bg-[#1a1a1a] border border-[#20FF82]/30 p-3 rounded-2xl rounded-tr-none text-xs text-white">
                     Encontrei 3 pintores disponíveis na sua região com avaliação 4.8+!
                 </div>
            </div>
        </div>
    </div>
);

const MatchMockup = () => (
    <div className="relative w-full max-w-sm mx-auto">
        <div className="absolute inset-0 bg-gradient-to-b from-[#20FF82]/20 to-transparent blur-xl rounded-full"></div>
        <div className="relative bg-[#111111] border border-gray-700 rounded-xl p-4 flex items-center gap-4 shadow-xl">
            <div className="w-12 h-12 rounded-full bg-gray-800 relative overflow-hidden">
                <img src="https://i.pravatar.cc/150?u=painter" alt="Pro" className="w-full h-full object-cover" />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#111111] rounded-full"></div>
            </div>
            <div className="flex-1">
                <div className="flex justify-between items-center">
                    <h4 className="font-bold text-white text-sm">Rafael Pinturas</h4>
                    <span className="bg-green-500/10 text-green-400 text-[10px] px-2 py-0.5 rounded-full font-bold">98% Match</span>
                </div>
                <p className="text-gray-400 text-xs mt-1">Especialista em acabamento fino.</p>
            </div>
             <button className="bg-[#20FF82] text-black p-2 rounded-lg">
                <ChatBubbleIcon className="w-4 h-4" />
            </button>
        </div>
    </div>
);

const StepSection: React.FC<{ 
    number: string; 
    title: string; 
    description: string; 
    children: React.ReactNode; 
    reverse?: boolean 
}> = ({ number, title, description, children, reverse }) => (
    <div className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 py-16`}>
        <div className="flex-1 space-y-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#2a2a2a] border border-gray-700 text-[#20FF82] font-bold text-xl shadow-lg">
                {number}
            </div>
            <h3 className="text-3xl font-bold text-white leading-tight">{title}</h3>
            <p className="text-lg text-gray-400 leading-relaxed max-w-md">{description}</p>
            <ul className="space-y-3">
                <li className="flex items-center gap-3 text-gray-300 text-sm">
                    <CheckIcon className="w-5 h-5 text-[#20FF82]" /> Sem formulários complexos
                </li>
                <li className="flex items-center gap-3 text-gray-300 text-sm">
                    <CheckIcon className="w-5 h-5 text-[#20FF82]" /> IA entende sua urgência
                </li>
            </ul>
        </div>
        <div className="flex-1 w-full flex justify-center relative">
            {/* Decorative blobs */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-600/20 rounded-full blur-[80px] pointer-events-none"></div>
            {children}
        </div>
    </div>
);

const HowItWorksPage: React.FC = () => {
    return (
        <div className="bg-black text-white min-h-screen">
            {/* Hero */}
            <div className="relative py-20 sm:py-32 border-b border-gray-800">
                 <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
                <div className="container mx-auto px-4 text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300 text-xs font-medium mb-6">
                        <SparklesIcon className="w-3 h-3 text-[#20FF82]" />
                        <span>TECNOLOGIA INVISÍVEL</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-6">
                        Complexidade Zero. <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#20FF82] to-blue-500">Resultado Imediato.</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Esqueça listas telefônicas e formulários infinitos. Veja como a local.AI conecta você ao profissional ideal em segundos.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Flow Toggle (Visual Only for now) */}
                <div className="flex justify-center -mt-8 mb-16 relative z-20">
                    <div className="bg-[#111111] border border-gray-800 p-1 rounded-full flex shadow-xl">
                        <button className="px-6 py-2 rounded-full bg-[#20FF82] text-black font-bold text-sm shadow-lg">Para Clientes</button>
                        <button className="px-6 py-2 rounded-full text-gray-400 hover:text-white font-medium text-sm transition-colors">Para Profissionais</button>
                    </div>
                </div>

                {/* Steps */}
                <div className="max-w-5xl mx-auto">
                    <StepSection 
                        number="01" 
                        title="Fale naturalmente com nossa IA" 
                        description="Abra o app e diga o que precisa como se estivesse enviando um áudio para um amigo. Nossa IA processa o contexto, localização e urgência."
                    >
                        <ChatMockup />
                    </StepSection>

                    <div className="w-px h-24 bg-gradient-to-b from-transparent via-gray-800 to-transparent mx-auto lg:hidden"></div>

                    <StepSection 
                        number="02" 
                        title="Match instantâneo e inteligente" 
                        description="Não te damos uma lista de 50 nomes. Te damos os 3 melhores profissionais disponíveis agora, que cabem no seu orçamento."
                        reverse
                    >
                        <MatchMockup />
                    </StepSection>

                     <div className="w-px h-24 bg-gradient-to-b from-transparent via-gray-800 to-transparent mx-auto lg:hidden"></div>

                    <StepSection 
                        number="03" 
                        title="Contrate e resolva" 
                        description="Negocie valores diretamente pelo chat seguro, agende o serviço e avalie o profissional após a conclusão. Simples assim."
                    >
                        <div className="bg-[#111111] border border-gray-800 rounded-xl p-6 w-full max-w-sm shadow-2xl text-center">
                            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckIcon className="w-8 h-8 text-green-500" />
                            </div>
                            <h4 className="text-white font-bold text-lg">Serviço Agendado!</h4>
                            <p className="text-gray-400 text-sm mt-2">O eletricista chega hoje às 14:00.</p>
                        </div>
                    </StepSection>
                </div>

                {/* CTA */}
                <div className="py-24 text-center">
                    <h2 className="text-3xl font-bold text-white mb-8">Pronto para experimentar?</h2>
                     <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button className="px-8 py-4 bg-[#20FF82] hover:bg-[#1ce676] text-black font-bold rounded-xl transition-all shadow-lg shadow-green-900/20">
                            Começar Agora
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HowItWorksPage;

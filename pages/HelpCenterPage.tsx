
import React from 'react';
import { Accordion, AccordionItem } from '../components/common/Accordion';
import { SearchIcon } from '../components/icons/SearchIcon';
import { BoltIcon } from '../components/icons/BoltIcon';
import { UserCircleIcon } from '../components/icons/UserCircleIcon';
import { ShieldCheckIcon } from '../components/icons/ShieldCheckIcon';
import { ClipboardListIcon } from '../components/icons/ClipboardListIcon';

const TopicCard: React.FC<{ icon: React.ReactNode, title: string }> = ({ icon, title }) => (
    <button className="flex flex-col items-center justify-center p-6 bg-[#111111] border border-gray-800 rounded-2xl hover:border-[#20FF82]/50 hover:bg-[#1a1a1a] transition-all group w-full">
        <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 group-hover:text-[#20FF82] group-hover:bg-[#20FF82]/10 transition-colors mb-4">
            {icon}
        </div>
        <span className="font-bold text-gray-300 group-hover:text-white">{title}</span>
    </button>
)

const HelpCenterPage: React.FC = () => {
    return (
        <div className="bg-black text-white min-h-screen">
             {/* Hero Search */}
             <div className="relative py-24 border-b border-white/5 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/20 rounded-full blur-[100px]"></div>
                
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">Como podemos ajudar?</h1>
                    
                    <div className="max-w-2xl mx-auto relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-[#20FF82] to-blue-500 rounded-2xl opacity-20 group-hover:opacity-40 blur transition duration-200"></div>
                        <div className="relative bg-[#0a0a0a] rounded-2xl flex items-center p-2">
                            <SearchIcon className="w-6 h-6 text-gray-500 ml-4" />
                            <input
                                type="search"
                                placeholder="Busque por 'pagamento', 'cancelamento'..."
                                className="w-full bg-transparent border-none text-lg text-white placeholder-gray-500 focus:ring-0 px-4 py-3"
                            />
                        </div>
                    </div>
                </div>
             </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Quick Topics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
                    <TopicCard icon={<UserCircleIcon className="w-6 h-6"/>} title="Minha Conta" />
                    <TopicCard icon={<ClipboardListIcon className="w-6 h-6"/>} title="Pedidos" />
                    <TopicCard icon={<BoltIcon className="w-6 h-6"/>} title="Pagamentos" />
                    <TopicCard icon={<ShieldCheckIcon className="w-6 h-6"/>} title="Segurança" />
                </div>

                {/* FAQ Sections */}
                <div className="grid lg:grid-cols-2 gap-x-16 gap-y-12">
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                            <span className="w-1 h-6 bg-[#20FF82] rounded-full"></span>
                            Para Usuários
                        </h2>
                        <Accordion>
                            <AccordionItem title="Como funciona a busca por IA?">
                                Nossa Inteligência Artificial analisa sua descrição de serviço para encontrar os profissionais mais adequados com base na especialidade, localização e avaliações. Basta dizer o que você precisa!
                            </AccordionItem>
                            <AccordionItem title="É seguro contratar pela plataforma?">
                                Sim. Priorizamos a segurança com perfis verificados e um sistema de avaliação transparente. Você pode ler o feedback de outros clientes antes de tomar uma decisão.
                            </AccordionItem>
                            <AccordionItem title="Como funcionam os pagamentos?">
                                Atualmente, os pagamentos são combinados diretamente entre você e o profissional. Em breve, teremos um sistema de pagamento integrado para mais conveniência e segurança.
                            </AccordionItem>
                             <AccordionItem title="O que faço se tiver um problema com um serviço?">
                                Recomendamos sempre a comunicação direta com o profissional primeiro. Caso não consiga resolver, nossa equipe de suporte está disponível para mediar a situação.
                            </AccordionItem>
                        </Accordion>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                             <span className="w-1 h-6 bg-purple-500 rounded-full"></span>
                            Para Prestadores
                        </h2>
                         <Accordion>
                            <AccordionItem title="Como me cadastro como prestador?">
                                O processo é simples! Clique em "Cadastrar" na página inicial, escolha a opção "Ofereço Serviços" e siga os passos para criar seu perfil profissional.
                            </AccordionItem>
                             <AccordionItem title="Quais são as vantagens de um plano pago?">
                                Planos pagos oferecem maior visibilidade nas buscas, a capacidade de responder a solicitações ilimitadas, acesso a métricas de desempenho e outras ferramentas para impulsionar seu negócio.
                            </AccordionItem>
                            <AccordionItem title="Como recebo solicitações de serviço?">
                                Quando um usuário busca por um serviço que você oferece na sua região, seu perfil será recomendado pela nossa IA. O cliente então poderá entrar em contato diretamente com você.
                            </AccordionItem>
                            <AccordionItem title="Posso editar meu perfil depois de criado?">
                                Sim! Você pode acessar a área de "Configurações" a qualquer momento para atualizar suas informações, adicionar fotos ao portfólio, ajustar sua disponibilidade e muito mais.
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default HelpCenterPage;

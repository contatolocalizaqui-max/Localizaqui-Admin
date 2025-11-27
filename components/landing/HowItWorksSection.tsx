
import React from 'react';
import { motion } from 'framer-motion';
import { ChatBubbleIcon } from '../icons/ChatBubbleIcon';
import { ProfileCard } from '../profile/ProfileCard';
import { KanbanCard } from '../kanban/KanbanCard';
import { mockProfiles } from '../../data/mockProfiles';

const steps = [
    {
        id: 1,
        title: "Descreva o que precisa em linguagem natural",
        description: "Não perca tempo navegando em menus complexos. Basta abrir o chat e dizer: 'Preciso de um encanador para um vazamento na pia'. Nossa IA entende o contexto, a urgência e sua localização.",
        align: "left",
        mockup: (
            <div className="bg-[#111111] p-6 rounded-2xl border border-gray-800 w-full max-w-md shadow-2xl relative overflow-hidden">
                <div className="flex flex-col gap-4">
                     <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-700 flex-shrink-0" />
                        <div className="bg-[#2a2a2a] p-3 rounded-2xl rounded-tl-none text-sm text-white">
                            Olá! Como posso ajudar hoje?
                        </div>
                     </div>
                     <div className="flex gap-3 flex-row-reverse">
                        <div className="w-8 h-8 rounded-full bg-purple-600 flex-shrink-0" />
                        <div className="bg-[#20FF82] text-black font-medium p-3 rounded-2xl rounded-tr-none text-sm">
                            Preciso instalar 2 ar-condicionados split no centro.
                        </div>
                     </div>
                     <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-700 flex-shrink-0" />
                        <div className="bg-[#2a2a2a] p-3 rounded-2xl rounded-tl-none text-sm text-white">
                            Entendido! Buscando especialistas em refrigeração próximos ao Centro...
                        </div>
                     </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#111111] to-transparent"></div>
            </div>
        )
    },
    {
        id: 2,
        title: "Receba os melhores perfis selecionados",
        description: "Em segundos, analisamos centenas de profissionais. Você recebe apenas os que atendem sua área, têm boas avaliações e disponibilidade para o seu serviço.",
        align: "right",
        mockup: (
             <div className="relative w-full max-w-xs mx-auto transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="absolute -top-4 -right-4 z-0 w-full h-full bg-purple-600/20 rounded-2xl"></div>
                <div className="relative z-10 pointer-events-none"> {/* pointer-events-none because we are reusing the interactive component for display only */}
                    <ProfileCard profile={mockProfiles[0]} />
                </div>
                <div className="absolute top-4 -right-8 bg-[#20FF82] text-black font-bold text-xs px-3 py-1 rounded-full shadow-lg z-20 animate-bounce">
                    98% Match
                </div>
             </div>
        )
    },
    {
        id: 3,
        title: "Gerencie e Contrate com Facilidade",
        description: "Organize seus contatos, receba orçamentos e feche negócio. Para prestadores, um quadro Kanban intuitivo para gerenciar seus leads.",
        align: "left",
        mockup: (
            <div className="bg-[#111111] p-4 rounded-2xl border border-gray-800 w-full max-w-md shadow-2xl">
                <div className="flex gap-4 mb-4 overflow-x-hidden opacity-50">
                     <div className="w-24 h-2 bg-gray-800 rounded"></div>
                     <div className="w-24 h-2 bg-gray-800 rounded"></div>
                </div>
                <div className="flex gap-4">
                    {/* Column 1 */}
                    <div className="w-1/2 flex flex-col gap-3">
                        <div className="text-xs font-bold text-gray-500 uppercase">Novos Leads</div>
                        <div className="scale-75 origin-top-left transform">
                            <KanbanCard contact={mockProfiles[1]} onRemove={() => {}} onDragStart={() => {}} onDragEnd={() => {}} onViewProfile={() => {}} />
                        </div>
                    </div>
                     {/* Column 2 */}
                     <div className="w-1/2 flex flex-col gap-3">
                        <div className="text-xs font-bold text-[#20FF82] uppercase">Em Negociação</div>
                         <div className="scale-75 origin-top-left transform">
                            <KanbanCard contact={mockProfiles[0]} onRemove={() => {}} onDragStart={() => {}} onDragEnd={() => {}} onViewProfile={() => {}} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
];

export const HowItWorksSection: React.FC = () => {
    return (
        <section className="py-24 sm:py-32 bg-black relative overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                 <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Do pedido ao serviço feito</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-400">
                        Simplificamos a jornada de contratação com tecnologia invisível e eficiente.
                    </p>
                </div>

                <div className="space-y-24">
                    {steps.map((step) => (
                        <div key={step.id} className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-24 ${step.align === 'right' ? 'lg:flex-row-reverse' : ''}`}>
                            
                            {/* Content Side */}
                            <div className="flex-1 space-y-6">
                                <div className="w-12 h-12 bg-[#2a2a2a] rounded-xl flex items-center justify-center text-[#20FF82] font-bold text-xl border border-gray-800">
                                    {step.id}
                                </div>
                                <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                                    {step.title}
                                </h3>
                                <p className="text-lg text-gray-400 leading-relaxed">
                                    {step.description}
                                </p>
                            </div>

                            {/* Visual Side */}
                            <div className="flex-1 w-full flex justify-center items-center">
                                {step.mockup}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

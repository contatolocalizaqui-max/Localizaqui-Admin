
import React from 'react';
import { BrainIcon } from '../icons/BrainIcon';
import { ShieldCheckIcon } from '../icons/ShieldCheckIcon';
import { ClockFastIcon } from '../icons/ClockFastIcon';

const ReasonCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
    <div className="bg-[#111111] p-8 rounded-2xl border border-gray-800 hover:border-purple-500/50 transition-colors group duration-300">
        <div className="flex-shrink-0 w-14 h-14 bg-purple-600/10 text-purple-400 rounded-xl flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-all duration-300">
            {icon}
        </div>
        <h3 className="mt-6 text-xl font-bold text-white group-hover:text-purple-300 transition-colors">{title}</h3>
        <p className="mt-4 text-gray-400 leading-relaxed">{children}</p>
    </div>
);

export const ReasonsSection: React.FC = () => {
    return (
        <section className="py-20 sm:py-32 bg-black relative">
             {/* Decoration */}
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent"></div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">Por que escolher o localizaqui?</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
                        Tecnologia avançada a serviço da praticidade.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <ReasonCard icon={<BrainIcon className="w-8 h-8" />} title="Inteligência Artificial Real">
                        Diferente de buscas comuns, nossa IA entende nuances como "urgente", "perto do metrô" ou "orçamento baixo" e filtra resultados instantaneamente.
                    </ReasonCard>
                    <ReasonCard icon={<ShieldCheckIcon className="w-8 h-8" />} title="Segurança em Primeiro Lugar">
                        Processo rigoroso de verificação de documentos e antecedentes. Avaliações reais garantem que apenas os melhores permaneçam na plataforma.
                    </ReasonCard>
                    <ReasonCard icon={<ClockFastIcon className="w-8 h-8" />} title="Velocidade Recorde">
                        Do momento em que você abre o app até o profissional estar a caminho, nosso fluxo é otimizado para resolver seu problema em minutos.
                    </ReasonCard>
                </div>
            </div>
        </section>
    );
};
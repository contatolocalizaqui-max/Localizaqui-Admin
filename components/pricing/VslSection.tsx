import React from 'react';
import { PlayIcon } from '../icons/PlayIcon';
import { ShieldCheckIcon } from '../icons/ShieldCheckIcon';
import { CheckIcon } from '../icons/CheckIcon';

interface VslSectionProps {
    onSubscribe?: () => void;
}

export const VslSection: React.FC<VslSectionProps> = ({ onSubscribe }) => {
    return (
        <div className="mt-24 max-w-5xl mx-auto">
            <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                    <span className="text-purple-400">Ainda em dúvida?</span> Veja como o Plano Pro pode transformar seu negócio em 5 minutos.
                </h2>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
                    Descubra como profissionais como você estão dobrando o número de clientes e aumentando seu faturamento com nossas ferramentas exclusivas.
                </p>
            </div>

            {/* Video Player Placeholder */}
            <div className="mt-12 aspect-video w-full max-w-3xl mx-auto rounded-2xl bg-gray-900 border border-gray-800 shadow-2xl shadow-purple-500/10 overflow-hidden relative group cursor-pointer">
                <img src="https://picsum.photos/seed/vsl-thumb/1280/720" alt="Video thumbnail" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                        <PlayIcon className="w-10 h-10 text-white" />
                    </div>
                </div>
            </div>

            {/* CTA and Benefits */}
            <div className="mt-12 flex flex-col items-center">
                <button 
                    onClick={onSubscribe}
                    className="bg-gradient-to-r from-green-500 to-emerald-500 text-black font-bold text-xl px-12 py-4 rounded-lg hover:opacity-90 transition-all transform hover:scale-105 shadow-lg shadow-green-500/20"
                >
                    Quero Mais Clientes Agora!
                </button>
                <ul className="mt-8 flex flex-col sm:flex-row gap-x-8 gap-y-3 text-gray-300">
                    <li className="flex items-center gap-2"><CheckIcon className="w-5 h-5 text-[#20FF82]" /> Destaque nas buscas</li>
                    <li className="flex items-center gap-2"><CheckIcon className="w-5 h-5 text-[#20FF82]" /> Contatos ilimitados</li>
                    <li className="flex items-center gap-2"><CheckIcon className="w-5 h-5 text-[#20FF82]" /> Ferramentas de análise</li>
                </ul>
                 <div className="mt-6 flex items-center gap-3 text-gray-400">
                    <ShieldCheckIcon className="w-6 h-6 text-gray-500" />
                    <p className="text-sm">Garantia de satisfação de 7 dias.</p>
                </div>
            </div>
        </div>
    );
};
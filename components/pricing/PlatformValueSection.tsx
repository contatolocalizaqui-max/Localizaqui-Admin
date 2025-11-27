import React from 'react';
import { ShieldCheckIcon } from '../icons/ShieldCheckIcon';
import { CheckIcon } from '../icons/CheckIcon';
import { AnimatedFlows } from './AnimatedFlows';

interface PlatformValueSectionProps {
    onSubscribe?: () => void;
}

export const PlatformValueSection: React.FC<PlatformValueSectionProps> = ({ onSubscribe }) => {
    return (
        <div className="mt-24 max-w-6xl mx-auto">
            <div className="text-center">
                <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                    Sua Máquina de Aquisição de Clientes
                </h2>
                <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-400">
                    Deixe nossa IA trabalhar por você. O Plano Pro não é apenas um perfil, é um sistema ativo que atrai clientes qualificados e organiza seu negócio para o crescimento.
                </p>
            </div>
            
            <AnimatedFlows />

            <div className="mt-12 flex flex-col items-center">
                <button 
                    onClick={onSubscribe}
                    className="bg-gradient-to-r from-green-500 to-emerald-500 text-black font-bold text-xl px-12 py-4 rounded-lg hover:opacity-90 transition-all transform hover:scale-105 shadow-lg shadow-green-500/20"
                >
                    Ativar Plano Pro e Receber Clientes
                </button>
                <div className="mt-6 flex items-center gap-3 text-gray-400">
                    <ShieldCheckIcon className="w-6 h-6 text-gray-500" />
                    <p className="text-sm">Garantia de satisfação de 7 dias.</p>
                </div>
            </div>
        </div>
    );
};
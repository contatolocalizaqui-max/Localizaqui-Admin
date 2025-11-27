import React from 'react';
import { CheckIcon } from '../icons/CheckIcon';

interface PricingCardProps {
    name: string;
    price: number;
    features: string[];
    recommended?: boolean;
    cycle: 'monthly' | 'yearly';
    isProviderPlan?: boolean;
    onSelectPlan?: () => void;
}

export const PricingCard: React.FC<PricingCardProps> = ({ name, price, features, recommended, cycle, isProviderPlan, onSelectPlan }) => {
    const buttonColorClass = isProviderPlan ? 'bg-purple-600 hover:bg-purple-500' : 'bg-[#20FF82] hover:bg-green-400';
    const textColorClass = isProviderPlan ? 'text-purple-400' : 'text-[#20FF82]';

    return (
        <div className={`bg-[#111111] border ${recommended ? 'border-[#20FF82]' : 'border-gray-800'} rounded-2xl p-8 flex flex-col relative`}>
            {recommended && (
                <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
                    <span className="bg-[#20FF82] text-black text-xs font-bold px-4 py-1 rounded-full uppercase">
                        Recomendado
                    </span>
                </div>
            )}
            <h3 className="text-2xl font-bold text-white text-center">{name}</h3>
            <div className="mt-6 text-center">
                <span className="text-5xl font-extrabold text-white">R${price}</span>
                <span className="text-lg text-gray-400">/{cycle === 'monthly' ? 'mês' : 'ano'}</span>
            </div>
            
            <ul className="mt-8 space-y-4 flex-grow">
                {features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                        <CheckIcon className={`w-6 h-6 flex-shrink-0 mr-3 ${textColorClass}`} />
                        <span className="text-gray-300">{feature}</span>
                    </li>
                ))}
            </ul>

            <button 
                onClick={onSelectPlan}
                className={`w-full mt-10 ${buttonColorClass} ${isProviderPlan ? 'text-white' : 'text-black'} font-bold py-3 rounded-lg transition-colors disabled:bg-gray-700 disabled:cursor-not-allowed`}
                disabled={!onSelectPlan && price > 0}
            >
                {onSelectPlan ? 'Selecionar Plano' : 'Plano Atual'}
            </button>
        </div>
    );
};
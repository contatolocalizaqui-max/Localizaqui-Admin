import React from 'react';
import { ProfileInsightsData } from '../../types';
import { EyeIcon } from '../icons/EyeIcon';
import { StarIcon } from '../icons/StarIcon';
import { ChartBarIcon } from '../icons/ChartBarIcon';

interface ProfileInsightsProps {
    data: ProfileInsightsData;
}

const InsightCard: React.FC<{ icon: React.ReactNode; label: string; value: string | number }> = ({ icon, label, value }) => (
    <div className="bg-[#1a1a1a] p-4 rounded-lg flex flex-col items-center text-center justify-center space-y-3 h-36">
        <div className="flex-shrink-0 w-10 h-10 bg-purple-600/30 text-purple-400 rounded-lg flex items-center justify-center">
            {icon}
        </div>
        <div>
            <p className="text-xs text-gray-400 leading-tight">{label}</p>
            <p className="text-2xl font-bold text-white mt-1">{value}</p>
        </div>
    </div>
);

export const ProfileInsights: React.FC<ProfileInsightsProps> = ({ data }) => {
    return (
        <div className="bg-[#111111] p-6 rounded-lg border border-gray-800 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <InsightCard 
                    icon={<EyeIcon className="w-5 h-5" />} 
                    label="Visualizações" 
                    value={data.views.toLocaleString('pt-BR')} 
                />
                <InsightCard 
                    icon={<StarIcon className="w-5 h-5" />} 
                    label="Salvo em Contatos" 
                    value={data.saves.toLocaleString('pt-BR')} 
                />
                <InsightCard 
                    icon={<ChartBarIcon className="w-5 h-5" />} 
                    label="Demanda na Região" 
                    value={data.demand}
                />
            </div>
        </div>
    );
};

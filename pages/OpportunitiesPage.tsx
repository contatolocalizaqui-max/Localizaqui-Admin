
import React from 'react';
import { Demand } from '../types';
import { DemandCard } from '../components/demand/DemandCard';
import { SearchIcon } from '../components/icons/SearchIcon';
import { LocationMarkerIcon } from '../components/icons/LocationMarkerIcon';
import { BriefcaseIcon } from '../components/icons/BriefcaseIcon';
import { TrendingUpIcon } from '../components/icons/TrendingUpIcon';
import { SparklesIcon } from '../components/icons/SparklesIcon';

interface OpportunitiesPageProps {
    demands: Demand[];
    onSendProposal: (demandId: string) => void;
}

const StatCard: React.FC<{ icon: React.ReactNode, label: string, value: string, color: string }> = ({ icon, label, value, color }) => (
    <div className="bg-[#111111] border border-gray-800 p-4 rounded-xl flex items-center gap-4">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-opacity-10 ${color.replace('text-', 'bg-')}`}>
            <div className={color}>{icon}</div>
        </div>
        <div>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">{label}</p>
            <p className="text-lg font-bold text-white">{value}</p>
        </div>
    </div>
)

const OpportunitiesPage: React.FC<OpportunitiesPageProps> = ({ demands, onSendProposal }) => {
    return (
        <div className="flex-1 w-full h-full flex flex-col overflow-y-auto bg-black text-white p-4 md:p-6 lg:p-8 relative">
            <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-blue-900/10 to-transparent pointer-events-none" />
            
            <header className="relative z-10 mb-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold flex items-center gap-3">
                            <BriefcaseIcon className="w-8 h-8 text-blue-500" />
                            Oportunidades
                        </h1>
                        <p className="text-gray-400 mt-2">Novos clientes procurando profissionais como você.</p>
                    </div>
                    
                    <div className="flex gap-4 hidden md:flex">
                         <StatCard icon={<SparklesIcon className="w-5 h-5"/>} label="Novas hoje" value="12" color="text-[#20FF82]" />
                         <StatCard icon={<TrendingUpIcon className="w-5 h-5"/>} label="Alta demanda" value="Eletricista" color="text-purple-400" />
                    </div>
                </div>

                {/* Sticky Filter Bar */}
                <div className="sticky top-0 z-20 bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-2 flex flex-col sm:flex-row gap-2 shadow-2xl">
                    <div className="relative flex-grow group">
                        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-[#20FF82] transition-colors" />
                        <input 
                            type="text" 
                            placeholder="Buscar por serviço (ex: pintura, reforma)..."
                            className="w-full bg-[#0a0a0a] border border-transparent group-focus-within:border-gray-700 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-0 transition-all"
                        />
                    </div>
                    <button className="flex items-center justify-center gap-2 bg-[#1a1a1a] hover:bg-[#222] border border-transparent hover:border-gray-700 rounded-xl px-6 py-3 text-white transition-all whitespace-nowrap">
                        <LocationMarkerIcon className="w-5 h-5 text-gray-400" />
                        <span className="text-sm font-medium">Próximo a mim</span>
                    </button>
                </div>
            </header>

            <main className="relative z-10 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 pb-20">
                {demands.map(demand => (
                    <DemandCard 
                        key={demand.id} 
                        demand={demand} 
                        viewMode="provider"
                        onSendProposal={onSendProposal}
                    />
                ))}
            </main>
        </div>
    );
};

export default OpportunitiesPage;

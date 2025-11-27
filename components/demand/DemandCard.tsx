
import React from 'react';
import { Demand } from '../../types';
import { Badge } from '../ui/badge';
import { MapPinIcon } from '../icons/MapPinIcon';
import { ClockIcon } from '../icons/ClockIcon';
import { MailIcon } from '../icons/MailIcon';
import { MoreVerticalIcon } from '../icons/MoreVerticalIcon';
import { cn } from '../../utils/cn';

interface DemandCardProps {
    demand: Demand;
    viewMode?: 'user' | 'provider';
    onViewDetails?: (demandId: string) => void;
    onSendProposal?: (demandId: string) => void;
}

const statusMap = {
    aberta: { text: 'Aberta', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
    em_andamento: { text: 'Em Andamento', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
    concluida: { text: 'Concluída', color: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
    pausada: { text: 'Pausada', color: 'bg-gray-500/10 text-gray-400 border-gray-500/20' },
};

const urgencyMap = {
    imediata: { text: 'Urgente', color: 'text-red-400' },
    nesta_semana: { text: 'Esta Semana', color: 'text-amber-400' },
    flexivel: { text: 'Flexível', color: 'text-blue-400' },
};

export const DemandCard: React.FC<DemandCardProps> = ({ demand, viewMode = 'user', onViewDetails, onSendProposal }) => {
    return (
        <div className="group relative bg-[#0e0e0e] hover:bg-[#141414] border border-white/5 hover:border-[#20FF82]/30 rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300 hover:shadow-[0_0_30px_-10px_rgba(32,255,130,0.1)]">
            {/* Top Row */}
            <div className="flex justify-between items-start gap-4">
                <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-white/5 text-gray-400 border-white/10 text-[10px] uppercase tracking-wider">
                        {demand.category}
                    </Badge>
                    {viewMode === 'user' &&
                        <Badge className={cn("text-[10px] uppercase tracking-wider", statusMap[demand.status].color)}>
                            {statusMap[demand.status].text}
                        </Badge>
                    }
                </div>
                {viewMode === 'user' && (
                    <button className="text-gray-500 hover:text-white transition-colors">
                        <MoreVerticalIcon className="w-5 h-5" />
                    </button>
                )}
            </div>
            
            {/* Main Content */}
            <div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#20FF82] transition-colors line-clamp-1">
                    {demand.title}
                </h3>
                <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed">
                    {demand.description}
                </p>
            </div>
            
            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium text-gray-500 pt-2">
                <div className="flex items-center gap-1.5">
                    <MapPinIcon className="w-4 h-4" />
                    <span>{demand.location}</span>
                </div>
                 <div className="flex items-center gap-1.5">
                    <ClockIcon className={cn("w-4 h-4", urgencyMap[demand.urgency].color)} />
                    <span className={urgencyMap[demand.urgency].color}>{urgencyMap[demand.urgency].text}</span>
                </div>
                {demand.budget?.min && (
                    <div className="flex items-center gap-1.5 text-gray-300">
                        <span className="text-[#20FF82] font-bold">R$</span>
                        <span>{demand.budget.min} - {demand.budget.max}</span>
                    </div>
                )}
            </div>

            {/* Actions */}
             <div className="pt-4 mt-auto border-t border-white/5 flex items-center justify-between">
                 <div className="flex items-center gap-2 text-xs text-gray-500">
                    <MailIcon className="w-4 h-4" />
                    <span>{demand.proposals.length} propostas</span>
                 </div>

                 {viewMode === 'user' ? (
                     <button 
                        onClick={() => onViewDetails?.(demand.id)}
                        className="text-xs font-bold text-white bg-[#2a2a2a] hover:bg-[#333] border border-white/10 px-4 py-2 rounded-lg transition-all"
                    >
                         Gerenciar
                     </button>
                 ) : (
                    <button
                        onClick={() => onSendProposal?.(demand.id)}
                        className="text-xs font-bold text-black bg-[#20FF82] hover:bg-[#1ce676] px-4 py-2 rounded-lg transition-all shadow-lg shadow-green-900/20"
                    >
                        Enviar Proposta
                    </button>
                 )}
            </div>
        </div>
    );
};


import React from 'react';
import { Demand } from '../types';
import { ArrowLeftIcon } from '../components/icons/ArrowLeftIcon';
import { ProposalCard } from '../components/demand/ProposalCard';
import { Badge } from '../components/ui/badge';
import { MapPinIcon } from '../components/icons/MapPinIcon';
import { ClockIcon } from '../components/icons/ClockIcon';
import { ShieldCheckIcon } from '../components/icons/ShieldCheckIcon';

interface DemandDetailsPageProps {
    demand: Demand;
    onBack: () => void;
    onViewProfile: (profileId: string) => void;
    onAcceptProposal: (demandId: string, proposalId: string) => void;
    onRejectProposal: (demandId: string, proposalId: string) => void;
    onRestoreProposal: (demandId: string, proposalId: string) => void;
}

const statusMap = {
    aberta: { text: 'Aberta', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
    em_andamento: { text: 'Em Andamento', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
    concluida: { text: 'Concluída', color: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
    pausada: { text: 'Pausada', color: 'bg-gray-500/10 text-gray-400 border-gray-500/20' },
};

const urgencyMap = {
    imediata: { text: 'Urgência Imediata', color: 'text-red-400' },
    nesta_semana: { text: 'Para esta semana', color: 'text-amber-400' },
    flexivel: { text: 'Prazo Flexível', color: 'text-blue-400' },
};

const DemandDetailsPage: React.FC<DemandDetailsPageProps> = ({ demand, onBack, onViewProfile, onAcceptProposal, onRejectProposal, onRestoreProposal }) => {
    const acceptedProposal = demand.proposals.find(p => p.status === 'accepted');
    const pendingProposals = demand.proposals.filter(p => p.status === 'sent' || p.status === 'viewed');
    const rejectedProposals = demand.proposals.filter(p => p.status === 'rejected');

    return (
        <div className="flex-1 w-full h-full flex flex-col overflow-y-auto bg-black text-white">
            {/* Header Bar */}
            <div className="sticky top-0 z-10 bg-black/80 backdrop-blur-lg border-b border-white/5 px-4 md:px-8 py-4 flex items-center gap-4">
                <button onClick={onBack} className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                    <ArrowLeftIcon className="w-5 h-5" />
                </button>
                <h1 className="text-lg font-bold text-white truncate flex-1">{demand.title}</h1>
                <Badge className={statusMap[demand.status].color}>{statusMap[demand.status].text}</Badge>
            </div>

            <div className="p-4 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto w-full">
                
                {/* Left Column: Demand Context (Sticky) */}
                <div className="lg:col-span-4 space-y-6 h-fit lg:sticky lg:top-24">
                    <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 space-y-6">
                        <div>
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Sobre o Serviço</p>
                            <p className="text-gray-300 leading-relaxed">{demand.description}</p>
                        </div>

                        <div className="space-y-3 pt-4 border-t border-white/5">
                            <div className="flex items-center gap-3 text-sm text-gray-400">
                                <MapPinIcon className="w-4 h-4" />
                                <span>{demand.location}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-400">
                                <ClockIcon className={urgencyMap[demand.urgency].color.replace('text-', 'w-4 h-4 ')} />
                                <span className={urgencyMap[demand.urgency].color}>{urgencyMap[demand.urgency].text}</span>
                            </div>
                            {demand.budget?.min && (
                                <div className="flex items-center gap-3 text-sm text-gray-400">
                                    <span className="w-4 text-center font-bold text-green-400">$</span>
                                    <span>Orçamento: R${demand.budget.min} - R${demand.budget.max}</span>
                                </div>
                            )}
                        </div>
                    </div>
                    
                    <div className="bg-blue-900/10 border border-blue-500/20 p-4 rounded-xl flex items-start gap-3">
                        <ShieldCheckIcon className="w-5 h-5 text-blue-400 mt-0.5" />
                        <div>
                            <p className="text-sm font-bold text-blue-300">Dica de Segurança</p>
                            <p className="text-xs text-blue-400/70 mt-1">Sempre verifique as avaliações do profissional antes de aceitar uma proposta. O pagamento é combinado diretamente com ele.</p>
                        </div>
                    </div>
                </div>

                {/* Right Column: Proposals */}
                <div className="lg:col-span-8 space-y-8">
                    {acceptedProposal && (
                        <section>
                            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></span>
                                Profissional Contratado
                            </h2>
                            <ProposalCard 
                                proposal={acceptedProposal} 
                                onViewProfile={onViewProfile} 
                                onAccept={() => {}}
                                onReject={() => {}}
                                onRestore={() => {}} 
                            />
                        </section>
                    )}
                    
                    <section>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-white">
                                {pendingProposals.length} Propostas Recebidas
                            </h2>
                        </div>
                        
                        <div className="space-y-4">
                           {pendingProposals.map(proposal => (
                                <ProposalCard 
                                    key={proposal.id} 
                                    proposal={proposal} 
                                    onViewProfile={onViewProfile}
                                    onAccept={(proposalId) => onAcceptProposal(demand.id, proposalId)}
                                    onReject={(proposalId) => onRejectProposal(demand.id, proposalId)}
                                    onRestore={() => {}}
                                />
                            ))}
                            
                            {pendingProposals.length === 0 && !acceptedProposal && (
                                <div className="flex flex-col items-center justify-center py-16 bg-[#111111] border border-dashed border-white/10 rounded-2xl text-center">
                                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                                        <ClockIcon className="w-8 h-8 text-gray-600" />
                                    </div>
                                    <p className="text-gray-400 font-medium">Aguardando propostas...</p>
                                    <p className="text-sm text-gray-600 mt-1">Notificamos os profissionais da sua região.</p>
                                </div>
                            )}
                        </div>
                    </section>

                    {rejectedProposals.length > 0 && (
                        <section className="pt-8 border-t border-white/5">
                            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Arquivadas</h2>
                            <div className="space-y-4 opacity-60 hover:opacity-100 transition-opacity">
                                {rejectedProposals.map(proposal => (
                                    <ProposalCard 
                                        key={proposal.id} 
                                        proposal={proposal} 
                                        onViewProfile={onViewProfile}
                                        onAccept={() => {}}
                                        onReject={() => {}}
                                        onRestore={(proposalId) => onRestoreProposal(demand.id, proposalId)}
                                    />
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DemandDetailsPage;

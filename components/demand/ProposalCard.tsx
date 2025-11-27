
import React from 'react';
import { Proposal } from '../../types';
import { StarIcon } from '../icons/StarIcon';
import { CheckIcon } from '../icons/CheckIcon';
import { XIcon } from '../icons/XIcon';
import { ChatBubbleIcon } from '../icons/ChatBubbleIcon';
import { RefreshIcon } from '../icons/RefreshIcon';
import { ClockIcon } from '../icons/ClockIcon';

interface ProposalCardProps {
    proposal: Proposal;
    onViewProfile: (profileId: string) => void;
    onAccept: (proposalId: string) => void;
    onReject: (proposalId: string) => void;
    onRestore: (proposalId: string) => void;
}

export const ProposalCard: React.FC<ProposalCardProps> = ({ proposal, onViewProfile, onAccept, onReject, onRestore }) => {
    const provider = proposal.providerProfile;
    const isAccepted = proposal.status === 'accepted';
    const isRejected = proposal.status === 'rejected';

    return (
        <div className={`relative overflow-hidden rounded-2xl transition-all duration-300 ${
            isAccepted 
            ? 'bg-[#0a1a12] border border-green-500/50 shadow-[0_0_30px_-10px_rgba(32,255,130,0.2)]' 
            : isRejected
            ? 'bg-[#0e0e0e] border border-white/5 opacity-60 grayscale'
            : 'bg-[#111111] border border-white/10 hover:border-purple-500/50'
        }`}>
            {isAccepted && (
                <div className="absolute top-0 right-0 bg-green-500 text-black text-[10px] font-bold px-3 py-1 rounded-bl-xl">
                    ESCOLHIDO
                </div>
            )}

            <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                    <div className="flex gap-4">
                        <img 
                            src={provider.imageUrl || `https://i.pravatar.cc/150?u=${provider.id}`} 
                            alt={provider.name} 
                            className="w-12 h-12 rounded-full object-cover border-2 border-[#2a2a2a] cursor-pointer"
                            onClick={() => onViewProfile(provider.id)}
                        />
                        <div>
                            <h4 
                                className="font-bold text-white text-lg hover:text-[#20FF82] cursor-pointer transition-colors"
                                onClick={() => onViewProfile(provider.id)}
                            >
                                {provider.name}
                            </h4>
                            <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                                <div className="flex items-center gap-1 text-amber-400">
                                    <StarIcon className="w-3 h-3 fill-current" />
                                    <span className="font-bold">{provider.rating.toFixed(1)}</span>
                                </div>
                                <span>•</span>
                                <span>{provider.totalReviews} jobs</span>
                            </div>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-2xl font-bold text-white">R$ {proposal.amount.toFixed(0)}</p>
                        <p className="text-xs text-gray-500 flex items-center justify-end gap-1 mt-1">
                            <ClockIcon className="w-3 h-3" /> {proposal.estimatedTime}
                        </p>
                    </div>
                </div>

                <div className="bg-[#1a1a1a] rounded-xl p-4 mb-6 relative">
                    <div className="absolute -left-1 top-6 w-2 h-2 bg-[#2a2a2a] rounded-full"></div>
                    <p className="text-gray-300 text-sm leading-relaxed italic">"{proposal.message}"</p>
                </div>

                <div className="flex gap-3">
                    {isAccepted ? (
                        <a
                            href={`https://wa.me/${provider.phone.replace(/\D/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20b95a] text-white font-bold py-3 rounded-xl transition-colors"
                        >
                            <ChatBubbleIcon className="w-5 h-5" />
                            Chamar no WhatsApp
                        </a>
                    ) : isRejected ? (
                        <button
                            onClick={() => onRestore(proposal.id)}
                            className="flex-1 flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-gray-300 font-bold py-3 rounded-xl transition-colors"
                        >
                            <RefreshIcon className="w-5 h-5" />
                            Reconsiderar
                        </button>
                    ) : (
                        <>
                            <button 
                                onClick={() => onReject(proposal.id)}
                                className="flex-1 flex items-center justify-center gap-2 bg-[#1a1a1a] hover:bg-red-900/20 border border-transparent hover:border-red-500/30 text-gray-400 hover:text-red-400 font-bold py-3 rounded-xl transition-all"
                            >
                                <XIcon className="w-5 h-5" />
                                Recusar
                            </button>
                            <button 
                                onClick={() => onAccept(proposal.id)}
                                className="flex-[2] flex items-center justify-center gap-2 bg-white text-black hover:bg-[#20FF82] font-bold py-3 rounded-xl transition-all"
                            >
                                <CheckIcon className="w-5 h-5" />
                                Aceitar Proposta
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

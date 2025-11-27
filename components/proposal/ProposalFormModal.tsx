import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { XIcon } from '../icons/XIcon';
import { Demand, Proposal } from '../../types';
import { SparklesIcon } from '../icons/SparklesIcon';

interface ProposalFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (proposalData: Omit<Proposal, 'id' | 'demandId' | 'providerId' | 'providerProfile' | 'status' | 'createdAt'>) => void;
    demand: Demand | null | undefined;
}

const ProposalFormModal: React.FC<ProposalFormModalProps> = ({ isOpen, onClose, onSubmit, demand }) => {
    const [amount, setAmount] = useState('');
    const [estimatedTime, setEstimatedTime] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (!isOpen) {
            // Reset state when modal is closed
            setAmount('');
            setEstimatedTime('');
            setMessage('');
        }
    }, [isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (amount && estimatedTime && message) {
            onSubmit({
                amount: Number(amount),
                estimatedTime,
                message,
            });
        }
    };
    
    return (
        <AnimatePresence>
            {isOpen && demand && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="bg-[#111111] border border-gray-800 rounded-2xl p-8 shadow-2xl shadow-purple-500/10 w-full max-w-lg relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white">
                            <XIcon className="w-6 h-6" />
                        </button>
                        
                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-white mb-2">Enviar Proposta</h2>
                            <p className="text-gray-400">Para a demanda: <span className="font-semibold text-purple-400">{demand.title}</span></p>
                        </div>
                        
                        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="amount" className="block text-sm font-medium text-gray-400 mb-1.5">Valor do Orçamento (R$)</label>
                                    <input type="number" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} required placeholder="Ex: 250.00" className="w-full bg-[#2a2a2a] border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500" />
                                </div>
                                 <div>
                                    <label htmlFor="estimatedTime" className="block text-sm font-medium text-gray-400 mb-1.5">Prazo de Execução</label>
                                    <input type="text" id="estimatedTime" value={estimatedTime} onChange={(e) => setEstimatedTime(e.target.value)} required placeholder="Ex: 2 dias úteis" className="w-full bg-[#2a2a2a] border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500" />
                                </div>
                            </div>

                             <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1.5">Mensagem para o Cliente</label>
                                <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} required rows={5} placeholder="Apresente-se, detalhe o que está incluso no valor e por que você é a pessoa certa para o serviço." className="w-full bg-[#2a2a2a] border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500" />
                            </div>
                            
                            <div className="pt-4">
                                <button 
                                    type="submit"
                                    className="w-full bg-purple-600 text-white font-bold py-3 rounded-lg hover:bg-purple-500 transition-colors flex items-center justify-center gap-2"
                                >
                                    <SparklesIcon className="w-5 h-5"/>
                                    <span>Enviar Proposta com IA</span>
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ProposalFormModal;

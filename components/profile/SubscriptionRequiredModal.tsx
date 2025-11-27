
import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { XIcon } from '../icons/XIcon';
import { StarIcon } from '../icons/StarIcon';

interface SubscriptionRequiredModalProps {
    isOpen: boolean;
    onClose: () => void;
    onGoToPlans: () => void;
}

const SubscriptionRequiredModal: React.FC<SubscriptionRequiredModalProps> = ({ isOpen, onClose, onGoToPlans }) => {
    return (
        <AnimatePresence>
            {isOpen && (
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
                        className="bg-[#111111] border border-gray-800 rounded-2xl p-8 shadow-2xl shadow-purple-500/10 w-full max-w-md text-center relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white">
                            <XIcon className="w-6 h-6" />
                        </button>
                        
                        <div className="w-16 h-16 bg-purple-500/20 text-purple-400 rounded-full flex items-center justify-center mx-auto mb-6">
                           <StarIcon className="w-9 h-9"/>
                        </div>
                        
                        <h2 className="text-2xl font-bold text-white mb-3">É necessário um plano para publicar</h2>
                        <p className="text-gray-400 mb-8">
                            Para publicar seu perfil e começar a receber propostas, você precisa de uma assinatura ativa. Escolha o plano ideal para você.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button 
                                onClick={onClose}
                                className="w-full bg-[#2a2a2a] border border-gray-600 text-white font-bold py-3 rounded-lg hover:bg-gray-700 transition-colors"
                            >
                                Voltar
                            </button>
                             <button 
                                onClick={onGoToPlans}
                                className="w-full bg-purple-600 text-white font-bold py-3 rounded-lg hover:bg-purple-500 transition-colors"
                            >
                                Ver Planos
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SubscriptionRequiredModal;

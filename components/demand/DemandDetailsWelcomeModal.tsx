import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { XIcon } from '../icons/XIcon';
import { CheckIcon } from '../icons/CheckIcon';
import { SparklesIcon } from '../icons/SparklesIcon';

interface DemandDetailsWelcomeModalProps {
    isOpen: boolean;
    onClose: (dontShowAgain: boolean) => void;
}

const DemandDetailsWelcomeModal: React.FC<DemandDetailsWelcomeModalProps> = ({ isOpen, onClose }) => {
    const [dontShowAgain, setDontShowAgain] = useState(false);

    const features = [
        "Analise o valor, prazo e mensagem de cada profissional.",
        "Clique em 'Ver Perfil' para mais detalhes sobre o prestador.",
        "Ao 'Aceitar', o contato via WhatsApp será liberado."
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                    onClick={() => onClose(dontShowAgain)}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="bg-[#111111] border border-gray-800 rounded-2xl p-8 shadow-2xl shadow-green-500/10 w-full max-w-md text-center relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button onClick={() => onClose(dontShowAgain)} className="absolute top-4 right-4 text-gray-500 hover:text-white">
                            <XIcon className="w-6 h-6" />
                        </button>
                        
                        <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
                           <SparklesIcon className="w-9 h-9"/>
                        </div>
                        
                        <h2 className="text-2xl font-bold text-white mb-3">Gerencie as Propostas Recebidas 📊</h2>
                        <p className="text-gray-400 mb-6">
                           Compare os orçamentos e escolha o melhor profissional para o seu serviço. A decisão está em suas mãos.
                        </p>

                        <ul className="space-y-3 text-left mb-8">
                            {features.map((feature, i) => (
                                <li key={i} className="flex items-center gap-3">
                                    <CheckIcon className="w-5 h-5 text-[#20FF82] flex-shrink-0" />
                                    <span className="text-gray-300">{feature}</span>
                                </li>
                            ))}
                        </ul>

                        <button 
                            onClick={() => onClose(dontShowAgain)}
                            className="w-full bg-[#20FF82] text-black font-bold py-3 rounded-lg hover:bg-green-400 transition-colors"
                        >
                            Começar a Avaliar
                        </button>

                        <div className="flex items-center justify-center mt-4">
                            <input 
                                type="checkbox" 
                                id="dontShowAgainDemandDetails" 
                                checked={dontShowAgain} 
                                onChange={(e) => setDontShowAgain(e.target.checked)}
                                className="h-4 w-4 rounded bg-[#2a2a2a] border-gray-600 text-[#20FF82] focus:ring-[#20FF82]"
                            />
                            <label htmlFor="dontShowAgainDemandDetails" className="ml-2 text-sm text-gray-400 cursor-pointer">
                                Não mostrar novamente
                            </label>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default DemandDetailsWelcomeModal;
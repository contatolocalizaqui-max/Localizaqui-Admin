
import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { XIcon } from '../icons/XIcon';
import { SparklesIcon } from '../icons/SparklesIcon';

interface PublishSuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const PublishSuccessModal: React.FC<PublishSuccessModalProps> = ({ isOpen, onClose }) => {
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
                        className="bg-[#111111] border border-gray-800 rounded-2xl p-8 shadow-2xl shadow-green-500/10 w-full max-w-md text-center relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white">
                            <XIcon className="w-6 h-6" />
                        </button>
                        
                        <div className="w-16 h-16 bg-green-500/20 text-[#20FF82] rounded-full flex items-center justify-center mx-auto mb-6">
                           <SparklesIcon className="w-9 h-9 animate-pulse"/>
                        </div>
                        
                        <h2 className="text-2xl font-bold text-white mb-3">Seu perfil está no ar! 🎉</h2>
                        <p className="text-gray-400 mb-8">
                            Parabéns! Você agora faz parte da nossa comunidade de talentos. Prepare-se para receber novas oportunidades e conectar-se com clientes.
                        </p>

                        <button 
                            onClick={onClose}
                            className="w-full bg-[#20FF82] text-black font-bold py-3 rounded-lg hover:bg-green-400 transition-colors"
                        >
                            Ver meu Dashboard
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default PublishSuccessModal;

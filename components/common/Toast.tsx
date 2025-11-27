
import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2Icon } from '../icons/CheckCircle2Icon';
import { XIcon } from '../icons/XIcon'; // Assuming you have an XCircleIcon or similar for errors

interface ToastProps {
    isVisible: boolean;
    message?: string;
    type?: 'success' | 'error';
}

export const Toast: React.FC<ToastProps> = ({ isVisible, message, type = 'success' }) => {
    const isSuccess = type === 'success';

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: -50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -50, scale: 0.9 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    className="fixed top-5 left-1/2 -translate-x-1/2 z-[100] w-full max-w-sm"
                >
                    <div className={`flex items-center gap-3 rounded-full p-2 pl-4 shadow-lg ${
                        isSuccess 
                        ? 'bg-gradient-to-r from-green-600 to-emerald-500' 
                        : 'bg-gradient-to-r from-red-600 to-rose-500'
                    } text-white font-semibold text-sm`}>
                        {isSuccess ? 
                            <CheckCircle2Icon className="w-5 h-5 flex-shrink-0" /> : 
                            <XIcon className="w-5 h-5 flex-shrink-0" />
                        }
                        <span className="flex-1">{message || 'Ação concluída com sucesso!'}</span>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

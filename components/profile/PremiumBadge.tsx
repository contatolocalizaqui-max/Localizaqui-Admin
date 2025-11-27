
import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { StarIcon } from '../icons/StarIcon';

interface PremiumBadgeProps {
    isVisible: boolean;
}

const PremiumBadge: React.FC<PremiumBadgeProps> = ({ isVisible }) => {
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: -20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.9 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="fixed top-4 right-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-sm px-4 py-2 rounded-full shadow-lg flex items-center gap-2 z-50"
                >
                    <StarIcon className="w-4 h-4" />
                    <span>Premium Ativado!</span>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default PremiumBadge;

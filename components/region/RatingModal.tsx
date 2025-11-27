import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { XIcon } from '../icons/XIcon';
import { StarIcon } from '../icons/StarIcon';
import { ProfileData } from '../../types';

interface RatingModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (rating: number, comment: string) => void;
    profile: ProfileData | null;
}

const ratingLabels = [
    '', 
    'Ruim', 
    'Razoável', 
    'Bom', 
    'Muito Bom', 
    'Excelente!'
];

const RatingModal: React.FC<RatingModalProps> = ({ isOpen, onClose, onSubmit, profile }) => {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState('');
    const [isAnonymous, setIsAnonymous] = useState(true);

    useEffect(() => {
        if (!isOpen) {
            // Reset state when modal is closed
            setRating(0);
            setHoverRating(0);
            setComment('');
            setIsAnonymous(true);
        }
    }, [isOpen]);

    const handleSubmit = () => {
        if (rating > 0) {
            onSubmit(rating, comment);
        }
    };
    
    return (
        <AnimatePresence>
            {isOpen && profile && (
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
                        
                        <h2 className="text-2xl font-bold text-white mb-2">Avalie o Profissional</h2>
                        <p className="text-gray-400 mb-6">Sua opinião é importante para a comunidade.</p>
                        
                        <div className="flex justify-center items-center my-4 space-x-1">
                            {[1, 2, 3, 4, 5].map(star => (
                                <StarIcon 
                                    key={star}
                                    className={`w-10 h-10 cursor-pointer transition-all ${
                                        (hoverRating || rating) >= star ? 'text-amber-400 fill-amber-400 scale-110' : 'text-gray-600'
                                    }`}
                                    onClick={() => setRating(star)}
                                    onMouseEnter={() => setHoverRating(star)}
                                    onMouseLeave={() => setHoverRating(0)}
                                />
                            ))}
                        </div>
                        <p className="text-amber-300 font-semibold h-6">{ratingLabels[hoverRating || rating]}</p>
                        
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Deixe um comentário sobre sua experiência (opcional)..."
                            rows={4}
                            className="w-full mt-4 bg-[#2a2a2a] border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        
                        <div className="flex items-center justify-center mt-4">
                            <input 
                                type="checkbox" 
                                id="isAnonymous" 
                                checked={!isAnonymous} 
                                onChange={(e) => setIsAnonymous(!e.target.checked)}
                                className="h-4 w-4 rounded bg-[#2a2a2a] border-gray-600 text-[#20FF82] focus:ring-[#20FF82]"
                            />
                            <label htmlFor="isAnonymous" className="ml-2 text-sm text-gray-400 cursor-pointer">
                                Permitir mostrar meu nome
                            </label>
                        </div>
                        
                        <button 
                            onClick={handleSubmit}
                            disabled={rating === 0}
                            className="w-full mt-6 bg-[#20FF82] text-black font-bold py-3 rounded-lg hover:bg-green-400 transition-colors disabled:bg-gray-700 disabled:cursor-not-allowed"
                        >
                            Enviar Avaliação
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default RatingModal;

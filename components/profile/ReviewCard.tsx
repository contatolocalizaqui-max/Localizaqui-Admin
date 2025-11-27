
import React from 'react';
import { Review } from '../../types';
import { StarIcon } from '../icons/StarIcon';

interface ReviewCardProps {
    review: Review;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
    return (
        <div className="bg-[#0a0a0a] p-5 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <img src={review.avatarUrl} alt={review.author} className="w-10 h-10 rounded-full object-cover border border-white/10" />
                    <div>
                        <h4 className="font-bold text-white text-sm">{review.author}</h4>
                        <p className="text-xs text-gray-500">{review.date}</p>
                    </div>
                </div>
                <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                        <StarIcon
                            key={i}
                            className={`w-3.5 h-3.5 ${i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-800'}`}
                        />
                    ))}
                </div>
            </div>
            <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-white/10 rounded-full"></div>
                <p className="pl-4 text-gray-400 text-sm leading-relaxed">"{review.comment}"</p>
            </div>
        </div>
    );
};

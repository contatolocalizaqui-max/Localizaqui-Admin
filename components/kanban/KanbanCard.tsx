import React, { DragEvent } from 'react';
import { ProfileData } from '../../types';
import { StarIcon } from '../icons/StarIcon';
import { ClockIcon } from '../icons/ClockIcon';
import { TrashIcon } from '../icons/TrashIcon';

interface KanbanCardProps {
    contact: ProfileData;
    onRemove: () => void;
    onDragStart: (e: DragEvent) => void;
    onDragEnd: (e: DragEvent) => void;
    onViewProfile: (profileId: string) => void;
}

export const KanbanCard: React.FC<KanbanCardProps> = ({ contact, onRemove, onDragStart, onDragEnd, onViewProfile }) => {
    return (
        <div
            data-contact-id={contact.id}
            draggable
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            className="bg-[#2a2a2a] p-4 rounded-lg border border-gray-700 shadow-md cursor-grab transition-shadow hover:shadow-lg hover:shadow-purple-500/10"
        >
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="font-bold text-white">{contact.name}</h3>
                    <p className="text-sm text-purple-400">{contact.specialty}</p>
                </div>
                <button onClick={onRemove} className="p-1 text-gray-500 hover:text-red-400 transition-colors">
                    <TrashIcon className="w-4 h-4" />
                </button>
            </div>
            
            <div className="flex items-center justify-between text-xs text-gray-400 mt-4">
                <div className="flex items-center gap-1">
                    <StarIcon className="w-3 h-3 text-amber-400 fill-amber-400" />
                    <span>{contact.rating} ({contact.totalReviews})</span>
                </div>
                <div className="flex items-center gap-1">
                    <ClockIcon className="w-3 h-3"/>
                    <span>{contact.lastContact}</span>
                </div>
            </div>
            
            <div className="flex gap-2 mt-4 border-t border-gray-700 pt-3">
                <button onClick={() => onViewProfile(contact.id)} className="flex-1 px-3 py-1.5 bg-[#3a3a3a] border border-gray-600 rounded-md text-white text-xs font-medium hover:bg-gray-600 transition-colors">
                    Ver Perfil
                </button>
                <a 
                    href={`https://wa.me/${contact.phone.replace(/\D/g, '')}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 text-center px-3 py-1.5 bg-green-600 rounded-md text-white text-xs font-medium hover:bg-green-500 transition-opacity"
                >
                    WhatsApp
                </a>
            </div>
        </div>
    );
};
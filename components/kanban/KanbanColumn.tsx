import React, { useState, useRef, useEffect, DragEvent } from 'react';
import { KanbanColumnData, ProfileData } from '../../types';
import { KanbanCard } from './KanbanCard';
import { MoreVerticalIcon } from '../icons/MoreVerticalIcon';
import { TrashIcon } from '../icons/TrashIcon';
import { cn } from '../../utils/cn';

interface KanbanColumnProps {
    column: KanbanColumnData;
    contacts: ProfileData[];
    onRename: (columnId: string, newTitle: string) => void;
    onDelete: (columnId: string) => void;
    onRemoveContact: (contactId: string, columnId: string) => void;
    onDragStartCard: (e: DragEvent, cardId: string) => void;
    onDragStartColumn: (e: DragEvent) => void;
    onDropInColumn: (e: DragEvent) => void;
    onDragEnd: (e: DragEvent) => void;
    onViewProfile: (profileId: string) => void;
}

export const KanbanColumn: React.FC<KanbanColumnProps> = ({ 
    column, 
    contacts, 
    onRename, 
    onDelete,
    onRemoveContact,
    onDragStartCard,
    onDragStartColumn,
    onDropInColumn,
    onDragEnd,
    onViewProfile
}) => {
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [title, setTitle] = useState(column.title);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const titleInputRef = useRef<HTMLInputElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isEditingTitle) {
            titleInputRef.current?.focus();
            titleInputRef.current?.select();
        }
    }, [isEditingTitle]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleTitleBlur = () => {
        setIsEditingTitle(false);
        onRename(column.id, title);
    };
    
    const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleTitleBlur();
        } else if (e.key === 'Escape') {
            setTitle(column.title);
            setIsEditingTitle(false);
        }
    };

    return (
        <div 
            data-column-id={column.id}
            className="flex-shrink-0 w-80 h-full flex flex-col bg-[#111111] rounded-xl border border-gray-800"
        >
            <div 
                className="flex items-center justify-between p-3 border-b border-gray-800 cursor-grab"
                draggable
                onDragStart={onDragStartColumn}
                onDragEnd={onDragEnd}
            >
                {isEditingTitle ? (
                    <input 
                        ref={titleInputRef}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        onBlur={handleTitleBlur}
                        onKeyDown={handleTitleKeyDown}
                        className="bg-transparent text-white font-bold focus:outline-none focus:ring-2 focus:ring-[#20FF82] rounded px-2 py-1 -ml-2"
                    />
                ) : (
                    <h2 onClick={() => setIsEditingTitle(true)} className="font-bold text-white cursor-pointer px-2 py-1">{column.title}</h2>
                )}
                 <div className="relative" ref={menuRef}>
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-full">
                        <MoreVerticalIcon className="w-5 h-5"/>
                    </button>
                    {isMenuOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-[#2a2a2a] border border-gray-700 rounded-lg shadow-lg z-20">
                            <button onClick={() => { setIsEditingTitle(true); setIsMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">Renomear</button>
                            <button onClick={() => onDelete(column.id)} className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/20 hover:text-red-300">Excluir Coluna</button>
                        </div>
                    )}
                </div>
            </div>
            <div 
                className="flex-1 p-3 overflow-y-auto space-y-3"
                onDrop={onDropInColumn}
            >
                {contacts.map((contact) => (
                    <KanbanCard 
                        key={contact.id} 
                        contact={contact} 
                        onRemove={() => onRemoveContact(contact.id, column.id)}
                        onDragStart={(e) => onDragStartCard(e, contact.id)}
                        onDragEnd={onDragEnd}
                        onViewProfile={onViewProfile}
                    />
                ))}
            </div>
        </div>
    );
};
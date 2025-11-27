
import React from 'react';
import { SparklesIcon } from '../icons/SparklesIcon';
import { UserCircleIcon } from '../icons/UserCircleIcon';

interface TypingIndicatorProps {
    sender: 'user' | 'ai';
}

export const TypingIndicator: React.FC<TypingIndicatorProps> = ({ sender }) => {
    const isUser = sender === 'user';
    
    return (
        <div className={`flex items-start space-x-4 mb-8 ${isUser ? 'justify-end' : ''}`}>
             {!isUser && (
                <div className="w-8 h-8 rounded-full bg-purple-700 flex items-center justify-center flex-shrink-0">
                    <SparklesIcon className="w-5 h-5 text-white" />
                </div>
            )}
            <div className={`flex items-center space-x-2 px-5 py-3 rounded-2xl max-w-xl ${
                isUser
                ? 'bg-[#2a2a2a] text-white rounded-br-none'
                : 'bg-[#111111] border border-gray-800 text-gray-200 rounded-bl-none'
            }`}>
                <span className="text-gray-400 italic">{isUser ? 'Você está digitando' : 'localizaqui está digitando'}</span>
                <div className="flex space-x-1 items-center">
                    <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-pulse [animation-delay:-0.3s]"></span>
                    <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-pulse [animation-delay:-0.15s]"></span>
                    <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-pulse"></span>
                </div>
            </div>
             {isUser && (
                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0">
                    <UserCircleIcon className="w-7 h-7 text-gray-400" />
                </div>
            )}
        </div>
    );
};
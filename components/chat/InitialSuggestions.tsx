
import React, { useState, useEffect } from 'react';
import { BoltIcon } from '../icons/BoltIcon';
import { HomeIcon } from '../icons/HomeIcon';
import { WrenchIcon } from '../icons/WrenchIcon';
import { PaintBrushIcon } from '../icons/PaintBrushIcon';
import { User } from '../../types';
import { SparklesIcon } from '../icons/SparklesIcon';
import { motion } from 'framer-motion';

interface InitialSuggestionsProps {
    onSuggestionClick: (suggestion: string) => void;
    user?: User | null;
}

const SuggestionCard: React.FC<{ 
    text: string; 
    delay: number;
    onClick: () => void;
}> = ({ text, delay, onClick }) => (
    <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay }}
        onClick={onClick}
        className="group flex items-center justify-between p-4 bg-[#111111] hover:bg-[#1a1a1a] border border-white/5 hover:border-[#20FF82]/30 rounded-2xl text-left transition-all duration-200 w-full"
    >
        <span className="text-gray-300 text-sm group-hover:text-white transition-colors">{text}</span>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[#20FF82]">
            <SparklesIcon className="w-4 h-4" />
        </div>
    </motion.button>
);

export const InitialSuggestions: React.FC<InitialSuggestionsProps> = ({ onSuggestionClick, user }) => {
    const [greeting, setGreeting] = useState('');

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) setGreeting('Bom dia');
        else if (hour < 18) setGreeting('Boa tarde');
        else setGreeting('Boa noite');
    }, []);

    const userName = user?.name.split(' ')[0];

    const suggestions = [
        "Encontrar um eletricista urgente para chuveiro queimado",
        "Orçamento para pintura de apartamento de 50m²",
        "Preciso de uma diarista para limpeza pós-obra",
        "Buscar encanador perto de mim para vazamento"
    ];

    return (
        <div className="flex flex-col items-center justify-center h-full min-h-[60vh] max-w-3xl mx-auto px-4 relative">
            
            {/* Central Logo/Avatar with Glow */}
            <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative mb-8"
            >
                <div className="absolute inset-0 bg-[#20FF82] blur-[60px] opacity-10 rounded-full"></div>
                <div className="relative w-20 h-20 bg-black border border-white/10 rounded-2xl flex items-center justify-center shadow-2xl shadow-[#20FF82]/10">
                    <SparklesIcon className="w-10 h-10 text-[#20FF82]" />
                </div>
            </motion.div>

            {/* Minimalist Greeting */}
            <motion.h1 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl md:text-4xl font-medium text-white text-center mb-12 tracking-tight"
            >
                {greeting}{userName ? `, ${userName}` : ''}. <br />
                <span className="text-gray-500">Como posso ajudar você hoje?</span>
            </motion.h1>

            {/* Suggestion Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                {suggestions.map((suggestion, index) => (
                    <SuggestionCard 
                        key={index}
                        text={suggestion}
                        delay={0.2 + (index * 0.1)}
                        onClick={() => onSuggestionClick(suggestion)}
                    />
                ))}
            </div>
        </div>
    );
};

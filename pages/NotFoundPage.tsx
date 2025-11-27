
import React from 'react';
import { SparklesIcon } from '../components/icons/SparklesIcon';
import { Page } from '../types';

interface NotFoundPageProps {
    onNavigate: (page: Page) => void;
}

const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
    return (
        <div className="bg-black min-h-screen flex flex-col items-center justify-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#20FF82]/5 rounded-full blur-[150px]"></div>

            <div className="relative z-10 text-center">
                <h1 className="text-[150px] font-bold leading-none text-transparent bg-clip-text bg-gradient-to-b from-[#20FF82] to-transparent opacity-20">
                    404
                </h1>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                     <SparklesIcon className="w-16 h-16 text-[#20FF82] animate-pulse" />
                </div>
                
                <h2 className="text-3xl font-bold mt-8 mb-4">Caminho não encontrado</h2>
                <p className="text-gray-400 max-w-md mx-auto mb-8">
                    Nossa IA vasculhou todo o banco de dados, mas não encontrou a página que você procura.
                </p>
                
                <button 
                    onClick={() => onNavigate('landing')}
                    className="bg-[#111111] border border-gray-800 hover:border-[#20FF82] text-white px-8 py-3 rounded-xl transition-all"
                >
                    Voltar para o Início
                </button>
            </div>
        </div>
    );
};

export default NotFoundPage;

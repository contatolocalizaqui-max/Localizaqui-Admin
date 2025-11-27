
import React from 'react';
import { LoadingSpinner } from '../components/icons/LoadingSpinner';

const RealTimeSearchPage: React.FC = () => {
    return (
        <div className="bg-black text-white min-h-screen flex items-center justify-center relative overflow-hidden">
            {/* Holographic Background */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px] animate-pulse"></div>
            
            <div className="relative z-10 text-center p-8 border border-white/10 bg-black/50 backdrop-blur-xl rounded-3xl max-w-2xl shadow-2xl">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm font-bold mb-8">
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping"></span>
                    BETA FECHADO
                </div>
                
                <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600 mb-6 tracking-tighter">
                    Busca em <br/> Tempo Real
                </h1>
                
                <p className="text-xl text-gray-400 mb-10 max-w-lg mx-auto">
                    Estamos treinando nossa IA para monitorar a disponibilidade de profissionais ao vivo no mapa. A revolução chega em breve.
                </p>

                <div className="flex justify-center">
                     <div className="flex items-center gap-3 bg-[#111111] border border-gray-800 rounded-xl px-6 py-4">
                        <LoadingSpinner className="w-5 h-5 text-blue-500" />
                        <span className="text-sm font-mono text-gray-300">Processando dados geospaciais...</span>
                     </div>
                </div>
            </div>
        </div>
    );
};

export default RealTimeSearchPage;


import React, { useEffect } from 'react';
import { Page } from '../types';
import { CheckIcon } from '../components/icons/CheckIcon';
import { SparklesIcon } from '../components/icons/SparklesIcon';
import { motion } from 'framer-motion';

interface PaymentSuccessPageProps {
    onNavigate: (page: Page) => void;
}

const PaymentSuccessPage: React.FC<PaymentSuccessPageProps> = ({ onNavigate }) => {
    
    useEffect(() => {
        // Confetti effect could be triggered here
    }, []);

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#20FF82]/10 rounded-full blur-[120px]"></div>

            <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative z-10 bg-[#111111] border border-gray-800 p-12 rounded-3xl text-center max-w-md shadow-2xl"
            >
                <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-[#20FF82] rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(32,255,130,0.4)]">
                    <CheckIcon className="w-12 h-12 text-black" />
                </div>

                <h1 className="text-3xl font-bold text-white mb-4">Pagamento Confirmado!</h1>
                <p className="text-gray-400 mb-8 leading-relaxed">
                    Parabéns! Sua assinatura foi ativada com sucesso. Agora você tem acesso total a todas as ferramentas premium do localizaqui.
                </p>

                <div className="bg-[#1a1a1a] rounded-xl p-4 mb-8 border border-gray-800">
                    <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-gray-500">Status</span>
                        <span className="text-[#20FF82] font-bold uppercase tracking-wider flex items-center gap-1">
                            <SparklesIcon className="w-3 h-3" /> Ativo
                        </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">ID da Transação</span>
                        <span className="text-white font-mono">#TRX-882910</span>
                    </div>
                </div>

                <button 
                    onClick={() => onNavigate('app')}
                    className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-[#20FF82] transition-colors shadow-lg"
                >
                    Acessar Meu Painel
                </button>
            </motion.div>
        </div>
    );
};

export default PaymentSuccessPage;
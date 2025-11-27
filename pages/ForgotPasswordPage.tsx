
import React, { useState } from 'react';
import { SparklesIcon } from '../components/icons/SparklesIcon';
import { ArrowLeftIcon } from '../components/icons/ArrowLeftIcon';
import { ShieldCheckIcon } from '../components/icons/ShieldCheckIcon';
import { MailIcon } from '../components/icons/MailIcon';

interface ForgotPasswordPageProps {
    onNavigateToLogin: () => void;
}

const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = ({ onNavigateToLogin }) => {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsSubmitted(true);
            setIsLoading(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen w-full flex bg-black text-white">
            {/* Left Side - Visual */}
            <div className="hidden lg:flex w-1/2 bg-[#0a0a0a] relative overflow-hidden flex-col justify-between p-12 border-r border-gray-800">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
                <div className="absolute top-[-20%] left-[-20%] w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-20%] right-[-20%] w-[600px] h-[600px] bg-[#20FF82]/10 rounded-full blur-[120px]"></div>

                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 bg-[#20FF82]/20 rounded-xl flex items-center justify-center text-[#20FF82]">
                            <SparklesIcon className="w-6 h-6" />
                        </div>
                        <span className="text-2xl font-bold tracking-tight flex items-center">
                            <span className="text-[#20FF82]">localiz</span>
                            <span className="bg-gradient-to-r from-[#20FF82] to-[#9333ea] text-transparent bg-clip-text">a</span>
                            <span className="text-[#9333ea]">qui</span>
                        </span>
                    </div>
                </div>

                <div className="relative z-10 flex flex-col items-center text-center justify-center flex-grow">
                    <div className="w-24 h-24 bg-[#111] border border-gray-800 rounded-3xl flex items-center justify-center mb-8 shadow-2xl shadow-purple-500/20 rotate-3 hover:rotate-0 transition-transform duration-500">
                        <ShieldCheckIcon className="w-10 h-10 text-[#20FF82]" />
                    </div>
                    <h2 className="text-4xl font-bold mb-4">Recuperação Segura</h2>
                    <p className="text-gray-400 max-w-md">
                        Seus dados estão protegidos. Utilizamos criptografia de ponta a ponta para garantir que apenas você tenha acesso à sua conta.
                    </p>
                </div>
                
                <div className="relative z-10">
                    <p className="text-xs text-gray-600">© {new Date().getFullYear()} localizaqui. Segurança em primeiro lugar.</p>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative">
                <div className="w-full max-w-md">
                    <button 
                        onClick={onNavigateToLogin} 
                        className="flex items-center text-gray-500 hover:text-white mb-8 transition-colors group"
                    >
                        <div className="p-2 rounded-full bg-[#1a1a1a] mr-2 group-hover:bg-[#2a2a2a] transition-colors">
                            <ArrowLeftIcon className="w-4 h-4" />
                        </div>
                        Voltar para Login
                    </button>

                    {!isSubmitted ? (
                        <div className="animate-fade-in">
                            <h2 className="text-3xl font-bold text-white mb-2">Esqueceu a senha?</h2>
                            <p className="text-gray-400 mb-8">
                                Não se preocupe, acontece. Digite seu email cadastrado e enviaremos instruções para você.
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1.5">Email Cadastrado</label>
                                    <div className="relative">
                                        <input 
                                            type="email" 
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            className="w-full bg-[#111111] border border-gray-800 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#20FF82]/50 focus:border-[#20FF82] transition-all"
                                            placeholder="nome@exemplo.com"
                                        />
                                        <MailIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                    </div>
                                </div>

                                <button 
                                    type="submit" 
                                    disabled={isLoading}
                                    className="w-full bg-[#20FF82] hover:bg-[#1ce676] text-black font-bold py-4 rounded-xl transition-all transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center shadow-[0_0_20px_-5px_rgba(32,255,130,0.3)]"
                                >
                                    {isLoading ? (
                                        <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                                    ) : 'Enviar Link de Recuperação'}
                                </button>
                            </form>
                        </div>
                    ) : (
                        <div className="text-center animate-fade-in py-8">
                            <div className="w-20 h-20 bg-[#20FF82]/10 text-[#20FF82] rounded-full flex items-center justify-center mb-6 mx-auto border border-[#20FF82]/20 animate-pulse">
                                <MailIcon className="w-10 h-10" />
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-3">Email Enviado!</h2>
                            <p className="text-gray-400 mb-8">
                                Enviamos as instruções de recuperação para <span className="text-white font-medium">{email}</span>. Verifique sua caixa de entrada e spam.
                            </p>
                            <button 
                                onClick={onNavigateToLogin}
                                className="w-full bg-[#2a2a2a] hover:bg-[#333] text-white font-bold py-4 rounded-xl transition-all border border-gray-700"
                            >
                                Voltar para Login
                            </button>
                            <p className="mt-6 text-sm text-gray-500">
                                Não recebeu? <button onClick={() => setIsSubmitted(false)} className="text-[#20FF82] hover:underline">Tentar novamente</button>
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;


import React, { useState } from 'react';
import { User } from '../types';
import { SparklesIcon } from '../components/icons/SparklesIcon';
import { GoogleIcon } from '../components/icons/GoogleIcon';
import { AppleIcon } from '../components/icons/AppleIcon';
import { StarIcon } from '../components/icons/StarIcon';
import { CheckCircle2Icon } from '../components/icons/CheckCircle2Icon';

interface LoginPageProps {
    onLoginSuccess: (user: User) => void;
    onNavigateToRegister: () => void;
    onNavigateToForgotPassword?: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess, onNavigateToRegister, onNavigateToForgotPassword }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [keepLoggedIn, setKeepLoggedIn] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        
        // Mock login logic
        setTimeout(() => {
            // --- MASTER ADMIN CHECK ---
            if (email === 'admin@localizaqui.com' && password === 'admin123') {
                setError('');
                const adminUser: User = { 
                    id: 'admin-master', 
                    name: 'Administrador Mestre', 
                    email: 'admin@localizaqui.com',
                    isAdmin: true // Grant admin privileges
                };
                if (keepLoggedIn) {
                    localStorage.setItem('loggedInUser', JSON.stringify(adminUser));
                }
                onLoginSuccess(adminUser);
                return;
            }

            // --- STANDARD USER CHECK ---
            if (email === 'teste@localizaqui.com' && password === '123456') {
                setError('');
                const userToLogin = { id: '1', name: 'Usuário Teste', email: 'teste@localizaqui.com' };
                if (keepLoggedIn) {
                    localStorage.setItem('loggedInUser', JSON.stringify(userToLogin));
                }
                onLoginSuccess(userToLogin);
            } else {
                // Allow fallback for demo purposes if they use any valid-ish credentials (except admin email with wrong pass)
                if (password === '123456' && email !== 'admin@localizaqui.com') {
                     setError('');
                    const userToLogin = { id: '1', name: 'Usuário Teste', email: email };
                    if (keepLoggedIn) {
                        localStorage.setItem('loggedInUser', JSON.stringify(userToLogin));
                    }
                    onLoginSuccess(userToLogin);
                } else {
                    setError('Email ou senha inválidos.');
                    setIsLoading(false);
                }
            }
        }, 1000);
    };

    return (
        <div className="min-h-screen w-full flex bg-black text-white">
            {/* Left Side - Visual & Social Proof */}
            <div className="hidden lg:flex w-1/2 bg-[#0a0a0a] relative overflow-hidden flex-col justify-between p-12 border-r border-gray-800">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
                <div className="absolute top-[-20%] left-[-20%] w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px]"></div>
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
                    <h1 className="text-5xl font-bold leading-tight mb-6">
                        A nova era da <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#20FF82] to-emerald-500">contratação de serviços.</span>
                    </h1>
                    <p className="text-lg text-gray-400 max-w-md">
                        Conecte-se instantaneamente aos melhores profissionais da sua região com o poder da Inteligência Artificial.
                    </p>
                </div>

                <div className="relative z-10 space-y-6">
                    <div className="bg-[#111111]/80 backdrop-blur-md border border-gray-800 p-5 rounded-2xl max-w-md">
                        <div className="flex gap-4">
                            <img src="https://i.pravatar.cc/150?u=testi-login" alt="User" className="w-12 h-12 rounded-full border-2 border-black" />
                            <div>
                                <div className="flex gap-1 mb-1">
                                    {[1, 2, 3, 4, 5].map(i => <StarIcon key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />)}
                                </div>
                                <p className="text-sm text-gray-300">"Encontrei um eletricista em 5 minutos. A IA entendeu exatamente o que eu precisava."</p>
                                <p className="text-xs text-gray-500 mt-2 font-bold">Ricardo M. - São Paulo, SP</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                            <CheckCircle2Icon className="w-4 h-4 text-[#20FF82]" />
                            <span>Perfis Verificados</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2Icon className="w-4 h-4 text-[#20FF82]" />
                            <span>Pagamento Seguro</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center lg:text-left">
                        <h2 className="text-3xl font-bold text-white">Bem-vindo de volta</h2>
                        <p className="text-gray-400 mt-2">Entre com seus dados para acessar sua conta.</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <button className="flex items-center justify-center gap-2 bg-[#1a1a1a] hover:bg-[#222] border border-gray-800 rounded-xl py-3 transition-all">
                            <GoogleIcon className="w-5 h-5" />
                            <span className="text-sm font-medium">Google</span>
                        </button>
                        <button className="flex items-center justify-center gap-2 bg-[#1a1a1a] hover:bg-[#222] border border-gray-800 rounded-xl py-3 transition-all">
                            <AppleIcon className="w-5 h-5" />
                            <span className="text-sm font-medium">Apple</span>
                        </button>
                    </div>

                    <div className="relative flex items-center">
                        <div className="flex-grow border-t border-gray-800"></div>
                        <span className="flex-shrink-0 mx-4 text-gray-500 text-xs uppercase">Ou continue com email</span>
                        <div className="flex-grow border-t border-gray-800"></div>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1.5">Email</label>
                                <input 
                                    type="email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full bg-[#111111] border border-gray-800 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#20FF82]/50 focus:border-[#20FF82] transition-all"
                                    placeholder="nome@exemplo.com"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1.5">Senha</label>
                                <input 
                                    type="password" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full bg-[#111111] border border-gray-800 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#20FF82]/50 focus:border-[#20FF82] transition-all"
                                    placeholder="••••••••"
                                />
                                <div className="flex justify-end mt-2">
                                    <button 
                                        type="button" 
                                        onClick={onNavigateToForgotPassword}
                                        className="text-sm font-medium text-[#20FF82] hover:underline"
                                    >
                                        Esqueceu?
                                    </button>
                                </div>
                            </div>
                        </div>

                        {error && (
                            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                                {error}
                            </div>
                        )}

                        <div className="flex items-center">
                            <input 
                                type="checkbox" 
                                id="keepLoggedIn"
                                checked={keepLoggedIn}
                                onChange={(e) => setKeepLoggedIn(e.target.checked)}
                                className="h-4 w-4 rounded bg-[#111111] border-gray-800 text-[#20FF82] focus:ring-[#20FF82] focus:ring-offset-0"
                            />
                            <label htmlFor="keepLoggedIn" className="ml-2 text-sm text-gray-400 cursor-pointer select-none">
                                Manter conectado por 30 dias
                            </label>
                        </div>

                        <button 
                            type="submit" 
                            disabled={isLoading}
                            className="w-full bg-[#20FF82] hover:bg-[#1ce676] text-black font-bold py-4 rounded-xl transition-all transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                            ) : 'Entrar na Plataforma'}
                        </button>
                    </form>

                    <p className="text-center text-gray-500">
                        Não tem uma conta?{' '}
                        <button onClick={onNavigateToRegister} className="font-semibold text-white hover:text-[#20FF82] transition-colors">
                            Criar conta grátis
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
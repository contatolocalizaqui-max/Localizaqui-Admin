import React, { useState } from 'react';
import { User, Page } from '../types';
import { SparklesIcon } from '../components/icons/SparklesIcon';
import { CheckCircle2Icon } from '../components/icons/CheckCircle2Icon';
import { ArrowLeftIcon } from '../components/icons/ArrowLeftIcon';

interface RegisterPageProps {
    onRegisterSuccess: (user: User) => void;
    onNavigateToLogin: () => void;
    onNavigateToProviderRegister: () => void;
    onNavigate: (page: Page) => void;
}

type RegisterStep = 'typeSelection' | 'userInfo' | 'password' | 'success';

const RegisterPage: React.FC<RegisterPageProps> = ({ onRegisterSuccess, onNavigateToLogin, onNavigateToProviderRegister, onNavigate }) => {
    const [step, setStep] = useState<RegisterStep>('typeSelection');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock registration logic
        if (formData.password !== formData.confirmPassword) {
            alert("As senhas não coincidem.");
            return;
        }
        setStep('success');
    };

    const renderContent = () => {
        switch (step) {
            case 'typeSelection':
                return (
                    <div className="animate-fade-in">
                         <h2 className="text-3xl font-bold text-white mb-2">Como você quer começar?</h2>
                         <p className="text-gray-400 mb-8">Escolha o tipo de perfil que melhor se adapta a você.</p>
                         
                         <div className="space-y-4">
                            <button onClick={() => setStep('userInfo')} className="w-full text-left p-6 bg-[#111111] border border-gray-800 rounded-2xl hover:border-[#20FF82] hover:bg-[#1a1a1a] transition-all group">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="font-bold text-lg text-white group-hover:text-[#20FF82] transition-colors">Quero contratar serviços</h3>
                                    <div className="w-6 h-6 rounded-full border border-gray-600 group-hover:border-[#20FF82] group-hover:bg-[#20FF82] flex items-center justify-center transition-colors">
                                        <div className="w-2 h-2 bg-black rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-400">Encontre profissionais qualificados para qualquer necessidade em sua casa ou empresa.</p>
                            </button>

                            <button onClick={onNavigateToProviderRegister} className="w-full text-left p-6 bg-[#111111] border border-gray-800 rounded-2xl hover:border-purple-500 hover:bg-[#1a1a1a] transition-all group">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="font-bold text-lg text-white group-hover:text-purple-400 transition-colors">Quero oferecer serviços</h3>
                                    <div className="w-6 h-6 rounded-full border border-gray-600 group-hover:border-purple-500 group-hover:bg-purple-500 flex items-center justify-center transition-colors">
                                        <div className="w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-400">Cadastre seu perfil, receba demandas e aumente sua base de clientes.</p>
                            </button>
                         </div>
                    </div>
                );
            case 'userInfo':
                return (
                    <form onSubmit={() => setStep('password')} className="animate-fade-in">
                        <button type="button" onClick={() => setStep('typeSelection')} className="flex items-center text-gray-500 hover:text-white mb-6 transition-colors">
                            <ArrowLeftIcon className="w-4 h-4 mr-2" /> Voltar
                        </button>
                        <h2 className="text-3xl font-bold text-white mb-2">Seus dados básicos</h2>
                        <p className="text-gray-400 mb-8">Vamos criar sua identidade na plataforma.</p>
                        
                        <div className="space-y-5">
                             <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1.5">Nome Completo</label>
                                <input type="text" name="name" required className="w-full bg-[#111111] border border-gray-800 rounded-xl px-4 py-3.5 text-white focus:ring-2 focus:ring-[#20FF82]" placeholder="Ex: João da Silva" value={formData.name} onChange={handleInputChange} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1.5">Email</label>
                                <input type="email" name="email" required className="w-full bg-[#111111] border border-gray-800 rounded-xl px-4 py-3.5 text-white focus:ring-2 focus:ring-[#20FF82]" placeholder="nome@exemplo.com" value={formData.email} onChange={handleInputChange} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1.5">Telefone / WhatsApp</label>
                                <input type="tel" name="phone" className="w-full bg-[#111111] border border-gray-800 rounded-xl px-4 py-3.5 text-white focus:ring-2 focus:ring-[#20FF82]" placeholder="(00) 00000-0000" value={formData.phone} onChange={handleInputChange} />
                            </div>
                        </div>

                        <div className="mt-6 flex items-start gap-3">
                            <input type="checkbox" id="terms" required className="mt-1 h-4 w-4 rounded bg-[#111111] border-gray-800 text-[#20FF82] focus:ring-[#20FF82]" />
                            <label htmlFor="terms" className="text-sm text-gray-400">
                                Li e concordo com os <button type="button" onClick={() => onNavigate('terms')} className="text-[#20FF82] hover:underline">Termos de Serviço</button> e <button type="button" onClick={() => onNavigate('privacy')} className="text-[#20FF82] hover:underline">Política de Privacidade</button>.
                            </label>
                        </div>

                        <button type="submit" className="w-full mt-8 bg-[#20FF82] hover:bg-[#1ce676] text-black font-bold py-4 rounded-xl transition-all">
                            Continuar
                        </button>
                    </form>
                );
            case 'password':
                 return (
                    <form onSubmit={handleRegister} className="animate-fade-in">
                        <button type="button" onClick={() => setStep('userInfo')} className="flex items-center text-gray-500 hover:text-white mb-6 transition-colors">
                            <ArrowLeftIcon className="w-4 h-4 mr-2" /> Voltar
                        </button>
                        <h2 className="text-3xl font-bold text-white mb-2">Segurança da conta</h2>
                        <p className="text-gray-400 mb-8">Crie uma senha forte para proteger seus dados.</p>

                        <div className="space-y-5">
                             <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1.5">Senha</label>
                                <input type="password" name="password" required className="w-full bg-[#111111] border border-gray-800 rounded-xl px-4 py-3.5 text-white focus:ring-2 focus:ring-[#20FF82]" placeholder="••••••••" value={formData.password} onChange={handleInputChange} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1.5">Confirmar Senha</label>
                                <input type="password" name="confirmPassword" required className="w-full bg-[#111111] border border-gray-800 rounded-xl px-4 py-3.5 text-white focus:ring-2 focus:ring-[#20FF82]" placeholder="••••••••" value={formData.confirmPassword} onChange={handleInputChange} />
                            </div>
                             <div className="bg-gray-900/50 p-4 rounded-lg">
                                <p className="text-xs text-gray-500">A senha deve conter pelo menos 8 caracteres, incluindo letras e números.</p>
                             </div>
                        </div>

                        <button type="submit" className="w-full mt-8 bg-[#20FF82] hover:bg-[#1ce676] text-black font-bold py-4 rounded-xl transition-all">
                           Finalizar Cadastro
                        </button>
                    </form>
                );
            case 'success':
                return (
                    <div className="text-center animate-fade-in flex flex-col items-center justify-center h-full">
                        <div className="w-20 h-20 bg-[#20FF82]/20 text-[#20FF82] rounded-full flex items-center justify-center mb-6 animate-pulse">
                            <CheckCircle2Icon className="w-10 h-10" />
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-3">Conta criada com sucesso!</h2>
                        <p className="text-gray-400 mb-8 max-w-xs mx-auto">Bem-vindo(a) à comunidade localizaqui. Tudo pronto para começar.</p>
                        <button onClick={() => onRegisterSuccess({ id: '2', name: formData.name, email: formData.email })} className="w-full bg-[#20FF82] hover:bg-[#1ce676] text-black font-bold py-4 rounded-xl transition-all transform hover:scale-105">
                            Acessar Plataforma
                        </button>
                    </div>
                );
        }
    }

    return (
        <div className="min-h-screen w-full flex bg-black text-white">
             {/* Left Side - Visual */}
             <div className="hidden lg:flex w-1/2 bg-[#0a0a0a] relative overflow-hidden flex-col justify-between p-12 border-r border-gray-800">
                 <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
                 <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent z-10"></div>
                 
                 <div className="relative z-20">
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
                 
                 {/* Animated Feature List */}
                 <div className="relative z-20 mb-20 space-y-8">
                    <h2 className="text-4xl font-bold leading-tight">
                        Junte-se a milhares de <br />
                        usuários satisfeitos.
                    </h2>
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 text-gray-300 bg-white/5 p-4 rounded-xl border border-white/10 backdrop-blur-sm">
                            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                                1
                            </div>
                            <div>
                                <h4 className="font-bold text-white">Cadastro Rápido</h4>
                                <p className="text-sm text-gray-400">Menos de 2 minutos para começar.</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 text-gray-300 bg-white/5 p-4 rounded-xl border border-white/10 backdrop-blur-sm">
                            <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                                2
                            </div>
                            <div>
                                <h4 className="font-bold text-white">IA Personalizada</h4>
                                <p className="text-sm text-gray-400">Recomendações baseadas no seu perfil.</p>
                            </div>
                        </div>
                    </div>
                 </div>
             </div>

             {/* Right Side - Form */}
             <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative">
                <div className="w-full max-w-md">
                    {renderContent()}
                    
                    {step !== 'success' && (
                        <p className="text-center text-gray-500 mt-8">
                            Já tem uma conta?{' '}
                            <button onClick={onNavigateToLogin} className="font-semibold text-white hover:text-[#20FF82] transition-colors">
                                Entrar agora
                            </button>
                        </p>
                    )}
                </div>
             </div>
        </div>
    );
};

export default RegisterPage;
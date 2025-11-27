
import React, { useState } from 'react';
import { User } from '../types';
import { CheckCircle2Icon } from '../components/icons/CheckCircle2Icon';
import { ArrowLeftIcon } from '../components/icons/ArrowLeftIcon';
import { SparklesIcon } from '../components/icons/SparklesIcon';
import { TrendingUpIcon } from '../components/icons/TrendingUpIcon';
import { ShieldCheckIcon } from '../components/icons/ShieldCheckIcon';
import { UsersIcon } from '../components/icons/UsersIcon';

interface ProviderRegisterPageProps {
    onRegisterSuccess: (user: User) => void;
    onNavigateToLogin: () => void;
}

type ProviderStep = 'personal' | 'service' | 'portfolio' | 'success';

const CustomStepper: React.FC<{ currentStep: number, totalSteps: number }> = ({ currentStep, totalSteps }) => (
    <div className="flex items-center gap-2 mb-8">
        {Array.from({ length: totalSteps }).map((_, index) => {
            const step = index + 1;
            const isActive = step === currentStep;
            const isCompleted = step < currentStep;
            return (
                <div key={step} className="flex-1 h-1 rounded-full bg-gray-800 overflow-hidden">
                    <div 
                        className={`h-full transition-all duration-500 ${isActive ? 'bg-[#20FF82]' : isCompleted ? 'bg-green-600' : 'bg-transparent'}`} 
                        style={{ width: isActive ? '100%' : isCompleted ? '100%' : '0%' }}
                    />
                </div>
            );
        })}
    </div>
);

const ProviderRegisterPage: React.FC<ProviderRegisterPageProps> = ({ onRegisterSuccess, onNavigateToLogin }) => {
    const [step, setStep] = useState<ProviderStep>('personal');
    const [formData, setFormData] = useState({
        fullName: '',
        document: '',
        email: '',
        phone: '',
        service: '',
        description: '',
        instagram: '',
        linkedin: '',
        password: '',
    });
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleNextStep = (e: React.FormEvent, nextStep: ProviderStep) => {
        e.preventDefault();
        setStep(nextStep);
    }

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.password !== confirmPassword) {
            alert("As senhas não coincidem.");
            return;
        }
        setStep('success');
    };

    const renderStep = () => {
        switch (step) {
            case 'personal':
                return (
                    <form onSubmit={(e) => handleNextStep(e, 'service')} className="animate-fade-in">
                        <CustomStepper currentStep={1} totalSteps={3} />
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-white mb-2">Vamos começar pelo básico</h2>
                            <p className="text-gray-400">Seus dados para identificação e contato.</p>
                        </div>
                        
                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1.5">Nome Completo</label>
                                <input type="text" name="fullName" required className="w-full bg-[#111111] border border-gray-800 rounded-xl px-4 py-3.5 text-white focus:ring-2 focus:ring-[#20FF82] transition-all" placeholder="Ex: Maria Oliveira" value={formData.fullName} onChange={handleInputChange} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1.5">CPF ou CNPJ</label>
                                <input type="text" name="document" required className="w-full bg-[#111111] border border-gray-800 rounded-xl px-4 py-3.5 text-white focus:ring-2 focus:ring-[#20FF82] transition-all" placeholder="000.000.000-00" value={formData.document} onChange={handleInputChange} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1.5">Email</label>
                                    <input type="email" name="email" required className="w-full bg-[#111111] border border-gray-800 rounded-xl px-4 py-3.5 text-white focus:ring-2 focus:ring-[#20FF82] transition-all" placeholder="email@exemplo.com" value={formData.email} onChange={handleInputChange} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1.5">Celular</label>
                                    <input type="tel" name="phone" required className="w-full bg-[#111111] border border-gray-800 rounded-xl px-4 py-3.5 text-white focus:ring-2 focus:ring-[#20FF82] transition-all" placeholder="(00) 00000-0000" value={formData.phone} onChange={handleInputChange} />
                                </div>
                            </div>
                        </div>

                        <button type="submit" className="w-full mt-8 bg-[#20FF82] hover:bg-[#1ce676] text-black font-bold py-4 rounded-xl transition-all">
                            Continuar
                        </button>
                         <p className="text-center text-gray-500 mt-6 text-sm">
                            Já tem conta? <button type="button" onClick={onNavigateToLogin} className="text-[#20FF82] hover:underline">Entrar</button>
                        </p>
                    </form>
                );
            case 'service':
                return (
                     <form onSubmit={(e) => handleNextStep(e, 'portfolio')} className="animate-fade-in">
                        <CustomStepper currentStep={2} totalSteps={3} />
                        <button type="button" onClick={() => setStep('personal')} className="flex items-center text-gray-500 hover:text-white mb-6 transition-colors text-sm">
                            <ArrowLeftIcon className="w-4 h-4 mr-2" /> Voltar
                        </button>
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-white mb-2">O que você faz?</h2>
                            <p className="text-gray-400">Essa será a primeira coisa que os clientes verão.</p>
                        </div>

                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1.5">Profissão / Serviço Principal</label>
                                <input type="text" name="service" required className="w-full bg-[#111111] border border-gray-800 rounded-xl px-4 py-3.5 text-white focus:ring-2 focus:ring-[#20FF82] transition-all" placeholder="Ex: Eletricista Residencial" value={formData.service} onChange={handleInputChange} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1.5">Resumo Profissional</label>
                                <textarea name="description" rows={5} required className="w-full bg-[#111111] border border-gray-800 rounded-xl px-4 py-3.5 text-white focus:ring-2 focus:ring-[#20FF82] transition-all resize-none" placeholder="Descreva sua experiência, especialidades e diferenciais..." value={formData.description} onChange={handleInputChange}></textarea>
                                <p className="text-xs text-gray-600 text-right mt-1">Mínimo 50 caracteres</p>
                            </div>
                        </div>

                        <button type="submit" className="w-full mt-8 bg-[#20FF82] hover:bg-[#1ce676] text-black font-bold py-4 rounded-xl transition-all">
                            Continuar
                        </button>
                    </form>
                );
            case 'portfolio':
                 return (
                    <form onSubmit={handleRegister} className="animate-fade-in">
                        <CustomStepper currentStep={3} totalSteps={3} />
                         <button type="button" onClick={() => setStep('service')} className="flex items-center text-gray-500 hover:text-white mb-6 transition-colors text-sm">
                            <ArrowLeftIcon className="w-4 h-4 mr-2" /> Voltar
                        </button>
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-white mb-2">Presença e Segurança</h2>
                            <p className="text-gray-400">Onde te encontrar e como proteger sua conta.</p>
                        </div>

                        <div className="space-y-5">
                           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                               <div>
                                   <label className="block text-sm font-medium text-gray-400 mb-1.5">Instagram (Opcional)</label>
                                   <input type="text" name="instagram" className="w-full bg-[#111111] border border-gray-800 rounded-xl px-4 py-3.5 text-white focus:ring-2 focus:ring-[#20FF82] transition-all" placeholder="@seu.perfil" value={formData.instagram} onChange={handleInputChange} />
                               </div>
                               <div>
                                   <label className="block text-sm font-medium text-gray-400 mb-1.5">LinkedIn (Opcional)</label>
                                   <input type="url" name="linkedin" className="w-full bg-[#111111] border border-gray-800 rounded-xl px-4 py-3.5 text-white focus:ring-2 focus:ring-[#20FF82] transition-all" placeholder="linkedin.com/in/..." value={formData.linkedin} onChange={handleInputChange} />
                               </div>
                           </div>
                           
                           <div className="h-px bg-gray-800 my-4"></div>

                           <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1.5">Crie uma Senha</label>
                                <input type="password" name="password" required className="w-full bg-[#111111] border border-gray-800 rounded-xl px-4 py-3.5 text-white focus:ring-2 focus:ring-[#20FF82] transition-all" placeholder="••••••••" value={formData.password} onChange={handleInputChange} />
                           </div>
                           <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1.5">Confirme a Senha</label>
                                <input type="password" name="confirmPassword" required className="w-full bg-[#111111] border border-gray-800 rounded-xl px-4 py-3.5 text-white focus:ring-2 focus:ring-[#20FF82] transition-all" placeholder="••••••••" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                           </div>
                        </div>

                        <button type="submit" className="w-full mt-8 bg-[#20FF82] hover:bg-[#1ce676] text-black font-bold py-4 rounded-xl transition-all shadow-[0_0_20px_-5px_rgba(32,255,130,0.3)]">
                           Finalizar Cadastro Profissional
                        </button>
                    </form>
                );
            case 'success':
                return (
                    <div className="text-center animate-fade-in flex flex-col items-center justify-center h-full">
                         <div className="w-24 h-24 bg-[#20FF82]/20 text-[#20FF82] rounded-full flex items-center justify-center mb-6 animate-bounce">
                            <SparklesIcon className="w-12 h-12" />
                        </div>
                        <h2 className="text-4xl font-bold text-white mb-4">Bem-vindo ao time!</h2>
                        <p className="text-gray-400 mb-8 max-w-sm mx-auto">
                            Seu perfil foi criado. Agora você tem acesso a uma vitrine para milhares de clientes na sua região.
                        </p>
                        <button onClick={() => onRegisterSuccess({ id: 'provider-1', name: formData.fullName || 'Novo Prestador', email: formData.email || '' })} className="w-full bg-[#20FF82] text-black font-bold py-4 rounded-xl hover:bg-[#1ce676] transition-all transform hover:scale-105">
                            Acessar Painel do Prestador
                        </button>
                    </div>
                );
        }
    }

    return (
        <div className="min-h-screen w-full flex bg-black text-white">
            {/* Left Side - Visual & Value Prop */}
            <div className="hidden lg:flex w-1/2 bg-[#0a0a0a] relative overflow-hidden flex-col justify-between p-12 border-r border-gray-800">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
                {/* Abstract Chart Graphic */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md">
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-600/30 rounded-full blur-[80px]"></div>
                    <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#20FF82]/20 rounded-full blur-[80px]"></div>
                    
                    <div className="relative bg-[#111111]/80 backdrop-blur-xl border border-gray-700 rounded-2xl p-6 shadow-2xl transform rotate-[-2deg]">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <p className="text-xs text-gray-400 font-bold uppercase">Ganhos Mensais</p>
                                <p className="text-2xl font-bold text-white">R$ 8.450,00</p>
                            </div>
                            <div className="px-3 py-1 bg-[#20FF82]/20 text-[#20FF82] rounded-full text-xs font-bold flex items-center gap-1">
                                <TrendingUpIcon className="w-3 h-3"/> +32%
                            </div>
                        </div>
                        <div className="flex items-end gap-2 h-24">
                            {[40, 65, 50, 80, 95, 70, 100].map((h, i) => (
                                <div key={i} className="flex-1 bg-[#20FF82] rounded-t-sm opacity-80 hover:opacity-100 transition-opacity" style={{ height: `${h}%` }}></div>
                            ))}
                        </div>
                    </div>

                    <div className="relative mt-6 bg-[#111111]/80 backdrop-blur-xl border border-gray-700 rounded-2xl p-4 shadow-xl flex items-center gap-4 transform rotate-[2deg] ml-12">
                         <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                             <UsersIcon className="w-5 h-5" />
                         </div>
                         <div>
                             <p className="text-sm font-bold text-white">Novos Clientes</p>
                             <p className="text-xs text-gray-400">5 contatos hoje</p>
                         </div>
                    </div>
                </div>

                <div className="relative z-10">
                     <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 bg-[#20FF82]/20 rounded-xl flex items-center justify-center text-[#20FF82]">
                            <SparklesIcon className="w-6 h-6" />
                        </div>
                        <span className="text-2xl font-bold tracking-tight flex items-center">
                            <span className="text-[#20FF82]">localiz</span>
                            <span className="bg-gradient-to-r from-[#20FF82] to-[#9333ea] text-transparent bg-clip-text">a</span>
                            <span className="text-[#9333ea]">qui</span> Pro
                        </span>
                    </div>
                </div>

                <div className="relative z-10">
                    <h2 className="text-4xl font-bold leading-tight mb-6">
                        Você no controle do <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#20FF82] to-emerald-500">seu crescimento.</span>
                    </h2>
                    <div className="space-y-3 text-gray-400">
                        <p className="flex items-center gap-2"><ShieldCheckIcon className="w-5 h-5 text-[#20FF82]" /> Pagamento direto com o cliente</p>
                        <p className="flex items-center gap-2"><ShieldCheckIcon className="w-5 h-5 text-[#20FF82]" /> Perfil verificado e seguro</p>
                        <p className="flex items-center gap-2"><ShieldCheckIcon className="w-5 h-5 text-[#20FF82]" /> Inteligência Artificial para te destacar</p>
                    </div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative overflow-y-auto">
                <div className="w-full max-w-md">
                    {renderStep()}
                </div>
            </div>
        </div>
    );
};

export default ProviderRegisterPage;
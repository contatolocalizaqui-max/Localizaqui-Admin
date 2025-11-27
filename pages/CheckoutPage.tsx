
import React, { useState } from 'react';
import { Plan, User, Page } from '../types';
import { CreditCardIcon } from '../components/icons/CreditCardIcon';
import { QrCodeIcon } from '../components/icons/QrCodeIcon';
import { LockClosedIcon } from '../components/icons/LockClosedIcon';
import { CheckIcon } from '../components/icons/CheckIcon';
import { ArrowLeftIcon } from '../components/icons/ArrowLeftIcon';
import { SparklesIcon } from '../components/icons/SparklesIcon';
import { LoadingSpinner } from '../components/icons/LoadingSpinner';
import { cn } from '../utils/cn';

interface CheckoutPageProps {
    plan: Plan | null;
    user: User | null;
    onNavigate: (page: Page) => void;
}

const InputField: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label: string, icon?: React.ReactNode }> = ({ label, icon, className, ...props }) => (
    <div className={className}>
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">{label}</label>
        <div className="relative group">
            <input 
                {...props}
                className="w-full bg-[#111111] border border-gray-800 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#20FF82] focus:ring-1 focus:ring-[#20FF82]/20 transition-all pl-10"
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#20FF82] transition-colors">
                {icon}
            </div>
        </div>
    </div>
);

const CheckoutPage: React.FC<CheckoutPageProps> = ({ plan, user, onNavigate }) => {
    const [paymentMethod, setPaymentMethod] = useState<'credit_card' | 'pix'>('credit_card');
    const [isProcessing, setIsProcessing] = useState(false);

    if (!plan) {
        return (
            <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
                <p className="text-gray-400 mb-4">Nenhum plano selecionado.</p>
                <button onClick={() => onNavigate('pricing')} className="text-[#20FF82] hover:underline">Voltar para Planos</button>
            </div>
        );
    }

    const handlePayment = (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);
        
        // Simulate payment gateway processing time
        setTimeout(() => {
            setIsProcessing(false);
            onNavigate('payment-success');
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col lg:flex-row">
            {/* Left Column: Order Summary */}
            <div className="w-full lg:w-5/12 bg-[#0a0a0a] p-8 lg:p-12 border-r border-gray-800 flex flex-col relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>
                <div className="absolute -top-20 -left-20 w-64 h-64 bg-purple-900/20 rounded-full blur-[80px]"></div>
                
                <div className="relative z-10">
                    <button onClick={() => onNavigate('pricing')} className="flex items-center gap-2 text-gray-500 hover:text-white mb-8 transition-colors">
                        <ArrowLeftIcon className="w-4 h-4" />
                        <span>Alterar Plano</span>
                    </button>

                    <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-6">Resumo do Pedido</h2>

                    <div className="bg-[#111111] border border-gray-800 rounded-2xl p-6 mb-8 relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 to-[#20FF82]"></div>
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                                <p className="text-gray-400 text-sm">Cobrança {plan.cycle === 'monthly' ? 'mensal' : 'anual'}</p>
                            </div>
                            <div className="w-10 h-10 bg-[#20FF82]/10 rounded-full flex items-center justify-center text-[#20FF82]">
                                <SparklesIcon className="w-5 h-5" />
                            </div>
                        </div>
                        <div className="text-3xl font-bold text-white mb-6">
                            R$ {plan.price.toFixed(2)} <span className="text-base font-normal text-gray-500">/{plan.cycle === 'monthly' ? 'mês' : 'ano'}</span>
                        </div>
                        <ul className="space-y-3 border-t border-gray-800 pt-4">
                            {plan.features.slice(0, 3).map((feature, idx) => (
                                <li key={idx} className="flex items-center gap-3 text-sm text-gray-300">
                                    <CheckIcon className="w-4 h-4 text-[#20FF82]" />
                                    {feature}
                                </li>
                            ))}
                            <li className="flex items-center gap-3 text-sm text-gray-300 italic opacity-70">
                                <CheckIcon className="w-4 h-4 text-[#20FF82]" />
                                + todos os outros benefícios
                            </li>
                        </ul>
                    </div>

                    <div className="mt-auto">
                        <div className="flex items-center gap-3 text-green-400 bg-green-400/10 p-4 rounded-xl border border-green-400/20">
                            <LockClosedIcon className="w-5 h-5 flex-shrink-0" />
                            <p className="text-xs font-medium">Pagamento processado com criptografia de ponta a ponta (SSL 256-bit).</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column: Payment Form */}
            <div className="w-full lg:w-7/12 p-8 lg:p-12 overflow-y-auto relative">
                <div className="max-w-xl mx-auto">
                    <h1 className="text-3xl font-bold text-white mb-8">Finalizar Pagamento</h1>

                    <div className="flex gap-4 mb-8">
                        <button 
                            onClick={() => setPaymentMethod('credit_card')}
                            className={cn(
                                "flex-1 flex items-center justify-center gap-3 py-4 rounded-xl border transition-all",
                                paymentMethod === 'credit_card' 
                                    ? "bg-[#20FF82]/10 border-[#20FF82] text-[#20FF82]" 
                                    : "bg-[#111111] border-gray-800 text-gray-400 hover:bg-[#1a1a1a]"
                            )}
                        >
                            <CreditCardIcon className="w-5 h-5" />
                            <span className="font-bold text-sm">Cartão de Crédito</span>
                        </button>
                        <button 
                            onClick={() => setPaymentMethod('pix')}
                            className={cn(
                                "flex-1 flex items-center justify-center gap-3 py-4 rounded-xl border transition-all",
                                paymentMethod === 'pix' 
                                    ? "bg-[#20FF82]/10 border-[#20FF82] text-[#20FF82]" 
                                    : "bg-[#111111] border-gray-800 text-gray-400 hover:bg-[#1a1a1a]"
                            )}
                        >
                            <QrCodeIcon className="w-5 h-5" />
                            <span className="font-bold text-sm">PIX (Instantâneo)</span>
                        </button>
                    </div>

                    {paymentMethod === 'credit_card' ? (
                        <form onSubmit={handlePayment} className="space-y-6 animate-fade-in">
                            <div className="space-y-6">
                                <h3 className="text-lg font-bold text-white">Dados Pessoais</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <InputField label="Nome Completo" placeholder="Como no cartão" defaultValue={user?.name || ''} icon={<div className="w-4 h-4 bg-gray-700 rounded-full" />} />
                                    <InputField label="CPF/CNPJ" placeholder="000.000.000-00" icon={<div className="w-4 h-4 bg-gray-700 rounded-full" />} />
                                </div>
                                <InputField label="Email" type="email" placeholder="seu@email.com" defaultValue={user?.email || ''} icon={<div className="w-4 h-4 bg-gray-700 rounded-full" />} />
                            </div>

                            <div className="h-px bg-gray-800 my-6"></div>

                            <div className="space-y-6">
                                <h3 className="text-lg font-bold text-white">Dados do Cartão</h3>
                                <InputField 
                                    label="Número do Cartão" 
                                    placeholder="0000 0000 0000 0000" 
                                    icon={<CreditCardIcon className="w-4 h-4"/>}
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <InputField label="Validade" placeholder="MM/AA" icon={<div className="w-4 h-4 bg-gray-700 rounded-full" />} />
                                    <InputField label="CVV" placeholder="123" type="password" maxLength={4} icon={<LockClosedIcon className="w-4 h-4"/>} />
                                </div>
                            </div>

                            <button 
                                type="submit"
                                disabled={isProcessing}
                                className="w-full mt-8 bg-[#20FF82] hover:bg-[#1ce676] text-black font-bold py-4 rounded-xl transition-all shadow-[0_0_20px_-5px_rgba(32,255,130,0.4)] flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isProcessing ? (
                                    <>
                                        <LoadingSpinner className="w-5 h-5 text-black" />
                                        <span>Processando...</span>
                                    </>
                                ) : (
                                    <>
                                        <LockClosedIcon className="w-5 h-5" />
                                        <span>Pagar e Ativar Agora</span>
                                    </>
                                )}
                            </button>
                        </form>
                    ) : (
                        <div className="text-center animate-fade-in py-12 bg-[#111111] rounded-2xl border border-gray-800">
                            <div className="w-48 h-48 mx-auto bg-white p-2 rounded-xl mb-6">
                                {/* Placeholder QR Code */}
                                <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=localizaqui-payment-simulation" alt="QR Code PIX" className="w-full h-full" />
                            </div>
                            <p className="text-white font-bold text-lg mb-2">Escaneie o QR Code para pagar</p>
                            <p className="text-gray-400 text-sm mb-6">Ou copie o código abaixo:</p>
                            
                            <div className="max-w-sm mx-auto flex items-center gap-2 bg-black p-3 rounded-lg border border-gray-700">
                                <code className="text-xs text-gray-300 truncate flex-1">00020126580014br.gov.bcb.pix0136123e4567-e89b-12d3-a456-426614174000...</code>
                                <button className="text-[#20FF82] text-xs font-bold hover:underline">Copiar</button>
                            </div>

                            <button 
                                onClick={() => { setIsProcessing(true); setTimeout(() => onNavigate('payment-success'), 2000); }}
                                className="mt-8 text-gray-500 hover:text-white text-sm underline"
                            >
                                Já realizei o pagamento (Simular Sucesso)
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
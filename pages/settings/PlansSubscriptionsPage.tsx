
import React, { useState, useEffect } from 'react';
import { PricingCard } from '../../components/pricing/PricingCard';
import { CheckIcon } from '../../components/icons/CheckIcon';
import { TicketIcon } from '../../components/icons/TicketIcon';
import { LoadingSpinner } from '../../components/icons/LoadingSpinner';
import { SparklesIcon } from '../../components/icons/SparklesIcon';

const PlansSubscriptionsPage: React.FC = () => {
    // State for voucher system
    const [voucherCode, setVoucherCode] = useState('');
    const [redemptionStatus, setRedemptionStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [successMessage, setSuccessMessage] = useState('');

    // Mock current user plan state
    const [userPlan, setUserPlan] = useState({
        name: 'Starter',
        price: 0,
        features: ['Perfil público', 'Até 10 solicitações/mês', '1 categoria de serviço', 'Suporte por email'],
        cycle: 'monthly' as 'monthly' | 'yearly',
        active: true
    });

    const otherPlans = [
        { name: 'Pro', price: 49, features: ['Destaque nas buscas', 'Solicitações ilimitadas', 'Até 5 categorias', 'Suporte prioritário'] },
        { name: 'Premium', price: 99, features: ['Tudo do Pro', 'Painel de analytics', 'Verificação de perfil', 'Gerente de conta dedicado'] },
    ];
    
    const invoices = [
        { id: 'INV-2024-003', date: '01/07/2024', amount: 'R$0,00', status: 'Grátis' },
    ];

    const handleRedeemVoucher = (e: React.FormEvent) => {
        e.preventDefault();
        if (!voucherCode.trim()) return;

        setRedemptionStatus('loading');

        // Simulate API verification
        setTimeout(() => {
            const code = voucherCode.toUpperCase().trim();
            
            // Retrieve vouchers from localStorage (managed by Admin Page) or use default fallbacks
            const storedVouchers = localStorage.getItem('localizaqui_vouchers');
            const validVouchers = storedVouchers 
                ? JSON.parse(storedVouchers) 
                : ['PRO30', 'LOCALIZA_VIP', 'BETA_TESTER'];

            if (validVouchers.includes(code)) {
                setRedemptionStatus('success');
                setSuccessMessage('Código validado! Você ganhou 1 Mês de Plano Pro grátis.');
                
                // Update local state to reflect "Pro" status (Visual simulation)
                setUserPlan({
                    name: 'Pro (Voucher)',
                    price: 0,
                    features: ['Destaque nas buscas', 'Solicitações ilimitadas', 'Até 5 categorias', 'Suporte prioritário'],
                    cycle: 'monthly',
                    active: true
                });
                setVoucherCode('');
            } else {
                setRedemptionStatus('error');
            }
        }, 1500);
    };

    return (
        <div className="p-4 md:p-6 lg:p-8 space-y-8">
            <header>
                <h2 className="text-3xl font-bold text-white">Planos e Assinatura</h2>
                <p className="text-gray-400 mt-1">Gerencie sua assinatura, resgate códigos e veja faturas.</p>
            </header>

            {/* Current Plan Section */}
            <div className="bg-[#111111] border border-gray-800 rounded-2xl p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-white">Seu Plano Atual</h3>
                    {userPlan.name.includes('Voucher') && (
                        <span className="bg-[#20FF82]/20 text-[#20FF82] text-xs font-bold px-3 py-1 rounded-full border border-[#20FF82]/30 flex items-center gap-1">
                            <SparklesIcon className="w-3 h-3" /> Voucher Ativo
                        </span>
                    )}
                </div>
                
                <div className="mt-4 bg-[#2a2a2a] border border-purple-500/50 rounded-lg p-6 flex flex-col md:flex-row justify-between items-start gap-4 relative overflow-hidden">
                    {/* Background decoration if PRO */}
                    {userPlan.name.includes('Pro') && (
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#20FF82]/10 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
                    )}

                    <div>
                        <h4 className="text-2xl font-bold text-white">{userPlan.name}</h4>
                        <p className="text-purple-400 font-semibold">
                            {userPlan.price === 0 ? 'Gratuito' : `R$${userPlan.price}/${userPlan.cycle === 'monthly' ? 'mês' : 'ano'}`}
                        </p>
                    </div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 z-10">
                        {userPlan.features.map(feature => (
                             <li key={feature} className="flex items-center gap-2 text-sm text-gray-300">
                                <CheckIcon className="w-4 h-4 text-[#20FF82]" />
                                {feature}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Voucher Redemption Section */}
            <div className="bg-[#111111] border border-gray-800 rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none"></div>
                
                <div className="flex flex-col md:flex-row gap-8 relative z-10">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400">
                                <TicketIcon className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-white">Resgatar Código</h3>
                        </div>
                        <p className="text-gray-400 text-sm mb-4">
                            Possui um código promocional ou voucher de parceiro? Insira abaixo para ativar benefícios exclusivos no seu plano.
                        </p>
                        
                        <form onSubmit={handleRedeemVoucher} className="flex flex-col sm:flex-row gap-3">
                            <input 
                                type="text" 
                                placeholder="Ex: PRO30" 
                                value={voucherCode}
                                onChange={(e) => {
                                    setVoucherCode(e.target.value.toUpperCase());
                                    setRedemptionStatus('idle');
                                }}
                                disabled={redemptionStatus === 'loading' || redemptionStatus === 'success'}
                                className="flex-1 bg-[#0a0a0a] border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#20FF82] focus:ring-1 focus:ring-[#20FF82]/20 transition-all uppercase tracking-widest font-mono"
                            />
                            <button 
                                type="submit"
                                disabled={!voucherCode || redemptionStatus === 'loading' || redemptionStatus === 'success'}
                                className="bg-white text-black font-bold px-6 py-3 rounded-xl hover:bg-[#20FF82] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center min-w-[120px]"
                            >
                                {redemptionStatus === 'loading' ? <LoadingSpinner className="w-5 h-5 text-black"/> : 'Ativar'}
                            </button>
                        </form>

                        {/* Feedback Messages */}
                        {redemptionStatus === 'success' && (
                            <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center gap-2 text-green-400 text-sm animate-fade-in-up">
                                <CheckIcon className="w-4 h-4" />
                                {successMessage}
                            </div>
                        )}
                        
                        {redemptionStatus === 'error' && (
                            <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm animate-fade-in-up">
                                Código inválido ou expirado. Tente novamente.
                            </div>
                        )}
                    </div>

                    <div className="w-full md:w-1/3 bg-[#2a2a2a] rounded-xl p-4 border border-gray-700 flex flex-col justify-center items-center text-center">
                        <p className="text-gray-400 text-xs uppercase tracking-widest mb-2">Dica do Admin</p>
                        <p className="text-white font-medium text-sm">
                            Códigos são liberados em eventos e newsletters. Fique atento ao seu email!
                        </p>
                    </div>
                </div>
            </div>
            
            {/* Other Plans */}
            <div>
                 <h3 className="text-xl font-bold text-white mb-4">Outros Planos Disponíveis</h3>
                 <div className="grid md:grid-cols-2 gap-8">
                    {otherPlans.map(plan => (
                        <PricingCard 
                            key={plan.name} 
                            {...plan} 
                            cycle={userPlan.cycle}
                            isProviderPlan
                            onSelectPlan={() => alert(`Redirecionando para checkout do plano ${plan.name}...`)}
                        />
                    ))}
                 </div>
            </div>

            {/* Invoices */}
            <div className="bg-[#111111] border border-gray-800 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Histórico de Faturas</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="text-gray-400 border-b border-gray-700">
                            <tr>
                                <th className="p-3">Fatura</th>
                                <th className="p-3">Data</th>
                                <th className="p-3">Valor</th>
                                <th className="p-3 text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            {invoices.map(invoice => (
                                <tr key={invoice.id}>
                                    <td className="p-3 font-medium text-white">{invoice.id}</td>
                                    <td className="p-3 text-gray-300">{invoice.date}</td>
                                    <td className="p-3 text-gray-300">{invoice.amount}</td>
                                    <td className="p-3 text-right">
                                        <span className="bg-green-500/20 text-green-300 px-2 py-1 text-xs font-semibold rounded-full">{invoice.status}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
};

export default PlansSubscriptionsPage;


import React, { useState } from 'react';
import { PricingCard } from '../components/pricing/PricingCard';
import { PlanToggle } from '../components/pricing/PlanToggle';
import { PlatformValueSection } from '../components/pricing/PlatformValueSection';
import { VslSection } from '../components/pricing/VslSection';
import { SparklesIcon } from '../components/icons/SparklesIcon';
import { Plan } from '../types';

interface PricingPageProps {
    onSubscribe: (plan: Plan) => void;
}

const PricingPage: React.FC<PricingPageProps> = ({ onSubscribe }) => {
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

    const providerPlans: { [key: string]: Plan[] } = {
        monthly: [
            { name: 'Starter', price: 0, cycle: 'monthly', features: ['Perfil público básico', 'Até 3 orçamentos/mês', '1 categoria de serviço', 'Suporte por email'] },
            { name: 'Pro', price: 49, cycle: 'monthly', features: ['Destaque Ouro nas buscas', 'Orçamentos ilimitados', 'Até 5 categorias', 'Selo de Verificado', 'Suporte prioritário 24h'] },
            { name: 'Business', price: 99, cycle: 'monthly', features: ['Tudo do Pro', 'Painel de métricas avançado', 'Gestor de conta dedicado', 'Prioridade máxima na IA', 'API de integração'] },
        ],
        yearly: [
             { name: 'Starter', price: 0, cycle: 'yearly', features: ['Perfil público básico', 'Até 3 orçamentos/mês', '1 categoria de serviço', 'Suporte por email'] },
            { name: 'Pro', price: 490, cycle: 'yearly', features: ['Destaque Ouro nas buscas', 'Orçamentos ilimitados', 'Até 5 categorias', 'Selo de Verificado', 'Suporte prioritário 24h', '2 meses grátis'] },
            { name: 'Business', price: 990, cycle: 'yearly', features: ['Tudo do Pro', 'Painel de métricas avançado', 'Gestor de conta dedicado', 'Prioridade máxima na IA', 'API de integração', '2 meses grátis'] },
        ]
    };

    return (
        <div className="bg-black text-white min-h-screen">
             {/* Hero Background */}
             <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-purple-900/20 to-transparent pointer-events-none"></div>
             
            <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#20FF82]/10 border border-[#20FF82]/20 text-[#20FF82] text-xs font-bold mb-6">
                        <SparklesIcon className="w-3 h-3" />
                        <span>INVESTIMENTO INTELIGENTE</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight">
                        Escalabilidade para o <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#20FF82] to-blue-500">seu negócio local.</span>
                    </h1>
                    <p className="mt-6 text-xl text-gray-400 max-w-2xl mx-auto">
                        Escolha o plano que coloca sua empresa no piloto automático. Mais clientes, menos esforço manual.
                    </p>
                    
                    <div className="mt-12 flex justify-center">
                        <PlanToggle billingCycle={billingCycle} setBillingCycle={setBillingCycle} />
                    </div>
                </div>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-3 gap-8 items-start relative z-10">
                     {providerPlans[billingCycle].map((plan, idx) => (
                        <PricingCard 
                            key={plan.name} 
                            name={plan.name}
                            price={plan.price}
                            features={plan.features}
                            cycle={billingCycle} 
                            isProviderPlan={true}
                            recommended={plan.name === 'Pro'}
                            onSelectPlan={plan.price > 0 ? () => onSubscribe(plan) : undefined} 
                        />
                    ))}
                </div>
                
                {/* Value Proposition */}
                <PlatformValueSection />
                
                {/* Social Proof / VSL */}
                <VslSection />
            </div>
        </div>
    );
};

export default PricingPage;
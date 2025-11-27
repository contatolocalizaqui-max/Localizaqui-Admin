import React from 'react';

interface PlanToggleProps {
    billingCycle: 'monthly' | 'yearly';
    setBillingCycle: (cycle: 'monthly' | 'yearly') => void;
}

export const PlanToggle: React.FC<PlanToggleProps> = ({ billingCycle, setBillingCycle }) => {
    const isMonthly = billingCycle === 'monthly';

    return (
        <div className="relative flex w-fit items-center rounded-full bg-[#111111] p-1 border border-gray-700">
            <button
                type="button"
                onClick={() => setBillingCycle('monthly')}
                className={`relative z-10 rounded-full px-6 py-2 text-sm font-medium transition-colors ${
                    isMonthly ? 'text-black' : 'text-gray-300 hover:text-white'
                }`}
            >
                Mensal
            </button>
            <button
                type="button"
                onClick={() => setBillingCycle('yearly')}
                className={`relative z-10 rounded-full px-6 py-2 text-sm font-medium transition-colors ${
                    !isMonthly ? 'text-black' : 'text-gray-300 hover:text-white'
                }`}
            >
                Anual
            </button>
             <span className="absolute inset-0 z-0 p-1">
                <span
                    className={`block h-full w-1/2 rounded-full bg-[#20FF82] transition-transform duration-300 ease-in-out ${
                    isMonthly ? 'translate-x-0' : 'translate-x-full'
                    }`}
                />
            </span>
             <span className="absolute top-0 right-[-10px] -translate-y-4 bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded-full rotate-12">
                -20%
            </span>
        </div>
    );
};

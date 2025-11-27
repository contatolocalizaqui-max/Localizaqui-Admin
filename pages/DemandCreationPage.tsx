import React, { useState, useRef, useEffect } from 'react';
import { Demand } from '../types';
import { cn } from '../utils/cn';
import { CheckIcon } from '../components/icons/CheckIcon';
import { DemandCard } from '../components/demand/DemandCard';
import { CrosshairsIcon } from '../components/icons/CrosshairsIcon';
import { CameraIcon } from '../components/icons/CameraIcon';
import { LoadingSpinner } from '../components/icons/LoadingSpinner';
import { motion, AnimatePresence } from 'framer-motion';
import { ClockIcon } from '../components/icons/ClockIcon';
import { BoltIcon } from '../components/icons/BoltIcon';
import { CalendarIcon } from '../components/icons/CalendarIcon'; // You might need to add this icon or use ClockIcon
import { ArrowLeftIcon } from '../components/icons/ArrowLeftIcon';

interface DemandCreationPageProps {
    onDemandCreated: (demand: Omit<Demand, 'id' | 'createdAt' | 'proposals' | 'status'>) => void;
    onGeolocate: () => Promise<string>;
}

const defaultDemand: Partial<Demand> = {
    title: '',
    category: '',
    description: '',
    location: '',
    urgency: 'flexivel',
    budget: { min: undefined, max: undefined },
    images: []
};

const StepProgress: React.FC<{ currentStep: number, totalSteps: number, setStep: (step: number) => void }> = ({ currentStep, totalSteps, setStep }) => {
    const steps = ["Serviço", "Detalhes", "Revisão"];
    return (
        <div className="flex items-center justify-between w-full mb-8 relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-gray-800 -z-10"></div>
             <div 
                className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-[#20FF82] -z-10 transition-all duration-500"
                style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
            ></div>

            {steps.map((label, index) => {
                const step = index + 1;
                const isCompleted = step < currentStep;
                const isActive = step === currentStep;
                return (
                    <button 
                        key={step} 
                        onClick={() => (isCompleted || isActive) && setStep(step)}
                        className="flex flex-col items-center group bg-black px-2"
                        disabled={!isCompleted && !isActive}
                    >
                        <div className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 border-2",
                            isCompleted ? "bg-[#20FF82] border-[#20FF82] text-black" : 
                            isActive ? "bg-black border-[#20FF82] text-[#20FF82] shadow-[0_0_15px_rgba(32,255,130,0.5)]" : 
                            "bg-[#111111] border-gray-700 text-gray-500 group-hover:border-gray-500"
                        )}>
                            {isCompleted ? <CheckIcon className="w-5 h-5"/> : step}
                        </div>
                        <span className={cn(
                            "mt-2 text-xs font-semibold transition-colors uppercase tracking-wider",
                            isActive ? "text-[#20FF82]" : isCompleted ? "text-gray-300" : "text-gray-600"
                        )}>{label}</span>
                    </button>
                );
            })}
        </div>
    );
};

const UrgencyCard: React.FC<{ 
    type: 'imediata' | 'nesta_semana' | 'flexivel', 
    selected: boolean, 
    onClick: () => void 
}> = ({ type, selected, onClick }) => {
    const content = {
        imediata: { icon: <BoltIcon className="w-6 h-6"/>, label: "Imediata", desc: "Preciso para hoje", color: "text-red-500", border: "border-red-500", bg: "bg-red-500/10" },
        nesta_semana: { icon: <ClockIcon className="w-6 h-6"/>, label: "Esta Semana", desc: "Sem muita pressa", color: "text-amber-500", border: "border-amber-500", bg: "bg-amber-500/10" },
        flexivel: { icon: <CheckIcon className="w-6 h-6"/>, label: "Flexível", desc: "Apenas orçando", color: "text-blue-500", border: "border-blue-500", bg: "bg-blue-500/10" },
    };
    
    const item = content[type];

    return (
        <button 
            onClick={onClick}
            className={cn(
                "flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-300 w-full h-full min-h-[120px]",
                selected 
                    ? cn(item.border, item.bg, "shadow-lg") 
                    : "border-gray-800 bg-[#1a1a1a] hover:border-gray-600 hover:bg-[#222]"
            )}
        >
            <div className={cn("mb-2", selected ? item.color : "text-gray-400")}>{item.icon}</div>
            <span className={cn("font-bold text-sm mb-1", selected ? "text-white" : "text-gray-300")}>{item.label}</span>
            <span className="text-xs text-gray-500">{item.desc}</span>
        </button>
    );
};

const QuickCategoryChip: React.FC<{ label: string, onClick: () => void }> = ({ label, onClick }) => (
    <button 
        type="button"
        onClick={onClick}
        className="px-3 py-1.5 rounded-lg bg-[#1a1a1a] border border-gray-700 hover:border-[#20FF82] text-xs text-gray-300 hover:text-white transition-colors"
    >
        {label}
    </button>
);

const DemandCreationPage: React.FC<DemandCreationPageProps> = ({ onDemandCreated, onGeolocate }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [demandData, setDemandData] = useState<Partial<Demand>>(defaultDemand);
    const [isLocating, setIsLocating] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setDemandData(prev => ({ ...prev, [name]: value }));
    };
    
    const handleLocationClick = async () => {
        setIsLocating(true);
        try {
            const location = await onGeolocate();
            setDemandData(prev => ({ ...prev, location }));
        } catch (error) {
            alert(error);
        } finally {
            setIsLocating(false);
        }
    };
    
    const isStep1Valid = demandData.title && demandData.category && demandData.description;
    const isStep2Valid = demandData.location && demandData.urgency;

    const renderStep = () => {
        switch(currentStep) {
            case 1: // Basic Info
                return (
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="space-y-6"
                    >
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-1">O que você precisa?</h2>
                            <p className="text-gray-400 text-sm">Comece definindo a categoria e o título.</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Categoria do Serviço</label>
                            <input 
                                name="category" 
                                value={demandData.category} 
                                onChange={handleInputChange} 
                                placeholder="Ex: Eletricista, Encanador..." 
                                className="w-full bg-[#1a1a1a] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#20FF82] focus:ring-1 focus:ring-[#20FF82] transition-all" 
                            />
                            <div className="flex flex-wrap gap-2 mt-3">
                                {["Eletricista", "Encanador", "Pintor", "Faxina", "Montador"].map(cat => (
                                    <QuickCategoryChip key={cat} label={cat} onClick={() => setDemandData(p => ({...p, category: cat}))} />
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Título da Demanda</label>
                            <input 
                                name="title" 
                                value={demandData.title} 
                                onChange={handleInputChange} 
                                placeholder="Ex: Instalação de chuveiro elétrico" 
                                className="w-full bg-[#1a1a1a] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#20FF82] focus:ring-1 focus:ring-[#20FF82] transition-all" 
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Descrição Detalhada</label>
                            <textarea 
                                name="description" 
                                value={demandData.description} 
                                onChange={handleInputChange} 
                                rows={5} 
                                placeholder="Descreva detalhes importantes: tipo de aparelho, altura do pé direito, se precisa levar escada..." 
                                className="w-full bg-[#1a1a1a] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#20FF82] focus:ring-1 focus:ring-[#20FF82] transition-all resize-none" 
                            />
                        </div>
                    </motion.div>
                );
            case 2: // Details
                return (
                     <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="space-y-8"
                     >
                        <div>
                             <h2 className="text-2xl font-bold text-white mb-1">Detalhes Finais</h2>
                             <p className="text-gray-400 text-sm">Para receber orçamentos precisos.</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Localização do Serviço</label>
                            <div className="relative">
                                <input 
                                    name="location" 
                                    value={demandData.location} 
                                    onChange={handleInputChange} 
                                    placeholder="Cidade, Estado ou CEP" 
                                    className="w-full bg-[#1a1a1a] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#20FF82] focus:ring-1 focus:ring-[#20FF82] pr-12 transition-all" 
                                />
                                <button 
                                    type="button" 
                                    onClick={handleLocationClick} 
                                    disabled={isLocating} 
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-[#20FF82] transition-colors disabled:opacity-50"
                                >
                                    {isLocating ? <LoadingSpinner className="w-5 h-5"/> : <CrosshairsIcon className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-3">Urgência</label>
                            <div className="grid grid-cols-3 gap-3">
                                {(['imediata', 'nesta_semana', 'flexivel'] as const).map(urg => (
                                    <UrgencyCard 
                                        key={urg} 
                                        type={urg} 
                                        selected={demandData.urgency === urg} 
                                        onClick={() => setDemandData(p => ({...p, urgency: urg}))} 
                                    />
                                ))}
                            </div>
                        </div>

                         <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Faixa de Orçamento (Opcional)</label>
                            <div className="flex items-center gap-4 p-4 bg-[#1a1a1a] border border-gray-700 rounded-xl">
                                <span className="text-[#20FF82] font-bold text-lg">R$</span>
                                <input 
                                    type="number" 
                                    placeholder="Mín" 
                                    value={demandData.budget?.min || ''} 
                                    onChange={(e) => setDemandData(p => ({...p, budget: {...p.budget, min: Number(e.target.value)}}))} 
                                    className="w-full bg-transparent text-white placeholder-gray-600 focus:outline-none border-b border-gray-700 focus:border-[#20FF82] transition-colors text-center" 
                                />
                                <span className="text-gray-500">-</span>
                                <input 
                                    type="number" 
                                    placeholder="Máx" 
                                    value={demandData.budget?.max || ''} 
                                    onChange={(e) => setDemandData(p => ({...p, budget: {...p.budget, max: Number(e.target.value)}}))} 
                                    className="w-full bg-transparent text-white placeholder-gray-600 focus:outline-none border-b border-gray-700 focus:border-[#20FF82] transition-colors text-center" 
                                />
                            </div>
                        </div>
                    </motion.div>
                );
            case 3: // Review
                return (
                     <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center py-8 text-center"
                     >
                        <div className="w-20 h-20 rounded-full bg-[#20FF82]/10 flex items-center justify-center mb-6 animate-pulse">
                            <BoltIcon className="w-10 h-10 text-[#20FF82]" />
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-2">Tudo pronto para lançar!</h2>
                        <p className="text-gray-400 max-w-md mb-8">
                            Sua demanda será enviada instantaneamente para os melhores profissionais compatíveis com sua região.
                        </p>
                        
                        <div className="bg-[#1a1a1a] border border-gray-800 p-4 rounded-xl w-full max-w-sm mb-8 text-left">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                <p className="text-xs text-green-400 font-bold uppercase tracking-wide">Status: Pronto para envio</p>
                            </div>
                            <p className="text-white font-medium text-sm">Revise os detalhes no card ao lado (ou abaixo no mobile).</p>
                        </div>
                     </motion.div>
                );
            default: return null;
        }
    }

    return (
        <div className="flex-1 w-full h-full overflow-y-auto bg-black text-white">
            <div className="max-w-7xl mx-auto p-4 md:p-8 lg:p-12 min-h-full">
                
                <button onClick={() => window.history.back()} className="flex items-center gap-2 text-gray-500 hover:text-white mb-8 transition-colors">
                    <ArrowLeftIcon className="w-4 h-4" />
                    Cancelar
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-24 items-start">
                    {/* Left Column: Form */}
                    <div className="w-full max-w-xl mx-auto lg:mx-0">
                        <StepProgress currentStep={currentStep} totalSteps={3} setStep={setCurrentStep} />
                        
                        <div className="min-h-[400px]">
                            <AnimatePresence mode="wait">
                                {renderStep()}
                            </AnimatePresence>
                        </div>

                        <div className="flex justify-between mt-12 pt-8 border-t border-gray-800">
                            <button 
                                onClick={() => setCurrentStep(s => s - 1)} 
                                disabled={currentStep === 1} 
                                className="px-6 py-3 rounded-xl text-gray-400 font-medium hover:text-white hover:bg-[#1a1a1a] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                                Voltar
                            </button>
                            
                            {currentStep < 3 ? (
                                <button 
                                    onClick={() => setCurrentStep(s => s + 1)} 
                                    disabled={currentStep === 1 ? !isStep1Valid : !isStep2Valid} 
                                    className="px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-[#20FF82] transition-all shadow-lg hover:shadow-[#20FF82]/20 disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed disabled:shadow-none"
                                >
                                    Continuar
                                </button>
                            ) : (
                                <button 
                                    onClick={() => onDemandCreated(demandData as any)} 
                                    className="px-8 py-3 bg-[#20FF82] text-black font-bold rounded-xl hover:bg-[#1ce676] transition-all shadow-[0_0_20px_rgba(32,255,130,0.4)] transform hover:scale-105"
                                >
                                    Publicar Demanda
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Right Column: Sticky Preview */}
                    <div className="hidden lg:block sticky top-8">
                         <div className="relative">
                             <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-blue-600/10 rounded-3xl blur-2xl"></div>
                             <div className="relative bg-[#0a0a0a] border border-gray-800 rounded-3xl p-8 shadow-2xl">
                                 <div className="flex items-center justify-between mb-6">
                                     <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Live Preview</h3>
                                     <div className="flex gap-1">
                                         <div className="w-2 h-2 rounded-full bg-red-500/20"></div>
                                         <div className="w-2 h-2 rounded-full bg-yellow-500/20"></div>
                                         <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                     </div>
                                 </div>
                                 
                                 <DemandCard 
                                    demand={{
                                        ...defaultDemand, 
                                        ...demandData, 
                                        id: 'preview', 
                                        status: 'aberta', 
                                        proposals: [], 
                                        createdAt: 'Agora mesmo'
                                    } as Demand} 
                                 />
                                 
                                 <div className="mt-6 text-center">
                                     <p className="text-xs text-gray-600 font-mono">Visualização do Profissional</p>
                                 </div>
                             </div>
                         </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DemandCreationPage;
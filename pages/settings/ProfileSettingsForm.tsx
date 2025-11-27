import React, { useState, useCallback, useMemo } from 'react';
import { ProfileCard } from '../../components/profile/ProfileCard';
import { ProfileData, ExperienceLevel, DayAvailability } from '../../types';
import { ProfileInsights } from '../../components/profile/ProfileInsights';
import { CameraIcon } from '../../components/icons/CameraIcon';
import { CrosshairsIcon } from '../../components/icons/CrosshairsIcon';
import { CheckIcon } from '../../components/icons/CheckIcon';
import { cn } from '../../utils/cn';
import { LoadingSpinner } from '../../components/icons/LoadingSpinner';


interface ProfileSettingsFormProps {
    onSaveOnly: () => void;
    onPublish: () => void;
    isPublishing: boolean;
    onGeolocate: () => Promise<string>;
}

const defaultProfile: ProfileData = {
  id: "1",
  name: "Seu Nome Aqui",
  accountType: 'individual',
  cpf: '',
  cnpj: '',
  companyName: '',
  email: '',
  phone: '',
  isWhatsapp: true,
  serviceCategory: "Sua Especialidade",
  description: 'Descreva seus serviços de forma clara e objetiva para atrair mais clientes. Destaque seus diferenciais!',
  tags: ["Tag 1", "Tag 2"],
  experienceLevel: '5-10 anos',
  location: "Sua Cidade, Estado",
  serviceRadius: 25,
  availabilitySchedule: {
    'Seg': { enabled: true, start: '09:00', end: '18:00' },
    'Ter': { enabled: true, start: '09:00', end: '18:00' },
    'Qua': { enabled: true, start: '09:00', end: '18:00' },
    'Qui': { enabled: true, start: '09:00', end: '18:00' },
    'Sex': { enabled: true, start: '09:00', end: '18:00' },
    'Sab': { enabled: false, start: '09:00', end: '12:00' },
    'Dom': { enabled: false, start: '09:00', end: '12:00' },
  },
  emergency: false,
  socialLinks: {},
  rating: 0,
  totalReviews: 0,
  verified: false,
  responseTime: "~1h",
  successRate: 90,
  availability: "Disponibilidade",
  specialty: "Sua Especialidade",
  imageUrl: "",
  avatar: null,
};

// --- HELPER & UI COMPONENTS ---

const InputField: React.FC<React.InputHTMLAttributes<HTMLInputElement> & {label: string}> = ({label, ...props}) => (
    <div className="group">
        <label htmlFor={props.id} className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 group-focus-within:text-[#20FF82] transition-colors">{label}</label>
        <input 
            {...props}
            className="w-full bg-[#0f0f0f] border border-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#20FF82] focus:ring-1 focus:ring-[#20FF82]/20 transition-all"
        />
    </div>
);

const ToggleButton: React.FC<{ options: {value: string, label: string}[], value: string, onChange: (value: string) => void }> = ({ options, value, onChange }) => (
    <div className="flex p-1 rounded-xl bg-[#0f0f0f] border border-gray-800">
        {options.map(opt => (
            <button 
                key={opt.value} 
                onClick={() => onChange(opt.value)} 
                className={cn(
                    "flex-1 py-2.5 rounded-lg text-sm font-bold transition-all duration-300",
                    value === opt.value 
                        ? 'bg-[#2a2a2a] text-white shadow-lg' 
                        : 'text-gray-500 hover:text-gray-300'
                )}
            >
                {opt.label}
            </button>
        ))}
    </div>
);

const StepProgress: React.FC<{ currentStep: number, totalSteps: number, setStep: (step: number) => void }> = ({ currentStep, totalSteps, setStep }) => {
    const steps = ["Identidade", "Especialidade", "Local", "Horários", "Social", "Revisão"];
    return (
        <div className="flex items-center justify-between mb-8 overflow-x-auto pb-2 scrollbar-hide">
            {steps.slice(0, totalSteps).map((label, index) => {
                const step = index + 1;
                const isActive = step === currentStep;
                const isCompleted = step < currentStep;
                return (
                    <button 
                        key={step} 
                        onClick={() => isCompleted && setStep(step)} 
                        className={cn(
                            "flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap",
                            isActive ? "bg-[#20FF82]/10 text-[#20FF82] border border-[#20FF82]/50" :
                            isCompleted ? "text-gray-400 hover:text-white" : "text-gray-700"
                        )}
                    >
                        <span className={cn("w-2 h-2 rounded-full", isActive ? "bg-[#20FF82] animate-pulse" : isCompleted ? "bg-gray-500" : "bg-gray-800")}></span>
                        {label}
                    </button>
                )
            })}
        </div>
    );
};

// --- FORM STEP COMPONENTS ---

const Step1Identity: React.FC<{ data: ProfileData, setData: React.Dispatch<React.SetStateAction<ProfileData>> }> = ({ data, setData }) => {
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData(prev => ({ ...prev, avatar: file }));
            setAvatarPreview(URL.createObjectURL(file));
        }
    };
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData(prev => ({...prev, [name]: value}));
    };

    return (
         <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-[#1a1a1a]/50 border border-gray-800 rounded-2xl">
                 <label htmlFor="avatar-upload" className="relative w-28 h-28 rounded-full bg-black border border-gray-700 flex items-center justify-center cursor-pointer overflow-hidden group hover:border-[#20FF82] transition-all shadow-xl">
                    {avatarPreview ? (
                        <img src={avatarPreview} alt="Preview" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                    ) : (
                       <div className="text-center text-gray-500 group-hover:text-[#20FF82] transition-colors">
                           <CameraIcon className="w-8 h-8 mx-auto mb-2"/>
                           <span className="text-[10px] uppercase font-bold tracking-widest">Upload</span>
                       </div>
                    )}
                    {/* Scanning Effect */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#20FF82]/20 to-transparent translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-1000 pointer-events-none"></div>
                    
                    <input id="avatar-upload" type="file" accept="image/png, image/jpeg, image/webp" className="hidden" onChange={handleAvatarChange} />
                </label>
                <div className="text-center sm:text-left">
                    <h2 className="text-xl font-bold text-white">Foto de Perfil</h2>
                    <p className="text-gray-400 text-sm mt-1 max-w-xs">Uma boa foto aumenta em 7x as chances de contratação. Use boa iluminação.</p>
                </div>
            </div>
            
            <div className="space-y-6">
                <ToggleButton 
                    options={[{value: 'individual', label: 'Pessoa Física'}, {value: 'company', label: 'Empresa'}]} 
                    value={data.accountType} 
                    onChange={(val) => setData(prev => ({...prev, accountType: val as 'individual' | 'company'}))}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {data.accountType === 'individual' ? (
                        <>
                            <InputField label="Nome Completo" id="name" name="name" value={data.name} onChange={handleChange} placeholder="Ex: João da Silva" />
                            <InputField label="CPF" id="cpf" name="cpf" value={data.cpf} onChange={handleChange} placeholder="000.000.000-00" />
                        </>
                    ) : (
                        <>
                            <InputField label="Razão Social" id="companyName" name="companyName" value={data.companyName} onChange={handleChange} placeholder="Ex: Silva Serviços Ltda." />
                            <InputField label="CNPJ" id="cnpj" name="cnpj" value={data.cnpj} onChange={handleChange} placeholder="00.000.000/0000-00" />
                        </>
                    )}
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <InputField label="Email Profissional" id="email" name="email" type="email" value={data.email} onChange={handleChange} placeholder="seu.email@exemplo.com" />
                    <InputField label="Telefone / WhatsApp" id="phone" name="phone" type="tel" value={data.phone} onChange={handleChange} placeholder="(11) 99999-9999" />
                </div>
            </div>
        </div>
    );
};

const Step2Specialty: React.FC<{ data: ProfileData, setData: React.Dispatch<React.SetStateAction<ProfileData>> }> = ({ data, setData }) => {
    const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTags = e.target.value
            .split(',')
            .map(tag => tag.trim())
            .filter(Boolean);

        if (newTags.length <= 20) {
            setData(prev => ({ ...prev, tags: newTags }));
        }
    };
    
    return (
        <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <InputField label="Categoria Principal" id="serviceCategory" name="serviceCategory" value={data.serviceCategory} onChange={(e) => setData(p => ({...p, serviceCategory: e.target.value, specialty: e.target.value}))} placeholder="Ex: Eletricista, Encanador" />
                <div>
                     <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Nível de Experiência</label>
                     <select 
                        value={data.experienceLevel}
                        onChange={(e) => setData(p => ({...p, experienceLevel: e.target.value as ExperienceLevel}))}
                        className="w-full bg-[#0f0f0f] border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#20FF82] appearance-none"
                     >
                         {['1-2 anos', '3-5 anos', '5-10 anos', '10+ anos'].map(level => <option key={level} value={level}>{level}</option>)}
                     </select>
                </div>
            </div>
            
            <div>
                 <label htmlFor="description" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Sobre Você</label>
                 <textarea 
                    id="description" 
                    name="description" 
                    rows={5} 
                    value={data.description} 
                    onChange={(e) => setData(p => ({...p, description: e.target.value}))}
                    placeholder="Descreva seus diferenciais, equipamentos que utiliza, e por que o cliente deve te escolher."
                    className="w-full bg-[#0f0f0f] border border-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#20FF82] focus:ring-1 focus:ring-[#20FF82]/20 transition-all resize-none"
                 />
                 <p className="text-[10px] text-gray-600 text-right mt-1 uppercase tracking-wide">{data.description.length} / 300 caracteres</p>
            </div>

            <div>
                <InputField 
                    label="Tags de Especialidade (Separadas por vírgula)" 
                    id="tags" 
                    name="tags" 
                    value={data.tags.join(', ')} 
                    onChange={handleTagsChange} 
                    placeholder="Ex: Residencial, Alta Tensão, Automação" 
                />
            </div>
        </div>
    );
};

const Step3Location: React.FC<{ data: ProfileData, setData: React.Dispatch<React.SetStateAction<ProfileData>>, onGeolocate: () => Promise<string> }> = ({ data, setData, onGeolocate }) => {
     const [isLocating, setIsLocating] = useState(false);
     const handleLocationClick = async () => {
        setIsLocating(true);
        try {
            const location = await onGeolocate();
            setData(prev => ({ ...prev, location }));
        } catch (error) {
            alert(error);
        } finally {
            setIsLocating(false);
        }
    };

    return (
        <div className="space-y-8 animate-fade-in">
              <div>
                  <label htmlFor="location" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Base Operacional</label>
                  <div className="relative group">
                      <input 
                          id="location" 
                          name="location" 
                          value={data.location} 
                          onChange={(e) => setData(p => ({...p, location: e.target.value}))} 
                          placeholder="Cidade, Estado"
                          className="w-full bg-[#0f0f0f] border border-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#20FF82] focus:ring-1 focus:ring-[#20FF82]/20 pr-12 transition-all"
                      />
                      <button 
                          type="button" 
                          onClick={handleLocationClick}
                          disabled={isLocating}
                          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-[#20FF82] disabled:opacity-50 transition-colors"
                      >
                          {isLocating ? <LoadingSpinner className="w-4 h-4"/> : <CrosshairsIcon className="w-5 h-5" />}
                      </button>
                  </div>
              </div>
              
              <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-gray-800">
                 <div className="flex justify-between items-center mb-4">
                    <label className="text-sm font-bold text-white">Raio de Atendimento</label>
                    <span className="text-[#20FF82] font-mono font-bold bg-[#20FF82]/10 px-3 py-1 rounded-lg border border-[#20FF82]/20">{data.serviceRadius} km</span>
                 </div>
                 <input
                    type="range"
                    min="5"
                    max="100"
                    step="5"
                    value={data.serviceRadius}
                    onChange={(e) => setData(p => ({...p, serviceRadius: parseInt(e.target.value, 10)}))}
                    className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-[#20FF82] hover:accent-[#1ce676]"
                 />
                 <div className="flex justify-between text-[10px] text-gray-500 mt-2 uppercase tracking-wider font-bold">
                     <span>Bairro (5km)</span>
                     <span>Cidade (25km)</span>
                     <span>Região (100km)</span>
                 </div>
              </div>
        </div>
    );
};

const Step4Availability: React.FC<{ data: ProfileData, setData: React.Dispatch<React.SetStateAction<ProfileData>> }> = ({ data, setData }) => {
    const handleDayToggle = (day: string) => {
        const schedule = data.availabilitySchedule[day] as DayAvailability;
        setData(p => ({...p, availabilitySchedule: {
            ...p.availabilitySchedule,
            [day]: { ...schedule, enabled: !schedule.enabled }
        }}));
    };

    const handleTimeChange = (day: string, type: 'start' | 'end', value: string) => {
         const schedule = data.availabilitySchedule[day] as DayAvailability;
         setData(p => ({...p, availabilitySchedule: {
            ...p.availabilitySchedule,
            [day]: { ...schedule, [type]: value }
        }}));
    };
    
    return (
        <div className="space-y-6 animate-fade-in">
             <div className="bg-[#1a1a1a] rounded-2xl border border-gray-800 overflow-hidden">
                <div className="grid grid-cols-12 gap-2 p-3 bg-[#111111] border-b border-gray-800 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">
                    <div className="col-span-3 text-left pl-2">Dia</div>
                    <div className="col-span-9">Horário</div>
                </div>
                <div className="p-4 space-y-4">
                    {Object.keys(data.availabilitySchedule).map(day => {
                        const schedule = data.availabilitySchedule[day] as DayAvailability;
                        return (
                            <div key={day} className="grid grid-cols-12 gap-4 items-center">
                                <div className="col-span-3 flex items-center gap-3">
                                    <button 
                                        onClick={() => handleDayToggle(day)}
                                        className={cn(
                                            "w-10 h-6 rounded-full p-1 transition-colors duration-300 ease-in-out",
                                            schedule.enabled ? "bg-[#20FF82]" : "bg-gray-700"
                                        )}
                                    >
                                        <div className={cn(
                                            "w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform duration-300",
                                            schedule.enabled ? "translate-x-4" : "translate-x-0"
                                        )} />
                                    </button>
                                    <span className={cn("font-bold text-sm", schedule.enabled ? "text-white" : "text-gray-500")}>{day}</span>
                                </div>
                                
                                <div className={cn("col-span-9 flex items-center gap-2 transition-opacity", schedule.enabled ? "opacity-100" : "opacity-30 pointer-events-none")}>
                                    <input 
                                        type="time" 
                                        value={schedule.start} 
                                        onChange={(e) => handleTimeChange(day, 'start', e.target.value)} 
                                        className="bg-[#0a0a0a] border border-gray-700 rounded px-2 py-1.5 text-white text-sm focus:border-[#20FF82] outline-none"
                                    />
                                    <span className="text-gray-500 font-bold">-</span>
                                     <input 
                                        type="time" 
                                        value={schedule.end} 
                                        onChange={(e) => handleTimeChange(day, 'end', e.target.value)} 
                                        className="bg-[#0a0a0a] border border-gray-700 rounded px-2 py-1.5 text-white text-sm focus:border-[#20FF82] outline-none"
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
             </div>
        </div>
    );
};

const Step5Socials: React.FC<{ data: ProfileData, setData: React.Dispatch<React.SetStateAction<ProfileData>> }> = ({ data, setData }) => {
    const handleSocialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData(p => ({...p, socialLinks: { ...p.socialLinks, [name]: value }}));
    };
    return (
        <div className="space-y-6 animate-fade-in">
             <InputField label="Instagram" id="instagram" name="instagram" value={data.socialLinks.instagram} onChange={handleSocialChange} placeholder="@seu_perfil" />
             <InputField label="Facebook" id="facebook" name="facebook" value={data.socialLinks.facebook} onChange={handleSocialChange} placeholder="https://facebook.com/seu.perfil" />
             <InputField label="LinkedIn" id="linkedin" name="linkedin" value={data.socialLinks.linkedin} onChange={handleSocialChange} placeholder="https://linkedin.com/in/seu-perfil" />
             <InputField label="Site / Portfólio" id="website" name="website" value={data.socialLinks.website} onChange={handleSocialChange} placeholder="https://seu-site.com" />
        </div>
    );
}

const Step6Finalize: React.FC<{ 
    onSaveOnly: () => void; 
    onPublish: () => void;
    isPublishing: boolean;
}> = ({ onSaveOnly, onPublish, isPublishing }) => {
    return (
        <div className="text-center space-y-8 animate-fade-in py-8">
            <div className="w-24 h-24 rounded-full bg-[#20FF82]/10 flex items-center justify-center mx-auto animate-pulse">
                <CheckIcon className="w-12 h-12 text-[#20FF82]" />
            </div>
            
            <div>
                <h2 className="text-3xl font-bold text-white">Perfil Configurado!</h2>
                <p className="text-gray-400 mt-2 max-w-md mx-auto">As informações estão prontas para serem indexadas pela nossa IA. Revise os dados e publique.</p>
            </div>

            <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-gray-800 max-w-md mx-auto text-left">
                <div className="flex items-start gap-4">
                     <div className="p-3 rounded-lg bg-purple-500/20 text-purple-400">
                         <LoadingSpinner className="w-6 h-6 text-purple-400" />
                     </div>
                     <div>
                         <h3 className="font-bold text-white">Verificação Necessária</h3>
                         <p className="text-sm text-gray-400 mt-1">Para segurança da comunidade, novos perfis passam por uma verificação rápida após a publicação.</p>
                     </div>
                </div>
            </div>

             <div className="flex flex-col gap-4 max-w-sm mx-auto">
                 <button 
                    onClick={onPublish}
                    disabled={isPublishing}
                    className="w-full bg-[#20FF82] text-black font-bold py-4 rounded-xl hover:bg-[#1ce676] transition-all shadow-[0_0_20px_rgba(32,255,130,0.4)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                 >
                    {isPublishing && <LoadingSpinner className="w-5 h-5 text-black" />}
                    {isPublishing ? 'Processando...' : 'Publicar Perfil Oficialmente'}
                </button>
                <button 
                    onClick={onSaveOnly}
                    className="w-full bg-transparent border border-gray-700 text-gray-300 font-bold py-3 rounded-xl hover:bg-gray-800 transition-colors"
                 >
                    Salvar como Rascunho
                </button>
            </div>
        </div>
    )
}

const ProfileSettingsForm: React.FC<ProfileSettingsFormProps> = ({ onSaveOnly, onPublish, isPublishing, onGeolocate }) => {
    const [profileData, setProfileData] = useState<ProfileData>(defaultProfile);
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 6;

    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

    const updateProfileData = useCallback((updater: React.SetStateAction<ProfileData>) => {
        setProfileData(prevData => {
            const newData = typeof updater === 'function' ? updater(prevData) : updater;
            if (newData.avatar instanceof File && newData.avatar !== prevData.avatar) {
                const newAvatarUrl = URL.createObjectURL(newData.avatar);
                if (avatarPreview) {
                    URL.revokeObjectURL(avatarPreview);
                }
                setAvatarPreview(newAvatarUrl);
            } else if (newData.avatar === null && prevData.avatar !== null) {
                 if (avatarPreview) {
                    URL.revokeObjectURL(avatarPreview);
                }
                setAvatarPreview(null);
            }
            return newData;
        });
    }, [avatarPreview]);
    
    const formattedAvailability = useMemo(() => {
        const activeDays = Object.entries(profileData.availabilitySchedule).filter(([, val]) => (val as DayAvailability).enabled);
        if (activeDays.length === 0) return "Sob consulta";

        const scheduleByTime: { [key: string]: string[] } = {};
        activeDays.forEach(([day, val]) => {
            const schedule = val as DayAvailability;
            const timeRange = `${schedule.start}-${schedule.end}`;
            if (!scheduleByTime[timeRange]) {
                scheduleByTime[timeRange] = [];
            }
            scheduleByTime[timeRange].push(day);
        });

        const dayOrder = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'];

        return Object.entries(scheduleByTime).map(([time, days]) => {
            const sortedDays = days.sort((a, b) => dayOrder.indexOf(a) - dayOrder.indexOf(b));
            if (sortedDays.length > 2 && dayOrder.indexOf(sortedDays[sortedDays.length - 1]) - dayOrder.indexOf(sortedDays[0]) === sortedDays.length - 1) {
                 return `${sortedDays[0]}-${sortedDays[sortedDays.length -1]} ${time}`;
            }
            return `${sortedDays.join(', ')} ${time}`;
        }).join(' | ');

    }, [profileData.availabilitySchedule]);

    const insightsData = {
        views: 1254,
        saves: 312,
        demand: 'Alta' as const,
    };
    
    const renderStepContent = () => {
        switch (currentStep) {
            case 1: return <Step1Identity data={profileData} setData={updateProfileData} />;
            case 2: return <Step2Specialty data={profileData} setData={updateProfileData} />;
            case 3: return <Step3Location data={profileData} setData={updateProfileData} onGeolocate={onGeolocate} />;
            case 4: return <Step4Availability data={profileData} setData={updateProfileData} />;
            case 5: return <Step5Socials data={profileData} setData={updateProfileData} />;
            case 6: return <Step6Finalize onSaveOnly={onSaveOnly} onPublish={onPublish} isPublishing={isPublishing} />;
            default: return null;
        }
    }

    return (
        <div className="flex-1 w-full h-full grid grid-cols-1 lg:grid-cols-12 gap-8 p-4 md:p-8">
            {/* Left: Form */}
            <div className="lg:col-span-7 xl:col-span-8">
                <div className="bg-[#111111] p-6 md:p-8 rounded-3xl border border-gray-800 h-full flex flex-col">
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-white">Editor de Perfil</h1>
                        <p className="text-gray-500 text-sm">Configure como você aparece para os clientes.</p>
                    </div>
                    
                    <StepProgress currentStep={currentStep} totalSteps={totalSteps} setStep={setCurrentStep} />
                    
                    <div className="flex-1">
                         {renderStepContent()}
                    </div>

                    <div className="flex justify-between mt-12 pt-6 border-t border-gray-800">
                        <button 
                            onClick={() => setCurrentStep(s => Math.max(s - 1, 1))}
                            disabled={currentStep === 1}
                            className="px-6 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800 transition-colors disabled:opacity-30 disabled:cursor-not-allowed font-bold"
                        >
                            Voltar
                        </button>
                        {currentStep < totalSteps && (
                             <button 
                                onClick={() => setCurrentStep(s => Math.min(s + 1, totalSteps))}
                                className="px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-[#20FF82] hover:shadow-[0_0_15px_rgba(32,255,130,0.3)] transition-all"
                             >
                                Próximo
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Right: Preview & Insights */}
            <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-6 h-fit lg:sticky lg:top-4">
                 <div className="bg-[#111111] border border-gray-800 rounded-3xl p-6">
                     <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Pré-visualização ao Vivo</h2>
                     <ProfileCard profile={{
                        ...profileData, 
                        imageUrl: avatarPreview ?? profileData.imageUrl, 
                        availability: formattedAvailability,
                    }} />
                 </div>
                 
                 <div className="bg-[#111111] border border-gray-800 rounded-3xl p-6">
                     <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Seu Desempenho</h2>
                     <ProfileInsights data={insightsData} />
                 </div>
            </div>
        </div>
    );
};

export default ProfileSettingsForm;
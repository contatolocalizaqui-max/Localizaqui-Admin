import React, { useState } from 'react';

const SectionCard: React.FC<{ title: string; description: string; children: React.ReactNode; }> = ({ title, description, children }) => (
    <div className="bg-[#111111] border border-gray-800 rounded-2xl p-6">
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <p className="text-gray-400 mt-1 mb-6">{description}</p>
        <div>{children}</div>
    </div>
);

const PasswordStrengthIndicator: React.FC<{ password: string }> = ({ password }) => {
    const getStrength = () => {
        let score = 0;
        if (!password) return 0;
        if (password.length > 8) score++;
        if (password.match(/[a-z]/)) score++;
        if (password.match(/[A-Z]/)) score++;
        if (password.match(/[0-9]/)) score++;
        if (password.match(/[^a-zA-Z0-9]/)) score++;
        return score;
    };
    const strength = getStrength();
    const strengthText = ['Muito Fraca', 'Fraca', 'Razoável', 'Forte', 'Muito Forte', 'Excelente'];
    const strengthColor = ['bg-red-500', 'bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500', 'bg-green-500'];

    return (
        <div className="flex items-center gap-2 mt-2">
            <div className="flex-1 bg-gray-700 h-2 rounded-full overflow-hidden">
                <div 
                    className={`h-full rounded-full transition-all duration-300 ${strength > 0 ? strengthColor[strength] : ''}`} 
                    style={{ width: `${(strength / 5) * 100}%` }}
                />
            </div>
            <span className="text-xs text-gray-400 font-medium">{strengthText[strength]}</span>
        </div>
    );
};

const PrivacySecurityPage: React.FC = () => {
    const [passwordData, setPasswordData] = useState({ current: '', new: '', confirm: '' });

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <div className="p-4 md:p-6 lg:p-8 space-y-8">
            <header>
                <h2 className="text-3xl font-bold text-white">Privacidade e Segurança</h2>
                <p className="text-gray-400 mt-1">Gerencie suas informações pessoais e mantenha sua conta segura.</p>
            </header>

            <SectionCard 
                title="Dados Pessoais" 
                description="Controle suas informações na plataforma."
            >
                <div className="flex flex-col sm:flex-row gap-4">
                    <button className="flex-1 bg-gray-800 text-white font-semibold py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors">
                        Baixar meus dados
                    </button>
                    <button className="flex-1 bg-red-600/20 border border-red-500/50 text-red-400 font-semibold py-3 px-4 rounded-lg hover:bg-red-600/30 transition-colors">
                        Excluir minha conta
                    </button>
                </div>
            </SectionCard>
            
            <SectionCard 
                title="Alterar Senha" 
                description="Recomendamos usar uma senha forte que você não usa em outro lugar."
            >
                <form className="space-y-4">
                    <input 
                        type="password" 
                        name="current"
                        value={passwordData.current}
                        onChange={handlePasswordChange}
                        placeholder="Senha Atual"
                        className="w-full bg-[#2a2a2a] border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                     <input 
                        type="password" 
                        name="new"
                        value={passwordData.new}
                        onChange={handlePasswordChange}
                        placeholder="Nova Senha"
                        className="w-full bg-[#2a2a2a] border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <PasswordStrengthIndicator password={passwordData.new} />
                     <input 
                        type="password" 
                        name="confirm"
                        value={passwordData.confirm}
                        onChange={handlePasswordChange}
                        placeholder="Confirmar Nova Senha"
                        className="w-full bg-[#2a2a2a] border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <div className="pt-2">
                        <button type="submit" className="w-full sm:w-auto bg-purple-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-purple-500 transition-colors">
                            Salvar Alterações
                        </button>
                    </div>
                </form>
            </SectionCard>
        </div>
    );
};

export default PrivacySecurityPage;

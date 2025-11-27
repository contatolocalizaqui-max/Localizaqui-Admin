import React, { useState } from 'react';
import ProfileSettingsForm from './settings/ProfileSettingsForm';
import PrivacySecurityPage from './settings/PrivacySecurityPage';
import PlansSubscriptionsPage from './settings/PlansSubscriptionsPage';
import { UserCircleIcon } from '../components/icons/UserCircleIcon';
import { ShieldCheckIcon } from '../components/icons/ShieldCheckIcon';
import { StarIcon } from '../components/icons/StarIcon';
import { cn } from '../utils/cn';

interface SettingsPageProps {
    onSaveOnly: () => void;
    onPublish: () => void;
    isPublishing: boolean;
    onGeolocate: () => Promise<string>;
}

type SettingsSection = 'profile' | 'security' | 'plans';

const SettingsPage: React.FC<SettingsPageProps> = ({ onSaveOnly, onPublish, isPublishing, onGeolocate }) => {
    const [activeSection, setActiveSection] = useState<SettingsSection>('profile');

    const navItems = [
        { id: 'profile', label: 'Perfil', icon: <UserCircleIcon className="w-5 h-5" /> },
        { id: 'security', label: 'Privacidade e Segurança', icon: <ShieldCheckIcon className="w-5 h-5" /> },
        { id: 'plans', label: 'Planos e Assinatura', icon: <StarIcon className="w-5 h-5" /> },
    ];

    const renderContent = () => {
        switch (activeSection) {
            case 'profile':
                return <ProfileSettingsForm 
                            onSaveOnly={onSaveOnly} 
                            onPublish={onPublish} 
                            isPublishing={isPublishing}
                            onGeolocate={onGeolocate} 
                       />;
            case 'security':
                return <PrivacySecurityPage />;
            case 'plans':
                return <PlansSubscriptionsPage />;
            default:
                return null;
        }
    };

    return (
        <div className="flex-1 w-full h-full flex flex-col md:flex-row overflow-y-auto">
            <aside className="w-full md:w-64 bg-[#111111] p-4 md:p-6 border-b md:border-b-0 md:border-r border-gray-800 flex-shrink-0">
                <h1 className="text-2xl font-bold text-white mb-8">Configurações</h1>
                <nav className="flex flex-row md:flex-col gap-2">
                    {navItems.map(item => (
                        <button
                            key={item.id}
                            onClick={() => setActiveSection(item.id as SettingsSection)}
                            className={cn(
                                'flex items-center gap-3 p-3 rounded-lg text-sm font-medium transition-colors w-full text-left',
                                activeSection === item.id
                                    ? 'bg-purple-600/30 text-white'
                                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                            )}
                        >
                            {item.icon}
                            <span className="hidden md:inline">{item.label}</span>
                        </button>
                    ))}
                </nav>
            </aside>
            <main className="flex-1 overflow-y-auto">
                {renderContent()}
            </main>
        </div>
    );
};

export default SettingsPage;

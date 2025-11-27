import React, { useState, useEffect, useMemo } from 'react';
import { ProfileCard } from '../components/profile/ProfileCard';
import { ProfileData } from '../types';
import WelcomeModal from '../components/region/WelcomeModal';
import RatingModal from '../components/region/RatingModal';
import { SearchIcon } from '../components/icons/SearchIcon';
import { LocationMarkerIcon } from '../components/icons/LocationMarkerIcon';
import { ChevronDownIcon } from '../components/icons/ChevronDownIcon';
import { mockProfiles as allMockProfiles } from '../data/mockProfiles';
import { cn } from '../utils/cn';

const FilterChip: React.FC<{ label: string, active: boolean, onClick: () => void }> = ({ label, active, onClick }) => (
    <button 
        onClick={onClick}
        className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-all border",
            active 
            ? "bg-[#20FF82]/10 text-[#20FF82] border-[#20FF82]" 
            : "bg-[#111111] text-gray-400 border-gray-800 hover:border-gray-600 hover:text-white"
        )}
    >
        {label}
    </button>
);

interface InYourRegionPageProps {
    onViewProfile: (profileId: string) => void;
}

const InYourRegionPage: React.FC<InYourRegionPageProps> = ({ onViewProfile }) => {
    const [showWelcome, setShowWelcome] = useState(false);
    const [profiles, setProfiles] = useState<ProfileData[]>(allMockProfiles);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        verified: false,
        topRated: false,
        onlineNow: false,
    });
    const [ratingProfile, setRatingProfile] = useState<ProfileData | null>(null);

    useEffect(() => {
        const hasSeenWelcome = localStorage.getItem('hasSeenRegionWelcome');
        if (!hasSeenWelcome) {
            setShowWelcome(true);
        }
    }, []);

    const handleWelcomeClose = (dontShowAgain: boolean) => {
        setShowWelcome(false);
        if (dontShowAgain) {
            localStorage.setItem('hasSeenRegionWelcome', 'true');
        }
    };
    
    const handleFavoriteToggle = (profileId: string) => {
        setProfiles(prev => prev.map(p => p.id === profileId ? { ...p, isFavorited: !p.isFavorited } : p));
    };

    const handleRate = (profileId: string) => {
        const profileToRate = profiles.find(p => p.id === profileId);
        if (profileToRate) {
            setRatingProfile(profileToRate);
        }
    };
    
    const handleRatingSubmit = (rating: number, comment: string) => {
        console.log(`Rating for ${ratingProfile?.name}: ${rating} stars, comment: "${comment}"`);
        setRatingProfile(null);
    };

    const toggleFilter = (filterName: keyof typeof filters) => {
        setFilters(prev => ({ ...prev, [filterName]: !prev[filterName] }));
    };

    const filteredProfiles = useMemo(() => {
        return profiles.filter(profile => {
            const matchesSearch = profile.name.toLowerCase().includes(searchTerm.toLowerCase()) || profile.specialty.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesVerified = !filters.verified || profile.verified;
            const matchesTopRated = !filters.topRated || profile.rating >= 4;
            const matchesOnline = !filters.onlineNow || profile.onlineStatus === 'online';
            return matchesSearch && matchesVerified && matchesTopRated && matchesOnline;
        });
    }, [profiles, searchTerm, filters]);

    return (
        <div className="flex-1 w-full h-full flex flex-col overflow-y-auto bg-black text-white p-4 md:p-6 lg:p-8 relative">
            <WelcomeModal isOpen={showWelcome} onClose={handleWelcomeClose} />
            <RatingModal isOpen={!!ratingProfile} onClose={() => setRatingProfile(null)} profile={ratingProfile} onSubmit={handleRatingSubmit} />
            
            {/* Hero / Header */}
            <header className="mb-8 max-w-4xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/30 border border-purple-500/30 text-purple-300 text-xs font-bold mb-4">
                    <LocationMarkerIcon className="w-3 h-3" />
                    <span>EXPLORAR LOCALMENTE</span>
                </div>
                <h1 className="text-4xl font-bold tracking-tight mb-2">Profissionais em Destaque</h1>
                <p className="text-gray-400 text-lg">Conecte-se com os melhores talentos avaliados na sua região.</p>
            </header>

            {/* Sticky Filter Bar */}
            <div className="sticky top-0 z-10 -mx-4 md:-mx-6 lg:-mx-8 px-4 md:px-6 lg:px-8 py-4 bg-black/80 backdrop-blur-xl border-b border-white/5 mb-8">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full md:max-w-md group">
                        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-[#20FF82] transition-colors" />
                        <input 
                            type="text" 
                            placeholder="Buscar eletricista, encanador..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            className="w-full bg-[#111111] border border-gray-800 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#20FF82] focus:border-transparent transition-all shadow-sm"
                        />
                    </div>
                    
                    <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                         <button className="flex items-center gap-2 bg-[#1a1a1a] border border-gray-800 rounded-full px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 whitespace-nowrap">
                            <span>São Paulo, SP</span>
                            <ChevronDownIcon className="w-4 h-4 text-gray-500" />
                        </button>
                        <div className="w-px h-6 bg-gray-800 mx-1 hidden md:block"></div>
                        <FilterChip label="Verificados" active={filters.verified} onClick={() => toggleFilter('verified')} />
                        <FilterChip label="⭐ 4.0+" active={filters.topRated} onClick={() => toggleFilter('topRated')} />
                        <FilterChip label="Online" active={filters.onlineNow} onClick={() => toggleFilter('onlineNow')} />
                    </div>
                </div>
            </div>

            {/* Results Grid */}
            <main className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 pb-20">
                {filteredProfiles.length > 0 ? (
                    filteredProfiles.map((profile, index) => (
                        <ProfileCard 
                            key={profile.id} 
                            profile={profile} 
                            index={index} 
                            onFavoriteToggle={handleFavoriteToggle}
                            onRate={handleRate}
                            onViewProfile={onViewProfile}
                        />
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center">
                        <div className="w-20 h-20 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4">
                            <SearchIcon className="w-8 h-8 text-gray-600" />
                        </div>
                        <h3 className="text-xl font-bold text-white">Nenhum profissional encontrado</h3>
                        <p className="text-gray-500 mt-2">Tente ajustar seus filtros ou buscar por outra categoria.</p>
                        <button onClick={() => {setSearchTerm(''); setFilters({verified: false, topRated: false, onlineNow: false})}} className="mt-6 text-[#20FF82] hover:underline font-medium">
                            Limpar filtros
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
};

export default InYourRegionPage;
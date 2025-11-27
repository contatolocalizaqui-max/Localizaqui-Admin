
import React from 'react';
import { ProfileData } from '../../types';
import { StarIcon } from '../icons/StarIcon';
import { CheckCircle2Icon } from '../icons/CheckCircle2Icon';
import { HeartIcon } from '../icons/HeartIcon';
import { ShareIcon } from '../icons/ShareIcon';
import { MapPinIcon } from '../icons/MapPinIcon';
import { ClockIcon } from '../icons/ClockIcon';
import { Badge } from '../ui/badge';

interface ProfileHeaderProps {
    profile: ProfileData;
    onShare: () => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ profile, onShare }) => {
    const [isFavorited, setIsFavorited] = React.useState(profile.isFavorited);

    const toggleFavorite = () => setIsFavorited(!isFavorited);

    return (
        <div className="relative rounded-3xl overflow-hidden bg-[#0a0a0a] border border-white/5 group">
            
            {/* Background Cover with Gradient Mask */}
            <div className="absolute top-0 inset-x-0 h-64 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-[#0a0a0a]/80 to-[#0a0a0a]"></div>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                {/* Abstract Shapes */}
                <div className="absolute top-[-50%] right-[-10%] w-[400px] h-[400px] bg-[#20FF82]/5 rounded-full blur-[100px]"></div>
            </div>

            <div className="relative z-10 px-6 pt-8 pb-6">
                {/* Top Actions */}
                <div className="flex justify-between items-center mb-8">
                    <Badge variant="outline" className="bg-white/5 border-white/10 text-gray-400 text-xs uppercase tracking-widest backdrop-blur-md">
                        {profile.accountType === 'company' ? 'Empresa Verificada' : 'Profissional Autônomo'}
                    </Badge>
                    <div className="flex gap-2">
                        <button 
                            onClick={toggleFavorite}
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 border border-white/5 text-gray-400 hover:text-red-500 transition-all backdrop-blur-sm"
                        >
                            <HeartIcon className={isFavorited ? "fill-red-500 text-red-500" : ""} />
                        </button>
                        <button 
                            onClick={onShare}
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 border border-white/5 text-gray-400 hover:text-white transition-all backdrop-blur-sm"
                        >
                            <ShareIcon className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Identity Section */}
                <div className="flex flex-col md:flex-row items-start gap-6">
                    {/* Avatar */}
                    <div className="relative">
                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-3xl overflow-hidden border-4 border-[#0a0a0a] shadow-2xl bg-[#111]">
                            <img 
                                src={profile.imageUrl || `https://i.pravatar.cc/150?u=${profile.id}`} 
                                alt={profile.name} 
                                className="w-full h-full object-cover" 
                            />
                        </div>
                        {profile.verified && (
                            <div className="absolute -bottom-2 -right-2 bg-[#0a0a0a] p-1 rounded-full">
                                <CheckCircle2Icon className="w-8 h-8 text-[#20FF82] fill-black" />
                            </div>
                        )}
                    </div>

                    {/* Name & Title */}
                    <div className="flex-1 pt-2">
                        <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-2">{profile.name}</h1>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                            <span className="text-[#20FF82] font-mono font-bold bg-[#20FF82]/10 px-2 py-0.5 rounded">{profile.specialty}</span>
                            <div className="flex items-center gap-1.5">
                                <MapPinIcon className="w-4 h-4 text-gray-500" />
                                <span>{profile.location}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <ClockIcon className="w-4 h-4 text-gray-500" />
                                <span>{profile.availability.split(' ')[0]}...</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* HUD Stats */}
                <div className="grid grid-cols-3 gap-px bg-white/5 border border-white/5 rounded-2xl overflow-hidden mt-8 backdrop-blur-md">
                    <div className="bg-[#0a0a0a]/50 p-4 text-center hover:bg-[#0a0a0a]/30 transition-colors">
                        <div className="flex items-center justify-center gap-1 text-amber-400 mb-1">
                            <StarIcon className="w-4 h-4 fill-current" />
                            <span className="text-xl font-bold">{profile.rating.toFixed(1)}</span>
                        </div>
                        <p className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Avaliação Geral</p>
                    </div>
                    <div className="bg-[#0a0a0a]/50 p-4 text-center hover:bg-[#0a0a0a]/30 transition-colors">
                        <div className="text-xl font-bold text-white mb-1">{profile.totalReviews}</div>
                        <p className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Jobs Realizados</p>
                    </div>
                    <div className="bg-[#0a0a0a]/50 p-4 text-center hover:bg-[#0a0a0a]/30 transition-colors">
                        <div className="text-xl font-bold text-[#20FF82] mb-1">{profile.responseTime || '~1h'}</div>
                        <p className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Tempo Resposta</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

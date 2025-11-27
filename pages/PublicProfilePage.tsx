
import React from 'react';
import { ProfileData } from '../types';
import { ProfileHeader } from '../components/profile/ProfileHeader';
import { ReviewCard } from '../components/profile/ReviewCard';
import { ArrowLeftIcon } from '../components/icons/ArrowLeftIcon';
import { Badge } from '../components/ui/badge';
import { InstagramIcon } from '../components/icons/InstagramIcon';
import { FacebookIcon } from '../components/icons/FacebookIcon';
import { WebsiteIcon } from '../components/icons/WebsiteIcon';
import { LinkedInIcon } from '../components/icons/LinkedInIcon';
import { ChatBubbleIcon } from '../components/icons/ChatBubbleIcon';
import { ShieldCheckIcon } from '../components/icons/ShieldCheckIcon';

interface PublicProfilePageProps {
    profile: ProfileData;
    onBack: () => void;
}

const PublicProfilePage: React.FC<PublicProfilePageProps> = ({ profile, onBack }) => {
    
    const handleShare = () => {
        navigator.clipboard.writeText(`${window.location.origin}/profile/${profile.id}`);
        alert(`Link copiado!`);
    };

    return (
        <div className="bg-black text-white min-h-screen overflow-y-auto pb-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-6xl">
                
                {/* Nav */}
                <button onClick={onBack} className="group flex items-center gap-2 text-gray-500 hover:text-white mb-8 font-medium transition-colors">
                    <div className="p-2 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                        <ArrowLeftIcon className="w-4 h-4" />
                    </div>
                    <span>Voltar para busca</span>
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* Main Content Column */}
                    <div className="lg:col-span-2 space-y-6">
                        <ProfileHeader profile={profile} onShare={handleShare} />
                        
                        {/* About Card */}
                        <section className="bg-[#0a0a0a] rounded-3xl border border-white/5 p-8">
                            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                <span className="w-1.5 h-6 bg-[#20FF82] rounded-full"></span>
                                Sobre o Profissional
                            </h2>
                            <p className="text-gray-300 whitespace-pre-wrap leading-relaxed text-base font-light">
                                {profile.description}
                            </p>
                            
                            <div className="mt-8 pt-8 border-t border-white/5">
                                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Especialidades & Tags</h3>
                                <div className="flex flex-wrap gap-2">
                                    {profile.tags.map((tag, i) => (
                                        <Badge key={i} variant="secondary" className="bg-white/5 text-gray-300 border border-white/10 hover:border-[#20FF82]/50 hover:text-white transition-colors px-3 py-1.5">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </section>

                        {/* Portfolio Grid */}
                        {profile.galleryImages && profile.galleryImages.length > 0 && (
                             <section>
                                <div className="flex items-center justify-between mb-4 px-2">
                                    <h2 className="text-xl font-bold text-white">Portfólio Recente</h2>
                                    <span className="text-xs text-gray-500">{profile.galleryImages.length} fotos</span>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    {profile.galleryImages.map((img, i) => (
                                        <div key={i} className={`relative rounded-2xl overflow-hidden border border-white/10 group cursor-zoom-in ${i === 0 ? 'col-span-2 aspect-video' : 'aspect-square'}`}>
                                            <img src={img} alt={`Portfolio ${i}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                                <span className="text-white text-xs font-bold uppercase tracking-widest border border-white px-4 py-2 rounded-full">Visualizar</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Reviews */}
                        {profile.reviews && profile.reviews.length > 0 && (
                            <section className="bg-[#0a0a0a] rounded-3xl border border-white/5 p-8">
                                <h2 className="text-xl font-bold text-white mb-6">O que dizem os clientes</h2>
                                <div className="grid gap-4">
                                    {profile.reviews.map(review => (
                                        <ReviewCard key={review.id} review={review} />
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Sidebar / Action Column */}
                    <div className="lg:col-span-1 space-y-6">
                        
                        {/* Sticky Action Card */}
                        <div className="bg-[#111] border border-white/10 rounded-3xl p-6 sticky top-6 shadow-2xl shadow-purple-900/10">
                            <div className="mb-6">
                                <p className="text-gray-400 text-sm mb-1">Disponibilidade</p>
                                <div className="flex items-center gap-2 text-white font-bold text-lg">
                                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                    {profile.onlineStatus === 'online' ? 'Online Agora' : 'Responde Rápido'}
                                </div>
                            </div>

                            <a
                                href={`https://wa.me/${profile.phone.replace(/\D/g, '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group w-full flex items-center justify-center gap-3 bg-[#20FF82] hover:bg-[#1ce676] text-black font-bold py-4 rounded-xl transition-all shadow-[0_0_20px_-5px_rgba(32,255,130,0.4)] mb-4"
                            >
                                <ChatBubbleIcon className="w-5 h-5 transition-transform group-hover:scale-110" />
                                Solicitar Orçamento
                            </a>
                            
                            <p className="text-center text-xs text-gray-500 mb-6">
                                Resposta média em menos de 1 hora.
                            </p>

                            {/* Security Badge */}
                            <div className="bg-white/5 rounded-xl p-4 flex items-start gap-3 border border-white/5">
                                <ShieldCheckIcon className="w-5 h-5 text-blue-400 shrink-0" />
                                <div>
                                    <p className="text-sm font-bold text-white">Perfil Verificado</p>
                                    <p className="text-xs text-gray-400 mt-1">Documentação e antecedentes checados pela equipe localizaqui.</p>
                                </div>
                            </div>

                            {/* Social Links */}
                            {Object.values(profile.socialLinks).some(link => !!link) && (
                                <div className="mt-6 pt-6 border-t border-white/5 flex justify-center gap-4">
                                    {profile.socialLinks.instagram && <a href={`https://instagram.com/${profile.socialLinks.instagram.replace('@','')}`} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#E1306C] transition-colors"><InstagramIcon className="w-6 h-6" /></a>}
                                    {profile.socialLinks.facebook && <a href={profile.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#1877F2] transition-colors"><FacebookIcon className="w-6 h-6" /></a>}
                                    {profile.socialLinks.linkedin && <a href={profile.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#0A66C2] transition-colors"><LinkedInIcon className="w-6 h-6" /></a>}
                                    {profile.socialLinks.website && <a href={profile.socialLinks.website} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors"><WebsiteIcon className="w-6 h-6" /></a>}
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default PublicProfilePage;


import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "../ui/badge";
import { ProfileData } from "../../types";
import { StarIcon } from "../icons/StarIcon";
import { MapPinIcon } from "../icons/MapPinIcon";
import { AwardIcon } from "../icons/AwardIcon";
import { ClockIcon } from "../icons/ClockIcon";
import { CheckCircle2Icon } from "../icons/CheckCircle2Icon";
import { HeartIcon } from "../icons/HeartIcon";
import { cn } from "../../utils/cn";

interface ProfileCardProps {
  profile: ProfileData;
  index?: number;
  onRate?: (profileId: string) => void;
  onFavoriteToggle?: (profileId: string) => void;
  onViewProfile?: (profileId: string) => void;
}

const statusColorMap = {
    online: 'bg-emerald-500 shadow-[0_0_10px_#10b981]',
    busy: 'bg-amber-500 shadow-[0_0_10px_#f59e0b]',
    offline: 'bg-gray-600',
};

export const ProfileCard: React.FC<ProfileCardProps> = ({ 
  profile,
  index = 0,
  onRate,
  onFavoriteToggle,
  onViewProfile,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -4; // Max rotation deg
    const rotateY = ((x - centerX) / centerX) * 4;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      style={{
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        transition: 'transform 0.1s ease-out',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative w-full h-full bg-[#0c0c0c] border border-white/5 rounded-3xl overflow-hidden hover:border-[#20FF82]/30 transition-colors duration-500"
    >
      {/* Glow Effect behind cursor */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
            background: `radial-gradient(600px circle at ${isHovered ? 'var(--mouse-x, 50%)' : '50%'} ${isHovered ? 'var(--mouse-y, 50%)' : '50%'}, rgba(32, 255, 130, 0.06), transparent 40%)`
        }}
      />

      {/* Top Gradient Decoration */}
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#1a1a1a] to-transparent opacity-60 pointer-events-none" />

      <div className="relative p-6 flex flex-col h-full">
        
        {/* Header: Avatar & Actions */}
        <div className="flex justify-between items-start mb-4">
            <div className="relative">
                <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-white/5 shadow-2xl bg-[#111]">
                    {profile.imageUrl || profile.avatar ? (
                    <img src={typeof profile.imageUrl === 'string' ? profile.imageUrl : URL.createObjectURL(profile.avatar as Blob)} alt={profile.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-black text-white font-bold text-xl">
                        {profile.name.charAt(0)}
                    </div>
                    )}
                </div>
                {profile.verified && (
                    <div className="absolute -bottom-2 -right-2 bg-[#0c0c0c] rounded-full p-0.5">
                        <CheckCircle2Icon className="w-5 h-5 text-[#20FF82]" />
                    </div>
                )}
            </div>

            <div className="flex flex-col items-end gap-2">
                {profile.rating > 0 && (
                    <div className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/20 px-2 py-1 rounded-lg">
                        <StarIcon className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        <span className="text-xs font-bold text-amber-400">{profile.rating.toFixed(1)}</span>
                    </div>
                )}
                <button 
                    onClick={(e) => { e.stopPropagation(); onFavoriteToggle?.(profile.id); }}
                    className="p-2 rounded-full hover:bg-white/10 text-gray-500 hover:text-red-500 transition-colors"
                >
                    <HeartIcon className={cn("w-5 h-5 transition-all", profile.isFavorited ? "fill-red-500 text-red-500" : "")} />
                </button>
            </div>
        </div>

        {/* Content */}
        <div className="mb-4">
            <h3 className="text-lg font-bold text-white group-hover:text-[#20FF82] transition-colors truncate">{profile.name}</h3>
            <p className="text-sm text-purple-400 font-medium mb-2">{profile.specialty}</p>
            <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed">{profile.description}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-2 mb-6">
            <div className="bg-[#111] rounded-xl p-2 border border-white/5 flex items-center gap-2">
                <MapPinIcon className="w-4 h-4 text-gray-500" />
                <span className="text-xs text-gray-300 truncate">{profile.distance ? `${profile.distance}km` : 'Local'}</span>
            </div>
            <div className="bg-[#111] rounded-xl p-2 border border-white/5 flex items-center gap-2">
                <AwardIcon className="w-4 h-4 text-gray-500" />
                <span className="text-xs text-gray-300 truncate">{profile.experienceLevel.split(' ')[0]} Exp</span>
            </div>
             <div className="bg-[#111] rounded-xl p-2 border border-white/5 flex items-center gap-2 col-span-2">
                <ClockIcon className="w-4 h-4 text-gray-500" />
                <span className="text-xs text-gray-300 truncate">{profile.availability}</span>
            </div>
        </div>

        {/* Footer */}
        <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
                <span className={cn("w-2 h-2 rounded-full", statusColorMap[profile.onlineStatus || 'offline'])}></span>
                <span className="text-[10px] font-bold uppercase text-gray-500 tracking-wider">{profile.onlineStatus === 'online' ? 'Disponível' : profile.onlineStatus}</span>
            </div>
            
            <div className="flex gap-2">
                <button 
                    onClick={() => onViewProfile?.(profile.id)}
                    className="px-4 py-2 bg-white text-black text-xs font-bold rounded-lg hover:bg-[#20FF82] transition-all hover:shadow-[0_0_15px_rgba(32,255,130,0.4)]"
                >
                    Ver Perfil
                </button>
            </div>
        </div>

      </div>
    </motion.div>
  );
};

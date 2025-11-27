
import React, { useState } from "react";
import { Sidebar as SidebarProvider, SidebarBody, SidebarLink, useSidebar } from "../ui/sidebar";
import { motion } from "framer-motion";
import { User, Page } from '../../types';
import { PlusCircleIcon } from '../icons/PlusCircleIcon';
import { CogIcon } from '../icons/CogIcon';
import { LogoutIcon } from '../icons/LogoutIcon';
import { SparklesIcon } from "../icons/SparklesIcon";
import { TicketIcon } from "../icons/TicketIcon";
import { cn } from "../../utils/cn";

// Improved Icon Component that uses the image as a mask to allow color changing (Gray -> Neon Green)
const SidebarIconImg: React.FC<{ src: string, alt: string }> = ({ src, alt }) => (
    <div 
        className="w-5 h-5 bg-gray-400 group-hover/sidebar:bg-[#20FF82] transition-colors duration-200 flex-shrink-0"
        style={{
            maskImage: `url(${src})`,
            maskSize: 'contain',
            maskRepeat: 'no-repeat',
            maskPosition: 'center',
            WebkitMaskImage: `url(${src})`,
            WebkitMaskSize: 'contain',
            WebkitMaskRepeat: 'no-repeat',
            WebkitMaskPosition: 'center',
        }}
        role="img"
        aria-label={alt}
    />
);

const SidebarUserProfileSkeleton: React.FC = () => {
    const { open, animate } = useSidebar();
    return (
        <div className="flex items-center justify-start gap-3 group/sidebar py-2 px-2 w-full animate-pulse">
            <div className="w-8 h-8 bg-gray-800 rounded-full flex-shrink-0"></div>
            <motion.div
                animate={{
                    display: animate ? (open ? "inline-block" : "none") : "inline-block",
                    opacity: animate ? (open ? 1 : 0) : 1,
                }}
                className="h-4 w-24 bg-gray-800 rounded"
            />
        </div>
    );
};

interface SidebarProps {
  handleNewSearch: () => void;
  handleLogout: () => void;
  handleNavigate: (page: Page) => void;
  user: User | null;
  isUserLoading?: boolean;
  isNewSearchLoading?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ handleNewSearch, handleLogout, handleNavigate, user, isUserLoading, isNewSearchLoading }) => {
  const mainLinks = [
    {
      label: "Nova Conversa",
      onClick: handleNewSearch,
      icon: <SidebarIconImg src="https://img.icons8.com/material/24/chat--v4.png" alt="Nova Conversa" />,
      isLoading: isNewSearchLoading,
    },
     {
      label: "Explorar Região",
      onClick: () => handleNavigate('in-your-region'),
      icon: <SidebarIconImg src="https://img.icons8.com/material-outlined/24/map-marker.png" alt="Explorar Região" />,
    },
    {
      label: "Meus Pedidos",
      onClick: () => handleNavigate('my-demands'),
      icon: <SidebarIconImg src="https://img.icons8.com/pulsar-line/48/demand.png" alt="Meus Pedidos" />,
    },
    {
      label: "Oportunidades",
      onClick: () => handleNavigate('opportunities'),
      icon: <SidebarIconImg src="https://img.icons8.com/ios/50/ophthalmology.png" alt="Oportunidades" />,
    },
    {
      label: "Contatos Salvos",
      onClick: () => handleNavigate('saved-contacts'),
      icon: <SidebarIconImg src="https://img.icons8.com/hatch/64/contact.png" alt="Contatos Salvos" />,
    },
  ];
  const [open, setOpen] = useState(false);

  return (
    <SidebarProvider open={open} setOpen={setOpen}>
      <SidebarBody className="justify-between gap-10 border-r border-gray-800 bg-[#0a0a0a]">
        <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          <div className="pb-6 pt-2 pl-1">
            {open ? <Logo onClick={() => handleNavigate('landing')} /> : <LogoIcon onClick={() => handleNavigate('landing')} />}
          </div>
          <div className="flex flex-col gap-2">
            <div className="px-2 mb-4">
                 <button 
                    onClick={() => handleNavigate('demand-creation')}
                    className={cn(
                        "w-full flex items-center justify-center gap-2 bg-[#20FF82] hover:bg-[#1ce676] text-black font-bold py-2.5 rounded-xl transition-all shadow-lg shadow-green-900/20",
                        !open && "px-0"
                    )}
                >
                    {open ? <span>Criar Demanda</span> : <PlusCircleIcon className="w-6 h-6"/>}
                </button>
            </div>

            {mainLinks.map((link, idx) => (
              <SidebarLink key={idx} link={link} />
            ))}
          </div>
        </div>
        
        <div>
           {/* Admin Link (Only visible to admins) */}
           {user?.isAdmin && (
                <SidebarLink link={{
                    label: "Painel Admin",
                    onClick: () => handleNavigate('admin'),
                    icon: <TicketIcon className="w-5 h-5 text-purple-500" />,
                }} />
           )}

           <SidebarLink link={{
              label: "Configurações",
              onClick: () => handleNavigate('settings'),
              icon: <SidebarIconImg src="https://img.icons8.com/material-outlined/24/settings--v1.png" alt="Configurações" />,
            }} />
           <div className="h-px w-full bg-gray-800 my-3"></div>
           <SidebarLink link={{
              label: "Sair",
              onClick: handleLogout,
              icon: <SidebarIconImg src="https://img.icons8.com/ios-glyphs/30/logout-rounded--v1.png" alt="Sair" />,
            }} />
           
           <div className="mt-4 px-2">
            {isUserLoading ? (
                    <SidebarUserProfileSkeleton />
            ) : user ? (
                    <div className="flex items-center gap-3 p-2 rounded-xl bg-gray-900/50 border border-gray-800">
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0 shadow-inner">
                            {user?.name.charAt(0)}
                        </div>
                         <motion.div
                            animate={{
                                display: open ? "block" : "none",
                                opacity: open ? 1 : 0,
                            }}
                            className="overflow-hidden"
                        >
                            <p className="text-sm font-medium text-white truncate">{user.name}</p>
                            <p className="text-xs text-gray-500 truncate">{user.email}</p>
                        </motion.div>
                    </div>
            ) : null }
           </div>
        </div>
      </SidebarBody>
    </SidebarProvider>
  );
};


export const Logo: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <a
      href="#"
      onClick={(e) => { e.preventDefault(); onClick(); }}
      className="font-normal flex space-x-2 items-center text-sm py-1 relative z-20"
    >
      <div className="w-8 h-8 bg-[#20FF82]/10 rounded-lg flex items-center justify-center">
        <SparklesIcon className="w-5 h-5 text-[#20FF82] flex-shrink-0"/>
      </div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-bold text-xl tracking-tight flex items-center"
      >
        <span className="text-[#20FF82]">localiz</span>
        <span className="bg-gradient-to-r from-[#20FF82] to-[#9333ea] text-transparent bg-clip-text">a</span>
        <span className="text-[#9333ea]">qui</span>
      </motion.span>
    </a>
  );
};

export const LogoIcon: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <a
      href="#"
      onClick={(e) => { e.preventDefault(); onClick(); }}
      className="font-normal flex items-center justify-center text-sm py-1 relative z-20"
    >
      <div className="w-9 h-9 bg-[#20FF82]/10 rounded-lg flex items-center justify-center">
         <SparklesIcon className="w-5 h-5 text-[#20FF82] flex-shrink-0"/>
      </div>
    </a>
  );
};
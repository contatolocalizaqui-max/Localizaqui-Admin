
import React, { useState } from 'react';
import { SparklesIcon } from '../icons/SparklesIcon';
import { MenuIcon } from '../icons/MenuIcon';
import { XIcon } from '../icons/XIcon';
import { Page } from '../../types';

interface HeaderPublicProps {
    onNavigate: (page: Page) => void;
}

// Fix: Removed unused and unprovided 'href' prop from NavLink component's type definition.
const NavLink: React.FC<{ children: React.ReactNode, onClick: () => void }> = ({ children, onClick }) => (
    <a
        href="#"
        onClick={(e) => { e.preventDefault(); onClick(); }}
        className="text-gray-300 hover:text-white transition-colors"
    >
        {children}
    </a>
);

export const HeaderPublic: React.FC<HeaderPublicProps> = ({ onNavigate }) => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleNavigateAndCloseMenu = (page: Page) => {
        onNavigate(page);
        setMobileMenuOpen(false);
    }
    
    return (
        <header className="bg-black/80 backdrop-blur-sm sticky top-0 z-50 w-full">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <a href="#" onClick={(e) => {e.preventDefault(); onNavigate('landing')}} className="flex items-center space-x-2">
                             <SparklesIcon className="w-8 h-8 text-[#20FF82]"/>
                             <span className="text-2xl font-bold tracking-tight flex items-center">
                                <span className="text-[#20FF82]">localiz</span>
                                <span className="bg-gradient-to-r from-[#20FF82] to-[#9333ea] text-transparent bg-clip-text">a</span>
                                <span className="text-[#9333ea]">qui</span>
                             </span>
                        </a>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex md:items-center md:space-x-8">
                        <NavLink onClick={() => onNavigate('how-it-works')}>Como Funciona</NavLink>
                        <NavLink onClick={() => onNavigate('pricing')}>Preços</NavLink>
                        <NavLink onClick={() => onNavigate('blog')}>Blog</NavLink>
                        <NavLink onClick={() => onNavigate('help')}>Suporte</NavLink>
                    </nav>

                    {/* Desktop CTA Buttons */}
                    <div className="hidden md:flex items-center space-x-4">
                        <button onClick={() => onNavigate('login')} className="text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-gray-800 transition-colors">
                            Entrar
                        </button>
                        <button onClick={() => onNavigate('register')} className="bg-[#20FF82] text-black font-bold px-5 py-2.5 rounded-lg hover:bg-green-400 transition-colors">
                            Cadastrar
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800">
                            {isMobileMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                 <div className="md:hidden bg-black/95 backdrop-blur-lg absolute top-20 left-0 w-full">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                         <a href="#" onClick={(e) => { e.preventDefault(); handleNavigateAndCloseMenu('how-it-works')}} className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800">Como Funciona</a>
                         <a href="#" onClick={(e) => { e.preventDefault(); handleNavigateAndCloseMenu('pricing')}} className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800">Preços</a>
                         <a href="#" onClick={(e) => { e.preventDefault(); handleNavigateAndCloseMenu('blog')}} className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800">Blog</a>
                         <a href="#" onClick={(e) => { e.preventDefault(); handleNavigateAndCloseMenu('help')}} className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800">Suporte</a>
                    </div>
                    <div className="pt-4 pb-3 border-t border-gray-800">
                       <div className="px-5 flex flex-col space-y-3">
                           <button onClick={() => handleNavigateAndCloseMenu('login')} className="w-full text-center text-white font-semibold px-5 py-2.5 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors">
                                Entrar
                            </button>
                            <button onClick={() => handleNavigateAndCloseMenu('register')} className="w-full text-center bg-[#20FF82] text-black font-bold px-5 py-2.5 rounded-lg hover:bg-green-400 transition-colors">
                                Cadastrar
                            </button>
                       </div>
                    </div>
                </div>
            )}
        </header>
    );
};
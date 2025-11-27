
import React from 'react';
import { SparklesIcon } from '../icons/SparklesIcon';
import { TwitterIcon } from '../icons/TwitterIcon';
import { LinkedInIcon } from '../icons/LinkedInIcon';
import { Page, User } from '../../types';

interface FooterProps {
    onNavigate: (page: Page) => void;
    user: User | null;
}

const FooterLink: React.FC<{ page: Page, onNavigate: (page: Page) => void, children: React.ReactNode }> = ({ page, onNavigate, children }) => (
    <li>
        <button onClick={() => onNavigate(page)} className="text-gray-400 hover:text-white transition-colors text-left w-full">
            {children}
        </button>
    </li>
);

export const Footer: React.FC<FooterProps> = ({ onNavigate, user }) => {
    return (
        <footer className="bg-[#111111] border-t border-gray-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Logo and Social */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                             <SparklesIcon className="w-8 h-8 text-[#20FF82]"/>
                             <span className="text-2xl font-bold tracking-tight flex items-center">
                                <span className="text-[#20FF82]">localiz</span>
                                <span className="bg-gradient-to-r from-[#20FF82] to-[#9333ea] text-transparent bg-clip-text">a</span>
                                <span className="text-[#9333ea]">qui</span>
                             </span>
                        </div>
                        <p className="text-gray-400">Conectando você aos melhores profissionais da sua região com o poder da IA.</p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white"><TwitterIcon className="w-6 h-6" /></a>
                            <a href="#" className="text-gray-400 hover:text-white"><LinkedInIcon className="w-6 h-6" /></a>
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h3 className="text-white font-semibold tracking-wider uppercase">Produto</h3>
                        <ul className="mt-4 space-y-2">
                            <FooterLink page="how-it-works" onNavigate={onNavigate}>Como Funciona</FooterLink>
                            <FooterLink page="pricing" onNavigate={onNavigate}>Preços</FooterLink>
                            <FooterLink page="categories" onNavigate={onNavigate}>Categorias</FooterLink>
                        </ul>
                    </div>
                     <div>
                        <h3 className="text-white font-semibold tracking-wider uppercase">Empresa</h3>
                        <ul className="mt-4 space-y-2">
                            <FooterLink page="about" onNavigate={onNavigate}>Sobre nós</FooterLink>
                            <FooterLink page="blog" onNavigate={onNavigate}>Blog</FooterLink>
                            <FooterLink page="careers" onNavigate={onNavigate}>Carreiras</FooterLink>
                        </ul>
                    </div>
                     <div>
                        <h3 className="text-white font-semibold tracking-wider uppercase">Suporte</h3>
                        <ul className="mt-4 space-y-2">
                            <FooterLink page="help" onNavigate={onNavigate}>Central de Ajuda</FooterLink>
                            <FooterLink page="contact" onNavigate={onNavigate}>Contato</FooterLink>
                            <FooterLink page="terms" onNavigate={onNavigate}>Termos de Serviço</FooterLink>
                            <FooterLink page="privacy" onNavigate={onNavigate}>Privacidade</FooterLink>
                        </ul>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-800 flex justify-between items-center text-gray-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} localizaqui. Todos os direitos reservados.</p>
                    {user?.isAdmin && (
                        <button onClick={() => onNavigate('admin')} className="text-gray-800 hover:text-gray-600 transition-colors text-xs">Área Admin</button>
                    )}
                </div>
            </div>
        </footer>
    );
};
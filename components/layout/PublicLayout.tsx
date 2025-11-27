
import React from 'react';
import { HeaderPublic } from './HeaderPublic';
import { Footer } from './Footer';
import { Page, User } from '../../types';

interface PublicLayoutProps {
    children: React.ReactNode;
    onNavigate: (page: Page) => void;
    user?: User | null;
}

const PublicLayout: React.FC<PublicLayoutProps> = ({ children, onNavigate, user }) => {
    return (
        <div className="bg-black min-h-screen flex flex-col">
            <HeaderPublic onNavigate={onNavigate} />
            <main className="flex-grow">
                {children}
            </main>
            <Footer onNavigate={onNavigate} user={user || null} />
        </div>
    );
};

export default PublicLayout;
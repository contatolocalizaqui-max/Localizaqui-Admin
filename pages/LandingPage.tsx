
import React from 'react';
import { HeroSection } from '../components/landing/HeroSection';
import { TrustedBySection } from '../components/landing/TrustedBySection';
import { ReasonsSection } from '../components/landing/ReasonsSection';
import { HowItWorksSection } from '../components/landing/HowItWorksSection';
import { CategoriesSection } from '../components/landing/CategoriesSection';
import { TestimonialsSection } from '../components/landing/TestimonialsSection';
import { CtaSection } from '../components/landing/CtaSection';

interface LandingPageProps {
    onNavigateToRegister: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigateToRegister }) => {
    return (
        <div className="bg-black text-white">
            <main>
                <HeroSection onCTAClick={onNavigateToRegister} />
                <TrustedBySection />
                <ReasonsSection />
                <HowItWorksSection />
                <CategoriesSection />
                <TestimonialsSection />
                <CtaSection onRegister={onNavigateToRegister} />
            </main>
        </div>
    );
};

export default LandingPage;

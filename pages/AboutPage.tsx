
import React from 'react';
import { Page } from '../types';
import { SparklesIcon } from '../components/icons/SparklesIcon';

interface AboutPageProps {
    onNavigate: (page: Page) => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
    return (
        <div className="bg-black text-white min-h-screen">
            {/* Manifesto Hero */}
            <div className="relative py-32 sm:py-48 overflow-hidden">
                 <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#20FF82]/5 rounded-full blur-[120px]"></div>
                 
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <SparklesIcon className="w-12 h-12 text-[#20FF82] mx-auto mb-8 animate-pulse" />
                    <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight mb-8">
                        Conectando o <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-500">mundo real.</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light">
                        Acreditamos que a tecnologia deve ser invisível. Ela deve remover barreiras, não criá-las. Nossa missão é usar a Inteligência Artificial para fortalecer comunidades locais, um serviço de cada vez.
                    </p>
                </div>
            </div>

            {/* Values Grid */}
            <div className="bg-[#111111] border-y border-gray-800 py-24">
                <div className="container mx-auto px-4 grid md:grid-cols-3 gap-12">
                    <div className="space-y-4">
                        <span className="text-[#20FF82] font-mono text-sm">01.</span>
                        <h3 className="text-2xl font-bold text-white">Confiança Radical</h3>
                        <p className="text-gray-400 leading-relaxed">
                            Não somos apenas um catálogo. Verificamos cada profissional e garantimos que cada avaliação seja autêntica. Segurança não é uma feature, é a base.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <span className="text-[#20FF82] font-mono text-sm">02.</span>
                        <h3 className="text-2xl font-bold text-white">Velocidade Extrema</h3>
                        <p className="text-gray-400 leading-relaxed">
                            O tempo é o recurso mais valioso. Eliminamos a fricção da busca, negociação e agendamento. O que levava dias, agora leva minutos.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <span className="text-[#20FF82] font-mono text-sm">03.</span>
                        <h3 className="text-2xl font-bold text-white">Empoderamento Local</h3>
                        <p className="text-gray-400 leading-relaxed">
                            Damos ferramentas de grandes empresas para profissionais autônomos. Ajudamos eletricistas, pintores e encanadores a gerir e crescer seus negócios.
                        </p>
                    </div>
                </div>
            </div>

            {/* Team Image */}
            <div className="h-[500px] w-full bg-gray-900 relative overflow-hidden group">
                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" alt="Team" className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-700" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <h2 className="text-4xl font-bold text-white tracking-widest uppercase">Bastidores</h2>
                </div>
            </div>
            
            {/* Footer CTA */}
             <div className="py-24 text-center">
                 <p className="text-gray-500 mb-6 uppercase tracking-widest text-sm">Junte-se à revolução</p>
                 <button onClick={() => onNavigate('register')} className="text-4xl md:text-6xl font-bold text-white hover:text-[#20FF82] transition-colors">
                     Começar agora &rarr;
                 </button>
            </div>
        </div>
    );
};

export default AboutPage;

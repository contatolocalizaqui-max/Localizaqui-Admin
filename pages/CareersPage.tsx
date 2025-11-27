
import React from 'react';
import { Page } from '../types';
import { SparklesIcon } from '../components/icons/SparklesIcon';
import { UsersIcon } from '../components/icons/UsersIcon';
import { ChartBarIcon } from '../components/icons/ChartBarIcon';
import { ArrowRightIcon } from '../components/icons/ArrowRightIcon';

const mockOpenings = {
    'Engenharia': [
        { title: 'Engenheiro(a) de Frontend Sênior', location: 'Remoto (Brasil)', type: 'Tempo Integral' },
        { title: 'Engenheiro(a) de IA/ML Pleno', location: 'Remoto (Brasil)', type: 'Tempo Integral' },
    ],
    'Design': [
        { title: 'Designer de Produto (UI/UX)', location: 'São Paulo, SP (Híbrido)', type: 'Tempo Integral' },
    ],
    'Marketing': [
        { title: 'Gerente de Marketing de Crescimento', location: 'Remoto (Brasil)', type: 'Tempo Integral' },
    ],
};

const PerkCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
    <div className="bg-[#111111] p-6 rounded-2xl border border-gray-800">
        <div className="flex-shrink-0 w-12 h-12 bg-purple-600/20 text-purple-400 rounded-lg flex items-center justify-center">
            {icon}
        </div>
        <h3 className="mt-4 text-xl font-bold text-white">{title}</h3>
        <p className="mt-2 text-gray-400">{children}</p>
    </div>
);

const JobOpeningCard: React.FC<typeof mockOpenings['Engenharia'][0]> = ({ title, location, type }) => (
    <div className="bg-[#1a1a1a] p-5 rounded-lg border border-gray-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-[#20FF82] transition-colors group">
        <div>
            <h4 className="font-bold text-white group-hover:text-[#20FF82] transition-colors">{title}</h4>
            <p className="text-sm text-gray-400 mt-1">{location} &bull; {type}</p>
        </div>
        <button 
            onClick={() => alert('Detalhes da vaga em breve!')}
            className="flex items-center gap-2 bg-[#2a2a2a] text-white font-semibold text-sm px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors whitespace-nowrap">
            Ver Vaga <ArrowRightIcon className="w-4 h-4" />
        </button>
    </div>
);


const CareersPage: React.FC = () => {
    return (
        <div className="bg-black text-white py-16 sm:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Hero Section */}
                <div className="text-center max-w-3xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold text-white">Junte-se à Nossa Equipe</h1>
                    <p className="mt-4 text-lg text-gray-400">
                        Estamos construindo o futuro dos serviços locais e procurando pessoas apaixonadas e talentosas para nos ajudar a moldar essa visão. Venha fazer parte disso.
                    </p>
                </div>

                {/* Perks Section */}
                <div className="mt-20">
                    <h2 className="text-3xl font-bold text-center text-white">Por que trabalhar conosco?</h2>
                     <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                        <PerkCard icon={<SparklesIcon className="w-7 h-7" />} title="Impacto Real">
                            Seu trabalho ajudará milhares de profissionais e clientes a se conectarem, fortalecendo a economia local.
                        </PerkCard>
                        <PerkCard icon={<UsersIcon className="w-7 h-7" />} title="Cultura Colaborativa">
                            Acreditamos em um ambiente de trabalho diverso, inclusivo e com espaço para todos crescerem.
                        </PerkCard>
                         <PerkCard icon={<ChartBarIcon className="w-7 h-7" />} title="Crescimento Acelerado">
                            Faça parte de uma startup em rápido crescimento, com desafios constantes e oportunidades de desenvolvimento.
                        </PerkCard>
                    </div>
                </div>
                
                {/* Job Openings Section */}
                <div className="mt-20 max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-center text-white mb-12">Vagas em Aberto</h2>
                    <div className="space-y-10">
                        {Object.entries(mockOpenings).map(([department, jobs]) => (
                            <div key={department}>
                                <h3 className="text-2xl font-semibold text-purple-400 mb-5">{department}</h3>
                                <div className="space-y-4">
                                    {jobs.map(job => <JobOpeningCard key={job.title} {...job} />)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CareersPage;

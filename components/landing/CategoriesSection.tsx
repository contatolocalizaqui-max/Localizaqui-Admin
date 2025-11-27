import React from 'react';
import { BoltIcon } from '../icons/BoltIcon';
import { HomeIcon } from '../icons/HomeIcon';
import { WrenchIcon } from '../icons/WrenchIcon';
import { PaintBrushIcon } from '../icons/PaintBrushIcon';
import { BriefcaseIcon } from '../icons/BriefcaseIcon';
import { AcademicCapIcon } from '../icons/AcademicCapIcon';
import { HeartIcon } from '../icons/HeartIcon';

const CategoryCard: React.FC<{ icon: React.ReactNode; name: string }> = ({ icon, name }) => (
    <div className="bg-[#111111] p-6 rounded-lg border border-transparent hover:border-[#20FF82] transition-colors cursor-pointer group">
        <div className="text-gray-400 group-hover:text-[#20FF82] transition-colors">
            {icon}
        </div>
        <h3 className="mt-4 font-semibold text-white">{name}</h3>
    </div>
);

export const CategoriesSection: React.FC = () => {
    const categories = [
        { name: 'Eletricistas', icon: <BoltIcon className="w-8 h-8" /> },
        { name: 'Encanadores', icon: <WrenchIcon className="w-8 h-8" /> },
        { name: 'Limpeza Doméstica', icon: <HomeIcon className="w-8 h-8" /> },
        { name: 'Pintores', icon: <PaintBrushIcon className="w-8 h-8" /> },
        { name: 'Consultoria', icon: <BriefcaseIcon className="w-8 h-8" /> },
        { name: 'Aulas Particulares', icon: <AcademicCapIcon className="w-8 h-8" /> },
        { name: 'Saúde e Bem-estar', icon: <HeartIcon className="w-8 h-8" /> },
        { name: 'E muito mais...', icon: <div className="w-8 h-8 flex items-center justify-center text-2xl font-bold">...</div> }
    ];

    return (
        <section className="py-20 sm:py-24 bg-black">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">Explore Nossas Categorias</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
                        De reparos domésticos a aulas particulares, encontre o profissional que você precisa.
                    </p>
                </div>
                <div className="mt-16 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                    {categories.map(cat => <CategoryCard key={cat.name} icon={cat.icon} name={cat.name} />)}
                </div>
            </div>
        </section>
    );
};

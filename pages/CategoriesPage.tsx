
import React from 'react';
import { Page } from '../types';
import { BoltIcon } from '../components/icons/BoltIcon';
import { WrenchIcon } from '../components/icons/WrenchIcon';
import { HomeIcon } from '../components/icons/HomeIcon';
import { PaintBrushIcon } from '../components/icons/PaintBrushIcon';
import { ArrowRightIcon } from '../components/icons/ArrowRightIcon';
import { cn } from '../utils/cn';

interface CategoriesPageProps {
    onNavigate: (page: Page) => void;
}

// Bento Grid Item Component
const CategoryItem: React.FC<{
    name: string;
    icon: React.ReactNode;
    description?: string;
    className?: string;
    bgImage?: string;
    onClick: () => void;
}> = ({ name, icon, description, className, bgImage, onClick }) => (
    <div 
        onClick={onClick}
        className={cn(
            "group relative overflow-hidden rounded-3xl bg-[#111111] border border-white/5 hover:border-[#20FF82]/50 transition-all duration-500 cursor-pointer flex flex-col justify-between p-6",
            className
        )}
    >
        {bgImage && (
            <div className="absolute inset-0 z-0">
                <img src={bgImage} alt={name} className="w-full h-full object-cover opacity-30 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
            </div>
        )}

        <div className="relative z-10 flex justify-between items-start">
            <div className="p-3 bg-white/10 backdrop-blur-md rounded-xl text-white group-hover:bg-[#20FF82] group-hover:text-black transition-colors">
                {icon}
            </div>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300">
                <ArrowRightIcon className="w-6 h-6 text-white" />
            </div>
        </div>

        <div className="relative z-10 mt-8">
            <h3 className="text-2xl font-bold text-white mb-1">{name}</h3>
            {description && <p className="text-gray-400 text-sm group-hover:text-gray-200 transition-colors">{description}</p>}
        </div>
    </div>
);

const CategoriesPage: React.FC<CategoriesPageProps> = ({ onNavigate }) => {
    const handleNav = () => onNavigate('app');

    return (
        <div className="bg-black text-white min-h-screen py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mb-12">
                    <h1 className="text-5xl font-bold text-white tracking-tight mb-4">
                        Navegue por <span className="text-[#20FF82]">Categorias</span>
                    </h1>
                    <p className="text-xl text-gray-400">
                        Encontre especialistas qualificados para cada canto da sua vida e do seu negócio.
                    </p>
                </div>

                {/* Bento Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]">
                    
                    {/* Featured Large Items */}
                    <CategoryItem 
                        name="Eletricistas" 
                        icon={<BoltIcon className="w-6 h-6" />} 
                        description="Instalações, reparos e projetos residenciais."
                        className="md:col-span-2 md:row-span-2"
                        bgImage="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069&auto=format&fit=crop"
                        onClick={handleNav}
                    />
                    
                    <CategoryItem 
                        name="Encanadores" 
                        icon={<WrenchIcon className="w-6 h-6" />} 
                        description="Vazamentos e hidráulica."
                        className="md:col-span-1 md:row-span-2"
                        bgImage="https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?q=80&w=1974&auto=format&fit=crop"
                        onClick={handleNav}
                    />

                    {/* Standard Items */}
                    <CategoryItem 
                        name="Limpeza" 
                        icon={<HomeIcon className="w-6 h-6" />} 
                        className="bg-gradient-to-br from-purple-900/20 to-blue-900/20"
                        onClick={handleNav}
                    />
                     <CategoryItem 
                        name="Pintura" 
                        icon={<PaintBrushIcon className="w-6 h-6" />} 
                        className="bg-gradient-to-br from-orange-900/20 to-red-900/20"
                        onClick={handleNav}
                    />

                    {/* Wide Item */}
                    <CategoryItem 
                        name="Reformas Gerais" 
                        icon={<WrenchIcon className="w-6 h-6" />} 
                        description="Pequenos reparos a grandes obras."
                        className="md:col-span-2"
                        bgImage="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2031&auto=format&fit=crop"
                        onClick={handleNav}
                    />
                    
                    <CategoryItem 
                        name="Tecnologia" 
                        icon={<BoltIcon className="w-6 h-6" />} 
                        className="md:col-span-1"
                        onClick={handleNav}
                    />
                     <CategoryItem 
                        name="Jardinagem" 
                        icon={<HomeIcon className="w-6 h-6" />} 
                        className="md:col-span-1"
                        onClick={handleNav}
                    />
                </div>
            </div>
        </div>
    );
};

export default CategoriesPage;

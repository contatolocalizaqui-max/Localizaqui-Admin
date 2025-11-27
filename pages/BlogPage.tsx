
import React from 'react';
import { Page } from '../types';

interface BlogPageProps {
    onNavigate: (page: Page) => void;
}

const mockPosts = [
    {
        image: 'https://picsum.photos/seed/blog1/600/400',
        category: 'Dicas para Casa',
        title: '5 Coisas para Verificar Antes de Chamar um Eletricista',
        author: 'Ana Clara',
        date: '15 de Julho, 2024',
        featured: true,
    },
    {
        image: 'https://picsum.photos/seed/blog2/600/400',
        category: 'Para Profissionais',
        title: 'Como Criar um Perfil de Destaque no localizaqui',
        author: 'Equipe localizaqui',
        date: '10 de Julho, 2024',
    },
    {
        image: 'https://picsum.photos/seed/blog3/600/400',
        category: 'Segurança',
        title: 'A Importância de Contratar Profissionais Verificados',
        author: 'Mariana Silva',
        date: '05 de Julho, 2024',
    },
    {
        image: 'https://picsum.photos/seed/blog4/600/400',
        category: 'Novidades',
        title: 'Lançamento: Busca por Voz no Chat Inteligente',
        author: 'Equipe localizaqui',
        date: '01 de Julho, 2024',
    },
     {
        image: 'https://picsum.photos/seed/blog5/600/400',
        category: 'Decoração',
        title: 'Tendências de Pintura para Renovar sua Sala em 2024',
        author: 'Mário Pintor',
        date: '28 de Junho, 2024',
    },
     {
        image: 'https://picsum.photos/seed/blog6/600/400',
        category: 'Manutenção',
        title: 'Guia Completo para Evitar Vazamentos em Casa',
        author: 'Carlos J.',
        date: '22 de Junho, 2024',
    }
];

const BlogPostCard: React.FC<any> = ({ image, category, title, author, date, featured }) => (
    <div className={`group relative bg-[#111111] rounded-2xl border border-gray-800 overflow-hidden hover:border-[#20FF82]/50 transition-all duration-300 hover:-translate-y-1 cursor-pointer ${featured ? 'md:col-span-2 lg:col-span-3 grid md:grid-cols-2 gap-0' : ''}`}>
        <div className={`overflow-hidden ${featured ? 'h-full min-h-[300px]' : 'aspect-video'}`}>
            <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        </div>
        <div className={`p-6 flex flex-col justify-center ${featured ? 'md:p-10' : ''}`}>
            <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 rounded-full bg-[#20FF82]/10 text-[#20FF82] text-xs font-bold uppercase tracking-wider border border-[#20FF82]/20">
                    {category}
                </span>
            </div>
            <h3 className={`${featured ? 'text-3xl md:text-4xl' : 'text-xl'} font-bold text-white mb-4 group-hover:text-[#20FF82] transition-colors leading-tight`}>
                {title}
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-500 mt-auto">
                <span className="font-medium text-gray-300">{author}</span>
                <span>•</span>
                <span>{date}</span>
            </div>
        </div>
    </div>
);

const BlogPage: React.FC<BlogPageProps> = ({ onNavigate }) => {
    return (
        <div className="bg-black text-white min-h-screen py-20">
             <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-purple-900/20 to-transparent pointer-events-none"></div>
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight">
                        Blog <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#20FF82] to-emerald-600">localizaqui</span>
                    </h1>
                    <p className="mt-6 text-xl text-gray-400">
                        Insights, tutoriais e histórias da comunidade que está redefinindo serviços locais.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {mockPosts.map((post, index) => (
                        <BlogPostCard key={index} {...post} />
                    ))}
                </div>
                
                <div className="mt-20 text-center">
                    <button className="px-8 py-4 border border-gray-800 rounded-xl text-gray-300 font-bold hover:bg-white/5 hover:text-white transition-colors">
                        Carregar Mais Artigos
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BlogPage;
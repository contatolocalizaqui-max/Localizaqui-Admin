
import React from 'react';

const TestimonialCard: React.FC<{ quote: string; name: string; role: string; avatar: string; }> = ({ quote, name, role, avatar }) => (
    <div className="bg-[#111111] p-8 rounded-2xl border border-gray-800 h-full flex flex-col">
        <p className="text-gray-300 flex-grow">"{quote}"</p>
        <div className="mt-6 flex items-center space-x-4">
            <img className="w-12 h-12 rounded-full object-cover" src={avatar} alt={name} />
            <div>
                <p className="font-bold text-white">{name}</p>
                <p className="text-sm text-gray-400">{role}</p>
            </div>
        </div>
    </div>
);

export const TestimonialsSection: React.FC = () => {
    return (
         <section className="py-20 sm:py-24 bg-[#111111]">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                 <div className="text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">O que nossos usuários dizem</h2>
                     <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
                        A confiança de quem já usou e aprovou nossos serviços.
                    </p>
                </div>
                <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <TestimonialCard 
                        quote="Incrível! Encontrei um encanador em menos de 10 minutos para uma emergência. A IA realmente funciona e economizou meu dia."
                        name="Mariana Silva"
                        role="Cliente Satisfeita"
                        avatar="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                    />
                    <TestimonialCard 
                        quote="A plataforma é super intuitiva. Descrevi o que precisava e as opções que apareceram foram perfeitas. Contratei uma diarista e o serviço foi excelente."
                        name="João Pedro"
                        role="Usuário Frequente"
                        avatar="https://i.pravatar.cc/150?u=a042581f4e29026705d"
                    />
                     <TestimonialCard 
                        quote="Como prestador de serviço, o localizaqui aumentou minha visibilidade e me conectou com clientes que realmente precisavam do meu trabalho. Recomendo!"
                        name="Carlos Andrade"
                        role="Eletricista Parceiro"
                        avatar="https://i.pravatar.cc/150?u=a042581f4e29026706d"
                    />
                </div>
            </div>
        </section>
    );
};


import React from 'react';
import { MailIcon } from '../components/icons/MailIcon';
import { PhoneIcon } from '../components/icons/PhoneIcon';
import { MapPinIcon } from '../components/icons/MapPinIcon';

const InfoCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
    <div className="flex items-start gap-5 p-4 rounded-xl hover:bg-white/5 transition-colors">
        <div className="flex-shrink-0 w-12 h-12 bg-[#20FF82]/10 text-[#20FF82] border border-[#20FF82]/20 rounded-xl flex items-center justify-center">
            {icon}
        </div>
        <div>
            <h3 className="text-lg font-bold text-white">{title}</h3>
            <div className="text-gray-400 mt-1 text-sm leading-relaxed">{children}</div>
        </div>
    </div>
);

const ContactPage: React.FC = () => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Mensagem enviada! (Simulação)');
    };

    return (
        <div className="bg-black text-white min-h-screen relative">
             <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-purple-900/10 rounded-full blur-[150px] pointer-events-none"></div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
                    {/* Info Section */}
                    <div>
                        <h1 className="text-5xl font-bold text-white mb-6">Fale Conosco</h1>
                        <p className="text-xl text-gray-400 mb-12 max-w-md">
                            Estamos aqui para ajudar. Se você tem dúvidas, sugestões ou precisa de suporte, entre em contato.
                        </p>

                        <div className="space-y-6">
                            <InfoCard icon={<MailIcon className="w-6 h-6" />} title="Email">
                                <a href="mailto:contato@localizaqui.com" className="hover:text-[#20FF82] transition-colors font-medium">contato@localizaqui.com</a>
                                <p className="opacity-60">Resposta em até 24h.</p>
                            </InfoCard>
                             <InfoCard icon={<PhoneIcon className="w-6 h-6" />} title="Telefone">
                                <p className="font-medium">+55 (11) 99999-8888</p>
                                <p className="opacity-60">Seg a Sex, 9h às 18h.</p>
                            </InfoCard>
                             <InfoCard icon={<MapPinIcon className="w-6 h-6" />} title="Escritório">
                                <p className="font-medium">Av. Paulista, 1234</p>
                                <p className="opacity-60">São Paulo, SP - Brasil</p>
                            </InfoCard>
                        </div>
                    </div>

                    {/* Form Section */}
                    <div className="bg-[#111111]/80 backdrop-blur-xl border border-white/10 p-8 sm:p-10 rounded-3xl shadow-2xl">
                        <h2 className="text-2xl font-bold text-white mb-6">Envie uma mensagem</h2>
                        <form onSubmit={handleSubmit} className="space-y-5">
                             <div>
                                <label htmlFor="name" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Nome</label>
                                <input 
                                    type="text" 
                                    id="name"
                                    placeholder="Seu nome completo"
                                    required
                                    className="w-full bg-[#0a0a0a] border border-gray-800 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#20FF82] focus:ring-1 focus:ring-[#20FF82]/20 transition-all"
                                />
                            </div>
                             <div>
                                <label htmlFor="email" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Email</label>
                                <input 
                                    type="email" 
                                    id="email"
                                    placeholder="seu@email.com"
                                    required
                                    className="w-full bg-[#0a0a0a] border border-gray-800 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#20FF82] focus:ring-1 focus:ring-[#20FF82]/20 transition-all"
                                />
                            </div>
                             <div>
                                <label htmlFor="message" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Mensagem</label>
                                <textarea
                                    id="message"
                                    rows={5}
                                    placeholder="Como podemos ajudar?"
                                    required
                                    className="w-full bg-[#0a0a0a] border border-gray-800 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#20FF82] focus:ring-1 focus:ring-[#20FF82]/20 transition-all resize-none"
                                />
                            </div>
                            <button type="submit" className="w-full bg-[#20FF82] text-black font-bold py-4 rounded-xl hover:bg-[#1ce676] transition-all shadow-lg shadow-green-900/20 mt-2">
                                Enviar Mensagem
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
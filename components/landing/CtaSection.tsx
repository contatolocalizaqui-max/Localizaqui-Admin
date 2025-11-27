
import React from 'react';
import { Button } from "../ui/button";
import { SparklesIcon } from "../icons/SparklesIcon";

interface CtaSectionProps {
    onRegister: () => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ onRegister }) => {
    return (
        <section className="py-24 relative overflow-hidden">
             {/* Background Glow */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full bg-gradient-to-r from-purple-600/20 to-[#20FF82]/20 blur-[100px] -z-10 rounded-full"></div>
             
             <div className="container mx-auto px-4 text-center relative z-10">
                <div className="bg-[#111111]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-12 md:p-20 max-w-5xl mx-auto shadow-2xl">
                    <div className="flex justify-center mb-6">
                        <SparklesIcon className="w-12 h-12 text-[#20FF82]" />
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                        Pronto para transformar a <br className="hidden md:block" /> forma como você contrata?
                    </h2>
                    <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
                        Junte-se a milhares de usuários e profissionais que já estão economizando tempo e fechando negócios com o localizaqui.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Button onClick={onRegister} className="h-14 px-10 text-lg bg-[#20FF82] hover:bg-green-400 text-black shadow-[0_0_20px_rgba(32,255,130,0.4)] transition-all hover:scale-105">
                            Criar Conta Grátis
                        </Button>
                        <Button onClick={() => window.location.href = "/pricing"} variant="outline" className="h-14 px-10 text-lg border-gray-600 text-white hover:bg-white/10 transition-all">
                            Ver Planos para Prestadores
                        </Button>
                    </div>
                </div>
             </div>
        </section>
    );
};


import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MoveRightIcon } from "../icons/MoveRightIcon";
import { Button } from "../ui/button";
import { SparklesIcon } from "../icons/SparklesIcon";
import { UserCircleIcon } from "../icons/UserCircleIcon";
import { StarIcon } from "../icons/StarIcon";

interface HeroSectionProps {
    onCTAClick: () => void;
}

const MockChatInterface = () => {
    const [step, setStep] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setStep((prev) => (prev + 1) % 4);
        }, 2500);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="w-full max-w-md bg-[#111111] border border-gray-800 rounded-2xl overflow-hidden shadow-2xl shadow-purple-500/10 relative z-10">
            {/* Header */}
            <div className="bg-[#1a1a1a] p-4 border-b border-gray-800 flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <div className="ml-auto text-xs text-gray-500 font-mono">localizaqui v1.0</div>
            </div>

            {/* Chat Area */}
            <div className="p-6 h-[400px] flex flex-col gap-4 relative overflow-hidden bg-black/50">
                {/* User Message */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="self-end bg-[#2a2a2a] text-white px-4 py-3 rounded-2xl rounded-tr-none max-w-[85%] shadow-lg"
                >
                    <p className="text-sm">Preciso de um eletricista urgente em Pinheiros para trocar um disjuntor.</p>
                </motion.div>

                {/* AI Thinking */}
                <AnimatePresence>
                    {step === 0 && (
                         <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="self-start flex items-center gap-2 text-gray-400 text-xs ml-2"
                        >
                            <SparklesIcon className="w-4 h-4 text-[#20FF82] animate-pulse" />
                            <span>Analisando disponibilidade...</span>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* AI Response */}
                {step >= 1 && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="self-start bg-[#111111] border border-gray-800 text-gray-200 px-4 py-3 rounded-2xl rounded-tl-none max-w-[90%] shadow-lg"
                    >
                        <p className="text-sm mb-3">Encontrei 3 eletricistas avaliados na sua região. O <strong>Carlos</strong> está a 2km e pode atender agora.</p>
                        
                        {/* Mini Profile Card Mockup */}
                        <div className="bg-[#1a1a1a] p-3 rounded-xl border border-gray-700 flex gap-3 items-center cursor-pointer hover:border-[#20FF82] transition-colors">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white font-bold text-xs">
                                C
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-center">
                                    <p className="text-white font-bold text-xs">Carlos Eletrica</p>
                                    <div className="flex items-center gap-0.5">
                                        <StarIcon className="w-3 h-3 text-amber-400 fill-amber-400" />
                                        <span className="text-[10px] text-white">4.9</span>
                                    </div>
                                </div>
                                <p className="text-[10px] text-green-400">Online • Chega em 20 min</p>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* User Follow up */}
                 {step >= 2 && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="self-end bg-[#2a2a2a] text-white px-4 py-3 rounded-2xl rounded-tr-none max-w-[85%] shadow-lg mt-2"
                    >
                        <p className="text-sm">Pode chamar o Carlos!</p>
                    </motion.div>
                )}
                
                 {/* AI Confirmation */}
                 {step >= 3 && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="self-start bg-[#111111] border border-gray-800 text-gray-200 px-4 py-3 rounded-2xl rounded-tl-none max-w-[90%] shadow-lg"
                    >
                        <p className="text-sm">Combinado! Notifiquei o Carlos e ele já visualizou seu pedido. O WhatsApp dele foi liberado.</p>
                    </motion.div>
                )}

            </div>
        </div>
    )
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onCTAClick }) => {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ["Eletricista", "Encanador", "Pintor", "Diarista", "Montador"],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <div className="w-full relative overflow-hidden bg-black min-h-[90vh] flex items-center">
        {/* Background Gradients */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-[#20FF82]/10 rounded-full blur-[120px]" />

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                {/* Text Content */}
                <div className="flex flex-col gap-6 text-center lg:text-left items-center lg:items-start z-20">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-[#20FF82]">
                        <SparklesIcon className="w-3 h-3" />
                        <span>Nova Era de Serviços Locais</span>
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl tracking-tighter font-bold text-white leading-[1.1]">
                        Encontre o
                        <span className="block h-[1.1em] overflow-hidden">
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={titles[titleNumber]}
                                    className="block text-transparent bg-clip-text bg-gradient-to-r from-[#20FF82] to-emerald-500"
                                    initial={{ y: 40, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -40, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                >
                                    {titles[titleNumber]}
                                </motion.span>
                            </AnimatePresence>
                        </span>
                        perfeito para você.
                    </h1>

                    <p className="text-lg md:text-xl leading-relaxed text-gray-400 max-w-xl">
                        Esqueça as buscas intermináveis. Converse com nossa IA e conecte-se instantaneamente aos melhores profissionais avaliados da sua região.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                        <Button size="lg" className="h-14 px-8 text-lg gap-2 shadow-[0_0_30px_-10px_rgba(32,255,130,0.3)]" onClick={onCTAClick}>
                            Começar Agora <MoveRightIcon className="w-5 h-5" />
                        </Button>
                        <Button variant="outline" size="lg" className="h-14 px-8 text-lg hover:bg-white/5 border-gray-700">
                            Sou Prestador
                        </Button>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500 mt-4">
                        <div className="flex -space-x-3">
                            <div className="w-8 h-8 rounded-full bg-gray-800 border-2 border-black flex items-center justify-center text-xs text-white">A</div>
                            <div className="w-8 h-8 rounded-full bg-gray-700 border-2 border-black flex items-center justify-center text-xs text-white">B</div>
                            <div className="w-8 h-8 rounded-full bg-gray-600 border-2 border-black flex items-center justify-center text-xs text-white">C</div>
                        </div>
                        <p>+10k profissionais cadastrados</p>
                    </div>
                </div>

                {/* Mockup Content */}
                <div className="relative lg:h-[600px] flex items-center justify-center">
                     <motion.div 
                        initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative z-10"
                    >
                        <MockChatInterface />
                        
                        {/* Floating Elements */}
                        <motion.div 
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-8 -right-8 bg-[#1a1a1a] border border-gray-700 p-3 rounded-xl shadow-xl flex items-center gap-2 z-20"
                        >
                             <UserCircleIcon className="w-5 h-5 text-[#20FF82]" />
                             <div className="text-xs">
                                 <p className="text-white font-bold">Novo Lead!</p>
                                 <p className="text-gray-400">Há 2 min</p>
                             </div>
                        </motion.div>

                         <motion.div 
                            animate={{ y: [0, 15, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className="absolute -bottom-4 -left-4 bg-[#1a1a1a] border border-gray-700 p-3 rounded-xl shadow-xl flex items-center gap-2 z-20"
                        >
                             <StarIcon className="w-5 h-5 text-amber-400 fill-amber-400" />
                             <div className="text-xs">
                                 <p className="text-white font-bold">Serviço Avaliado</p>
                                 <p className="text-gray-400">⭐⭐⭐⭐⭐</p>
                             </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </div>
    </div>
  );
};
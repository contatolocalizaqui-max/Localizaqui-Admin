import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SparklesIcon } from '../icons/SparklesIcon';
import { BellAlertIcon } from '../icons/BellAlertIcon';
import { StarIcon } from '../icons/StarIcon';
import { TrendingUpIcon } from '../icons/TrendingUpIcon';
import { ChatBubbleIcon } from '../icons/ChatBubbleIcon';

const MiniProfileCard = () => (
  <div
    className="relative rounded-xl overflow-hidden w-full flex flex-col p-4"
    style={{ backgroundColor: "#0e131f" }}
  >
    <div className="absolute inset-0 z-10" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 100%)"}} />
    <div className="absolute bottom-0 left-0 right-0 h-1/2 z-0" style={{ background: `radial-gradient(ellipse at bottom, rgba(139, 92, 246, 0.3) 0%, rgba(79, 70, 229, 0) 70%)`, filter: "blur(20px)" }} />
    
    <div className="relative flex flex-col h-full z-20">
      <div className="flex items-start gap-3 mb-2">
        <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-gradient-to-br from-purple-500 to-indigo-600">
           <img src="https://i.pravatar.cc/150?u=provider-1" alt="Ana Clara" className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-md font-semibold text-white truncate">Ana Clara Eletricista</h3>
          <p className="text-xs text-violet-300 font-medium">Eletricista</p>
        </div>
        <div className="flex items-center gap-1 bg-amber-500/20 px-1.5 py-0.5 rounded-md border border-amber-500/30">
          <StarIcon className="w-3 h-3 text-amber-400 fill-amber-400" />
          <span className="text-xs font-semibold text-amber-300">4.9</span>
        </div>
      </div>
      <p className="text-gray-300 text-xs mb-3 line-clamp-2">Reparos elétricos residenciais e comerciais. Instalação de chuveiros, tomadas e quadros de luz...</p>
      <div className="flex flex-wrap gap-1 mt-auto">
        {["Residencial", "Comercial", "24h"].map(tag => (
          <span key={tag} className="text-[10px] bg-white/5 text-gray-300 border border-white/10 px-1.5 py-0.5 rounded">{tag}</span>
        ))}
      </div>
    </div>
  </div>
);


export const AnimatedFlows = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                stiffness: 100
            }
        },
    };

    return (
        <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
        >
            {/* Step 1: Lead Generation */}
            <motion.div variants={itemVariants} className="bg-[#111111] p-6 rounded-2xl border border-gray-800 h-full">
                <p className="text-sm font-bold text-purple-400 mb-2">PASSO 1: AQUISIÇÃO</p>
                <h3 className="text-2xl font-bold text-white mb-4">A IA te conecta com o cliente</h3>
                <div className="relative aspect-square w-full flex items-center justify-center">
                    {/* Background Grid */}
                    <svg width="100%" height="100%" className="absolute inset-0 opacity-10">
                        <defs>
                            <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                                <path d="M 30 0 L 0 0 0 30" fill="none" stroke="gray" strokeWidth="0.5"/>
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>

                    <motion.div
                        className="flex flex-col items-center gap-4 transition-opacity"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1, transition: { delay: 0.5 } } : {}}
                    >
                        <motion.div
                            className="flex items-center gap-2 p-3 bg-[#2a2a2a] rounded-lg shadow-lg"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={isInView ? { scale: 1, opacity: 1, transition: { delay: 0.8 } } : {}}
                        >
                            <ChatBubbleIcon className="w-6 h-6 text-gray-300"/>
                            <p className="text-white text-sm">"Eletricista para instalar chuveiro"</p>
                        </motion.div>
                        
                         <motion.div
                            className="text-purple-400"
                             initial={{ opacity: 0 }}
                             animate={isInView ? { opacity: 1, transition: { delay: 1.2 } } : {}}
                         >
                            <SparklesIcon className="w-10 h-10" />
                        </motion.div>

                        <motion.div
                            className="flex items-center gap-3 p-3 bg-[#20FF82] rounded-lg shadow-lg"
                             initial={{ scale: 0, opacity: 0 }}
                             animate={isInView ? { scale: 1, opacity: 1, transition: { delay: 1.5 } } : {}}
                        >
                            <BellAlertIcon className="w-6 h-6 text-black"/>
                            <p className="text-black text-sm font-bold">Novo Lead para Você!</p>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Step 2: Business Management */}
            <motion.div variants={itemVariants} className="bg-[#111111] p-6 rounded-2xl border border-gray-800 h-full">
                <p className="text-sm font-bold text-green-400 mb-2">PASSO 2: GERENCIAMENTO</p>
                <h3 className="text-2xl font-bold text-white mb-4">Você gerencia seu crescimento</h3>
                <div className="space-y-4">
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0, transition: { delay: 1.8 } } : {}}
                    >
                        <p className="text-gray-400 text-sm mb-2 font-semibold">LEADS RECEBIDOS:</p>
                        <MiniProfileCard />
                    </motion.div>
                    
                    <motion.div
                        className="bg-[#1a1a1a] p-4 rounded-lg flex items-center space-x-3 border border-gray-700"
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0, transition: { delay: 2.1 } } : {}}
                    >
                        <div className="flex-shrink-0 w-8 h-8 bg-green-600/30 text-green-400 rounded-lg flex items-center justify-center">
                            <TrendingUpIcon className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-400">Visualizações no Perfil</p>
                            <p className="text-lg font-bold text-white">+25% esta semana</p>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    );
};

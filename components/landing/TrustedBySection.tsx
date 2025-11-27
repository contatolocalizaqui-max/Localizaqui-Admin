
import React from 'react';

const companies = [
  "TechHome", "FixIt Fast", "BuildCorp", "CleanMasters", "SafeGuard", "UrbanServices"
];

export const TrustedBySection: React.FC = () => {
  return (
    <div className="py-10 border-y border-white/5 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 text-center">
            <p className="text-sm text-gray-500 mb-6 uppercase tracking-widest">Confiança de quem entende do assunto</p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                {companies.map((company, idx) => (
                    <span key={idx} className="text-xl md:text-2xl font-bold text-gray-400 flex items-center gap-2">
                        <div className="w-6 h-6 bg-current rounded-md opacity-30"></div>
                        {company}
                    </span>
                ))}
            </div>
        </div>
    </div>
  );
};

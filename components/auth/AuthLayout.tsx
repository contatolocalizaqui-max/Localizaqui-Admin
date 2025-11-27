
import React from 'react';
import { SparklesIcon } from '../icons/SparklesIcon';

export const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="bg-black text-gray-200 min-h-screen w-screen flex flex-col items-center justify-center antialiased p-4">
       <div className="absolute top-8 flex items-center space-x-3">
           <SparklesIcon className="w-8 h-8 text-[#20FF82]"/>
           <span className="text-2xl font-bold text-white flex items-center">
                <span className="text-[#20FF82]">localiz</span>
                <span className="bg-gradient-to-r from-[#20FF82] to-[#9333ea] text-transparent bg-clip-text">a</span>
                <span className="text-[#9333ea]">qui</span>
           </span>
       </div>

       <div className="w-full max-w-md bg-[#111111] border border-gray-800 rounded-2xl p-8 shadow-2xl shadow-purple-500/5">
           {children}
       </div>
    </div>
  );
};
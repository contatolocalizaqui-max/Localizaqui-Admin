
import React from 'react';
import { UserCircleIcon } from '../icons/UserCircleIcon';
import { SparklesIcon } from '../icons/SparklesIcon';

interface LiveAudioIndicatorProps {
    transcription: {
        userInput: string;
        modelInput: string;
    }
}

export const LiveAudioIndicator: React.FC<LiveAudioIndicatorProps> = ({ transcription }) => {
  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 pointer-events-none w-full max-w-md flex flex-col items-center">
        {/* Holographic Visualizer Container */}
        <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-3xl p-4 shadow-2xl shadow-[#20FF82]/10 flex items-center gap-6 pointer-events-auto min-w-[300px]">
            
            {/* User Status */}
            <div className={`flex items-center gap-2 transition-opacity duration-300 ${transcription.userInput ? 'opacity-100' : 'opacity-50'}`}>
                <div className="relative">
                    <UserCircleIcon className="w-8 h-8 text-white" />
                    {transcription.userInput && (
                        <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-blue-500 ring-2 ring-black animate-pulse"></span>
                    )}
                </div>
            </div>

            {/* Waveform Animation */}
            <div className="flex-1 flex items-center justify-center gap-1 h-8">
                {[...Array(5)].map((_, i) => (
                    <div 
                        key={i} 
                        className="w-1 bg-gradient-to-t from-[#20FF82] to-blue-500 rounded-full animate-wave"
                        style={{ 
                            animationDelay: `${i * 0.1}s`,
                            height: transcription.userInput || transcription.modelInput ? '100%' : '20%' 
                        }}
                    ></div>
                ))}
            </div>

            {/* AI Status */}
            <div className={`flex items-center gap-2 transition-opacity duration-300 ${transcription.modelInput ? 'opacity-100' : 'opacity-50'}`}>
                <div className="relative">
                    <div className="w-8 h-8 rounded-full bg-[#20FF82]/20 flex items-center justify-center">
                        <SparklesIcon className="w-5 h-5 text-[#20FF82]" />
                    </div>
                    {transcription.modelInput && (
                        <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-[#20FF82] ring-2 ring-black animate-pulse"></span>
                    )}
                </div>
            </div>
        </div>

        {/* Transcription Pill */}
        {(transcription.userInput || transcription.modelInput) && (
            <div className="mt-4 bg-black/80 backdrop-blur-md border border-gray-800 px-4 py-2 rounded-xl text-sm text-gray-200 max-w-sm text-center shadow-lg animate-fade-in-up">
                {transcription.modelInput || transcription.userInput}
            </div>
        )}
        
        <style>{`
            @keyframes wave {
                0%, 100% { height: 20%; opacity: 0.5; }
                50% { height: 100%; opacity: 1; }
            }
            .animate-wave {
                animation: wave 1s infinite ease-in-out;
            }
        `}</style>
    </div>
  );
};

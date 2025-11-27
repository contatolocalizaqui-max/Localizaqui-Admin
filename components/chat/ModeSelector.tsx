
import React from 'react';
import { AiMode } from '../../App';
import { BoltIcon } from '../icons/BoltIcon';
import { SparklesIcon } from '../icons/SparklesIcon';
import { CogIcon } from '../icons/CogIcon';

interface ModeSelectorProps {
  currentMode: AiMode;
  setMode: (mode: AiMode) => void;
}

const modeConfig = {
    fast: { label: 'Rápido', icon: <BoltIcon className="w-4 h-4" />, description: "Gemini 2.5 Flash Lite" },
    standard: { label: 'Padrão', icon: <SparklesIcon className="w-4 h-4" />, description: "Gemini 2.5 Flash" },
    complex: { label: 'Complexo', icon: <CogIcon className="w-4 h-4" />, description: "Gemini 2.5 Pro" },
}

export const ModeSelector: React.FC<ModeSelectorProps> = ({ currentMode, setMode }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-1.5 bg-[#111111] border border-gray-700 rounded-full hover:border-gray-500 transition-colors text-sm"
      >
        {modeConfig[currentMode].icon}
        <span>{modeConfig[currentMode].label}</span>
      </button>
      {isOpen && (
        <div 
            className="absolute right-0 mt-2 w-56 bg-[#111111] border border-gray-700 rounded-lg shadow-lg z-20"
            onMouseLeave={() => setIsOpen(false)}
        >
          <div className="p-2">
            {(Object.keys(modeConfig) as AiMode[]).map((mode) => (
              <button
                key={mode}
                onClick={() => {
                  setMode(mode);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-md flex items-center space-x-3 ${
                  currentMode === mode ? 'bg-purple-700/50 text-white' : 'hover:bg-gray-800'
                }`}
              >
                {modeConfig[mode].icon}
                <div>
                    <p className="font-semibold">{modeConfig[mode].label}</p>
                    <p className="text-xs text-gray-400">{modeConfig[mode].description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

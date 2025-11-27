
import React from 'react';
import { BellIcon } from '../icons/BellIcon';
import { UserCircleIcon } from '../icons/UserCircleIcon';
import { SparklesIcon } from '../icons/SparklesIcon';
import { ModeSelector } from '../chat/ModeSelector';
import { AiMode } from '../../App';
import { User } from '../../types';

interface HeaderProps {
  currentMode: AiMode;
  setMode: (mode: AiMode) => void;
  user: User | null;
}

export const Header: React.FC<HeaderProps> = ({ currentMode, setMode, user }) => {
  return (
    <header className="bg-black/80 backdrop-blur-sm sticky top-0 z-10 hidden md:flex items-center justify-between h-16 px-4 md:px-6 border-b border-gray-800 md:justify-end">
      <div className="flex items-center space-x-4">
        {/* Logo is now only in the sidebar, this header is part of the content pane */}
      </div>
      <div className="flex items-center space-x-2 md:space-x-4">
        <ModeSelector currentMode={currentMode} setMode={setMode} />
        <button className="p-2 rounded-full hover:bg-gray-800 transition-colors relative" aria-label="Notifications">
          <BellIcon className="w-6 h-6 text-gray-400" />
          <span className="absolute top-1 right-1 block h-2.5 w-2.5 rounded-full bg-[#20FF82] ring-2 ring-black"></span>
        </button>
        <button className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-800 transition-colors" aria-label="User profile">
            {user ? (
                 <div className="w-7 h-7 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {user.name.charAt(0)}
                </div>
            ) : (
                <UserCircleIcon className="w-7 h-7 text-gray-400" />
            )}
        </button>
      </div>
    </header>
  );
};

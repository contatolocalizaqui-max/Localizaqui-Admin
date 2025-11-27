import React from 'react';
import { Message } from '../../types';
import { UserCircleIcon } from '../icons/UserCircleIcon';
import { SparklesIcon } from '../icons/SparklesIcon';
import { ProfileCard } from '../profile/ProfileCard';
import { cn } from '../../utils/cn';

const SuggestionChip: React.FC<{ text: string, onClick: (text: string) => void }> = ({ text, onClick }) => (
    <button
        onClick={() => onClick(text)}
        className="px-4 py-2 bg-[#1a1a1a] border border-gray-700 hover:border-[#20FF82] hover:text-[#20FF82] text-gray-300 text-sm rounded-xl transition-all duration-200"
    >
        {text}
    </button>
);

const GroundingLink: React.FC<{ title: string, uri: string }> = ({ title, uri }) => (
    <a
      href={uri}
      target="_blank"
      rel="noopener noreferrer"
      className="text-xs flex items-center gap-1.5 bg-[#2a2a2a] text-[#20FF82] px-3 py-1.5 rounded-lg hover:bg-[#333] transition-colors inline-block border border-[#20FF82]/20"
    >
      <span className="w-2 h-2 rounded-full bg-[#20FF82]"></span>
      Ver no mapa: <span className="underline underline-offset-2">{title}</span>
    </a>
  );

export const ChatMessage: React.FC<{ message: Message, onSuggestionClick: (text: string) => void, onViewProfile: (profileId: string) => void }> = ({ message, onSuggestionClick, onViewProfile }) => {
  const isUser = message.sender === 'user';

  return (
    <div className={cn("flex items-start gap-4 mb-8 animate-fade-in-up", isUser ? "flex-row-reverse" : "flex-row")}>
      {/* Avatar */}
      <div className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg",
          isUser ? "bg-gray-800" : "bg-gradient-to-br from-purple-600 to-indigo-700"
      )}>
          {isUser ? <UserCircleIcon className="w-6 h-6 text-gray-400" /> : <SparklesIcon className="w-5 h-5 text-white" />}
      </div>

      <div className={cn("flex flex-col gap-2 max-w-[85%] lg:max-w-[75%]", isUser ? "items-end" : "items-start")}>
        {/* User Uploaded Image */}
        {message.imageUrl && (
            <div className="mb-2 rounded-2xl overflow-hidden border border-gray-800 shadow-lg">
                <img src={message.imageUrl} alt="User upload" className="max-w-xs h-auto object-cover" />
            </div>
        )}

        {/* Message Bubble */}
        {message.text && (
            <div
            className={cn(
                "px-6 py-4 rounded-2xl shadow-md leading-relaxed text-[15px]",
                isUser
                ? "bg-[#2a2a2a] text-white rounded-tr-none"
                : "bg-[#0a0a0a] border border-gray-800 text-gray-200 rounded-tl-none"
            )}
            >
             <div className="whitespace-pre-wrap markdown-body">{message.text}</div>
            </div>
        )}

        {/* Recommendation Cards */}
        {message.profiles && message.profiles.length > 0 && (
            <div className="w-full py-4 overflow-x-auto scrollbar-hide">
                <div className="flex gap-4 w-max px-1">
                    {message.profiles.map((profile, idx) => (
                        <div key={profile.id} className="w-[320px] flex-shrink-0 h-full">
                           <ProfileCard profile={profile} index={idx} onViewProfile={onViewProfile} />
                        </div>
                    ))}
                </div>
            </div>
        )}
        
        {/* Grounding Links */}
        {message.grounding && message.grounding.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-1">
            {message.grounding.map((g, i) => <GroundingLink key={i} title={g.title} uri={g.uri} />)}
          </div>
        )}

        {/* Suggestion Chips */}
        {message.suggestions && message.suggestions.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
                {message.suggestions.map((s, i) => <SuggestionChip key={i} text={s} onClick={onSuggestionClick} />)}
            </div>
        )}
      </div>
    </div>
  );
};
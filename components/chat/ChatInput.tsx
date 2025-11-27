
import React, { useState, useRef } from 'react';
import { MicrophoneIcon } from '../icons/MicrophoneIcon';
import { SendIcon } from '../icons/SendIcon';
import { PhotoIcon } from '../icons/PhotoIcon';
import { StopCircleIcon } from '../icons/StopCircleIcon';
import { XIcon } from '../icons/XIcon';
import { LocationMarkerIcon } from '../icons/LocationMarkerIcon';
import { LoadingSpinner } from '../icons/LoadingSpinner';
import { cn } from '../../utils/cn';

interface ChatInputProps {
  onSendMessage: (text: string, image?: File) => void;
  isLoading: boolean;
  isLive: boolean;
  toggleLive: () => void;
  onLocate: () => void;
  isLocating: boolean;
  onTypingChange: (isTyping: boolean) => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading, isLive, toggleLive, onLocate, isLocating, onTypingChange }) => {
  const [text, setText] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const typingTimeoutRef = useRef<number | null>(null);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    onTypingChange(true);

    typingTimeoutRef.current = window.setTimeout(() => {
      onTypingChange(false);
    }, 1500); 
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if ((text.trim() || image) && !isLoading) {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      onTypingChange(false);
      onSendMessage(text, image!);
      setText('');
      setImage(null);
      setImagePreview(null);
      if(fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };
  
  const removeImage = () => {
      setImage(null);
      setImagePreview(null);
      if(fileInputRef.current) fileInputRef.current.value = '';
  }

  return (
    <div className="fixed bottom-0 left-0 lg:left-[288px] right-0 p-4 pb-6 bg-gradient-to-t from-black via-black/90 to-transparent z-20">
      <div className="max-w-3xl mx-auto relative">
        {/* Image Preview Float */}
        {imagePreview && (
            <div className="absolute -top-24 left-0 animate-fade-in-up">
                <div className="relative inline-block bg-[#1a1a1a] p-2 rounded-xl border border-gray-700 shadow-xl">
                    <img src={imagePreview} alt="Selected preview" className="h-20 w-auto object-cover rounded-lg" />
                    <button onClick={removeImage} className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 text-white hover:bg-red-600 shadow-md transition-colors">
                        <XIcon className="w-3 h-3"/>
                    </button>
                </div>
            </div>
        )}

        {/* Main Input Bar */}
        <form
          onSubmit={handleSubmit}
          className={cn(
            "relative flex items-center p-2 bg-[#1a1a1a]/90 backdrop-blur-xl border transition-all duration-300 rounded-[2rem] shadow-2xl",
            isFocused ? "border-[#20FF82]/50 ring-1 ring-[#20FF82]/20 shadow-[0_0_40px_-10px_rgba(32,255,130,0.15)]" : "border-gray-800/50"
          )}
        >
            {/* Left Actions */}
            <div className="flex items-center gap-1 pl-2">
                <button 
                    type="button" 
                    onClick={toggleLive} 
                    className={cn(
                        "p-2.5 rounded-full transition-all duration-300",
                        isLive ? "bg-red-500/20 text-red-500 animate-pulse" : "text-gray-400 hover:text-white hover:bg-white/10"
                    )}
                    title={isLive ? "Parar conversa" : "Conversa por voz"}
                >
                    {isLive ? <StopCircleIcon className="w-5 h-5" /> : <MicrophoneIcon className="w-5 h-5" />}
                </button>

                <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" disabled={isLoading} />
                <button 
                    type="button" 
                    onClick={() => fileInputRef.current?.click()} 
                    className="p-2.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors" 
                    title="Adicionar imagem"
                    disabled={isLoading}
                >
                    <PhotoIcon className="w-5 h-5" />
                </button>
                 <button 
                    type="button" 
                    onClick={onLocate}
                    disabled={isLocating}
                    className="p-2.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors" 
                    title="Usar minha localização"
                >
                     {isLocating ? <LoadingSpinner className="w-5 h-5" /> : <LocationMarkerIcon className="w-5 h-5" />}
                </button>
            </div>

            {/* Input Field */}
            <input
                type="text"
                value={text}
                onChange={handleTextChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder={isLive ? "Ouvindo..." : "Digite o serviço que você precisa..."}
                className="flex-1 bg-transparent text-white placeholder-gray-500 focus:outline-none px-4 py-3"
                disabled={isLoading || isLive}
                autoComplete="off"
            />

            {/* Send Button */}
            <div className="pr-2">
                <button
                    type="submit"
                    className={cn(
                        "p-2.5 rounded-full transition-all duration-300 flex items-center justify-center",
                        text.trim() || image ? "bg-[#20FF82] text-black hover:bg-[#1ce676] shadow-[0_0_15px_-3px_rgba(32,255,130,0.4)]" : "bg-gray-800 text-gray-500 cursor-not-allowed"
                    )}
                    disabled={isLoading || (!text.trim() && !image)}
                    aria-label="Send"
                >
                    {isLoading ? <LoadingSpinner className="w-5 h-5 text-black/50" /> : <SendIcon className="w-5 h-5" />}
                </button>
            </div>
        </form>
        
        <p className="text-center text-[10px] text-gray-600 mt-3 font-mono">
            localizaqui pode cometer erros. Verifique informações importantes.
        </p>
      </div>
    </div>
  );
};

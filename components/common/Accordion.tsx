import React, { useState, ReactNode } from 'react';
import { ChevronDownIcon } from '../icons/ChevronDownIcon';

interface AccordionProps {
    children: React.ReactElement<AccordionItemProps>[];
}

interface AccordionItemProps {
    title: string;
    children: ReactNode;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-gray-800">
            <h2>
                <button
                    type="button"
                    className="flex justify-between items-center w-full py-5 font-medium text-left text-white"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-expanded={isOpen}
                >
                    <span className="text-lg">{title}</span>
                    <ChevronDownIcon className={`w-6 h-6 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
            </h2>
            <div
                className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
            >
                <div className="overflow-hidden">
                    <div className="pb-5 pr-4 text-gray-400">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export const Accordion: React.FC<AccordionProps> = ({ children }) => {
    return (
        <div className="w-full">
            {children}
        </div>
    );
};

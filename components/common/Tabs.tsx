import React, { useState, ReactNode } from 'react';

interface TabsProps {
    children: React.ReactElement<TabProps>[];
}

interface TabProps {
    label: string;
    children: ReactNode;
}

export const Tab: React.FC<TabProps> = ({ children }) => <>{children}</>;

export const Tabs: React.FC<TabsProps> = ({ children }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div>
            <div className="border-b border-gray-800">
                <nav className="-mb-px flex justify-center space-x-8" aria-label="Tabs">
                    {children.map((tab, index) => (
                        <button
                            key={tab.props.label}
                            onClick={() => setActiveIndex(index)}
                            className={`${
                                index === activeIndex
                                    ? 'border-[#20FF82] text-[#20FF82]'
                                    : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500'
                            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg transition-colors`}
                        >
                            {tab.props.label}
                        </button>
                    ))}
                </nav>
            </div>
            <div>
                {children[activeIndex]}
            </div>
        </div>
    );
};

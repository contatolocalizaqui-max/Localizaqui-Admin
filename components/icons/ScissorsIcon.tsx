
import React from 'react';

export const ScissorsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        strokeWidth={1.5} 
        stroke="currentColor" 
        {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.843 16.237a3.375 3.375 0 0 0 4.28 4.28l.47-2.351M16.16 7.763a3.375 3.375 0 0 0-4.28-4.28l-2.351.47m0 0L7.05 6.953l-3.376 3.376a1.5 1.5 0 0 0 0 2.121l3.376 3.376 3.376-3.376 1.401-1.401" />
        <circle cx="6" cy="18" r="2.25" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="18" cy="6" r="2.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

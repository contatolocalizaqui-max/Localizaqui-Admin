import React from 'react';

export const MapIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth={1.5} 
    stroke="currentColor" 
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 20.25l6-3.75-6-3.75-6 3.75l6 3.75z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5V7.5l6-3.75l6 3.75l6-3.75v9l-6 3.75-6-3.75-6 3.75zM15 12.75l6-3.75" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 7.5v9" />
  </svg>
);
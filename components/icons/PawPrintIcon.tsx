
import React from 'react';

export const PawPrintIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        strokeWidth={1.5} 
        stroke="currentColor" 
        {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 1.063a2.25 2.25 0 0 1-2.422 1.258l-2.656-.664a2.251 2.251 0 0 0-1.242.03l-2.656.664a2.25 2.25 0 0 1-2.422-1.258L7.75 7.5m12.5 0a2.25 2.25 0 0 0-2.25-2.25H8a2.25 2.25 0 0 0-2.25 2.25m14.5 0v1.875c0 .621-.504 1.125-1.125 1.125l-2.656-.664a2.25 2.25 0 0 0-1.242.03L9.5 10.5l-2.656.664a2.25 2.25 0 0 0-1.242-.03L3.125 10.5C2.504 10.5 2 9.996 2 9.375V7.5m18.25 0v1.875c0 .621.504 1.125 1.125 1.125l2.656.664a2.25 2.25 0 0 0 1.242-.03l2.656-.664a2.25 2.25 0 0 0 1.242.03L20.875 10.5c.621 0 1.125-.504 1.125-1.125V7.5" />
        <path fill="currentColor" d="M8.25 4.5a.75.75 0 0 0-1.5 0v.75a.75.75 0 0 0 1.5 0V4.5zM12 3a.75.75 0 0 0-1.5 0v.75a.75.75 0 0 0 1.5 0V3zM15.75 4.5a.75.75 0 0 0-1.5 0v.75a.75.75 0 0 0 1.5 0V4.5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15.75a3 3 0 0 0 3 3h1.5a3 3 0 0 0 3-3V12a3 3 0 0 0-6 0v3.75z" />
    </svg>
);

import React from 'react';

export const BriefcaseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        strokeWidth={1.5} 
        stroke="currentColor" 
        {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.075c0 1.313-.964 2.5-2.25 2.5h-10.5c-1.286 0-2.25-.925-2.25-2.25v-4.075M12 1.5V14.25m0 0l3-3m-3 3l-3-3m3-3.75h.008v.008H12v-.008z" />
    </svg>
);

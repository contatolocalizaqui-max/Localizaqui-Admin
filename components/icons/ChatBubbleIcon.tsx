import React from 'react';

export const ChatBubbleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth={1.5} 
    stroke="currentColor" 
    {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193l-3.722.32c-1.18.103-2.257.65-2.98 1.433l-4.99 5.013c-.563.565-1.513.565-2.076 0l-4.99-5.013c-.723-.783-1.8-1.33-2.98-1.433l-3.722-.32c-1.133-.093-1.98-1.057-1.98-2.193V10.608c0-.97.616-1.813 1.5-2.097L6.75 6.908c.613-.16 1.282-.16 1.895 0l2.61 1.631c.22.138.487.138.707 0l2.61-1.631c.613-.16 1.282-.16 1.895 0l4.5 2.603Z" />
  </svg>
);
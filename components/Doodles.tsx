import React from 'react';

export const ScribbleUnderline = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 200 20" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 12C30 8 60 15 90 12C120 9 150 5 198 10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const StarDoodle = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 50 50" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M25 2L30 18H48L34 28L40 45L25 35L10 45L16 28L2 18H20L25 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const ArrowDoodle = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 50" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 25C30 20 60 30 90 25M90 25L75 10M90 25L75 40" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const CircleDoodle = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 5C25 5 5 25 5 50C5 75 25 95 50 95C75 95 95 75 95 50C95 25 75 5 50 5Z" stroke="currentColor" strokeWidth="3" strokeDasharray="5 5" strokeLinecap="round"/>
  </svg>
);

export const SpiralDoodle = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M50 50 C 60 40, 70 40, 70 50 C 70 70, 30 70, 30 50 C 30 20, 80 20, 80 50 C 80 90, 10 90, 10 50" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
    </svg>
);
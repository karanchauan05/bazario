import React from 'react';

// This will serve as a wrapper for max-width and padding
export function Container({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className || ''}`}>
            {children}
        </div>
    );
}

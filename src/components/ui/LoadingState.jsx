import React from 'react';
import { Loader2 } from 'lucide-react';

export default function LoadingState({
  message = 'Loading revision materials...',
  description = 'This might take a few seconds.',
  size = 'md', // sm, md, lg
  className = '',
}) {
  const spinnerSizes = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
  };

  return (
    <div className={`flex flex-col items-center justify-center text-center p-8 rounded-2xl bg-white border border-slate-100/80 shadow-sm ${className}`}>
      <div className="relative flex items-center justify-center p-4">
        {/* Decorative pulsating background rings */}
        <div className="absolute inset-0 rounded-full bg-primary-50 animate-ping opacity-35" />
        <Loader2 className={`${spinnerSizes[size]} text-primary-600 animate-spin z-10`} />
      </div>
      
      {message && (
        <h4 className="mt-4 text-base font-bold text-slate-800 tracking-tight">
          {message}
        </h4>
      )}
      
      {description && (
        <p className="mt-1.5 text-sm text-slate-400 max-w-[280px]">
          {description}
        </p>
      )}
    </div>
  );
}

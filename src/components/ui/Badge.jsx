import React from 'react';

export default function Badge({
  children,
  className = '',
  variant = 'neutral', // primary, secondary, success, warning, danger, neutral
  outline = false,
  ...props
}) {
  const baseStyles = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold select-none';
  
  const colors = {
    primary: outline 
      ? 'border border-primary-300 text-primary-700 bg-primary-50/50' 
      : 'bg-primary-50 text-primary-700 border border-transparent',
    secondary: outline 
      ? 'border border-secondary-300 text-secondary-700 bg-secondary-50/50' 
      : 'bg-secondary-50 text-secondary-700 border border-transparent',
    success: outline 
      ? 'border border-green-300 text-green-700 bg-green-50/50' 
      : 'bg-green-50 text-green-700 border border-transparent',
    warning: outline 
      ? 'border border-amber-300 text-amber-700 bg-amber-50/50' 
      : 'bg-amber-50 text-amber-700 border border-transparent',
    danger: outline 
      ? 'border border-red-300 text-red-700 bg-red-50/50' 
      : 'bg-red-50 text-red-700 border border-transparent',
    neutral: outline 
      ? 'border border-slate-300 text-slate-700 bg-slate-50/50' 
      : 'bg-slate-100 text-slate-800 border border-transparent',
  };

  return (
    <span className={`${baseStyles} ${colors[variant]} ${className}`} {...props}>
      {children}
    </span>
  );
}

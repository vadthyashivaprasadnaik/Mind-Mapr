import React from 'react';

export default function Card({
  children,
  className = '',
  hoverEffect = false,
  onClick,
  ...props
}) {
  const isClickable = !!onClick;
  return (
    <div
      onClick={onClick}
      className={`
        bg-white rounded-2xl border border-slate-100 shadow-sm transition-all duration-200
        ${hoverEffect || isClickable ? 'hover:shadow-md hover:border-slate-200/80 hover:-translate-y-0.5' : ''}
        ${isClickable ? 'cursor-pointer active:scale-[0.99]' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '', ...props }) {
  return (
    <div className={`p-5 border-b border-slate-100 flex items-center justify-between gap-4 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardContent({ children, className = '', ...props }) {
  return (
    <div className={`p-5 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className = '', ...props }) {
  return (
    <div className={`px-5 py-4 bg-slate-50/50 rounded-b-2xl border-t border-slate-100/80 flex items-center justify-between gap-4 ${className}`} {...props}>
      {children}
    </div>
  );
}

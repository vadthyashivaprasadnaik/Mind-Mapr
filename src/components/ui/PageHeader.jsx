import React from 'react';

export default function PageHeader({
  title,
  description,
  children, // typically buttons or utility tools for the page
  className = '',
}) {
  return (
    <div className={`flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-100 pb-5 mb-6 ${className}`}>
      <div className="flex-1">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 leading-8">
          {title}
        </h1>
        {description && (
          <p className="mt-1 text-sm text-slate-500 leading-5">
            {description}
          </p>
        )}
      </div>
      {children && (
        <div className="flex items-center gap-3 shrink-0">
          {children}
        </div>
      )}
    </div>
  );
}

import React, { useId } from 'react';

export default function Input({
  label,
  type = 'text',
  placeholder = '',
  error,
  helperText,
  className = '',
  iconLeft: IconLeft,
  iconRight: IconRight,
  rightElement,
  disabled = false,
  ...props
}) {
  const inputId = useId();

  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {label && (
        <label htmlFor={inputId} className="text-sm font-semibold text-slate-700 select-none">
          {label}
        </label>
      )}
      
      <div className="relative flex items-center">
        {IconLeft && (
          <div className="absolute left-3.5 text-slate-400 pointer-events-none">
            <IconLeft className="w-5 h-5" />
          </div>
        )}
        
        <input
          id={inputId}
          type={type}
          disabled={disabled}
          placeholder={placeholder}
          className={`
            w-full px-4 py-2.5 text-sm bg-white border rounded-xl transition-all duration-200 outline-none
            placeholder-slate-400 disabled:opacity-50 disabled:bg-slate-50
            ${IconLeft ? 'pl-11' : ''}
            ${IconRight || rightElement ? 'pr-11' : ''}
            ${error 
              ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100/50' 
              : 'border-slate-200 hover:border-slate-300 focus:border-primary-500 focus:ring-4 focus:ring-primary-100/50'
            }
          `}
          {...props}
        />

        {rightElement && (
          <div className="absolute right-3 flex items-center">
            {rightElement}
          </div>
        )}

        {!rightElement && IconRight && (
          <div className="absolute right-3.5 text-slate-400 pointer-events-none">
            <IconRight className="w-5 h-5" />
          </div>
        )}
      </div>

      {error && (
        <p className="text-xs font-medium text-red-600 animate-in fade-in-50 duration-200">
          {error}
        </p>
      )}
      
      {!error && helperText && (
        <p className="text-xs text-slate-500">
          {helperText}
        </p>
      )}
    </div>
  );
}

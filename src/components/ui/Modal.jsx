import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import Button from './Button';

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  className = '',
  size = 'md', // sm, md, lg, xl
}) {
  // Prevent background scrolling when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div
        className={`
          w-full bg-white rounded-2xl border border-slate-100 shadow-xl flex flex-col max-h-[90vh] overflow-hidden
          animate-in zoom-in-95 duration-200 ${sizes[size]} ${className}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          {title && <h3 className="text-lg font-bold text-slate-900 leading-6">{title}</h3>}
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors p-1 hover:bg-slate-100 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 text-sm text-slate-600 leading-relaxed">
          {children}
        </div>

        {/* Footer */}
        {footer ? (
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-100/80 flex justify-end items-center gap-3">
            {footer}
          </div>
        ) : null}
      </div>
    </div>
  );
}

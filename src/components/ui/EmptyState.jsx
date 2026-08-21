import React from 'react';
import Button from './Button';

export default function EmptyState({
  icon: Icon,
  title = 'No materials found',
  description = 'Upload study materials to generate mind maps, summaries, flashcards, and quizzes.',
  actionLabel,
  onActionClick,
  actionIcon,
  className = '',
}) {
  return (
    <div className={`flex flex-col items-center justify-center text-center p-8 md:p-12 rounded-2xl bg-white border border-dashed border-slate-200/80 shadow-sm max-w-lg mx-auto ${className}`}>
      {Icon && (
        <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-50 text-slate-400 mb-5 border border-slate-100">
          <Icon className="w-8 h-8" />
        </div>
      )}
      
      <h3 className="text-lg font-bold text-slate-800 tracking-tight leading-6">
        {title}
      </h3>
      
      <p className="mt-2 text-sm text-slate-500 max-w-sm leading-relaxed">
        {description}
      </p>
      
      {actionLabel && onActionClick && (
        <Button
          variant="primary"
          onClick={onActionClick}
          iconLeft={actionIcon}
          className="mt-6"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

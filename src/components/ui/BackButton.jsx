import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

/**
 * Reusable BackButton component for Mind Mapr.
 * Priority:
 * 1. Explicit `to` prop if provided.
 * 2. Contextual `location.state.from` if passed via route navigation.
 * 3. `fallback` prop (default: '/materials').
 */
export default function BackButton({
  label = 'Back',
  fallback = '/materials',
  to,
  className = '',
  ...props
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    // 1. Explicit `to` prop takes first priority
    if (to) {
      navigate(to, { state: location.state });
      return;
    }

    // 2. If route state specifies `from` (e.g. from '/ai-analysis' or '/quiz'), return there
    if (location.state?.from) {
      navigate(location.state.from, { state: location.state });
      return;
    }

    // 3. Fallback route
    if (fallback) {
      navigate(fallback, { state: location.state });
      return;
    }

    // 4. Default safe fallback
    navigate('/materials');
  };

  return (
    <button
      type="button"
      onClick={handleBack}
      className={`
        inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900
        bg-white/80 hover:bg-slate-100/80 border border-slate-200/80 hover:border-slate-300
        px-3 py-1.5 rounded-xl transition-all duration-150 shadow-2xs cursor-pointer select-none
        focus:outline-none focus:ring-2 focus:ring-primary-500/20 active:scale-[0.98] mb-3 group ${className}
      `}
      aria-label={label}
      {...props}
    >
      <ArrowLeft className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 transition-colors" />
      <span>{label}</span>
    </button>
  );
}

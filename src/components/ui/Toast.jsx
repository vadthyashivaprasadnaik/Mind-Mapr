import React, { createContext, useContext, useState, useCallback } from 'react';
import { X, CheckCircle2, AlertCircle, Info, AlertTriangle } from 'lucide-react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback((message, type = 'info', duration = 4000) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, [removeToast]);

  const toast = {
    success: (msg, dur) => addToast(msg, 'success', dur),
    error: (msg, dur) => addToast(msg, 'error', dur),
    info: (msg, dur) => addToast(msg, 'info', dur),
    warning: (msg, dur) => addToast(msg, 'warning', dur),
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} onClose={() => removeToast(t.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

function ToastItem({ toast, onClose }) {
  const { message, type } = toast;

  const styles = {
    success: {
      bg: 'bg-green-50 border-green-200 text-green-800',
      icon: <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />,
    },
    error: {
      bg: 'bg-red-50 border-red-200 text-red-800',
      icon: <XCircleWrapper className="w-5 h-5 text-red-600 shrink-0" />,
    },
    warning: {
      bg: 'bg-amber-50 border-amber-200 text-amber-800',
      icon: <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />,
    },
    info: {
      bg: 'bg-blue-50 border-blue-200 text-blue-800',
      icon: <Info className="w-5 h-5 text-blue-600 shrink-0" />,
    },
  }[type] || {
    bg: 'bg-slate-50 border-slate-200 text-slate-800',
    icon: <Info className="w-5 h-5 text-slate-600 shrink-0" />,
  };

  return (
    <div className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-lg animate-in slide-in-from-bottom-4 duration-300 ${styles.bg}`}>
      {styles.icon}
      <div className="flex-1 text-sm font-medium leading-5">{message}</div>
      <button 
        onClick={onClose} 
        className="text-slate-400 hover:text-slate-600 transition-colors rounded-lg p-0.5 hover:bg-black/5"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

// Inline fallback wrappers for React 19 / SVG issues or specific icons
function XCircleWrapper({ className }) {
  return <AlertCircle className={className} />;
}

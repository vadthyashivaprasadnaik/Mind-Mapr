import React, { useState, useRef, useEffect } from 'react';

export default function Dropdown({
  trigger,
  items = [], // array of { label, icon, onClick, variant: 'default' | 'danger' }
  className = '',
  align = 'right', // left, right
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Click outside listener
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const alignments = {
    left: 'left-0 origin-top-left',
    right: 'right-0 origin-top-right',
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div onClick={toggleDropdown} className="cursor-pointer">
        {trigger}
      </div>

      {isOpen && (
        <div
          className={`
            absolute mt-2 w-48 rounded-xl border border-slate-100 bg-white shadow-lg z-40 focus:outline-none
            animate-in fade-in slide-in-from-top-2 duration-150 ${alignments[align]} ${className}
          `}
        >
          <div className="p-1.5 flex flex-col gap-0.5">
            {items.map((item, idx) => {
              if (item.divider) {
                return <div key={idx} className="h-px bg-slate-100 my-1" />;
              }

              const Icon = item.icon;
              const isDanger = item.variant === 'danger';

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    item.onClick?.();
                    setIsOpen(false);
                  }}
                  className={`
                    w-full flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg text-left transition-colors
                    ${isDanger 
                      ? 'text-red-600 hover:bg-red-50' 
                      : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                    }
                  `}
                >
                  {Icon && <Icon className={`w-4 h-4 shrink-0 ${isDanger ? 'text-red-500' : 'text-slate-400'}`} />}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

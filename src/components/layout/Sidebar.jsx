import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderOpen,
  UploadCloud,
  Network,
  FileText,
  Layers,
  GraduationCap,
  Bookmark,
  Calendar,
  LineChart,
  User,
  Settings,
  LogOut,
  BrainCircuit,
  Sparkles
} from 'lucide-react';

export default function Sidebar({ isOpen, setIsOpen }) {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  // Primary Navigation matching user requirements
  const navigationItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'My Materials', path: '/materials', icon: FolderOpen },
    { label: 'Upload Material', path: '/upload', icon: UploadCloud },
    { label: 'Mind Maps', path: '/mind-map', icon: Network },
    { label: 'Summaries', path: '/summary', icon: FileText },
    { label: 'Flashcards', path: '/flashcards', icon: Layers },
    { label: 'Quizzes', path: '/quiz', icon: GraduationCap },
    { label: 'Important Topics', path: '/important-topics', icon: Bookmark },
    { label: 'Revision Plan', path: '/revision-plan', icon: Calendar },
    { label: 'Progress', path: '/progress', icon: LineChart },
  ];

  // Bottom Navigation matching user requirements
  const bottomItems = [
    { label: 'Profile', path: '/profile', icon: User },
    { label: 'Settings', path: '/settings', icon: Settings },
    { label: 'Logout', path: '/login', icon: LogOut, isDanger: true },
  ];

  return (
    <>
      {/* Mobile Drawer Backdrop Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden animate-in fade-in duration-200"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`
          fixed top-0 bottom-0 left-0 z-45 w-64 bg-white border-r border-slate-200/80 flex flex-col transition-transform duration-300 lg:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Logo Header */}
        <div className="h-16 px-6 border-b border-slate-100 flex items-center justify-between shrink-0">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-primary-600 to-secondary-600 text-white shadow-sm shadow-primary-500/20 group-hover:scale-105 transition-transform duration-300">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-slate-900 flex items-center gap-0.5">
                Mind<span className="text-primary-600">Mapr</span>
              </span>
              <span className="text-[9px] font-semibold uppercase tracking-wider text-slate-400 block -mt-1">
                Student Revision
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto px-3.5 py-4 flex flex-col gap-1">
          <div className="px-3 pb-1.5 flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Study Navigation
            </span>
            <span className="flex items-center gap-1 text-[10px] text-primary-600 bg-primary-50 px-2 py-0.5 rounded-full font-semibold">
              <Sparkles className="w-3 h-3" />
              <span>AI Active</span>
            </span>
          </div>

          {navigationItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`
                  w-full flex items-center gap-3 px-3 py-2 text-sm font-semibold rounded-xl transition-all duration-200
                  ${active
                    ? 'bg-primary-50 text-primary-600 shadow-xs font-bold'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }
                `}
              >
                <Icon className={`w-4.5 h-4.5 shrink-0 ${active ? 'text-primary-600' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Account & Settings Navigation */}
        <div className="p-3.5 border-t border-slate-100 bg-slate-50/70 flex flex-col gap-1 shrink-0">
          <span className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Account
          </span>

          {bottomItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            const isDanger = item.isDanger;

            return (
              <Link
                key={item.label}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`
                  w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-xl transition-colors
                  ${isDanger
                    ? 'text-red-600 hover:bg-red-50 hover:text-red-700'
                    : active
                      ? 'bg-white text-primary-600 shadow-xs font-bold border border-slate-100'
                      : 'text-slate-600 hover:bg-white hover:text-slate-900'
                  }
                `}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isDanger ? 'text-red-500' : active ? 'text-primary-600' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}

          {/* Mini Student Avatar Card */}
          <div className="mt-1 pt-2 border-t border-slate-200/60 flex items-center gap-2.5 px-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary-500 to-secondary-500 text-white flex items-center justify-center font-bold text-xs shadow-xs shrink-0">
              AM
            </div>
            <div className="flex-1 min-w-0">
              <h5 className="text-xs font-bold text-slate-800 truncate">Alex Mercer</h5>
              <p className="text-[10px] text-slate-500 truncate">alex@stanford.edu</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

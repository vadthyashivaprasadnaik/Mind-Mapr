import React, { useState, useRef, useEffect } from 'react';
import { Menu, Bell, Search, Sparkles, CheckCircle2, BookOpen, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useToast } from '../ui/Toast';
import { useLanguage } from '../../context/LanguageContext';

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notificationOpen, setNotificationOpen] = useState(false);
  const notificationRef = useRef(null);
  const toast = useToast();
  const { t } = useLanguage();

  // Close notification popover on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setNotificationOpen(false);
      }
    }
    if (notificationOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [notificationOpen]);

  const notifications = [
    {
      id: 1,
      title: 'Flashcards Due for Spaced Recall',
      description: '24 flashcards on Operating Systems need review today.',
      time: '15m ago',
      icon: Layers,
      unread: true,
      link: '/flashcards',
    },
    {
      id: 2,
      title: 'Mind Map Generated',
      description: 'Database Management Relational Algebra graph is ready.',
      time: '2h ago',
      icon: Sparkles,
      unread: true,
      link: '/mind-map',
    },
    {
      id: 3,
      title: 'Weekly Revision Goal',
      description: 'You completed 48 of 65 topics! Keep up the 7-day streak.',
      time: '1d ago',
      icon: CheckCircle2,
      unread: false,
      link: '/progress',
    },
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast.info(`Searching study materials for "${searchQuery}"...`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar Nav */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main Body Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        {/* Dashboard Topbar */}
        <header className="h-16 bg-white border-b border-slate-200/80 px-4 md:px-6 flex items-center justify-between gap-4 sticky top-0 z-30 shrink-0 shadow-2xs">
          {/* Left: Mobile Toggle & Search Bar */}
          <div className="flex items-center gap-3 flex-1 max-w-lg">
            {/* Mobile Sidebar Toggle */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Global Search Bar */}
            <form onSubmit={handleSearchSubmit} className="relative w-full max-w-md hidden sm:block">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                placeholder={t('common.searchPlaceholder', {}, 'Search topics, notes, flashcards, mind maps... (Press Enter)')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-12 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl transition-all duration-200 outline-none placeholder-slate-400 focus:bg-white focus:border-primary-500 focus:ring-2 focus:ring-primary-100/50"
              />
              <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono font-medium text-slate-400 bg-white px-1.5 py-0.5 rounded border border-slate-200 pointer-events-none hidden md:inline">
                ⌘K
              </span>
            </form>
          </div>

          {/* Right: Actions & User Profile */}
          <div className="flex items-center gap-3">
            {/* Quick Upload Action */}
            <Link
              to="/upload"
              className="hidden md:inline-flex items-center gap-1.5 text-xs font-semibold text-primary-600 bg-primary-50 hover:bg-primary-100 border border-primary-200 px-3 py-1.5 rounded-xl transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{t('common.uploadNotes', {}, 'Upload Notes')}</span>
            </Link>

            {/* Notification Bell with Flyout */}
            <div className="relative" ref={notificationRef}>
              <button
                onClick={() => setNotificationOpen(!notificationOpen)}
                className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors relative cursor-pointer"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary-600 rounded-full ring-2 ring-white" />
              </button>

              {/* Notification Popover Panel */}
              {notificationOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl border border-slate-200 bg-white shadow-xl z-50 animate-in fade-in zoom-in-95 duration-150 overflow-hidden">
                  <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
                    <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <span>{t('common.notifications', {}, 'Notifications')}</span>
                      <span className="text-[10px] px-1.5 py-0.5 bg-primary-100 text-primary-700 font-bold rounded-full">
                        2 new
                      </span>
                    </h4>
                    <button
                      onClick={() => toast.info('All notifications marked as read')}
                      className="text-[11px] font-medium text-primary-600 hover:text-primary-700 cursor-pointer"
                    >
                      Mark all as read
                    </button>
                  </div>

                  <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                    {notifications.map((n) => {
                      const Icon = n.icon;
                      return (
                        <Link
                          key={n.id}
                          to={n.link}
                          onClick={() => setNotificationOpen(false)}
                          className={`flex items-start gap-3 p-3.5 hover:bg-slate-50 transition-colors ${
                            n.unread ? 'bg-primary-50/30' : ''
                          }`}
                        >
                          <div className="p-2 rounded-xl bg-primary-50 text-primary-600 shrink-0">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h5 className="text-xs font-bold text-slate-900 truncate">
                                {n.title}
                              </h5>
                              <span className="text-[10px] text-slate-400 shrink-0 ml-1">
                                {n.time}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                              {n.description}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>

                  <div className="p-2 text-center border-t border-slate-100 bg-slate-50">
                    <Link
                      to="/progress"
                      onClick={() => setNotificationOpen(false)}
                      className="text-xs font-semibold text-primary-600 hover:text-primary-700 block"
                    >
                      View Revision Analytics →
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto animate-in fade-in duration-300">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

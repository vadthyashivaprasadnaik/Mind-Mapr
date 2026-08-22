import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BrainCircuit, Menu, X } from 'lucide-react';
import Button from '../ui/Button';
import { useUser } from '../../context/UserContext';
import { useLanguage } from '../../context/LanguageContext';

export default function Navbar() {
  const location = useLocation();
  const { isLoggedIn } = useUser();
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = React.useState(false);

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { label: t('titles.features', {}, 'Features'), path: '/features' },
    { label: t('titles.howItWorks', {}, 'How It Works'), path: '/how-it-works' },
    { label: t('titles.about', {}, 'About'), path: '/about' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center shrink-0">
            <Link
              to={isLoggedIn ? '/dashboard' : '/'}
              className="flex items-center gap-2.5 group"
            >
              <div className="p-2 rounded-xl bg-primary-50 text-primary-600 transition-all duration-300 group-hover:bg-primary-100 group-hover:rotate-6">
                <BrainCircuit className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-800">
                Mind <span className="text-primary-600">Mapr</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`
                  text-sm font-semibold transition-colors duration-200 py-2 relative
                  ${isActive(link.path) 
                    ? 'text-primary-600 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary-600 after:rounded-full' 
                    : 'text-slate-600 hover:text-slate-900'
                  }
                `}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="sm">
                {t('auth.login', {}, 'Log in')}
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="primary" size="sm">
                {t('auth.signUp', {}, 'Get Started')}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className="text-slate-500 hover:text-slate-800 hover:bg-slate-50 p-2 rounded-xl transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white/95 backdrop-blur-md animate-in slide-in-from-top-4 duration-200">
          <div className="px-4 pt-2.5 pb-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`
                  px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors
                  ${isActive(link.path) 
                    ? 'bg-primary-50 text-primary-700' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }
                `}
              >
                {link.label}
              </Link>
            ))}
            <div className="h-px bg-slate-100 my-2" />
            <div className="grid grid-cols-2 gap-3 mt-1">
              <Link to="/login" onClick={() => setIsOpen(false)}>
                <Button variant="outline" size="sm" className="w-full">
                  {t('auth.login', {}, 'Log in')}
                </Button>
              </Link>
              <Link to="/register" onClick={() => setIsOpen(false)}>
                <Button variant="primary" size="sm" className="w-full">
                  {t('auth.signUp', {}, 'Sign up')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

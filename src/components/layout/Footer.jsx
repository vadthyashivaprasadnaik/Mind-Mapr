import React from 'react';
import { Link } from 'react-router-dom';
import { BrainCircuit } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
          {/* Brand & Tagline */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="p-2 rounded-xl bg-primary-50 text-primary-600 transition-all duration-300 group-hover:bg-primary-100 group-hover:rotate-6">
                <BrainCircuit className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">
                Mind <span className="text-primary-600">Mapr</span>
              </span>
            </Link>
            <p className="mt-3 text-sm font-semibold text-slate-800 tracking-tight">
              Learn. Map. Recall. Master.
            </p>
            <p className="mt-1 text-xs text-slate-500 max-w-sm leading-relaxed">
              Smart revision assistant that transforms your study materials into personalized revision resources.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm font-medium text-slate-600">
            <Link to="/features" className="hover:text-primary-600 transition-colors">
              Features
            </Link>
            <Link to="/how-it-works" className="hover:text-primary-600 transition-colors">
              How It Works
            </Link>
            <Link to="/about" className="hover:text-primary-600 transition-colors">
              About
            </Link>
            <Link to="/login" className="hover:text-primary-600 transition-colors">
              Login
            </Link>
            <Link to="/register" className="hover:text-primary-600 transition-colors">
              Register
            </Link>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Mind Mapr. Project-Based Learning (PBL) Academic EdTech Assistant.</p>
          <p className="text-slate-400">Designed for college students.</p>
        </div>
      </div>
    </footer>
  );
}

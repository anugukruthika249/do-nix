
import React from 'react';

interface HeaderProps {
  onNavigate: (tab: 'home' | 'app') => void;
  activeTab: string;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, activeTab }) => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => onNavigate('home')}
        >
          <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">Donix</span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <button 
            onClick={() => onNavigate('home')}
            className={`${activeTab === 'home' ? 'text-red-600' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Home
          </button>
          <button className="text-slate-600 hover:text-slate-900">Hospitals</button>
          <button 
            onClick={() => onNavigate('app')}
            className={`px-5 py-2.5 rounded-full transition-all ${
              activeTab === 'app' 
                ? 'bg-red-600 text-white shadow-lg' 
                : 'bg-red-50 text-red-600 hover:bg-red-100'
            }`}
          >
            Emergency Portal
          </button>
        </nav>

        <button className="md:hidden text-slate-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
    </header>
  );
};
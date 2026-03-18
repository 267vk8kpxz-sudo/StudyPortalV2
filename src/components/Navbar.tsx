import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, ShieldCheck, Search, LifeBuoy } from 'lucide-react';

export const Navbar: React.FC = () => {
  return (
    <nav className="bg-zinc-900 border-b border-zinc-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="p-2 bg-emerald-500 rounded-lg group-hover:rotate-12 transition-transform">
                <Gamepad2 className="w-6 h-6 text-black" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">StudyPortal</span>
            </Link>

            <Link to="/games" className="text-zinc-400 hover:text-white text-sm font-bold uppercase tracking-widest hidden sm:block">
              Games
            </Link>
            
            <Link to="/support" className="text-zinc-400 hover:text-white text-sm font-bold uppercase tracking-widest hidden sm:block">
              Support
            </Link>
          </div>

          <div className="flex-1 max-w-md mx-8 hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                placeholder="Search games..."
                className="w-full bg-zinc-800 border-none rounded-full py-2 pl-10 pr-4 text-sm text-zinc-200 focus:ring-2 focus:ring-emerald-500 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/admin"
              className="p-2 text-zinc-400 hover:text-emerald-500 transition-colors"
              title="Admin Panel"
            >
              <ShieldCheck className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

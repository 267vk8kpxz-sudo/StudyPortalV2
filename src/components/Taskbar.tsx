import React, { useState } from 'react';
import { 
  Gamepad2, 
  Globe, 
  Settings as SettingsIcon, 
  LayoutGrid, 
  Monitor, 
  Search,
  X,
  Maximize2,
  Shield,
  Tv,
  Share2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { onSnapshot, query, where } from 'firebase/firestore';
import { gamesCollection } from '../firebase';
import { Game } from '../types';

export const Taskbar: React.FC = () => {
  const navigate = useNavigate();
  const [activeApp, setActiveApp] = useState<string | null>(null);
  const [showBrowser, setShowBrowser] = useState(false);
  const [showApps, setShowApps] = useState(false);
  const [browserUrl, setBrowserUrl] = useState('https://www.google.com/search?igu=1');
  const [tempUrl, setTempUrl] = useState('');
  const [dynamicApps, setDynamicApps] = useState<Game[]>([]);

  React.useEffect(() => {
    const handleOpenBrowser = () => setShowBrowser(true);
    window.addEventListener('open-browser', handleOpenBrowser);
    return () => window.removeEventListener('open-browser', handleOpenBrowser);
  }, []);

  React.useEffect(() => {
    const q = query(gamesCollection, where('category', 'in', ['Streaming', 'Social']));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const appsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Game[];
      setDynamicApps(appsData);
    });

    return () => unsubscribe();
  }, []);

  const handleBrowserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let url = tempUrl;
    if (!url.startsWith('http')) url = 'https://' + url;
    setBrowserUrl(url);
  };

  const scrollToGames = () => {
    if (window.location.pathname !== '/games') {
      navigate('/games');
      // Small delay to allow navigation to complete
      setTimeout(() => {
        document.getElementById('games-grid')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById('games-grid')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    if (window.location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  return (
    <>
      {/* Apps Menu Modal */}
      <AnimatePresence>
        {showApps && (
          <>
            <div 
              className="fixed inset-0 z-[55] bg-black/20 backdrop-blur-sm" 
              onClick={() => setShowApps(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[60] w-[90vw] max-w-lg bg-zinc-900/90 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <LayoutGrid className="w-5 h-5 text-emerald-500" />
                  App Launcher
                </h2>
                <button onClick={() => setShowApps(false)} className="text-zinc-500 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                <button 
                  onClick={() => { scrollToTop(); setShowApps(false); }}
                  className="flex flex-col items-center gap-2 p-4 rounded-2xl hover:bg-white/5 transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
                    <Monitor className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-medium text-zinc-400">Desktop</span>
                </button>

                <button 
                  onClick={() => { scrollToGames(); setShowApps(false); }}
                  className="flex flex-col items-center gap-2 p-4 rounded-2xl hover:bg-white/5 transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
                    <Gamepad2 className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-medium text-zinc-400">Games</span>
                </button>

                <button 
                  onClick={() => { setShowBrowser(true); setShowApps(false); }}
                  className="flex flex-col items-center gap-2 p-4 rounded-2xl hover:bg-white/5 transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
                    <Globe className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-medium text-zinc-400">Browser</span>
                </button>

                <Link 
                  to="/settings"
                  onClick={() => setShowApps(false)}
                  className="flex flex-col items-center gap-2 p-4 rounded-2xl hover:bg-white/5 transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
                    <SettingsIcon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-medium text-zinc-400">Settings</span>
                </Link>

                <Link 
                  to="/admin"
                  onClick={() => setShowApps(false)}
                  className="flex flex-col items-center gap-2 p-4 rounded-2xl hover:bg-white/5 transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
                    <Shield className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-medium text-zinc-400">Admin</span>
                </Link>

                {/* Dynamic Apps */}
                {dynamicApps.map((app) => (
                  <Link 
                    key={app.id}
                    to={`/play/${app.id}`}
                    onClick={() => setShowApps(false)}
                    className="flex flex-col items-center gap-2 p-4 rounded-2xl hover:bg-white/5 transition-all group"
                  >
                    <div className={`w-12 h-12 rounded-xl ${app.category === 'Streaming' ? 'bg-indigo-500/10 text-indigo-500' : 'bg-sky-500/10 text-sky-500'} flex items-center justify-center group-hover:scale-110 transition-transform overflow-hidden`}>
                      {app.thumbnailUrl ? (
                        <img src={app.thumbnailUrl} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      ) : (
                        app.category === 'Streaming' ? <Tv className="w-6 h-6" /> : <Share2 className="w-6 h-6" />
                      )}
                    </div>
                    <span className="text-[10px] font-medium text-zinc-400 truncate w-full text-center">{app.title}</span>
                  </Link>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/5">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input 
                    type="text" 
                    placeholder="Search apps or games..." 
                    className="w-full bg-black/40 border border-zinc-800 rounded-xl py-2 pl-10 pr-4 text-sm text-zinc-300 focus:ring-1 focus:ring-emerald-500 outline-none"
                  />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Browser Window Modal */}
      <AnimatePresence>
        {showBrowser && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-4 md:inset-10 z-[60] bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="bg-zinc-800 p-3 flex items-center justify-between border-b border-zinc-700">
              <div className="flex items-center gap-4 flex-1">
                <div className="flex gap-1.5">
                  <button onClick={() => setShowBrowser(false)} className="w-3 h-3 rounded-full bg-rose-500 hover:bg-rose-400 transition-colors" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                </div>
                <form onSubmit={handleBrowserSubmit} className="flex-1 max-w-xl">
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
                    <input
                      type="text"
                      value={tempUrl}
                      onChange={(e) => setTempUrl(e.target.value)}
                      placeholder={browserUrl}
                      className="w-full bg-black/40 border border-zinc-700 rounded-lg py-1.5 pl-9 pr-4 text-xs text-zinc-300 focus:ring-1 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                </form>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <button className="p-1.5 text-zinc-400 hover:text-white transition-colors">
                  <Maximize2 className="w-4 h-4" />
                </button>
                <button onClick={() => setShowBrowser(false)} className="p-1.5 text-zinc-400 hover:text-white transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="flex-1 bg-white">
              <iframe
                src={browserUrl}
                className="w-full h-full border-none"
                title="Browser"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Taskbar */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <motion.div 
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-2 flex items-center gap-1 shadow-2xl"
        >
          {/* Start / Home */}
          <button 
            onClick={scrollToTop}
            className="p-3 text-zinc-400 hover:text-emerald-500 hover:bg-white/5 rounded-xl transition-all group relative"
          >
            <Monitor className="w-6 h-6" />
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-zinc-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
              Desktop
            </span>
          </button>

          <div className="w-px h-6 bg-white/10 mx-1" />

          {/* Games */}
          <button 
            onClick={scrollToGames}
            className="p-3 text-zinc-400 hover:text-emerald-500 hover:bg-white/5 rounded-xl transition-all group relative"
          >
            <Gamepad2 className="w-6 h-6" />
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-zinc-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
              Games
            </span>
          </button>

          {/* Apps */}
          <button 
            onClick={() => setShowApps(!showApps)}
            className={`p-3 rounded-xl transition-all group relative ${showApps ? 'text-emerald-500 bg-white/10' : 'text-zinc-400 hover:text-emerald-500 hover:bg-white/5'}`}
          >
            <LayoutGrid className="w-6 h-6" />
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-zinc-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
              Apps
            </span>
          </button>

          {/* Browser */}
          <button 
            onClick={() => setShowBrowser(true)}
            className={`p-3 rounded-xl transition-all group relative ${showBrowser ? 'text-emerald-500 bg-white/10' : 'text-zinc-400 hover:text-emerald-500 hover:bg-white/5'}`}
          >
            <Globe className="w-6 h-6" />
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-zinc-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
              Browser
            </span>
          </button>

          <div className="w-px h-6 bg-white/10 mx-1" />

          {/* Settings */}
          <Link 
            to="/settings"
            className="p-3 text-zinc-400 hover:text-emerald-500 hover:bg-white/5 rounded-xl transition-all group relative"
          >
            <SettingsIcon className="w-6 h-6" />
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-zinc-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
              Settings
            </span>
          </Link>

          {/* Search */}
          <button 
            onClick={() => setShowApps(true)}
            className="p-3 text-zinc-400 hover:text-emerald-500 hover:bg-white/5 rounded-xl transition-all group relative"
          >
            <Search className="w-6 h-6" />
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-zinc-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
              Search
            </span>
          </button>
        </motion.div>
      </div>
    </>
  );
};

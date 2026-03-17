import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Gamepad2, 
  Globe, 
  Settings as SettingsIcon, 
  Shield, 
  Monitor,
  LayoutGrid,
  Clock as ClockIcon,
  Tv,
  Share2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext';
import { onSnapshot, query, where } from 'firebase/firestore';
import { gamesCollection, handleFirestoreError, OperationType } from '../firebase';
import { Game } from '../types';

export const Desktop: React.FC = () => {
  const { wallpaper } = useSettings();
  const [time, setTime] = useState(new Date());
  const [dynamicApps, setDynamicApps] = useState<Game[]>([]);

  const openBrowser = () => {
    window.dispatchEvent(new CustomEvent('open-browser'));
  };

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const q = query(gamesCollection, where('category', 'in', ['Streaming', 'Social']));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const appsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Game[];
      setDynamicApps(appsData);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'games');
    });

    return () => unsubscribe();
  }, []);

  const staticApps = [
    { id: 'games', name: 'Games Hub', icon: Gamepad2, path: '/games', color: 'bg-emerald-500' },
    { id: 'browser', name: 'Browser', icon: Globe, path: '#', color: 'bg-blue-500', isAction: true, action: openBrowser },
    { id: 'settings', name: 'Settings', icon: SettingsIcon, path: '/settings', color: 'bg-zinc-700' },
    { id: 'admin', name: 'Admin', icon: Shield, path: '/admin', color: 'bg-rose-500' },
  ];

  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Wallpaper */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
        style={{ backgroundImage: `url(${wallpaper})` }}
      >
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />
      </div>

      {/* Desktop Icons Grid */}
      <div className="relative z-10 p-8 h-full overflow-y-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-8 auto-rows-max">
          {/* Static System Apps */}
          {staticApps.map((app, index) => (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              {app.isAction ? (
                <button 
                  onClick={app.action}
                  className="w-full flex flex-col items-center gap-2 group"
                >
                  <div className={`w-16 h-16 ${app.color} rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform group-active:scale-95`}>
                    <app.icon className="w-8 h-8" />
                  </div>
                  <span className="text-[10px] font-bold text-white drop-shadow-md tracking-wide uppercase text-center">
                    {app.name}
                  </span>
                </button>
              ) : (
                <Link to={app.path} className="flex flex-col items-center gap-2 group">
                  <div className={`w-16 h-16 ${app.color} rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform group-active:scale-95`}>
                    <app.icon className="w-8 h-8" />
                  </div>
                  <span className="text-[10px] font-bold text-white drop-shadow-md tracking-wide uppercase text-center">
                    {app.name}
                  </span>
                </Link>
              )}
            </motion.div>
          ))}

          {/* Dynamic Apps (Streaming/Social) */}
          {dynamicApps.map((app, index) => (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: (staticApps.length + index) * 0.05 }}
            >
              <Link to={`/play/${app.id}`} className="flex flex-col items-center gap-2 group">
                <div className={`w-16 h-16 ${app.category === 'Streaming' ? 'bg-indigo-600' : 'bg-sky-500'} rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform group-active:scale-95 overflow-hidden`}>
                  {app.thumbnailUrl ? (
                    <img src={app.thumbnailUrl} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  ) : (
                    app.category === 'Streaming' ? <Tv className="w-8 h-8" /> : <Share2 className="w-8 h-8" />
                  )}
                </div>
                <span className="text-[10px] font-bold text-white drop-shadow-md tracking-wide uppercase text-center line-clamp-1">
                  {app.title}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Clock Widget */}
        <div className="absolute bottom-32 right-12 text-right hidden md:block">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-black/40 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl"
          >
            <div className="text-6xl font-light tracking-tighter text-white mb-2">
              {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
            <div className="text-emerald-500 font-bold uppercase tracking-widest text-xs">
              {time.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

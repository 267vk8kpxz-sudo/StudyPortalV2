import React from 'react';
import { 
  Palette, 
  Zap, 
  Ghost, 
  AlertTriangle,
  Settings as SettingsIcon,
  Shield,
  Image as ImageIcon
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext';

export const Settings: React.FC = () => {
  const { 
    theme, setTheme, 
    performance, setPerformance, 
    isStealthMode, setStealthMode,
    panicKey, setPanicKey,
    wallpaper, setWallpaper
  } = useSettings();

  const wallpapers = [
    { name: 'Abstract Blue', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop' },
    { name: 'Dark Mountain', url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2670&auto=format&fit=crop' },
    { name: 'Cyberpunk', url: 'https://images.unsplash.com/photo-1605142859862-978be7eba909?q=80&w=2670&auto=format&fit=crop' },
    { name: 'Minimal Nature', url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=2674&auto=format&fit=crop' },
    { name: 'Deep Space', url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-20">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <SettingsIcon className="w-8 h-8 text-emerald-500" />
          Settings
        </h1>
        <p className="text-zinc-500 text-sm mt-1">Personalize your experience and stealth options.</p>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Color Schemes */}
        <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800 space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <Palette className="w-5 h-5 text-emerald-500" />
            <h2 className="font-bold">Color Schemes</h2>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {(['Emerald', 'Ruby', 'Sapphire', 'Amethyst', 'Gold'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`aspect-square rounded-lg border-2 transition-all ${
                  theme === t ? 'border-white scale-110 shadow-lg' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
                style={{ 
                  backgroundColor: 
                    t === 'Emerald' ? '#10b981' : 
                    t === 'Ruby' ? '#f43f5e' : 
                    t === 'Sapphire' ? '#3b82f6' : 
                    t === 'Amethyst' ? '#a855f7' : '#eab308' 
                }}
                title={t}
              />
            ))}
          </div>
          <p className="text-xs text-zinc-500">Choose a primary accent color for the interface.</p>
        </div>

        {/* Wallpaper */}
        <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800 space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <ImageIcon className="w-5 h-5 text-emerald-500" />
            <h2 className="font-bold">Desktop Wallpaper</h2>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {wallpapers.map((wp) => (
              <button
                key={wp.name}
                onClick={() => setWallpaper(wp.url)}
                className={`aspect-square rounded-lg border-2 overflow-hidden transition-all ${
                  wallpaper === wp.url ? 'border-white scale-110 shadow-lg' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
                title={wp.name}
              >
                <img src={wp.url} alt={wp.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </button>
            ))}
          </div>
          <div className="pt-2">
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 block">Custom Wallpaper URL</label>
            <input 
              type="url"
              placeholder="https://..."
              value={wallpapers.find(w => w.url === wallpaper) ? '' : wallpaper}
              onChange={(e) => setWallpaper(e.target.value)}
              className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-2 text-sm text-zinc-300 focus:ring-1 focus:ring-emerald-500 outline-none"
            />
          </div>
          <p className="text-xs text-zinc-500">Select a background or paste a direct image link.</p>
        </div>

        {/* Performance */}
        <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800 space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <Zap className="w-5 h-5 text-emerald-500" />
            <h2 className="font-bold">Performance</h2>
          </div>
          <div className="flex flex-col gap-2">
            {(['High', 'Balanced', 'Eco'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setPerformance(mode)}
                className={`flex items-center justify-between px-4 py-2 rounded-xl border transition-all ${
                  performance === mode 
                    ? 'bg-emerald-500/10 border-emerald-500 text-emerald-500' 
                    : 'bg-black/40 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                }`}
              >
                <span className="text-sm font-medium">{mode}</span>
                {performance === mode && <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />}
              </button>
            ))}
          </div>
          <p className="text-xs text-zinc-500">Eco mode disables heavy animations to save battery.</p>
        </div>

        {/* Stealth Mode */}
        <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800 space-y-4 md:col-span-2">
          <div className="flex items-center gap-3 mb-2">
            <Ghost className="w-5 h-5 text-emerald-500" />
            <h2 className="font-bold">Stealth Mode</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <button
                onClick={() => setStealthMode(!isStealthMode)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all ${
                  isStealthMode 
                    ? 'bg-emerald-500/10 border-emerald-500 text-emerald-500' 
                    : 'bg-black/40 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                }`}
              >
                <span className="text-sm font-medium">Mask Tab & Title</span>
                <div className={`w-10 h-5 rounded-full relative transition-colors ${isStealthMode ? 'bg-emerald-500' : 'bg-zinc-700'}`}>
                  <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${isStealthMode ? 'left-6' : 'left-1'}`} />
                </div>
              </button>
              <p className="text-xs text-zinc-500">Changes the page title and icon to "Google Classroom" to blend in.</p>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Panic Key (Kill Button)</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    maxLength={1}
                    value={panicKey}
                    onChange={(e) => setPanicKey(e.target.value)}
                    className="w-12 bg-black border border-zinc-800 rounded-lg px-2 py-1.5 text-center text-emerald-500 font-mono text-sm focus:ring-1 focus:ring-emerald-500 outline-none"
                  />
                  <div className="flex-1 flex items-center gap-2 px-3 py-1.5 bg-rose-500/10 border border-rose-500/20 rounded-lg text-rose-500 text-[10px] font-bold">
                    <AlertTriangle className="w-3 h-3" />
                    REDIRECTS TO GOOGLE CLASSROOM
                  </div>
                </div>
              </div>
              <p className="text-xs text-zinc-500">Pressing this key instantly leaves the site.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-12 border-t border-zinc-900 flex justify-center">
        <Link 
          to="/admin" 
          className="flex items-center gap-2 text-zinc-700 hover:text-zinc-500 transition-colors text-xs font-medium uppercase tracking-widest"
        >
          <Shield className="w-3 h-3" />
          Admin Portal
        </Link>
      </div>
    </div>
  );
};

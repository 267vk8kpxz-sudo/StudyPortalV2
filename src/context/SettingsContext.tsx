import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'Emerald' | 'Ruby' | 'Sapphire' | 'Amethyst' | 'Gold';
type PerformanceMode = 'High' | 'Balanced' | 'Eco';

interface SettingsContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  performance: PerformanceMode;
  setPerformance: (mode: PerformanceMode) => void;
  isStealthMode: boolean;
  setStealthMode: (enabled: boolean) => void;
  panicKey: string;
  setPanicKey: (key: string) => void;
  wallpaper: string;
  setWallpaper: (url: string) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem('portal-theme') as Theme) || 'Emerald');
  const [performance, setPerformance] = useState<PerformanceMode>(() => (localStorage.getItem('portal-perf') as PerformanceMode) || 'Balanced');
  const [isStealthMode, setStealthMode] = useState(() => localStorage.getItem('portal-stealth') === 'true');
  const [panicKey, setPanicKey] = useState(() => localStorage.getItem('portal-panic-key') || '`');
  const [wallpaper, setWallpaper] = useState(() => localStorage.getItem('portal-wallpaper') || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop');

  useEffect(() => {
    localStorage.setItem('portal-theme', theme);
    document.documentElement.setAttribute('data-theme', theme.toLowerCase());
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('portal-perf', performance);
  }, [performance]);

  useEffect(() => {
    localStorage.setItem('portal-stealth', String(isStealthMode));
    if (isStealthMode) {
      document.title = 'Google Classroom';
      const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
      if (link) link.href = 'https://ssl.gstatic.com/classroom/favicon.png';
    } else {
      document.title = 'StudyPortal';
      const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
      if (link) link.href = 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🎮</text></svg>';
    }
  }, [isStealthMode]);

  useEffect(() => {
    localStorage.setItem('portal-panic-key', panicKey);
  }, [panicKey]);

  useEffect(() => {
    localStorage.setItem('portal-wallpaper', wallpaper);
  }, [wallpaper]);

  // Global Panic Key Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === panicKey) {
        window.location.href = 'https://classroom.google.com';
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [panicKey]);

  return (
    <SettingsContext.Provider value={{ 
      theme, setTheme, 
      performance, setPerformance, 
      isStealthMode, setStealthMode,
      panicKey, setPanicKey,
      wallpaper, setWallpaper
    }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) throw new Error('useSettings must be used within a SettingsProvider');
  return context;
};

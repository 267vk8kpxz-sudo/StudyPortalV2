import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Taskbar } from './components/Taskbar';
import { Desktop } from './pages/Desktop';
import { GamesHub } from './pages/GamesHub';
import { PlayGame } from './pages/PlayGame';
import { Admin } from './pages/Admin';
import { Settings } from './pages/Settings';

function AppContent() {
  const location = useLocation();
  const isDesktop = location.pathname === '/';

  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans selection:bg-emerald-500/30 pb-24">
      {!isDesktop && <Navbar />}
      <main className={`${isDesktop ? '' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'}`}>
        <Routes>
          <Route path="/" element={<Desktop />} />
          <Route path="/games" element={<GamesHub />} />
          <Route path="/play/:id" element={<PlayGame />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
      
      <Taskbar />
      
      {!isDesktop && (
        <footer className="border-t border-zinc-900 py-12 mt-20 mb-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-zinc-600 text-sm">
              &copy; {new Date().getFullYear()} StudyPortal. For educational purposes only.
            </p>
          </div>
        </footer>
      )}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

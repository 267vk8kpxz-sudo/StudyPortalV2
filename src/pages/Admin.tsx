import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Plus, 
  Trash2, 
  Edit2, 
  X, 
  LogOut, 
  Loader2, 
  Gamepad2,
  LogIn
} from 'lucide-react';
import { Game, CATEGORIES, Category } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { onSnapshot, query, orderBy } from 'firebase/firestore';
import { gamesCollection, addGame, deleteGame, handleFirestoreError, OperationType, auth, signInWithGoogle, signOut } from '../firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

export const Admin: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [error, setError] = useState('');
  const [games, setGames] = useState<Game[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(true);
  
  // Form state
  const [newGame, setNewGame] = useState<Partial<Game>>({
    title: '',
    description: '',
    thumbnailUrl: '',
    gameUrl: '',
    htmlContent: '',
    type: 'url',
    category: 'Action'
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setNewGame({ ...newGame, htmlContent: content, type: 'html' });
    };
    reader.readAsText(file);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsAuthorized(!!user);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!isAuthorized) return;

    const q = query(gamesCollection, orderBy('addedAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const gamesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Game[];
      setGames(gamesData);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'games');
      setLoading(false);
    });

    return () => unsubscribe();
  }, [isAuthorized]);

  const handleLogin = async () => {
    try {
      await signInWithGoogle();
      setError('');
    } catch (err) {
      setError('Authentication failed. Please try again.');
    }
  };

  const handleLogout = async () => {
    await signOut();
    setIsAuthorized(false);
  };

  const handleAddGame = async (e: React.FormEvent) => {
    e.preventDefault();
    const gameData = {
      title: newGame.title || 'Untitled Game',
      description: newGame.description || '',
      thumbnailUrl: newGame.thumbnailUrl || '',
      gameUrl: newGame.type === 'url' ? (newGame.gameUrl || '') : '',
      htmlContent: newGame.type === 'html' ? (newGame.htmlContent || '') : '',
      type: newGame.type || 'url',
      category: (newGame.category as Category) || 'Action',
      addedAt: Date.now()
    };
    
    await addGame(gameData);
    setIsAdding(false);
    setNewGame({ title: '', description: '', thumbnailUrl: '', gameUrl: '', htmlContent: '', type: 'url', category: 'Action' });
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this game?')) {
      await deleteGame(id);
    }
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center py-40">
        <Loader2 className="w-10 h-10 text-emerald-500 animate-spin" />
      </div>
    );
  }

  if (!isAuthorized) {
    return (
      <div className="max-w-md mx-auto py-20">
        <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800 shadow-2xl">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="p-4 bg-emerald-500/10 rounded-2xl mb-4">
              <Shield className="w-8 h-8 text-emerald-500" />
            </div>
            <h1 className="text-2xl font-bold">Admin Portal</h1>
            <p className="text-zinc-500 text-sm mt-2">Sign in with an authorized account to manage games.</p>
          </div>

          <div className="space-y-4">
            <button
              onClick={handleLogin}
              className="w-full flex items-center justify-center gap-3 bg-white hover:bg-zinc-200 text-black font-bold py-3 rounded-xl transition-all"
            >
              <LogIn className="w-5 h-5" />
              Sign in with Google
            </button>
            {error && <p className="text-rose-500 text-xs font-medium text-center">{error}</p>}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Gamepad2 className="w-8 h-8 text-emerald-500" />
            Game Management
          </h1>
          <p className="text-zinc-500 text-sm mt-1">Logged in as {user?.email}</p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 px-6 py-2.5 bg-emerald-500 text-black font-bold rounded-xl hover:bg-emerald-400 transition-all"
          >
            <Plus className="w-4 h-4" />
            Add New Game
          </button>
          <button
            onClick={handleLogout}
            className="p-2.5 bg-zinc-900 text-zinc-400 hover:text-rose-500 rounded-xl border border-zinc-800 transition-all"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isAdding && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-zinc-900 rounded-2xl p-8 border border-zinc-800 shadow-xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Add Game Details</h2>
              <button onClick={() => setIsAdding(false)} className="text-zinc-500 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleAddGame} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Game Title</label>
                  <input
                    required
                    type="text"
                    value={newGame.title}
                    onChange={(e) => setNewGame({ ...newGame, title: e.target.value })}
                    className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-2.5 text-zinc-200 focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Category</label>
                  <select
                    value={newGame.category}
                    onChange={(e) => setNewGame({ ...newGame, category: e.target.value as Category })}
                    className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-2.5 text-zinc-200 focus:ring-2 focus:ring-emerald-500 outline-none"
                  >
                    {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">App Type</label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setNewGame({ ...newGame, type: 'url' })}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                        newGame.type === 'url' ? 'bg-emerald-500 text-black' : 'bg-black text-zinc-500 border border-zinc-800'
                      }`}
                    >
                      URL
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewGame({ ...newGame, type: 'html' })}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                        newGame.type === 'html' ? 'bg-emerald-500 text-black' : 'bg-black text-zinc-500 border border-zinc-800'
                      }`}
                    >
                      HTML File
                    </button>
                  </div>
                </div>
                {newGame.type === 'url' ? (
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Game URL (Iframe Source)</label>
                    <input
                      required={newGame.type === 'url'}
                      type="url"
                      value={newGame.gameUrl}
                      onChange={(e) => setNewGame({ ...newGame, gameUrl: e.target.value })}
                      className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-2.5 text-zinc-200 focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Upload HTML File</label>
                    <input
                      required={newGame.type === 'html' && !newGame.htmlContent}
                      type="file"
                      accept=".html"
                      onChange={handleFileUpload}
                      className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-2 text-zinc-200 focus:ring-2 focus:ring-emerald-500 outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-zinc-800 file:text-zinc-400 hover:file:bg-zinc-700"
                    />
                    {newGame.htmlContent && (
                      <p className="text-[10px] text-emerald-500 mt-2 font-bold uppercase tracking-widest">
                        ✓ HTML File Loaded ({Math.round(newGame.htmlContent.length / 1024)} KB)
                      </p>
                    )}
                  </div>
                )}
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Thumbnail URL</label>
                  <input
                    type="url"
                    value={newGame.thumbnailUrl}
                    onChange={(e) => setNewGame({ ...newGame, thumbnailUrl: e.target.value })}
                    className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-2.5 text-zinc-200 focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Description</label>
                  <textarea
                    rows={4}
                    value={newGame.description}
                    onChange={(e) => setNewGame({ ...newGame, description: e.target.value })}
                    className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-2.5 text-zinc-200 focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
                  />
                </div>
              </div>

              <div className="md:col-span-2 flex justify-end gap-4 mt-4">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="px-6 py-2.5 bg-zinc-800 text-zinc-400 font-bold rounded-xl hover:bg-zinc-700 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-8 py-2.5 bg-emerald-500 text-black font-bold rounded-xl hover:bg-emerald-400 transition-all"
                >
                  Save Game
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-black/40 border-b border-zinc-800">
              <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Game</th>
              <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Added On</th>
              <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {loading ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center">
                  <Loader2 className="w-6 h-6 text-emerald-500 animate-spin mx-auto" />
                </td>
              </tr>
            ) : games.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-zinc-500">
                  No games added yet. Click "Add New Game" to get started.
                </td>
              </tr>
            ) : (
              games.map((game) => (
                <tr key={game.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={game.thumbnailUrl || 'https://picsum.photos/seed/game/40/40'} alt="" className="w-10 h-10 rounded object-cover bg-black" />
                      <span className="font-medium">{game.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                      game.type === 'html' ? 'bg-blue-500/10 text-blue-500' : 'bg-amber-500/10 text-amber-500'
                    }`}>
                      {game.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-zinc-800 text-zinc-400 rounded text-[10px] font-bold uppercase">
                      {game.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-zinc-500 text-sm">
                    {new Date(game.addedAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 text-zinc-400 hover:text-emerald-500 transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(game.id)}
                        className="p-2 text-zinc-400 hover:text-rose-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

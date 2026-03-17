import React, { useState, useEffect } from 'react';
import { GameCard } from '../components/GameCard';
import { Game, Category, CATEGORIES } from '../types';
import { LayoutGrid, Flame, Clock, Loader2 } from 'lucide-react';
import { onSnapshot, query, orderBy } from 'firebase/firestore';
import { gamesCollection, handleFirestoreError, OperationType } from '../firebase';

export const GamesHub: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(gamesCollection, orderBy('addedAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const gamesData = snapshot.docs
        .map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        .filter(g => !['Streaming', 'Social'].includes((g as Game).category)) as Game[];
      setGames(gamesData);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'games');
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const filteredGames = selectedCategory === 'All' 
    ? games 
    : games.filter(g => g.category === selectedCategory);

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800 p-8 md:p-12">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-bold uppercase tracking-wider mb-6">
            <Flame className="w-3 h-3" />
            Trending Now
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
            The Ultimate <span className="text-emerald-500">Unblocked</span> Gaming Hub.
          </h1>
          <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
            Access hundreds of high-quality games directly in your browser. No downloads, no blocks, just pure fun.
          </p>
          <button 
            onClick={() => document.getElementById('games-grid')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-xl transition-all transform hover:scale-105 active:scale-95"
          >
            Start Playing
          </button>
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-full hidden lg:block opacity-20">
           <div className="absolute inset-0 bg-gradient-to-l from-black to-transparent z-10" />
           <img 
             src="https://picsum.photos/seed/hero/800/600" 
             alt="Hero" 
             className="w-full h-full object-cover"
             referrerPolicy="no-referrer"
           />
        </div>
      </section>

      {/* Categories */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <LayoutGrid className="w-6 h-6 text-emerald-500" />
            Browse Categories
          </h2>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
              selectedCategory === 'All'
                ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20'
                : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 border border-zinc-800'
            }`}
          >
            All Games
          </button>
          {CATEGORIES.filter(cat => !['Streaming', 'Social'].includes(cat)).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20'
                  : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 border border-zinc-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Game Grid */}
      <section id="games-grid" className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Clock className="w-6 h-6 text-emerald-500" />
            {selectedCategory === 'All' ? 'Recently Added' : `${selectedCategory} Games`}
          </h2>
        </div>
        
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-10 h-10 text-emerald-500 animate-spin" />
            <p className="text-zinc-500">Loading games...</p>
          </div>
        ) : filteredGames.length === 0 ? (
          <div className="text-center py-20 bg-zinc-900/50 rounded-3xl border border-zinc-800">
            <p className="text-zinc-500">No games found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

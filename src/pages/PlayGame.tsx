import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Maximize2, Minimize2, ArrowLeft, Share2, Heart, Loader2 } from 'lucide-react';
import { Game } from '../types';
import { doc, getDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';

export const PlayGame: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGame = async () => {
      if (!id) return;
      try {
        const docRef = doc(db, 'games', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setGame({ id: docSnap.id, ...docSnap.data() } as Game);
        }
      } catch (error) {
        handleFirestoreError(error, OperationType.GET, `games/${id}`);
      } finally {
        setLoading(false);
      }
    };
    fetchGame();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-40 gap-4">
        <Loader2 className="w-10 h-10 text-emerald-500 animate-spin" />
        <p className="text-zinc-500">Loading game portal...</p>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h2 className="text-2xl font-bold mb-4">Game not found</h2>
        <Link to="/" className="text-emerald-500 hover:underline">Return Home</Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-zinc-400 hover:text-emerald-500 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Games
        </Link>
        <div className="flex items-center gap-4">
          <button className="p-2 text-zinc-400 hover:text-emerald-500 transition-colors">
            <Share2 className="w-5 h-5" />
          </button>
          <button className="p-2 text-zinc-400 hover:text-rose-500 transition-colors">
            <Heart className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className={`relative bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl ${isFullscreen ? 'fixed inset-0 z-[100] rounded-none' : 'aspect-video w-full'}`}>
        {game.type === 'html' ? (
          <iframe
            srcDoc={game.htmlContent}
            className="w-full h-full border-none"
            title={game.title}
            allowFullScreen
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          />
        ) : (
          <iframe
            src={game.gameUrl}
            className="w-full h-full border-none"
            title={game.title}
            allowFullScreen
          />
        )}
        
        <div className="absolute bottom-4 right-4 flex gap-2">
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-3 bg-black/60 backdrop-blur-md text-white rounded-xl hover:bg-emerald-500 transition-all"
          >
            {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <div className="bg-zinc-900 rounded-2xl p-8 border border-zinc-800">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{game.title}</h1>
            <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 rounded-full text-xs font-bold uppercase tracking-wider">
              {game.category}
            </span>
          </div>
        </div>
        <p className="text-zinc-400 leading-relaxed max-w-3xl">
          {game.description}
        </p>
      </div>
    </div>
  );
};

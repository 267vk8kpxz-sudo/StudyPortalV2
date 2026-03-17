import React from 'react';
import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';
import { motion } from 'motion/react';
import { Game } from '../types';

interface GameCardProps {
  game: Game;
}

export const GameCard: React.FC<GameCardProps> = ({ game }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 hover:border-emerald-500/50 transition-colors group"
    >
      <Link to={`/play/${game.id}`}>
        <div className="relative aspect-video overflow-hidden">
          <img
            src={game.thumbnailUrl || `https://picsum.photos/seed/${game.id}/400/225`}
            alt={game.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="p-3 bg-emerald-500 rounded-full text-black">
              <Play className="w-6 h-6 fill-current" />
            </div>
          </div>
          <div className="absolute top-2 left-2 px-2 py-1 bg-black/60 backdrop-blur-md rounded text-[10px] uppercase tracking-wider font-bold text-zinc-300">
            {game.category}
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-zinc-100 font-semibold truncate group-hover:text-emerald-400 transition-colors">
            {game.title}
          </h3>
          <p className="text-zinc-500 text-xs mt-1 line-clamp-2 leading-relaxed">
            {game.description}
          </p>
        </div>
      </Link>
    </motion.div>
  );
};

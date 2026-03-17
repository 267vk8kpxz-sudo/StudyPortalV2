export interface Game {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  gameUrl?: string;
  htmlContent?: string;
  type: 'url' | 'html';
  category: string;
  addedAt: number;
}

export type Category = 'Action' | 'Puzzle' | 'Sports' | 'Strategy' | 'Retro' | 'Streaming' | 'Social' | 'Other';

export const CATEGORIES: Category[] = ['Action', 'Puzzle', 'Sports', 'Strategy', 'Retro', 'Streaming', 'Social', 'Other'];

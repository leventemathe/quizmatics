import { Question } from './Question';

export type GameState = 'idle' | 'loading' | 'error' | 'playing' | 'finished';

export interface GameContext {
  questions: Question[];
  currentIndex: number;
  error?: Error;
}

export type GameEvent =
  | { type: 'START' }
  | { type: 'ANSWER'; answer: string }
  | { type: 'RESTART' };

export type FetchQuestions = () => Promise<Question[]>;

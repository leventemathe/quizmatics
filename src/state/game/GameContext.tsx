import React from 'react';
import { Interpreter } from 'xstate';
import { GameContext as GameStateContext, GameEvent } from 'types';

interface GameContextType {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  gameService: Interpreter<GameStateContext, any, GameEvent>;
}

export const GameContext = React.createContext<GameContextType>(
  {} as GameContextType
);

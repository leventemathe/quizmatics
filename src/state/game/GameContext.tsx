import React from 'react';
import { Interpreter } from 'xstate';
import {
  GameContext as GameStateContext,
  GameEvent,
  gameStateMachine,
} from './gameStateMachine';

interface GameContextType {
  gameService: Interpreter<
    GameStateContext,
    typeof gameStateMachine.states,
    GameEvent
  >;
}

export const GameContext = React.createContext<GameContextType>(
  {} as GameContextType
);

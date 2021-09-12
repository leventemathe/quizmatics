import { useInterpret } from '@xstate/react';
import { ChildrenProps } from 'types';
import { GameContext } from './GameContext';
import { gameStateMachine } from './gameStateMachine';

export const GameProvider = ({ children }: ChildrenProps) => {
  const gameService = useInterpret(gameStateMachine);

  return (
    <GameContext.Provider value={{ gameService }}>
      {children}
    </GameContext.Provider>
  );
};

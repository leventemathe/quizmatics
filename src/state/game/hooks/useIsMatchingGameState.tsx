import React from 'react';
import { useSelector } from '@xstate/react';
import { GameContext } from '../GameContext';

export const useIsMatchingGameState = (stateToMatch: string) => {
  const services = React.useContext(GameContext);
  const { gameService } = services;

  return useSelector<typeof gameService, boolean>(gameService, (state) =>
    state.matches(stateToMatch)
  );
};

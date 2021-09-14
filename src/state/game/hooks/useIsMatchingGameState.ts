import React from 'react';
import { useSelector } from '@xstate/react';
import { GameState } from 'types';
import { GameContext } from '../GameContext';

export const useIsMatchingGameState = (stateToMatch: GameState) => {
  const services = React.useContext(GameContext);
  const { gameService } = services;

  return useSelector<typeof gameService, boolean>(gameService, (state) =>
    state.matches(stateToMatch)
  );
};

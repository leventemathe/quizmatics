import { useSelector } from '@xstate/react';
import React from 'react';
import { GameContext } from '../GameContext';

export const useGameError = () => {
  const services = React.useContext(GameContext);
  const { gameService } = services;

  const error = useSelector<typeof gameService, Error | undefined>(
    gameService,
    (state) => state.context.error
  );

  return error;
};

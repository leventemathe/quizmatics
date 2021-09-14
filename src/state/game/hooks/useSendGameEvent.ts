import React from 'react';
import { GameContext } from '../GameContext';

export const useSendGameEvent = () => {
  const services = React.useContext(GameContext);
  const { gameService } = services;

  return gameService.send;
};

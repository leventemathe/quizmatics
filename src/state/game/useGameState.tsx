import { useActor, useSelector } from '@xstate/react';
import React from 'react';
import { GameContext } from './GameContext';

export const useGameState = () => {
  const services = React.useContext(GameContext);
  const { gameService } = services;
  const [gameState] = useActor(gameService);

  const questions = useSelector(
    gameService,
    (state) => state.context.questions
  );

  const currentIndex = useSelector(
    gameService,
    (state) => state.context.currentIndex
  );

  const error = useSelector(gameService, (state) => state.context.error);

  return {
    state: gameState,
    questions,
    currentIndex,
    error,
    send: gameService.send,
  };
};

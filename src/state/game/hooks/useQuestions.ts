import { useSelector } from '@xstate/react';
import React from 'react';
import { Question } from 'types';
import { GameContext } from '../GameContext';

export const useQuestions = () => {
  const services = React.useContext(GameContext);
  const { gameService } = services;

  const questions = useSelector<typeof gameService, Question[]>(
    gameService,
    (state) => state.context.questions
  );

  const currentQuestion = useSelector<typeof gameService, Question>(
    gameService,
    (state) => state.context.questions[state.context.currentIndex]
  );

  const currentIndex = useSelector<typeof gameService, number>(
    gameService,
    (state) => state.context.currentIndex
  );

  const total = useSelector<typeof gameService, number>(
    gameService,
    (state) => state.context.questions.length
  );

  return {
    questions,
    currentIndex,
    currentQuestion,
    total,
  };
};

import { useSelector } from '@xstate/react';
import React from 'react';
import { Question } from 'types';
import { GameContext } from '../GameContext';

export const useGameResult = () => {
  const services = React.useContext(GameContext);
  const { gameService } = services;

  const isAnswerCorrect = (question: Question) =>
    question.answer === question.correctAnswer;

  const score = useSelector<typeof gameService, number>(gameService, (state) =>
    state.context.questions.reduce(
      (accum, curr) => accum + (isAnswerCorrect(curr) ? 1 : 0),
      0
    )
  );

  return {
    isAnswerCorrect,
    score,
  };
};

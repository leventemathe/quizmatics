import { useInterpret } from '@xstate/react';
import { ChildrenProps, FetchQuestions } from 'types';
import { GameContext } from './GameContext';
import { createGameStateMachine } from './gameStateMachine';

interface Props extends ChildrenProps {
  fetchQuestions: FetchQuestions;
}

export const GameProvider = ({ children, fetchQuestions }: Props) => {
  const gameService = useInterpret(createGameStateMachine(fetchQuestions));

  return (
    <GameContext.Provider value={{ gameService }}>
      {children}
    </GameContext.Provider>
  );
};

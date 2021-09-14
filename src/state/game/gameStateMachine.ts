import { Question } from 'types';
import { assign, createMachine } from 'xstate';
import { gameConfig } from 'config';
import { fetchQuestions } from 'networking';

export interface GameContext {
  questions: Question[];
  currentIndex: number;
  error?: Error;
}

export type GameEvent =
  | { type: 'START' }
  | { type: 'ANSWER'; answer: boolean }
  | { type: 'RESTART' };

const resetCurrentIndex = assign<GameContext, GameEvent>({
  currentIndex: 0,
});

const saveQuestions = assign<GameContext, GameEvent>({
  // There's no nicer way than to use any: https://xstate.js.org/docs/guides/typescript.html
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  questions: (_context, event: any) => event.data,
});

const saveError = assign<GameContext, GameEvent>({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: (_context, event: any) => event.data,
});

const saveAnswer = assign<GameContext, GameEvent>({
  questions: (context, event) => {
    if (event.type !== 'ANSWER') return context.questions;

    const { questions, currentIndex } = context;
    const newQuestions = [...questions];
    newQuestions[currentIndex].answer = event.answer;

    return newQuestions;
  },
  currentIndex: (context) => context.currentIndex + 1,
});

const canFinishGame = (context: GameContext) => {
  const asnweredQuestions = context.questions.filter(
    (question) => question.answer !== undefined
  );
  return asnweredQuestions.length === gameConfig.amountOfQuestions;
};

export const gameStateMachine = createMachine<GameContext, GameEvent>(
  {
    id: 'game',
    initial: 'idle',
    context: {
      questions: [],
      currentIndex: 0,
    },
    states: {
      idle: {
        on: {
          START: 'loading',
        },
      },
      loading: {
        entry: 'resetCurrentIndex',
        invoke: {
          id: 'fetchQuestions',
          src: () => fetchQuestions(gameConfig.amountOfQuestions),
          onDone: {
            target: 'playing',
            actions: 'saveQuestions',
          },
          onError: {
            target: 'error',
            actions: 'saveError',
          },
        },
      },
      error: {
        on: {
          RESTART: 'loading',
        },
      },
      playing: {
        on: {
          ANSWER: {
            target: 'playing',
            actions: 'saveAnswer',
          },
        },
        always: { target: 'finished', cond: 'canFinishGame' },
      },
      finished: {
        on: {
          RESTART: 'loading',
        },
      },
    },
  },
  {
    actions: {
      resetCurrentIndex,
      saveQuestions,
      saveError,
      saveAnswer,
    },
    guards: {
      canFinishGame,
    },
  }
);

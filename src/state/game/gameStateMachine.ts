import { Question } from 'types';
import { assign, createMachine } from 'xstate';
import { fetchQuestions } from '../../networking/fetchQuestions';

export interface GameContext {
  questions: Question[];
  currentIndex: number;
  error?: Error;
}

export type GameEvent =
  | { type: 'START' }
  | { type: 'ANSWER'; answer: boolean }
  | { type: 'RESTART' };

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
          src: () => fetchQuestions(10), // TODO 10
          onDone: {
            target: 'playing',
            actions: 'saveQuestions',
          },
          onError: {
            target: 'error',
            actions: 'saveAnswer',
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
      resetCurrentIndex: assign<GameContext, GameEvent>({
        currentIndex: 0,
      }),
      saveQuestions: assign({
        // There's no nicer way than to use any: https://xstate.js.org/docs/guides/typescript.html
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        questions: (_context, event: any) => event.data,
      }),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      saveError: assign({ error: (_context, event: any) => event.data }),
      saveAnswer: assign<GameContext, GameEvent>({
        questions: (context, event) => {
          if (event.type !== 'ANSWER') return context.questions;

          const { questions, currentIndex } = context;
          const newQuestions = [...questions];
          newQuestions[currentIndex].answer = event.answer;

          return newQuestions;
        },
        currentIndex: (context) => context.currentIndex + 1,
      }),
    },
    guards: {
      canFinishGame: (context) => {
        const asnweredQuestions = context.questions.filter(
          (question) => question.answer !== undefined
        );
        return asnweredQuestions.length === 10; // TODO 10
      },
    },
  }
);

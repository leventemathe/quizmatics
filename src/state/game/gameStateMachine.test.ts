import { interpret } from 'xstate';
import { request } from 'networking/request';
import { gameConfig } from 'config';
import { generateFakeQuestionApiResponse, faker } from 'test-utils';
import { gameStateMachine } from './gameStateMachine';

jest.mock('networking/request');

beforeEach(() => {
  (request as jest.Mock).mockResolvedValue(generateFakeQuestionApiResponse());
});

afterEach(() => {
  jest.resetAllMocks();
});

test('the game starts in idle state', () => {
  const gameService = interpret(gameStateMachine);
  gameService.start();

  expect(gameService.state.matches('idle')).toBe(true);
});

test('the game starts loading on START event', (done) => {
  const gameService = interpret(gameStateMachine).onTransition((state) => {
    if (state.matches('loading')) done();
  });

  gameService.start();
  gameService.send('START');
});

test('the game correctly handles successful fetch', (done) => {
  const gameService = interpret(gameStateMachine).onTransition((state) => {
    if (state.matches('playing')) {
      expect(request).toHaveBeenCalledTimes(1);
      expect(state.context.questions.length).toBe(gameConfig.amountOfQuestions);
      expect(state.context.currentIndex).toBe(0);
      done();
    }
  });

  gameService.start();
  gameService.send('START');
});

test('the game correctly handles failing fetch', (done) => {
  (request as jest.Mock).mockRejectedValue({});

  const gameService = interpret(gameStateMachine).onTransition((state) => {
    if (state.matches('error')) {
      expect(request).toHaveBeenCalledTimes(1);
      expect(state.context.questions.length).toBe(0);
      expect(state.context.error).not.toBeUndefined();
      expect(state.context.currentIndex).toBe(0);
      done();
    }
  });

  gameService.start();
  gameService.send('START');
});

test('the game can restart from the error state', (done) => {
  (request as jest.Mock)
    .mockRejectedValueOnce({ error: 'some error' })
    .mockResolvedValueOnce(generateFakeQuestionApiResponse());

  const gameService = interpret(gameStateMachine).onTransition((state) => {
    if (state.matches('error')) {
      gameService.send('RESTART');
    }

    if (state.matches('playing')) {
      expect(request).toHaveBeenCalledTimes(2);
      expect(state.context.questions.length).toBe(gameConfig.amountOfQuestions);
      expect(state.context.currentIndex).toBe(0);
      done();
    }
  });

  gameService.start();
  gameService.send('START');
});

test('can answer a question', (done) => {
  let answerCount = 0;
  const answer = faker.datatype.boolean();

  const gameService = interpret(gameStateMachine).onTransition((state) => {
    if (state.matches('playing')) {
      if (answerCount === 0) {
        gameService.send({ type: 'ANSWER', answer });
      } else {
        expect(state.context.questions[0].answer).toBe(answer);
        done();
      }

      answerCount += 1;
    }
  });

  gameService.start();
  gameService.send('START');
});

test('game can get to the result state by answering all questions', (done) => {
  const gameService = interpret(gameStateMachine).onTransition((state) => {
    if (state.matches('playing')) {
      gameService.send({ type: 'ANSWER', answer: faker.datatype.boolean() });
    }
    if (state.matches('finished')) {
      state.context.questions.forEach((question) => {
        expect(question.answer).not.toBeUndefined();
      });
      done();
    }
  });

  gameService.start();
  gameService.send('START');
});

test('game can be restarted in finished state', (done) => {
  let loadingCount = 0;

  const gameService = interpret(gameStateMachine).onTransition((state) => {
    if (state.matches('loading')) {
      loadingCount += 1;
      if (loadingCount === 2) done();
    }
    if (state.matches('playing')) {
      gameService.send({ type: 'ANSWER', answer: faker.datatype.boolean() });
    }
    if (state.matches('finished')) {
      gameService.send('RESTART');
    }
  });

  gameService.start();
  gameService.send('START');
});

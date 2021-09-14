import { interpret } from 'xstate';
import { gameConfig } from 'config';
import { faker, generateFakeQuestions, getAnswerFromBool } from 'test-utils';
import { createGameStateMachine } from './gameStateMachine';

let fetchQuestionsSuccessfully: jest.Mock;
let fetchQuestionsWithError: jest.Mock;

beforeEach(() => {
  fetchQuestionsSuccessfully = jest
    .fn()
    .mockResolvedValue(generateFakeQuestions());

  fetchQuestionsWithError = jest.fn().mockRejectedValue('some error');
});

afterEach(() => jest.clearAllMocks());

test('the game starts in idle state', () => {
  const gameService = interpret(createGameStateMachine(jest.fn()));
  gameService.start();

  expect(gameService.state.matches('idle')).toBe(true);
});

test('the game starts loading on START event', (done) => {
  const gameService = interpret(createGameStateMachine(jest.fn())).onTransition(
    (state) => {
      if (state.matches('loading')) done();
    }
  );

  gameService.start();
  gameService.send('START');
});

test('the game correctly handles successful fetch', (done) => {
  const gameService = interpret(
    createGameStateMachine(fetchQuestionsSuccessfully)
  ).onTransition((state) => {
    if (state.matches('playing')) {
      expect(fetchQuestionsSuccessfully).toHaveBeenCalledTimes(1);
      expect(state.context.questions.length).toBe(gameConfig.amountOfQuestions);
      expect(state.context.currentIndex).toBe(0);
      done();
    }
  });

  gameService.start();
  gameService.send('START');
});

test('the game correctly handles failing fetch', (done) => {
  const gameService = interpret(
    createGameStateMachine(fetchQuestionsWithError)
  ).onTransition((state) => {
    if (state.matches('error')) {
      expect(fetchQuestionsWithError).toHaveBeenCalledTimes(1);
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
  const fetchQuestions = jest
    .fn()
    .mockRejectedValueOnce('some error')
    .mockResolvedValueOnce(generateFakeQuestions());

  const gameService = interpret(
    createGameStateMachine(fetchQuestions)
  ).onTransition((state) => {
    if (state.matches('error')) {
      gameService.send('RESTART');
    }

    if (state.matches('playing')) {
      expect(fetchQuestions).toHaveBeenCalledTimes(2);
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
  const answer = getAnswerFromBool(faker.datatype.boolean());

  const gameService = interpret(
    createGameStateMachine(fetchQuestionsSuccessfully)
  ).onTransition((state) => {
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
  const gameService = interpret(
    createGameStateMachine(fetchQuestionsSuccessfully)
  ).onTransition((state) => {
    if (state.matches('playing')) {
      gameService.send({
        type: 'ANSWER',
        answer: getAnswerFromBool(faker.datatype.boolean()),
      });
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

  const gameService = interpret(
    createGameStateMachine(fetchQuestionsSuccessfully)
  ).onTransition((state) => {
    if (state.matches('loading')) {
      loadingCount += 1;
      if (loadingCount === 2) done();
    }
    if (state.matches('playing')) {
      gameService.send({
        type: 'ANSWER',
        answer: getAnswerFromBool(faker.datatype.boolean()),
      });
    }
    if (state.matches('finished')) {
      gameService.send('RESTART');
    }
  });

  gameService.start();
  gameService.send('START');
});

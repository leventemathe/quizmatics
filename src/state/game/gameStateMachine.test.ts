import { interpret } from 'xstate';
import { request } from 'networking';
import { faker } from 'test-utils';
import { gameStateMachine } from './gameStateMachine';
import { gameConfig } from '../../config/gameConfig';

let requestMock: jest.SpyInstance;

const getAnswerFromBool = (bool: boolean) => (bool ? 'True' : 'False');

const generateFakeQuestions = () => {
  const questions = [];

  for (let i = 0; i < gameConfig.amountOfQuestions; i += 1) {
    const correctAnswer = faker.datatype.boolean();

    questions.push({
      category: faker.name.title(),
      type: 'boolean',
      difficulty: 'hard',
      question: faker.name.title(),
      correct_answer: getAnswerFromBool(correctAnswer),
      incorrect_answers: [getAnswerFromBool(!correctAnswer)],
    });
  }

  return questions;
};

beforeEach(() => {
  requestMock = jest.spyOn({ request }, 'request');

  requestMock.mockResolvedValue({
    response_code: 0,
    results: generateFakeQuestions(),
  });
});

afterEach(() => {
  jest.resetAllMocks();
});

test('game starts in idle state', () => {
  const gameService = interpret(gameStateMachine);
  gameService.start();

  expect(gameService.state.matches('idle')).toBe(true);
});

test('game starts loading on START event', (done) => {
  const gameService = interpret(gameStateMachine).onTransition((state) => {
    if (state.matches('loading')) done();
  });

  gameService.start();
  gameService.send('START');
});

import { request } from 'networking/request';
import { generateFakeQuestionApiResponse } from 'test-utils';
import { fetchQuestions } from './fetchQuestions';

jest.mock('networking/request');

afterEach(() => {
  jest.resetAllMocks();
});

test('calls request correctly', async () => {
  (request as jest.Mock).mockResolvedValue(generateFakeQuestionApiResponse());
  await fetchQuestions();
  expect(request).toHaveBeenCalledTimes(1);
});

test('returns correctly formatted data', async () => {
  const requestResult = generateFakeQuestionApiResponse();
  (request as jest.Mock).mockResolvedValue(requestResult);

  const questions = await fetchQuestions();

  questions.forEach((question, index) => {
    const quesitonFromApi = requestResult.results[index];
    expect(question.category).toEqual(quesitonFromApi.category);
    expect(question.correctAnswer).toEqual(quesitonFromApi.correct_answer);
    expect(question.question).toEqual(quesitonFromApi.question);
    expect(question.answer).toBeUndefined();
  });
});

test('throws error in case something goes wrong', async () => {
  const error = 'An error happened';
  (request as jest.Mock).mockImplementation(async () => {
    throw new Error(error);
  });

  await expect(fetchQuestions()).rejects.toThrow(error);
});

import faker from 'faker';
import { gameConfig } from 'config/gameConfig';

const getAnswerFromBool = (bool: boolean) => (bool ? 'True' : 'False');

export const generateFakeQuestions = () => {
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

export const generateFakeQuestionApiResponse = () => ({
  response_code: 0,
  results: generateFakeQuestions(),
});

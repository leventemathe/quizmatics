import { Question } from 'types';
import faker from 'faker';
import { gameConfig } from 'config';

export const getAnswerFromBool = (bool: boolean) => (bool ? 'True' : 'False');

export const generateFakeApiQuestions = () => {
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
  results: generateFakeApiQuestions(),
});

export const generateFakeQuestion = (answer?: string) => ({
  category: faker.name.title(),
  question: faker.name.title(),
  correctAnswer: getAnswerFromBool(faker.datatype.boolean()),
  answer,
});

export const generateFakeQuestions = (withAnswer?: boolean): Question[] => {
  const questions = [];

  for (let i = 0; i < gameConfig.amountOfQuestions; i += 1) {
    questions.push(
      generateFakeQuestion(
        withAnswer ? getAnswerFromBool(faker.datatype.boolean()) : undefined
      )
    );
  }

  return questions;
};

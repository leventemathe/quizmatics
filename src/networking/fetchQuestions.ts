import { Question } from 'types';
import { buildFetchQuestionsUrl } from 'config';
import { decode } from 'html-entities';
import { request } from './request';

interface QuestionFromApi {
  category: string;
  question: string;
  // eslint-disable-next-line camelcase
  correct_asnwer: 'True' | 'False';
}

interface Result {
  results: QuestionFromApi[];
}

const formatResult = (questions: QuestionFromApi[]): Question[] =>
  questions.map((question) => ({
    ...question,
    question: decode(question.question),
    correctAnswer: question.correct_asnwer === 'True',
  }));

export const fetchQuestions = async (amount = 10) => {
  const url = buildFetchQuestionsUrl(amount);
  const result = await request<Result>(url);
  return formatResult(result.results);
};

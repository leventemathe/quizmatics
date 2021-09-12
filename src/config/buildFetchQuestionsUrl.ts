export const buildFetchQuestionsUrl = (
  amount = 10,
  difficulty = 'hard',
  type = 'boolean'
) => {
  const url = process.env.REACT_APP_QUESTION_URL;
  if (!url) throw new Error('Question url not found in env');

  return `${url}?amount=${amount}&difficulty=${difficulty}&type=${type}`;
};

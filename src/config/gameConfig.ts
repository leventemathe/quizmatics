const amountOfQuestions = Number(process.env.REACT_APP_AMOUNT_OF_QUESTIONS);
if (!amountOfQuestions || Number.isNaN(amountOfQuestions))
  throw new Error('Amount of questions not found in env');

export const gameConfig = {
  amountOfQuestions,
};

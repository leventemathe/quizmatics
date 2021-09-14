import { Question } from 'pages';
import { useSendGameEvent } from 'state/game/hooks/useSendGameEvent';
import { useQuestions } from 'state/game/hooks/useQuestions';
import {
  faker,
  generateFakeQuestion,
  getAnswerFromBool,
  render,
  screen,
  userEvent,
} from 'test-utils';
import { gameConfig } from 'config';

jest.mock('state/game/hooks/useSendGameEvent');
jest.mock('state/game/hooks/useQuestions');

afterEach(() => {
  jest.resetAllMocks();
});

const testButtonClick = (buttonTitle: RegExp, expectedAnswer: string) => {
  const send = jest.fn();
  (useSendGameEvent as jest.Mock).mockReturnValue(send);

  (useQuestions as jest.Mock).mockReturnValue({
    currentQuestion: generateFakeQuestion(),
    currentIndex: 0,
    total: gameConfig.amountOfQuestions,
  });

  render(<Question />);

  const trueButton = screen.getByRole('button', { name: buttonTitle });

  userEvent.click(trueButton);
  expect(send).toHaveBeenCalledTimes(1);
  expect(send).toHaveBeenCalledWith({ type: 'ANSWER', answer: expectedAnswer });
};

test('clicking true button sends correct event', () => {
  testButtonClick(/true/i, 'True');
});

test('clicking false button sends correct event', () => {
  testButtonClick(/false/i, 'False');
});

test('correctly displays question', () => {
  const category = faker.name.title();
  const question = faker.name.title();
  const currentIndex = faker.datatype.number({
    min: 0,
    max: gameConfig.amountOfQuestions,
  });

  (useQuestions as jest.Mock).mockReturnValue({
    currentQuestion: {
      category,
      question,
      correctAnswer: getAnswerFromBool(faker.datatype.boolean()),
    },
    currentIndex,
    total: gameConfig.amountOfQuestions,
  });

  render(<Question />);

  const categoryTitle = screen.getByTestId('categoryTitle');
  expect(categoryTitle).toHaveTextContent(category);

  const questionText = screen.getByTestId('questionText');
  expect(questionText).toHaveTextContent(question);

  const counterText = screen.getByTestId('counterText');
  expect(counterText).toHaveTextContent(
    `${currentIndex + 1}/${gameConfig.amountOfQuestions}`
  );
});

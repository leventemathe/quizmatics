import { useQuestions } from 'state/game/hooks/useQuestions';
import { gameConfig } from 'config';
import { render, generateFakeQuestions, screen, within } from 'test-utils';
import { Result } from './Result';

jest.mock('state/game/hooks/useQuestions');

afterEach(() => {
  jest.resetAllMocks();
});

test('displays the correct score', () => {
  const questions = generateFakeQuestions(true);

  (useQuestions as jest.Mock).mockReturnValue({
    total: gameConfig.amountOfQuestions,
    questions,
  });

  const expectedScore = questions.reduce(
    // TS bug?
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    (accum, curr) => (accum + curr.answer === curr.correctAnswer ? 1 : 0),
    0
  );

  render(<Result />);

  const score = screen.getByTestId('scoreTitle');
  expect(score).toHaveTextContent(
    `${expectedScore}/${gameConfig.amountOfQuestions}`
  );
});

test('displays all the questions and answer icons correctly', () => {
  const questions = generateFakeQuestions(true);

  (useQuestions as jest.Mock).mockReturnValue({
    total: gameConfig.amountOfQuestions,
    questions,
  });

  render(<Result />);

  const questionItems = screen.getAllByRole('listitem');
  questionItems.forEach((questionItem, index) => {
    const question = questions[index];

    expect(questionItem).toHaveTextContent(question.question);

    const correctIcon = within(questionItem).queryByTestId('correctIcon');
    const incorrectIcon = within(questionItem).queryByTestId('incorrectIcon');

    if (question.answer === question.correctAnswer) {
      expect(correctIcon).toBeInTheDocument();
      expect(incorrectIcon).not.toBeInTheDocument();
    } else {
      expect(correctIcon).not.toBeInTheDocument();
      expect(incorrectIcon).toBeInTheDocument();
    }
  });
});

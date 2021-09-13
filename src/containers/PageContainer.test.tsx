import { PageContainer } from 'containers';
import {
  render,
  screen,
  generateFakeQuestionApiResponse,
  userEvent,
} from 'test-utils';
import { request } from 'networking';
import { gameConfig } from 'config/gameConfig';

jest.mock('networking/request');

beforeEach(() => {
  (request as jest.Mock).mockResolvedValue(generateFakeQuestionApiResponse());
});

afterEach(() => {
  jest.resetAllMocks();
});

const startGame = async () => {
  render(<PageContainer />);

  const startButton = screen.getByRole('button');
  userEvent.click(startButton);
};

const playThroughGame = async () => {
  await startGame();

  for (let i = 0; i < gameConfig.amountOfQuestions; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    const buttons = await screen.findAllByRole('button');
    userEvent.click(buttons[0]);
  }
};

test('shows start page by default', () => {
  render(<PageContainer />);

  const title = screen.queryByText(/Welcome to the Trivia Challenge!/i);
  const startButton = screen.queryByRole('button');

  expect(title).toBeInTheDocument();
  expect(startButton).toBeInTheDocument();
});

test('clicking start button transitions to loading page', async () => {
  await startGame();
  await screen.findByTestId('loadingSpinner');
});

test('loading page transitions to question page after successful fetch', async () => {
  await startGame();

  const buttons = await screen.findAllByRole('button');
  expect(buttons.length).toBe(2);
});

test('loading page can handle errors, and transitions to error page', async () => {
  (request as jest.Mock).mockRejectedValue({});
  await startGame();

  await screen.findByText(/error/i);
});

test('clicking the restart button on the error page should transition to the loading page', async () => {
  (request as jest.Mock).mockRejectedValue({});
  await startGame();

  const restartButton = await screen.findByText(/retry/i);
  userEvent.click(restartButton);

  await screen.findByTestId('loadingSpinner');
});

test('answering all the questions leads to the result page', async () => {
  await playThroughGame();
  await screen.findByText(/You scored/i);
});

test('clicking restart on the results page should start the loading page', async () => {
  await playThroughGame();

  const restartButton = await screen.findByRole('button');
  userEvent.click(restartButton);

  await screen.findByTestId('loadingSpinner');
});

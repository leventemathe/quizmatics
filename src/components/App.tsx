import { PageContainer } from 'containers';
import { fetchQuestions } from 'networking';
import { GameProvider } from 'state/game';
import { gameConfig } from 'config';

export const App = () => (
  <GameProvider
    fetchQuestions={() => fetchQuestions(gameConfig.amountOfQuestions)}
  >
    <PageContainer />
  </GameProvider>
);

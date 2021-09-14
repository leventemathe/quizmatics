import { PageContainer } from 'containers';
import { fetchQuestions } from 'networking';
import { GameProvider } from 'state/game';

export const App = () => (
  <GameProvider fetchQuestions={fetchQuestions}>
    <PageContainer />
  </GameProvider>
);

import { PageContainer } from 'containers';
import { GameProvider } from 'state/game';

export const App = () => (
  <GameProvider>
    <PageContainer />
  </GameProvider>
);

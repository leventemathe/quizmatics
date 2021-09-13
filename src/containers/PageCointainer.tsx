import { Error, Loading, Question, Result, Start } from 'pages';
import { useGameState } from 'state/game';

export const PageContainer = () => {
  const { state } = useGameState();

  if (state.matches('loading')) return <Loading />;
  if (state.matches('error')) return <Error />;
  if (state.matches('playing')) return <Question />;
  if (state.matches('finished')) return <Result />;
  return <Start />;
};

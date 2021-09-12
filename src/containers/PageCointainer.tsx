import { Error } from 'pages/Error';
import { Loading } from 'pages/Loading';
import { Question } from 'pages/Question';
import { Result } from 'pages/Result';
import { Start } from 'pages/Start';
import { useGameState } from 'state/game';

export const PageContainer = () => {
  const { state } = useGameState();

  if (state.matches('loading')) return <Loading />;
  if (state.matches('error')) return <Error />;
  if (state.matches('playing')) return <Question />;
  if (state.matches('finished')) return <Result />;
  return <Start />;
};

import { Error, Loading, Question, Result, Start } from 'pages';
import { useIsMatchingGameState } from 'state/game';

export const PageContainer = () => {
  const isLoading = useIsMatchingGameState('loading');
  const isError = useIsMatchingGameState('error');
  const isPlaying = useIsMatchingGameState('playing');
  const isFinished = useIsMatchingGameState('finished');

  if (isLoading) return <Loading />;
  if (isError) return <Error />;
  if (isPlaying) return <Question />;
  if (isFinished) return <Result />;
  return <Start />;
};

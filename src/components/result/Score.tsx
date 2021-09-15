import { useGameResult, useQuestions } from 'state/game';
import { Typography } from '@material-ui/core';

export const Score = () => {
  const { total } = useQuestions();
  const { score } = useGameResult();

  return (
    <>
      <Typography align="center" variant="h4">
        You scored
      </Typography>
      <Typography data-testid="scoreTitle" align="center" variant="h4">
        {`${score}/${total}`}
      </Typography>
    </>
  );
};

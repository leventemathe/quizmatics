import { Typography } from '@material-ui/core';
import { Page } from 'components/ui';
import { useGameState } from 'state/game';

export const Error = () => {
  const { error } = useGameState();

  return (
    <Page>
      <Typography align="center" variant="h3">
        {`An error happened: ${error?.message}`}
      </Typography>
    </Page>
  );
};

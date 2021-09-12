import { Typography } from '@material-ui/core';
import { CenteredButton, Page } from 'components/ui';
import { useGameState } from 'state/game';

export const Error = () => {
  const { error, send } = useGameState();

  return (
    <Page>
      <Typography align="center" variant="h3">
        {`An error happened: ${error?.message}`}
      </Typography>
      <CenteredButton
        variant="contained"
        color="primary"
        onClick={() => send('RESTART')}
      >
        RETRY
      </CenteredButton>
    </Page>
  );
};

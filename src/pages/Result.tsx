import { Button } from '@material-ui/core';
import { Page } from 'components/ui';
import { useGameState } from 'state/game';

export const Result = () => {
  const { send } = useGameState();

  return (
    <Page>
      <Button
        variant="contained"
        color="primary"
        onClick={() => send('RESTART')}
      >
        PLAY AGAIN?
      </Button>
    </Page>
  );
};

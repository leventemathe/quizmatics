import { Page } from 'components/ui';
import { styled } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';
import { useGameState } from 'state/game';

const StartButton = styled(Button)({
  margin: '0 auto',
  display: 'block',
});

export const Start = () => {
  const { send } = useGameState();

  return (
    <Page>
      <Typography align="center" variant="h3">
        Welcome to the Trivia Challenge!
      </Typography>
      <Typography align="center" variant="body1">
        You will be presented with 10 True or False questions.
      </Typography>
      <Typography align="center" variant="body1">
        Can you score a 100%?
      </Typography>
      <StartButton
        variant="contained"
        color="primary"
        onClick={() => send('START')}
      >
        BEGIN
      </StartButton>
    </Page>
  );
};

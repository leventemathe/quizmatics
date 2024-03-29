import { Page, CenteredButton } from 'components/ui';
import { Typography } from '@material-ui/core';
import { useSendGameEvent } from 'state/game';
import { gameConfig } from 'config';

export const Start = () => {
  const send = useSendGameEvent();

  return (
    <Page>
      <Typography align="center" variant="h3">
        Welcome to the Trivia Challenge!
      </Typography>
      <Typography align="center" variant="body1">
        {`You will be presented with ${gameConfig.amountOfQuestions} True or False questions.`}
      </Typography>
      <Typography align="center" variant="body1">
        Can you score 100%?
      </Typography>
      <CenteredButton
        variant="contained"
        color="primary"
        onClick={() => send('START')}
      >
        BEGIN
      </CenteredButton>
    </Page>
  );
};

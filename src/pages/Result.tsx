import { CenteredButton, Page } from 'components/ui';
import { useSendGameEvent } from 'state/game';
import { Score, ResultList } from 'components/result';
import { styled } from '@material-ui/core/styles';

const RestartButton = styled(CenteredButton)({
  marginBottom: '2rem',
});

export const Result = () => {
  const send = useSendGameEvent();

  return (
    <Page>
      <Score />
      <ResultList />
      <RestartButton
        variant="contained"
        color="primary"
        onClick={() => send('RESTART')}
      >
        PLAY AGAIN?
      </RestartButton>
    </Page>
  );
};

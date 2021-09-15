import { CenteredButton, Page } from 'components/ui';
import { useSendGameEvent } from 'state/game';
import { Score, ResultList } from 'components/result';

export const Result = () => {
  const send = useSendGameEvent();

  return (
    <Page>
      <Score />
      <ResultList />
      <CenteredButton
        variant="contained"
        color="primary"
        onClick={() => send('RESTART')}
      >
        PLAY AGAIN?
      </CenteredButton>
    </Page>
  );
};

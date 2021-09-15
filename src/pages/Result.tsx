import { List, ListItem, Typography } from '@material-ui/core';
import { styled } from '@material-ui/styles';
import { CenteredButton, Page } from 'components/ui';
import { useGameResult, useQuestions, useSendGameEvent } from 'state/game';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';

const ResultItem = styled(ListItem)({
  display: 'flex',
  alignItems: 'center',

  '&>*:first-child': {
    marginRight: '1rem',
  },

  wordBreak: 'break-word',
});

export const Result = () => {
  const { questions, total } = useQuestions();
  const { score, isAnswerCorrect } = useGameResult();
  const send = useSendGameEvent();

  return (
    <Page>
      <Typography align="center" variant="h4">
        You scored
      </Typography>
      <Typography data-testid="scoreTitle" align="center" variant="h4">
        {`${score}/${total}`}
      </Typography>
      <List>
        {questions.map((question) => (
          // https://github.com/mui-org/material-ui/issues/14971
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          <ResultItem key={question.question}>
            {isAnswerCorrect(question) ? (
              <AddCircleOutlineIcon data-testid="correctIcon" />
            ) : (
              <RemoveCircleOutlineIcon data-testid="incorrectIcon" />
            )}
            <Typography variant="h5">{question.question}</Typography>
          </ResultItem>
        ))}
      </List>
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

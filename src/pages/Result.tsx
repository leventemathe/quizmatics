import { Box, Typography } from '@material-ui/core';
import { styled } from '@material-ui/styles';
import { CenteredButton, Page } from 'components/ui';
import { useGameResult, useQuestions, useSendGameEvent } from 'state/game';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';

const ResultItem = styled(Box)({
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
      <Typography align="center" variant="h4">
        {`${score}/${total}`}
      </Typography>
      {questions.map((question) => (
        <ResultItem key={question.question}>
          {isAnswerCorrect(question) ? (
            <AddCircleOutlineIcon />
          ) : (
            <RemoveCircleOutlineIcon />
          )}
          <Typography variant="h5">{question.question}</Typography>
        </ResultItem>
      ))}
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

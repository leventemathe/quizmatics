import { List, ListItem, Typography } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { useGameResult, useQuestions } from 'state/game';
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

export const ResultList = () => {
  const { questions } = useQuestions();
  const { isAnswerCorrect } = useGameResult();

  return (
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
          <Typography variant="body1">{question.question}</Typography>
        </ResultItem>
      ))}
    </List>
  );
};

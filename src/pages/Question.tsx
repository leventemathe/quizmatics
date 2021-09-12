import { Box, Button, Card, Typography } from '@material-ui/core';
import { styled } from '@material-ui/styles';
import { Page } from 'components/ui';
import { useGameState } from 'state/game';

const QuestionCard = styled(Card)({
  padding: '3rem',
  margin: '0 auto',
  marginBottom: '1rem',

  wordBreak: 'break-word',
});

const ButtonBox = styled(Box)({
  display: 'flex',
  justifyContent: 'center',

  '&>*': {
    margin: '0.5rem',
  },
});

export const Question = () => {
  const { send, questions, currentIndex, getTotal } = useGameState();
  const question = questions[currentIndex];

  return (
    <Page>
      <Typography align="center" variant="h5">
        {question.category}
      </Typography>
      <QuestionCard>
        <Typography align="center" variant="h5">
          {question.question}
        </Typography>
      </QuestionCard>
      <Typography align="center" variant="body1">
        {`${currentIndex + 1}/${getTotal()}`}
      </Typography>
      <ButtonBox>
        <Button
          variant="contained"
          color="primary"
          onClick={() => send({ type: 'ANSWER', answer: true })}
        >
          TRUE
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => send({ type: 'ANSWER', answer: false })}
        >
          FALSE
        </Button>
      </ButtonBox>
    </Page>
  );
};

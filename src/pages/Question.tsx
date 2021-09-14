import { Box, Button, Card, Typography } from '@material-ui/core';
import { styled } from '@material-ui/styles';
import { Page } from 'components/ui';
import { useQuestions, useSendGameEvent } from 'state/game';

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
  const { currentQuestion, currentIndex, total } = useQuestions();
  const send = useSendGameEvent();

  return (
    <Page>
      <Typography align="center" variant="h5">
        {currentQuestion.category}
      </Typography>
      <QuestionCard>
        <Typography align="center" variant="h5">
          {currentQuestion.question}
        </Typography>
      </QuestionCard>
      <Typography align="center" variant="body1">
        {`${currentIndex + 1}/${total}`}
      </Typography>
      <ButtonBox>
        <Button
          variant="contained"
          color="primary"
          onClick={() => send({ type: 'ANSWER', answer: 'True' })}
        >
          TRUE
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => send({ type: 'ANSWER', answer: 'False' })}
        >
          FALSE
        </Button>
      </ButtonBox>
    </Page>
  );
};

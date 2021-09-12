import { Box, Button, Typography } from '@material-ui/core';
import { styled } from '@material-ui/styles';
import { Page } from 'components/ui';
import { useGameState } from 'state/game';

const QuestionBox = styled(Box)({
  display: 'grid',
  placeItems: 'center',
  border: '1px solid black',
  padding: '3rem',
  marginBottom: '1rem',
});

const ButtonBox = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
});

export const Question = () => {
  const { send, questions, currentIndex } = useGameState();
  const question = questions[currentIndex];
  const count = questions.length;

  return (
    <Page>
      <Typography align="center" variant="h5">
        {question.category}
      </Typography>
      <QuestionBox>
        <Typography align="center" variant="h5">
          {question.question}
        </Typography>
      </QuestionBox>
      <Typography align="center" variant="body1">
        {`${currentIndex + 1}/${count}`}
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
          color="primary"
          onClick={() => send({ type: 'ANSWER', answer: false })}
        >
          FALSE
        </Button>
      </ButtonBox>
    </Page>
  );
};

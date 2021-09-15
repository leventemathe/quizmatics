import { useSendGameEvent } from 'state/game';
import { Box, Button } from '@material-ui/core';
import { styled } from '@material-ui/styles';

const ButtonBox = styled(Box)({
  display: 'flex',
  justifyContent: 'center',

  '&>*': {
    margin: '0.5rem',
  },
});

export const QuestionAnswer = () => {
  const send = useSendGameEvent();

  return (
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
  );
};

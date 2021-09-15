import { Typography, Card } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { useQuestions } from 'state/game';

const QuestionCard = styled(Card)(({ theme: { breakpoints } }) => ({
  padding: '3rem',
  margin: '0 auto',
  marginBottom: '1rem',

  wordBreak: 'break-word',

  [breakpoints.down('sm')]: {
    padding: '1rem',
  },
}));

export const QuestionData = () => {
  const { currentQuestion, currentIndex, total } = useQuestions();

  return (
    <>
      <Typography data-testid="categoryTitle" align="center" variant="h5">
        {currentQuestion.category}
      </Typography>
      <QuestionCard>
        <Typography data-testid="questionText" align="center" variant="body1">
          {currentQuestion.question}
        </Typography>
      </QuestionCard>
      <Typography data-testid="counterText" align="center" variant="body1">
        {`${currentIndex + 1}/${total}`}
      </Typography>
    </>
  );
};

import { CircularProgress } from '@material-ui/core';
import { styled } from '@material-ui/styles';
import { Page } from 'components/ui';

const Spinner = styled(CircularProgress)({
  display: 'block',
  margin: '0 auto',
});

export const Loading = () => (
  <Page>
    <Spinner />
  </Page>
);

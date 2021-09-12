import { styled } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { ChildrenProps } from 'types';

const PageStyles = styled(Box)({
  display: 'grid',
  placeItems: 'center',
  minHeight: '100vh',
});

const Content = styled(Box)(({ theme: { breakpoints } }) => ({
  margin: '1rem auto',

  '&>*:not(:last-child)': {
    marginBottom: '1rem',
  },

  [breakpoints.down('sm')]: {
    width: '90%',
  },
  [breakpoints.up('md')]: {
    width: '75%',
  },
  [breakpoints.up('lg')]: {
    width: '50%',
  },
}));

export const Page = ({ children }: ChildrenProps) => (
  <PageStyles>
    <Content>{children}</Content>
  </PageStyles>
);

import { styled } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { ChildrenProps } from 'types';
import Div100vh from 'react-div-100vh';

const PageStyles = styled(Div100vh)({
  display: 'grid',
  placeItems: 'center',
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

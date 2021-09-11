import { styled } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { ChildrenProps } from 'types';

const PageStyles = styled(Box)(({ theme: { breakpoints } }) => ({
  [breakpoints.down('sm')]: {
    padding: '1rem',
  },
  [breakpoints.up('md')]: {
    padding: '20%',
  },
  [breakpoints.up('lg')]: {
    width: '33%',
  },
}));

export const Page = ({ children }: ChildrenProps) => (
  <PageStyles>{children}</PageStyles>
);

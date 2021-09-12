import { styled } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { ChildrenProps } from 'types';

const PageStyles = styled(Box)({
  display: 'grid',
  placeItems: 'center',
  height: '100vh',
});

export const Page = ({ children }: ChildrenProps) => (
  <PageStyles>{children}</PageStyles>
);

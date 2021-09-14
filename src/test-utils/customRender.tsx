import React, { ComponentType } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { ChildrenProps } from 'types/Children';
import { GameProvider } from 'state/game';
import { generateFakeQuestions } from './fakeApi';

interface Props extends ChildrenProps {
  fetchQuestions: jest.Mock;
}

const Wrapper = ({ children, fetchQuestions }: Props) => (
  <GameProvider fetchQuestions={fetchQuestions}>{children}</GameProvider>
);

interface CustomRenderOptions extends RenderOptions {
  fetchQuestions?: jest.Mock;
}

const customRender = (ui: React.ReactElement, options?: CustomRenderOptions) =>
  render(ui, {
    wrapper: (({ children }: ChildrenProps) => (
      <Wrapper
        fetchQuestions={
          options?.fetchQuestions ||
          jest.fn().mockResolvedValue(generateFakeQuestions())
        }
      >
        {children}
      </Wrapper>
    )) as ComponentType,
    ...options,
  });

export * from '@testing-library/react';
export { customRender as render };

import React, { ComponentType } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { ChildrenProps } from 'types/Children';
import { GameProvider } from 'state/game';

// add providers here
const Wrapper = ({ children }: ChildrenProps) => (
  <GameProvider>{children}</GameProvider>
);

const customRender = (ui: React.ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: Wrapper as ComponentType, ...options });

export * from '@testing-library/react';
export { customRender as render };

/* eslint-disable @typescript-eslint/ban-ts-ignore */
import React from 'react';
import { render } from '@testing-library/react';
import { ResizeObserver } from '@juggle/resize-observer';

import { MenuButton } from './MenuButton';

describe('<MenuButton /> spec', () => {
  // The version of JSDom we use does not have built in support for
  // ResizeObserver, so we're polyfilling it.
  let originalResizeObserver;

  beforeEach(() => {
    // @ts-ignore
    originalResizeObserver = window.ResizeObserver;
    // @ts-ignore
    window.ResizeObserver = ResizeObserver;
  });

  afterEach(() => {
    // @ts-ignore
    window.ResizeObserver = originalResizeObserver;
  });

  it('renders the component', () => {
    const { asFragment } = render(
      <MenuButton label="Foo">
        <a href="#foo">Foo</a>
        <a href="#bar">Bar</a>
      </MenuButton>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { Koros } from './Koros';

describe('<Koros /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(
      <>
        <Koros />
        <Koros type="basic" />
        <Koros type="beat" />
        <Koros type="pulse" />
        <Koros type="wave" />
        <Koros type="storm" />
      </>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('should not have basic accessibility issues', async () => {
    const { container } = render(
      <>
        <Koros />
        <Koros type="basic" />
        <Koros type="beat" />
        <Koros type="pulse" />
        <Koros type="wave" />
        <Koros type="storm" />
      </>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

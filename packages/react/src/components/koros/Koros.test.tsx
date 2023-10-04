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
        <Koros type="vibration" />
        <Koros type="wave" />
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
        <Koros type="vibration" />
        <Koros type="wave" />
      </>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

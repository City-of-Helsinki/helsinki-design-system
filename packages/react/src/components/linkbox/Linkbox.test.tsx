import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { Linkbox } from './Linkbox';

describe('<Linkbox /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(
      <Linkbox ariaLabel="HDS" href="https://hds.hel.fi" heading="Linkbox title" text="Linkbox text" />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should not have basic accessibility issues', async () => {
    const { container } = render(
      <Linkbox ariaLabel="HDS" href="https://hds.hel.fi" heading="Linkbox title" text="Linkbox text" />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

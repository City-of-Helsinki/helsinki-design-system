import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { Linkbox } from './Linkbox';

describe('<Linkbox /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(
      <Linkbox
        linkboxAriaLabel="Linkbox: HDS"
        linkAriaLabel="HDS"
        href="https://hds.hel.fi"
        heading="Linkbox title"
        text="Linkbox text"
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should not have basic accessibility issues', async () => {
    const { container } = render(
      <Linkbox
        linkboxAriaLabel="Linkbox: HDS"
        linkAriaLabel="HDS"
        href="https://hds.hel.fi"
        heading="Linkbox title"
        text="Linkbox text"
      />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  it('external linkbox that is opened in to a new tab should not have any basic accessibility issues', async () => {
    const { container, asFragment } = render(
      <Linkbox
        linkboxAriaLabel="Linkbox: HDS"
        linkAriaLabel="HDS"
        href="https://hds.hel.fi"
        heading="Linkbox title"
        text="Linkbox text"
        external
        openInNewTab
      />,
    );
    expect(asFragment()).toMatchSnapshot();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

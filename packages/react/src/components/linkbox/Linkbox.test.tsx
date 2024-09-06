import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { Linkbox } from './Linkbox';
import { getCommonElementTestProps, getElementAttributesMisMatches } from '../../utils/testHelpers';

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

  it('Native html props are passed to the element', async () => {
    const linkProps = getCommonElementTestProps<'a'>('a');
    // className goes to main element, not to <a> where other props go
    linkProps.className = undefined;
    linkProps.href = 'https://hds.hel.fi';
    const { getByTestId } = render(
      <Linkbox
        {...linkProps}
        linkboxAriaLabel="Linkbox: HDS"
        linkAriaLabel="HDS"
        heading="Linkbox title"
        text="Linkbox text"
      />,
    );
    const element = getByTestId(linkProps['data-testid']);
    expect(getElementAttributesMisMatches(element, linkProps)).toHaveLength(0);
  });
});

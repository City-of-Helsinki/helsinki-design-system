import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { Link, LinkProps } from './Link';
import { getElementAttributesMisMatches, getCommonElementTestProps } from '../../utils/testHelpers';

describe('<Link /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(
      <Link href="https://hds.hel.fi" aria-label="Link to hds.hel">
        Test link
      </Link>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('should not have basic accessibility issues', async () => {
    const { container } = render(<Link href="https://hds.hel.fi">Test link</Link>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  it('external link that is opened in to a new tab should not have any basic accessibility issues', async () => {
    const { container, asFragment } = render(
      <Link external openInNewTab href="https://hds.hel.fi">
        Test link
      </Link>,
    );
    expect(asFragment()).toMatchSnapshot();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  it('Native html props are passed to the element', async () => {
    const linkProps = getCommonElementTestProps<'a', Pick<LinkProps, 'href'>>('a');
    linkProps.href = 'https://hds.hel.fi';
    const { getByTestId } = render(
      <Link {...linkProps} external openInNewTab>
        Test link
      </Link>,
    );
    const element = getByTestId(linkProps['data-testid']);
    expect(
      getElementAttributesMisMatches(element, {
        ...linkProps,
        'aria-label': `${linkProps['aria-label']}. Avautuu uudessa välilehdessä. Siirtyy toiseen sivustoon.`,
      }),
    ).toHaveLength(0);
  });
});

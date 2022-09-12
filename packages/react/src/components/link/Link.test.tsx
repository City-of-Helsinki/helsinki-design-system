import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { Link } from './Link';

describe('<Link /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(
      <Link href="https://hds.hel.fi" ariaLabel="Link to hds.hel">
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
});

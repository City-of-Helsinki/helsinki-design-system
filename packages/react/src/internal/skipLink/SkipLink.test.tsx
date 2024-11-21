import React, { AnchorHTMLAttributes } from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { getCommonElementTestProps, getElementAttributesMisMatches } from '../../utils/testHelpers';
import { SkipLink } from './SkipLink';

describe('<SkipToContentLink /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<SkipLink skipTo="content" label="skip to content" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should show link when tab is pressed', () => {
    const { asFragment, getByText } = render(<SkipLink skipTo="content" label="skip to content" />);
    userEvent.tab();
    expect(asFragment()).toMatchSnapshot();
    expect(getByText(/skip to content/)).toBeVisible();
  });

  it('native html props are passed to the element', async () => {
    const linkProps = getCommonElementTestProps<'a'>('a');
    const { getByTestId } = render(<SkipLink skipTo="content" label="skip to content" {...linkProps} />);
    const element = getByTestId(linkProps['data-testid']);
    expect(
      getElementAttributesMisMatches(element, {
        ...linkProps,
        href: '#content',
      } as AnchorHTMLAttributes<HTMLAnchorElement>),
    ).toHaveLength(0);
  });
});

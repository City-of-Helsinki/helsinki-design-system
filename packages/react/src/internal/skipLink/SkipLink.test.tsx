import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { SkipLink } from './SkipLink';

describe('<SkipToContentLink /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<SkipLink skipTo="content" label="skip to content" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('it should show link when tab is pressed', () => {
    const { asFragment, getByText } = render(<SkipLink skipTo="content" label="skip to content" />);
    userEvent.tab();
    expect(asFragment()).toMatchSnapshot();
    expect(getByText(/skip to content/)).toBeVisible();
  });
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { SkipToContentLink } from './SkipToContentLink';

describe('<SkipToContentLink /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<SkipToContentLink skipTo="content" label="skip to content" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('it should show link when tab is pressed', () => {
    render(<SkipToContentLink skipTo="content" label="skip to content" />);
    userEvent.tab();
    expect(screen.getAllByText('skip to content')).toBeVisible();
  });
});

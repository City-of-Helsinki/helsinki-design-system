import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { SkipToContentLink } from './SkipToContentLink';
import { SkipToContentLinkWrapper } from '../../../../utils/test-utils';

describe('<NavigationLink /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<SkipToContentLink skipTo="content" label="skip to content" />, {
      wrapper: SkipToContentLinkWrapper,
    });
    expect(asFragment()).toMatchSnapshot();
  });

  it('it should show link when tab is pressed', () => {
    render(<SkipToContentLink skipTo="content" label="skip to content" />, {
      wrapper: SkipToContentLinkWrapper,
    });
    userEvent.tab();
    expect(screen.getAllByText('skip to content')).toBeVisible();
  });
});

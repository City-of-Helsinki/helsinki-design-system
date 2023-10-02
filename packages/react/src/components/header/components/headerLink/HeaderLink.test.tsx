import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { HeaderLink } from './HeaderLink';
import { HeaderNavigationMenuWrapper } from '../../../../utils/test-utils';

describe('<HeaderLink /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<HeaderLink href="#" label="Link" />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should not have basic accessibility issues', async () => {
    const { container } = render(<HeaderLink href="#" label="Link" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not open dropdown when the link is hovered', async () => {
    render(<HeaderLink href="#" label="Link" dropdownLinks={[<HeaderLink href="#" label="Test" />]} />, {
      wrapper: HeaderNavigationMenuWrapper,
    });
    userEvent.hover(screen.getByText('Link'));
    expect(screen.getByTestId('dropdown-menu-0')).not.toBeVisible();
  });

  it('should open dropdown when the link is clicked', async () => {
    render(<HeaderLink href="#" label="Link" dropdownLinks={[<HeaderLink href="#" label="Test" />]} />, {
      wrapper: HeaderNavigationMenuWrapper,
    });
    userEvent.click(screen.getByText('Link'));
    expect(screen.getByTestId('dropdown-menu-0')).toBeVisible();
  });

  it('should have only one main dropdown active', async () => {
    render(
      <>
        <HeaderLink href="#" label="Link 1" dropdownLinks={[<HeaderLink href="#" label="Link 1 nested" />]} />
        <HeaderLink href="#" label="Link 2" dropdownLinks={[<HeaderLink href="#" label="Link 2 nested" />]} />
      </>,
      { wrapper: HeaderNavigationMenuWrapper },
    );

    // Click the first main navigation link
    userEvent.click(screen.getByText('Link 1'));
    expect(screen.getByTestId('dropdown-menu-0')).toBeVisible();

    // Click the second main navigation link
    userEvent.click(screen.getByText('Link 2'));

    // Now the second dropdown should show
    expect(screen.getByTestId('dropdown-menu-1')).toBeVisible();

    // The first dropdown should not be visible. This can only be tested if display: none; is set inline!
    expect(screen.getByTestId('dropdown-menu-0')).not.toBeVisible();
  });
});

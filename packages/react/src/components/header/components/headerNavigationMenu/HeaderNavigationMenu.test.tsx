import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { HeaderNavigationMenu } from './HeaderNavigationMenu';
import { NavigationLink } from '../navigationLink/NavigationLink';
import { HeaderNavigationMenuWrapper } from '../../../../utils/test-utils';

describe('<HeaderNavigationMenu /> spec', () => {
  it('renders the component', () => {
    const { asFragment } = render(<HeaderNavigationMenu />);
    expect(asFragment()).toMatchSnapshot();
  });
  it('should not have basic accessibility issues', async () => {
    const { container } = render(<HeaderNavigationMenu />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  it('should open dropdown when the button is clicked', async () => {
    render(
      <NavigationLink
        href="#"
        label="Link"
        dropdownLinks={[
          <NavigationLink href="#" label="Test" dropdownLinks={[<NavigationLink href="#" label="Test" />]} />,
        ]}
      />,
      { wrapper: HeaderNavigationMenuWrapper },
    );
    userEvent.click(screen.getByTestId('dropdown-button-main-nav-0'));

    expect(screen.getByTestId('dropdown-menu-main-nav-0')).toBeVisible();
  });
  it('should have only one main dropdown active', async () => {
    render(
      <>
        <NavigationLink href="#" label="Link 1" dropdownLinks={[<NavigationLink href="#" label="Link 1 nested" />]} />
        <NavigationLink href="#" label="Link 2" dropdownLinks={[<NavigationLink href="#" label="Link 2 nested" />]} />
      </>,
      { wrapper: HeaderNavigationMenuWrapper },
    );
    // Click the first main navigation link's dropdown button
    userEvent.click(screen.getByTestId('dropdown-button-main-nav-0'));
    expect(screen.getByTestId('dropdown-menu-main-nav-0')).toBeVisible();
    // Click the second main navigation link's dropdown button
    userEvent.click(screen.getByTestId('dropdown-button-main-nav-1'));
    // Now the second dropdown should show
    expect(screen.getByTestId('dropdown-menu-main-nav-1')).toBeVisible();
    // The first dropdown should not be visible. This can only be tested if display: none; is set inline!
    expect(screen.getByTestId('dropdown-menu-main-nav-0')).not.toBeVisible();
  });
});

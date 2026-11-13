import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { HeaderLink } from './HeaderLink';
import { HeaderNavigationMenuWrapper } from '../../../../utils/test-utils';
import { getCommonElementTestProps, getElementAttributesMisMatches } from '../../../../utils/testHelpers';

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

  it('Native html props are passed to the element', async () => {
    const linkProps = getCommonElementTestProps<'a'>('a');
    linkProps['aria-label'] = 'Aria-label with comma.';
    const { getByTestId } = render(<HeaderLink {...linkProps} label="Link" />);
    const element = getByTestId(linkProps['data-testid']);
    expect(getElementAttributesMisMatches(element, linkProps)).toHaveLength(0);
  });

  it('should not open dropdown when the link is hovered', async () => {
    render(<HeaderLink href="#" label="Link" dropdownLinks={[<HeaderLink href="#" label="Test" />]} />, {
      wrapper: HeaderNavigationMenuWrapper,
    });
    await userEvent.hover(screen.getByText('Link'));
    expect(screen.getByTestId('dropdown-menu-0')).not.toBeVisible();
  });

  it('should open dropdown when the button is clicked', async () => {
    render(<HeaderLink href="#" label="Link" dropdownLinks={[<HeaderLink href="#" label="Test" />]} />, {
      wrapper: HeaderNavigationMenuWrapper,
    });
    await userEvent.click(screen.getByTestId('dropdown-button-0'));
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

    // Click the first main navigation link's dropdown button
    await userEvent.click(screen.getByTestId('dropdown-button-0'));
    expect(screen.getByTestId('dropdown-menu-0')).toBeVisible();
    // Click the second main navigation link's dropdown button
    await userEvent.click(screen.getByTestId('dropdown-button-1'));

    // Now the second dropdown should show
    expect(screen.getByTestId('dropdown-menu-1')).toBeVisible();

    // The first dropdown should not be visible. This can only be tested if display: none; is set inline!
    expect(screen.getByTestId('dropdown-menu-0')).not.toBeVisible();
  });

  describe('keyboard focus handling', () => {
    const renderNavigation = () =>
      render(
        <>
          <HeaderNavigationMenuWrapper>
            <HeaderLink
              href="#"
              label="Link 1"
              dropdownLinks={[
                <HeaderLink href="#" label="Nested 1" dropdownLinks={[<HeaderLink href="#" label="Deep 1" />]} />,
                <HeaderLink href="#" label="Nested 2" />,
              ]}
            />
            <HeaderLink href="#" label="Link 2" />
          </HeaderNavigationMenuWrapper>
          <a href="#after">After header</a>
        </>,
      );
    // Main and nested dropdowns share test ids, so pick them in document order
    const getMainButton = () => screen.getAllByTestId('dropdown-button-0')[0];
    const getMainMenu = () => screen.getAllByTestId('dropdown-menu-0')[0];
    const getNestedButton = () => screen.getAllByTestId('dropdown-button-0')[1];
    const getNestedMenu = () => screen.getAllByTestId('dropdown-menu-0')[1];

    it('keeps the dropdown open while focus moves inside it', async () => {
      const user = userEvent.setup();
      renderNavigation();
      getMainButton().focus();
      await user.keyboard('{Enter}');
      await user.tab();
      expect(screen.getByText('Nested 1')).toHaveFocus();
      expect(getMainMenu()).toBeVisible();
      expect(getMainButton()).toHaveAttribute('aria-expanded', 'true');
    });

    it('closes the dropdown when focus moves outside it', async () => {
      const user = userEvent.setup();
      renderNavigation();
      getMainButton().focus();
      await user.keyboard('{Enter}');
      expect(getMainMenu()).toBeVisible();
      screen.getByText('Nested 2').focus();
      await user.tab();
      expect(screen.getByText('Link 2')).toHaveFocus();
      expect(getMainMenu()).not.toBeVisible();
      expect(getMainButton()).toHaveAttribute('aria-expanded', 'false');
    });

    it('closes the dropdown and focuses its button when Escape is pressed', async () => {
      const user = userEvent.setup();
      renderNavigation();
      getMainButton().focus();
      await user.keyboard('{Enter}');
      screen.getByText('Nested 2').focus();
      await user.keyboard('{Escape}');
      expect(getMainMenu()).not.toBeVisible();
      expect(getMainButton()).toHaveFocus();
    });

    it('closes only the nested dropdown when focus moves out of it', async () => {
      const user = userEvent.setup();
      renderNavigation();
      getMainButton().focus();
      await user.keyboard('{Enter}');
      getNestedButton().focus();
      await user.keyboard('{Enter}');
      expect(getNestedMenu()).toBeVisible();
      screen.getByText('Deep 1').focus();
      await user.tab();
      expect(screen.getByText('Nested 2')).toHaveFocus();
      expect(getNestedMenu()).not.toBeVisible();
      expect(getMainMenu()).toBeVisible();
    });

    it('closes only the innermost dropdown when Escape is pressed', async () => {
      const user = userEvent.setup();
      renderNavigation();
      getMainButton().focus();
      await user.keyboard('{Enter}');
      getNestedButton().focus();
      await user.keyboard('{Enter}');
      screen.getByText('Deep 1').focus();
      await user.keyboard('{Escape}');
      expect(getNestedMenu()).not.toBeVisible();
      expect(getNestedButton()).toHaveFocus();
      expect(getMainMenu()).toBeVisible();
      await user.keyboard('{Escape}');
      expect(getMainMenu()).not.toBeVisible();
      expect(getMainButton()).toHaveFocus();
    });
  });
});

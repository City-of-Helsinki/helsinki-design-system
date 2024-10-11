import { fireEvent, act, waitFor } from '@testing-library/react';
import React from 'react';

import { initTests, jestHelpers } from './test.util';
import { HeaderActionBarItem, HeaderActionBarItemProps } from '../headerActionBarItem';
import { HeaderUserMenuButton } from './HeaderUserMenuButton';
import { getCommonElementTestProps, getElementAttributesMisMatches } from '../../../../utils/testHelpers';

describe('HeaderLogoutSubmenuButton', () => {
  const defaultUserProfile = { given_name: 'ABC', family_name: 'ZYX', email: 'email@domain.com' };

  const initTestsWithComponent = (
    isUserAuthenticated = true,
    user = {},
    extraProps?: Partial<HeaderActionBarItemProps>,
  ) => {
    const Component = () => {
      return (
        <HeaderUserMenuButton id="user-menu" {...extraProps}>
          <HeaderActionBarItem id="item" />
        </HeaderUserMenuButton>
      );
    };

    return initTests({}, Component, isUserAuthenticated, { ...defaultUserProfile, ...user });
  };

  beforeEach(() => {
    jestHelpers.beforeEach();
  });
  afterEach(() => {
    jestHelpers.afterEach();
  });

  const getRenderedInitials = (button: HTMLElement) => {
    return button.querySelector('div:first-child > span')?.innerHTML;
  };
  const getUserName = (container: HTMLElement) => {
    return container.querySelector('#user-menu h3')?.innerHTML;
  };

  it('The button is rendered', async () => {
    const { getUserMenuButton } = initTestsWithComponent();
    expect(getUserMenuButton()).toMatchSnapshot();
  });

  it('The button is not rendered if user is not logged in', async () => {
    const { getUserMenuButton } = initTestsWithComponent(false);
    expect(getUserMenuButton()).toBeNull();
  });

  it('Native html props are passed to the element', async () => {
    const buttonProps = getCommonElementTestProps('button');
    // aria-label goes to a descendant in HeaderActionBarItem
    buttonProps['aria-label'] = undefined;
    const { getByTestId } = initTestsWithComponent(true, {}, buttonProps);
    const element = getByTestId(buttonProps['data-testid']);
    expect(getElementAttributesMisMatches(element, buttonProps)).toHaveLength(0);
  });

  it('Initials are rendered', async () => {
    const { getUserMenuButton } = initTestsWithComponent(true);
    expect(getRenderedInitials(getUserMenuButton())).toBe('AZ');
  });

  it('Email is used if initials are not set', async () => {
    const { getUserMenuButton } = initTestsWithComponent(true, { given_name: undefined, family_name: undefined });
    expect(getRenderedInitials(getUserMenuButton())).toBe('E');
  });

  it('Name is displayed when menu is open', async () => {
    const user = { name: 'User Fullname' };
    const { getUserMenuButton, container } = initTestsWithComponent(true, user);
    act(() => {
      fireEvent.click(getUserMenuButton());
    });
    await waitFor(() => {
      expect(getUserName(container)).toBe(user.name);
    });
  });

  it('Email is displayed when menu is open and name is not set', async () => {
    const { getUserMenuButton, container } = initTestsWithComponent(true, { name: undefined });
    act(() => {
      fireEvent.click(getUserMenuButton());
    });
    await waitFor(() => {
      expect(getUserName(container)).toBe(defaultUserProfile.email);
    });
  });
});

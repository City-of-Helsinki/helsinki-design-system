import { fireEvent, act, waitFor } from '@testing-library/react';
import React from 'react';

import { initTests, jestHelpers } from './test.util';
import { HeaderActionBarItem } from '../headerActionBarItem';
import { HeaderUserMenuButton } from './HeaderUserMenuButton';

describe('HeaderLogoutSubmenuButton', () => {
  const defaultUserProfile = { given_name: 'ABC', family_name: 'ZYX', email: 'email@domain.com' };
  const Component = () => {
    return (
      <HeaderUserMenuButton id="user-menu">
        <HeaderActionBarItem id="item" />
      </HeaderUserMenuButton>
    );
  };
  const initTestsWithComponent = (isUserAuthenticated = true, user = {}) => {
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

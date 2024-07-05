import { fireEvent, act, waitFor } from '@testing-library/react';
import React from 'react';

import { advanceUntilDoesNotThrow, advanceUntilPromiseResolved } from '../../../login/testUtils/timerTestUtil';
import { getActiveElement } from '../../../cookieConsent/test.util';
import { HeaderLogoutSubmenuButton, HeaderLogoutSubmenuButtonProps } from './HeaderLogoutSubmenuButton';
import { initTests, jestHelpers } from './test.util';
import { HeaderActionBarItem } from '../headerActionBarItem';
import { HeaderUserMenuButton } from './HeaderUserMenuButton';

describe('HeaderLogoutSubmenuButton', () => {
  const props: HeaderLogoutSubmenuButtonProps = {
    id: 'logout-button',
    label: 'Button label',
    errorLabel: 'errorLabel',
    errorText: 'errorText',
    errorCloseAriaLabel: 'errorCloseAriaLabel',
    loggingOutText: 'loggingOutText',
  };
  const Component = (componentProps) => {
    return (
      <HeaderUserMenuButton id="usermenu">
        <HeaderActionBarItem id="item">
          <HeaderLogoutSubmenuButton {...componentProps} />
        </HeaderActionBarItem>
      </HeaderUserMenuButton>
    );
  };
  const initTestsWithComponent = (isUserAuthenticated = true) => {
    return initTests(props, Component, isUserAuthenticated);
  };

  beforeEach(() => {
    jestHelpers.beforeEach();
  });
  afterEach(() => {
    jestHelpers.afterEach();
  });

  it('The button is rendered', async () => {
    const { getButtonElement } = initTestsWithComponent();
    expect(getButtonElement()).toMatchSnapshot();
  });

  it('Click calls oidcClient.logout(). Loading is indicated', async () => {
    const { getButtonElement, getLoadIndicator, spyOnOidcClientLogout } = initTestsWithComponent();
    expect(getLoadIndicator).toThrow();
    const { mock, promise } = spyOnOidcClientLogout(false);
    act(() => {
      fireEvent.click(getButtonElement());
    });
    await waitFor(() => {
      expect(mock).toHaveBeenCalledTimes(1);
    });
    await advanceUntilDoesNotThrow(() => {
      getLoadIndicator();
    });
    await advanceUntilPromiseResolved(promise);
  });

  describe('When error occurs', () => {
    it('error text is shown and focus stays in the button', async () => {
      const result = initTestsWithComponent();
      const { getButtonElement, getErrorElement, getLoadIndicator, clickAndAdvanceUntilErrorShown } = result;
      expect(getErrorElement).toThrow();
      await clickAndAdvanceUntilErrorShown(result, false);
      expect(getLoadIndicator).toThrow();
      expect(getActiveElement(getButtonElement()) === getButtonElement()).toBeTruthy();
    });

    it('When focus moves from the button to the shifter, the error element gets focus', async () => {
      const result = initTestsWithComponent();
      const { getButtonElement, getErrorElementButton, getFocusShifter, clickAndAdvanceUntilErrorShown } = result;
      await clickAndAdvanceUntilErrorShown(result, false);
      fireEvent.focus(getFocusShifter(), { relatedTarget: getButtonElement() });
      expect(getActiveElement(getButtonElement()) === getErrorElementButton()).toBeTruthy();
    });

    it('When error is cleared, focus moves to the user menu button. Focus shifter is removed.', async () => {
      const result = initTestsWithComponent();
      const {
        getButtonElement,
        getErrorElementButton,
        getFocusShifter,
        clickAndAdvanceUntilErrorShown,
        getUserMenuButton,
      } = result;
      await clickAndAdvanceUntilErrorShown(result, false);
      expect(getFocusShifter()).not.toBeNull();
      act(() => {
        getErrorElementButton()?.focus();
        getErrorElementButton()?.click();
      });
      await waitFor(() => {
        expect(getActiveElement(getButtonElement()) === getUserMenuButton()).toBeTruthy();
      });
      expect(() => getFocusShifter()).toThrow();
    });
  });
});

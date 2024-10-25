import { fireEvent, act, waitFor } from '@testing-library/react';
import React from 'react';

import { advanceUntilDoesNotThrow, advanceUntilPromiseResolved } from '../../../login/testUtils/timerTestUtil';
import { getActiveElement } from '../../../cookieConsent/test.util';
import { HeaderLogoutSubmenuButton, HeaderLogoutSubmenuButtonProps } from './HeaderLogoutSubmenuButton';
import { initTests, jestHelpers } from './test.util';
import { HeaderActionBarItem } from '../headerActionBarItem';
import { HeaderUserMenuButton } from './HeaderUserMenuButton';
import { getCommonElementTestProps, getElementAttributesMisMatches } from '../../../../utils/testHelpers';

describe('HeaderLogoutSubmenuButton', () => {
  const props: HeaderLogoutSubmenuButtonProps = {
    id: 'logout-button',
    label: 'Button label',
    errorLabel: 'errorLabel',
    errorText: 'errorText',
    errorCloseAriaLabel: 'errorCloseAriaLabel',
    loggingOutText: 'loggingOutText',
    redirectionProps: { language: 'de', extraQueryParams: { extra: 'extra' } },
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
  const initTestsWithComponent = (isUserAuthenticated = true, extraProps?: Partial<HeaderLogoutSubmenuButtonProps>) => {
    return initTests({ ...props, ...extraProps }, Component, isUserAuthenticated);
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

  it('Native html props are passed to the element', async () => {
    const buttonProps = getCommonElementTestProps<'button'>('button');
    // "." is added to aria-label inside the component if missing.
    buttonProps['aria-label'] = 'Aria-label with comma.';
    const { getByTestId } = initTestsWithComponent(true, buttonProps);
    const element = getByTestId(buttonProps['data-testid']);
    expect(getElementAttributesMisMatches(element, buttonProps)).toHaveLength(0);
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

  it('Given redirectionParams are appended. "language" is converted in oidcClient to "ui_locales"', async () => {
    const { getButtonElement, getLoadIndicator, spyOnOidcClientLogout } = initTestsWithComponent();
    expect(getLoadIndicator).toThrow();
    const { mock, promise } = spyOnOidcClientLogout(false);
    act(() => {
      fireEvent.click(getButtonElement());
    });
    await waitFor(() => {
      expect(mock).toHaveBeenCalledWith({
        extraQueryParams: {
          extra: 'extra',
          ui_locales: 'de',
        },
      });
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

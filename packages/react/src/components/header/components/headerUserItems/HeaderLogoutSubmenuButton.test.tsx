import { fireEvent, act, waitFor } from '@testing-library/react';
import React from 'react';

import { advanceUntilDoesNotThrow, advanceUntilPromiseResolved } from '../../../login/testUtils/timerTestUtil';
import { getActiveElement } from '../../../cookieConsent/test.util';
import { HeaderLogoutSubmenuButton, HeaderLogoutSubmenuButtonProps } from './HeaderLogoutSubmenuButton';
import { initTests, jestHelpers } from './test.util';
import { HeaderActionBarItem } from '../headerActionBarItem';
import { HeaderUserMenuButton } from './HeaderUserMenuButton';
import { getCommonElementTestProps, getElementAttributesMisMatches } from '../../../../utils/testHelpers';
import mockWindowLocation from '../../../../utils/mockWindowLocation';

jest.mock('../../LanguageContext', () => ({
  ...(jest.requireActual('../../LanguageContext') as Record<string, unknown>),
  useActiveLanguage: () => 'za',
}));

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

  const mockedWindowControls = mockWindowLocation();

  beforeEach(() => {
    jestHelpers.beforeEach();
  });
  afterEach(() => {
    mockedWindowControls.reset();
    jestHelpers.afterEach();
  });

  afterAll(() => {
    mockedWindowControls.restore();
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
    const { getButtonElement, spyOnOidcClientLogout } = initTestsWithComponent();
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
    await advanceUntilPromiseResolved(promise);
  });

  it('When redirectWithLanguage is true, active language is appended to logout props', async () => {
    const { getButtonElement, spyOnOidcClientLogout } = initTestsWithComponent(true, {
      redirectWithLanguage: true,
    });
    const { mock, promise } = spyOnOidcClientLogout(false);
    act(() => {
      fireEvent.click(getButtonElement());
    });
    await waitFor(() => {
      expect(mock).toHaveBeenCalledWith({
        extraQueryParams: {
          extra: 'extra',
          ui_locales: 'za',
        },
      });
    });
    await advanceUntilPromiseResolved(promise);
  });

  it('If onClick is set, it is called with the event when button is clicked', async () => {
    const onClick = jest.fn();
    const { getButtonElement, spyOnOidcClientLogin } = initTestsWithComponent(true, {
      onClick,
    });
    const { promise } = spyOnOidcClientLogin(false);
    act(() => {
      fireEvent.click(getButtonElement());
    });
    await waitFor(() => {
      expect(onClick).toHaveBeenCalledTimes(1);
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
      act(() => {
        getErrorElementButton()?.focus();
        getErrorElementButton()?.click();
      });
      await waitFor(() => {
        expect(getActiveElement(getButtonElement()) === getUserMenuButton()).toBeTruthy();
        expect(() => getFocusShifter()).toThrow();
      });
    });
  });
});

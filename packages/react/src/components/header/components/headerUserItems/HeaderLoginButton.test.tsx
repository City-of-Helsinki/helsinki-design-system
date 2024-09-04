import { fireEvent, act, waitFor } from '@testing-library/react';
import React from 'react';

import { advanceUntilDoesNotThrow, advanceUntilPromiseResolved } from '../../../login/testUtils/timerTestUtil';
import { getActiveElement } from '../../../cookieConsent/test.util';
import { HeaderLoginButton, HeaderLoginButtonProps } from './HeaderLoginButton';
import { initTests, jestHelpers } from './test.util';
import { getCommonElementTestProps, getElementAttributesMisMatches } from '../../../../utils/testHelpers';

describe('HeaderLoginButton', () => {
  const props: HeaderLoginButtonProps = {
    label: 'Button label',
    id: 'login-button',
    errorLabel: 'errorLabel',
    errorText: 'errorText',
    errorCloseAriaLabel: 'errorCloseAriaLabel',
    loggingInText: 'loggingInText',
  };
  const Component = (componentProps) => {
    return <HeaderLoginButton {...componentProps} />;
  };
  const initTestsWithComponent = (isUserAuthenticated = false, extraProps?: Partial<HeaderLoginButtonProps>) => {
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

  it('The button is not rendered if user is logged in', async () => {
    const { getButtonElement } = initTestsWithComponent(true);
    expect(getButtonElement()).toBeNull();
  });

  it('Native html props are passed to the element', async () => {
    const buttonProps = getCommonElementTestProps<'button'>('button');
    // aria-label is constructed inside the component
    buttonProps['aria-label'] = undefined;
    const { getByTestId } = initTestsWithComponent(false, buttonProps);
    const element = getByTestId(buttonProps['data-testid']);
    expect(getElementAttributesMisMatches(element, buttonProps)).toHaveLength(0);
  });

  it('Click calls oidcClient.login(). Loading is indicated', async () => {
    const { getButtonElement, getLoadIndicator, spyOnOidcClientLogin } = initTestsWithComponent();
    expect(getLoadIndicator).toThrow();
    const { mock, promise } = spyOnOidcClientLogin(false);
    act(() => {
      fireEvent.click(getButtonElement());
    });
    expect(mock).toHaveBeenCalledTimes(1);
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
      await clickAndAdvanceUntilErrorShown(result, true);
      expect(getLoadIndicator).toThrow();
      expect(getActiveElement(getButtonElement()) === getButtonElement()).toBeTruthy();
    });

    it('When focus moves from the button to the shifter, the error element gets focus', async () => {
      const result = initTestsWithComponent();
      const { getButtonElement, getErrorElementButton, getFocusShifter, clickAndAdvanceUntilErrorShown } = result;
      await clickAndAdvanceUntilErrorShown(result, true);
      fireEvent.focus(getFocusShifter(), { relatedTarget: getButtonElement() });
      expect(getActiveElement(getButtonElement()) === getErrorElementButton()).toBeTruthy();
    });

    it('When error is cleared, focus moves back to the button. Focus shifter is removed.', async () => {
      const result = initTestsWithComponent();
      const { getButtonElement, getErrorElementButton, getFocusShifter, clickAndAdvanceUntilErrorShown } = result;
      await clickAndAdvanceUntilErrorShown(result, true);
      expect(getFocusShifter()).not.toBeNull();
      act(() => {
        getErrorElementButton()?.focus();
        getErrorElementButton()?.click();
      });
      await waitFor(() => {
        expect(getActiveElement(getButtonElement()) === getButtonElement()).toBeTruthy();
      });
      expect(() => getFocusShifter()).toThrow();
    });
  });
});

import React, { FocusEvent } from 'react';

import { NotificationProps } from '../../../notification';
import { HeaderContextType, useHeaderContext, useSetHeaderContext } from '../../HeaderContext';

/**
 * This hook manages data for login/logout errors and the notification for the error.
 * Related components are detected with data-testid and data-hds-header-error-usage.
 * Latter could not be used with Notification components, so had to use data-testid.
 * First one could not be used with other elements because user's might need it.
 *
 * For accessibility reasons, the user should be able to move with keyboard
 * from the login/logout button to the error notification and back.
 * The error notification cannot be rendered to the menu, so focus handling got complicated.
 * HeaderErrorFocusShifter has invisible button that shifts the focus around when it receives the focus.
 */

export enum HeaderErrorUsageType {
  FocusShifter = 'focusShifter',
  Login = 'login',
  Logout = 'logout',
  Notification = 'notification',
  UserMenu = 'userMenu',
}

type Props = {
  usage: HeaderErrorUsageType;
  errorLabel?: string;
  errorText?: string;
  errorCloseAriaLabel?: string;
  errorPosition?: NotificationProps['position'];
};

const dataAttributeName = 'data-hds-header-error-usage';
const notificationTestIdValue = `${dataAttributeName}-${HeaderErrorUsageType.Notification}`;
const dataTestIdAttributeName = 'data-testid';

const getElementByUsageType = (usage: HeaderErrorUsageType) => {
  if (usage === HeaderErrorUsageType.Notification) {
    return (
      (document.querySelector(`*[${dataTestIdAttributeName}="${notificationTestIdValue}"]`) as HTMLElement) || null
    );
  }
  return (document.querySelector(`*[${dataAttributeName}="${usage}"]`) as HTMLElement) || null;
};

const getElementUsageType = (element: HTMLElement | null) => {
  if (!element) {
    return undefined;
  }
  const dataAttr = element.getAttribute(dataAttributeName);
  if (dataAttr) {
    return dataAttr;
  }
  return element.getAttribute(dataTestIdAttributeName) === notificationTestIdValue
    ? HeaderErrorUsageType.Notification
    : undefined;
};

const focusElementByUsageType = (usage: HeaderErrorUsageType) => {
  const element = getElementByUsageType(usage);
  if (element && element.focus) {
    element.focus();
  }
};

const focusNotificationCloseButton = () => {
  const element = getElementByUsageType(HeaderErrorUsageType.Notification);
  if (element) {
    const button = element.querySelector('button');
    if (button) {
      button.focus();
    }
  }
};

const focusUserMenuButton = () => {
  const element = getElementByUsageType(HeaderErrorUsageType.UserMenu);
  if (element) {
    const button = element.querySelector('button');
    if (button) {
      button.focus();
    }
  }
};

const isLoginOrLogoutElement = (element: HTMLElement | null) => {
  const usage = getElementUsageType(element);
  return usage && getElementUsageType(element) !== HeaderErrorUsageType.Notification;
};

const getBlurredElement = (e: FocusEvent<HTMLButtonElement>) => {
  return e.relatedTarget as HTMLElement;
};

const setFocusBackToElement = (error: HeaderContextType['error']) => {
  if (!error) {
    return;
  }
  if (error.source === HeaderErrorUsageType.Logout) {
    focusUserMenuButton();
  } else {
    focusElementByUsageType(HeaderErrorUsageType.Login);
  }
};

export const useHeaderError = ({ usage, errorLabel, errorText, errorPosition, errorCloseAriaLabel }: Props) => {
  const { setError } = useSetHeaderContext();
  const { error } = useHeaderContext();
  const hasError = !!(error && error.source);
  const hasLogoutError = hasError && error.source === HeaderErrorUsageType.Logout;
  const triggerError = () => {
    setError({
      label: errorLabel || '',
      text: errorText || '',
      closeButtonAriaLabel: errorCloseAriaLabel || '',
      notificationPosition: errorPosition,
      source: usage,
    });
  };

  const getElementProps = (): React.HTMLAttributes<HTMLElement> & {
    [dataTestIdAttributeName]?: string;
    [dataAttributeName]?: string;
    onClose?: () => void;
  } => {
    if (usage === HeaderErrorUsageType.Notification) {
      if (!hasError) {
        return {};
      }
      return {
        [dataTestIdAttributeName]: notificationTestIdValue,
        onClose: () => {
          setFocusBackToElement(error);
          setError(undefined);
        },
      };
    }
    if (usage === HeaderErrorUsageType.FocusShifter) {
      if (!hasError) {
        return {};
      }
      return {
        onFocus: (e: FocusEvent<HTMLButtonElement>) => {
          const blurredElement = getBlurredElement(e);
          if (!blurredElement) {
            return;
          }
          if (isLoginOrLogoutElement(blurredElement)) {
            focusNotificationCloseButton();
          } else {
            focusElementByUsageType(HeaderErrorUsageType.Notification);
          }
        },
        'aria-label': error.closeButtonAriaLabel,
      };
    }
    return {
      [dataAttributeName]: usage,
    };
  };

  return {
    hasError,
    hasLogoutError,
    triggerError,
    elementProps: getElementProps(),
    closeButtonAriaLabel: errorCloseAriaLabel,
    clearError: () => {
      setError(undefined);
    },
  };
};

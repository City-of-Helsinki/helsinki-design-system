import React, { useContext, useEffect, useState } from 'react';
import { VisuallyHidden } from '@react-aria/visually-hidden';

import classNames from '../../../utils/classNames';
import styles from '../CookieConsent.module.scss';
import { CookieConsentContext, useCookieConsentUiTexts } from '../CookieConsentContext';
import Content from '../content/Content';

export function Modal(): React.ReactElement | null {
  const cookieConsentContext = useContext(CookieConsentContext);
  const shouldShowCookieConsents = !cookieConsentContext.hasUserHandledAllConsents();
  const { settingsSaved } = useCookieConsentUiTexts();
  const [cookieConsentDialogIsShown] = useState<boolean>(shouldShowCookieConsents);
  const [popupTimerComplete, setPopupTimerComplete] = useState<boolean>(false);
  const popupDelayInMs = 500;
  // if hasUserHandledAllConsents() was false at first and then later true, user must have saved them.
  const showScreenReaderSaveNotification = cookieConsentDialogIsShown && !shouldShowCookieConsents;
  useEffect(() => {
    setTimeout(() => setPopupTimerComplete(true), popupDelayInMs);
  }, []);

  if (showScreenReaderSaveNotification) {
    return (
      <VisuallyHidden>
        <div role="alert" data-testid="cookie-consent-screen-reader-notification" tabIndex={-1}>
          {settingsSaved}
        </div>
      </VisuallyHidden>
    );
  }

  if (!shouldShowCookieConsents) {
    return null;
  }

  return (
    <div
      className={classNames(styles.container, popupTimerComplete && styles['animate-in'])}
      data-testid="cookie-consent"
    >
      <div className={styles.aligner}>
        <Content />
      </div>
    </div>
  );
}

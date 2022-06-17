import React, { useContext, useEffect, useState } from 'react';
import { VisuallyHidden } from '@react-aria/visually-hidden';

import classNames from '../../../utils/classNames';
import styles from '../CookieConsent.module.scss';
import { CookieConsentContext, useCookieConsentUiTexts, useFocusShift } from '../CookieConsentContext';
import { Content } from '../content/Content';

export function Modal(): React.ReactElement | null {
  const cookieConsentContext = useContext(CookieConsentContext);
  const hasOnlyRequiredConsents =
    !cookieConsentContext.content.optionalCookies || cookieConsentContext.content.optionalCookies.groups.length === 0;
  const shouldShowModal = !hasOnlyRequiredConsents && !cookieConsentContext.hasUserHandledAllConsents();
  const [isModalInitiallyShown] = useState<boolean>(shouldShowModal);
  const [popupTimerComplete, setPopupTimerComplete] = useState<boolean>(false);
  const popupDelayInMs = 500;
  // if hasUserHandledAllConsents() was false at first and then later true, user must have saved consents.
  const showScreenReaderSaveNotification = isModalInitiallyShown && !shouldShowModal;
  const { settingsSaved } = useCookieConsentUiTexts();
  const shiftFocus = useFocusShift();

  useEffect(() => {
    setTimeout(() => setPopupTimerComplete(true), popupDelayInMs);
  }, []);
  useEffect(() => {
    // Set focus outside when esc is pressed.
    const handleEscKey = (event: KeyboardEvent) => {
      const key = event.key || event.keyCode;
      if (key === 'Escape' || key === 'Esc' || key === 27) {
        shiftFocus();
      }
    };
    document.addEventListener('keyup', handleEscKey);
    return () => {
      document.removeEventListener('keyup', handleEscKey);
    };
  });

  if (showScreenReaderSaveNotification) {
    return (
      <VisuallyHidden>
        <div role="alert" data-testid="cookie-consent-screen-reader-notification" tabIndex={-1}>
          {settingsSaved}
        </div>
      </VisuallyHidden>
    );
  }

  if (!shouldShowModal) {
    return null;
  }

  return (
    <div
      className={classNames(styles.container, styles.modal, popupTimerComplete && styles.animateIn)}
      data-testid="cookie-consent"
    >
      <div className={styles.aligner}>{popupTimerComplete && <Content />}</div>
    </div>
  );
}

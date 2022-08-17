import React, { useEffect, useState } from 'react';
import { VisuallyHidden } from '@react-aria/visually-hidden';

import classNames from '../../../utils/classNames';
import styles from '../CookieConsent.module.scss';
import { useUiTexts } from '../contexts/ContentContext';
import { Content } from '../content/Content';
import { useModalRenderChecker } from '../useModalRenderChecker';

export function Modal(): React.ReactElement | null {
  const shouldShowModal = useModalRenderChecker();
  const [isModalInitiallyShown] = useState<boolean>(shouldShowModal);
  const [popupTimerComplete, setPopupTimerComplete] = useState<boolean>(false);
  const popupDelayInMs = 500;
  // if hasUserHandledAllConsents() was false at first and then later true, user must have saved consents.
  const showScreenReaderSaveNotification = isModalInitiallyShown && !shouldShowModal;
  const { settingsSaved } = useUiTexts();
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

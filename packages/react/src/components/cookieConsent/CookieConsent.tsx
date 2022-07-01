import React, { useContext, useEffect, useState } from 'react';
import { VisuallyHidden } from '@react-aria/visually-hidden';

import classNames from '../../utils/classNames';
import styles from './CookieConsent.module.scss';
import { CookieConsentContext, useCookieConsentContent } from './CookieConsentContext';
import Content from './content/Content';

export function CookieConsent(): React.ReactElement | null {
  const cookieConsentContext = useContext(CookieConsentContext);
  const content = useCookieConsentContent();
  // use this in context
  const [showScreenReaderSaveNotification] = useState<boolean>(false);
  const [popupTimerComplete, setPopupTimerComplete] = useState<boolean>(false);
  const popupDelayInMs = 500;

  useEffect(() => {
    setTimeout(() => setPopupTimerComplete(true), popupDelayInMs);
  }, []);

  if (showScreenReaderSaveNotification) {
    return (
      <VisuallyHidden>
        <div role="alert" data-testid="cookie-consent-screen-reader-notification" tabIndex={-1}>
          {content.texts.ui.settingsSaved}
        </div>
      </VisuallyHidden>
    );
  }

  if (!cookieConsentContext.willRenderCookieConsentDialog) {
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

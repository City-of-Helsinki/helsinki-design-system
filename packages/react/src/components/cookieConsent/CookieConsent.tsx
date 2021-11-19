import React, { useContext, useEffect, useState } from 'react';
import { VisuallyHidden } from '@react-aria/visually-hidden';

import classNames from '../../utils/classNames';
import styles from './CookieConsent.module.scss';
import { ConsentController } from './cookieConsentController';
import { CookieConsentContext } from './CookieConsentContext';
import Content from './content/Content';
import { CookieConsentActionListener } from './types';

export function CookieConsent(): React.ReactElement | null {
  const cookieConsentContext = useContext(CookieConsentContext);
  const [, forceUpdate] = useState<number>(0);
  const [showScreenReaderSaveNotification, setShowScreenReaderSaveNotification] = useState<boolean>(false);
  const [popupTimerComplete, setPopupTimerComplete] = useState<boolean>(false);
  const popupDelayInMs = 500;

  const reRender = () => {
    forceUpdate((p) => p + 1);
  };

  const save = (): void => {
    cookieConsentContext.save();
    if (cookieConsentContext.hasUserHandledAllConsents()) {
      setShowScreenReaderSaveNotification(true);
    }
  };

  const approveRequired: ConsentController['approveRequired'] = () => {
    cookieConsentContext.approveRequired();
    save();
    reRender();
  };

  const approveAll: ConsentController['approveAll'] = () => {
    cookieConsentContext.approveAll();
    save();
    reRender();
  };

  const onChange: ConsentController['update'] = (key, value) => {
    cookieConsentContext.update(key, value);
    reRender();
  };

  const onAction: CookieConsentActionListener = (action, consent) => {
    if (action === 'approveAll') {
      approveAll();
    } else if (action === 'approveRequired') {
      approveRequired();
    } else if (action === 'changeConsent') {
      const { key, value } = consent;
      onChange(key, value);
    }
  };

  useEffect(() => {
    setTimeout(() => setPopupTimerComplete(true), popupDelayInMs);
  }, []);

  if (showScreenReaderSaveNotification) {
    return (
      <VisuallyHidden>
        <div role="alert" data-testid="cookie-consent-screen-reader-notification" tabIndex={-1}>
          Asetukset tallennettu!
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
        <Content onClick={onAction} />
      </div>
      <div aria-hidden className={styles.overlay} />
    </div>
  );
}

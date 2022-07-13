import React, { useContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { VisuallyHidden } from '@react-aria/visually-hidden';

import classNames from '../../../utils/classNames';
import styles from '../CookieConsent.module.scss';
import { CookieConsentContext, useCookieConsentUiTexts, useFocusShift } from '../CookieConsentContext';
import { Content } from '../content/Content';
import { useEscKey } from '../useEscKey';

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
  const containerId = 'HdsCookieConsentContainer';
  const getContainerElement = (): HTMLElement | null => document.getElementById(containerId);
  const [isDomReady, setIsDomReady] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => setPopupTimerComplete(true), popupDelayInMs);
  }, []);

  useEffect(() => {
    const containerElement = getContainerElement();
    if (shouldShowModal && !isDomReady) {
      if (!containerElement) {
        const htmlContainer = document.createElement('div');
        htmlContainer.setAttribute('id', containerId);
        htmlContainer.setAttribute('data-testid', 'html-cookie-consent-container');
        document.body.insertBefore(htmlContainer, document.body.firstChild);
      }
      setIsDomReady(true);
    } else if (!shouldShowModal && isDomReady) {
      if (containerElement) {
        document.body.removeChild(containerElement);
      }
      setIsDomReady(false);
    }
  }, [shouldShowModal, isDomReady, setIsDomReady]);

  useEscKey(useFocusShift());

  if (showScreenReaderSaveNotification) {
    return (
      <VisuallyHidden>
        <div role="alert" data-testid="cookie-consent-screen-reader-notification" tabIndex={-1}>
          {settingsSaved}
        </div>
      </VisuallyHidden>
    );
  }

  if (!shouldShowModal || !isDomReady) {
    return null;
  }

  const renderModal = (): JSX.Element => (
    <div
      className={classNames(styles.container, styles.modal, popupTimerComplete && styles.animateIn)}
      data-testid="cookie-consent"
    >
      <div className={styles.aligner}>{popupTimerComplete && <Content />}</div>
    </div>
  );

  return ReactDOM.createPortal(renderModal(), getContainerElement());
}

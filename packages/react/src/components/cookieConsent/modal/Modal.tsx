import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { VisuallyHidden } from '@react-aria/visually-hidden';

import classNames from '../../../utils/classNames';
import styles from '../CookieConsent.module.scss';
import { useCookieContentContext, useUiTexts } from '../contexts/ContentContext';
import { useCookieConsentContext, forceFocusToElement } from '../contexts/ConsentContext';
import { Content } from '../content/Content';

export function Modal(): React.ReactElement | null {
  const contentContext = useCookieContentContext();
  const consentContext = useCookieConsentContext();
  const hasOnlyRequiredConsents = !contentContext.optionalCookies || contentContext.optionalCookies.groups.length === 0;
  const shouldShowModal = !hasOnlyRequiredConsents && !consentContext.hasUserHandledAllConsents();
  const [isModalInitiallyShown] = useState<boolean>(shouldShowModal);
  const [popupTimerComplete, setPopupTimerComplete] = useState<boolean>(false);
  const popupDelayInMs = 500;
  // if hasUserHandledAllConsents() was false at first and then later true, user must have saved consents.
  const showScreenReaderSaveNotification = isModalInitiallyShown && !shouldShowModal;
  const { settingsSaved } = useUiTexts();
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

  // focus target selector on esc key press
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      const key = event.key || event.keyCode;
      if (key === 'Escape' || key === 'Esc' || key === 27) {
        forceFocusToElement(contentContext.focusTargetSelector);
      }
    };
    if (isDomReady) {
      document.addEventListener('keyup', handleEscKey);
    }
    return () => {
      document.removeEventListener('keyup', handleEscKey);
    };
  }, [isDomReady, contentContext.focusTargetSelector]);

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

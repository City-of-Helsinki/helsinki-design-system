import React from 'react';

import styles from '../CookieConsent.module.scss';
import { ViewProps } from '../types';
import RequiredConsents from '../requiredConsents/RequiredConsents';
import OptionalConsents from '../optionalConsents/OptionalConsents';
import { useCookieConsentContent } from '../CookieConsentContext';

function Details({ onClick }: ViewProps): React.ReactElement {
  const { detailsTitle, detailsText } = useCookieConsentContent();
  return (
    <div className={styles['text-content']} data-testid="cookie-consent-details">
      <span className={styles['emulated-h2']} role="heading" aria-level={2}>
        {detailsTitle}
      </span>
      <p>{detailsText}</p>
      <RequiredConsents />
      <OptionalConsents onClick={onClick} />
    </div>
  );
}

export default Details;

import React from 'react';

import styles from '../CookieConsent.module.scss';
import { Category } from '../category/Category';
import { useCookieConsentContent, useCookieConsentSectionTexts } from '../CookieConsentContext';

export function Details(): React.ReactElement {
  const content = useCookieConsentContent();
  const { title, text } = useCookieConsentSectionTexts('details');
  const { requiredConsents, optionalConsents } = content;
  return (
    <div className={styles['text-content']} data-testid="cookie-consent-details">
      <span className={styles['emulated-h2']} role="heading" aria-level={2}>
        {title}
      </span>
      <p>{text}</p>
      <Category category={requiredConsents} isRequired />
      <Category category={optionalConsents} />
    </div>
  );
}

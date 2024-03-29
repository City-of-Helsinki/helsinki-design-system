import React from 'react';

import styles from '../CookieConsent.module.scss';
import { MemoizedCategory } from '../category/Category';
import { useCookieContentContext, useSectionTexts } from '../contexts/ContentContext';
import { useConsentActions, useCookieConsentContext } from '../contexts/ConsentContext';

export function Details(): React.ReactElement {
  const content = useCookieContentContext();
  const consentContext = useCookieConsentContext();
  const triggerAction = useConsentActions();
  const selectPercentage = consentContext.getApprovalPercentageForOptional();
  const { title, text } = useSectionTexts('details');
  const { requiredCookies, optionalCookies } = content;
  return (
    <div className={styles.textContent} data-testid="cookie-consent-details">
      <span className={styles.emulatedH2} role="heading" aria-level={2}>
        {title}
      </span>
      <p>{text}</p>
      <MemoizedCategory category={requiredCookies} isRequired />
      <MemoizedCategory category={optionalCookies} triggerAction={triggerAction} selectPercentage={selectPercentage} />
    </div>
  );
}

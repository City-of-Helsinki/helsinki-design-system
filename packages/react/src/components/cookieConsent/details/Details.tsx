import React from 'react';

import styles from '../CookieConsent.module.scss';
import ConsentGroups from '../consentGroups/ConsentGroups';
import { useCookieConsentContent } from '../CookieConsentContext';

function Details(): React.ReactElement {
  const content = useCookieConsentContent();
  const { title, text } = content.texts.sections.details;
  const { requiredConsents, optionalConsents } = content;
  return (
    <div className={styles['text-content']} data-testid="cookie-consent-details">
      <span className={styles['emulated-h2']} role="heading" aria-level={2}>
        {title}
      </span>
      <p>{text}</p>
      <ConsentGroups consentGroups={requiredConsents} isRequired />
      <ConsentGroups consentGroups={optionalConsents} />
    </div>
  );
}

export default Details;

import React, { useContext } from 'react';

import { CookieConsentContext, useCookieConsentData, getCookieConsentContent } from '../CookieConsentContext';
import styles from '../CookieConsent.module.scss';
import { Checkbox } from '../../checkbox/Checkbox';

type ConsentData = {
  id: string;
  descriptionId: string;
  text: string;
  title: string;
};
type ConsentList = ConsentData[];

function RequiredConsents(): React.ReactElement {
  const cookieConsentContext = useContext(CookieConsentContext);
  const { requiredConsentsTitle, requiredConsentsText } = getCookieConsentContent(cookieConsentContext);
  const consents = cookieConsentContext.getRequired();
  const getConsentTexts = useCookieConsentData();
  const consentEntries = Object.entries(consents);
  const consentList: ConsentList = consentEntries.map<ConsentData>(([key]) => ({
    id: `required-cookie-consent-${key}`,
    descriptionId: `required-cookie-consent-${key}-description`,
    title: getConsentTexts(key, 'title'),
    text: getConsentTexts(key, 'text'),
  }));
  return (
    <>
      <span className={styles['emulated-h3']} role="heading" aria-level={3}>
        {requiredConsentsTitle}
      </span>
      <p>{requiredConsentsText}</p>

      <ul className={styles.list}>
        {consentList.map((data) => (
          <li key={data.id}>
            <Checkbox
              onChange={() => undefined}
              id={data.id}
              name={data.id}
              checked
              disabled
              data-testid={data.id}
              label={data.title}
              aria-describedby={data.descriptionId}
            />
            <span id={data.descriptionId} aria-hidden>
              - {data.text}
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}

export default RequiredConsents;

import React, { useContext } from 'react';

import { ViewProps } from '../types';
import { Checkbox } from '../../checkbox';
import { CookieConsentContext, useCookieConsentData, getCookieConsentContent } from '../CookieConsentContext';
import styles from '../CookieConsent.module.scss';

type ConsentData = {
  id: string;
  checked: boolean;
  text: string;
  title: string;
  onToggle: () => void;
};
type ConsentList = ConsentData[];

function OptionalConsents({ onClick }: ViewProps): React.ReactElement {
  const cookieConsentContext = useContext(CookieConsentContext);
  const { optionalConsentsTitle, optionalConsentsText } = getCookieConsentContent(cookieConsentContext);
  const consents = cookieConsentContext.getOptional();
  const getConsetTexts = useCookieConsentData();
  const consentEntries = Object.entries(consents);
  const consentList: ConsentList = consentEntries.map<ConsentData>(([key, value]) => ({
    id: `optional-cookie-consent-${key}`,
    checked: Boolean(value),
    title: getConsetTexts(key, 'title'),
    text: getConsetTexts(key, 'text'),
    onToggle: () => {
      onClick('changeConsent', { key, value: !value });
    },
  }));
  return (
    <>
      <span className={styles['emulated-h3']} role="heading" aria-level={3}>
        {optionalConsentsTitle}
      </span>
      <p>{optionalConsentsText}</p>
      <ul className={styles.list}>
        {consentList.map((data) => (
          <li key={data.id}>
            <Checkbox
              onChange={data.onToggle}
              id={data.id}
              name={data.id}
              checked={data.checked}
              data-testid={data.id}
              label={data.title}
            />
            <span>- {data.text}</span>
          </li>
        ))}
      </ul>
    </>
  );
}

export default OptionalConsents;

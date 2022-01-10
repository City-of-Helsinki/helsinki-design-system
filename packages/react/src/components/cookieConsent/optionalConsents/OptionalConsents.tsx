import React, { useContext } from 'react';

import { getText, getTitle } from '../texts';
import { ViewProps } from '../types';
import { Checkbox } from '../../checkbox';
import { CookieConsentContext } from '../CookieConsentContext';
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
  const consents = cookieConsentContext.getOptional();
  const consentEntries = Object.entries(consents);
  const consentList: ConsentList = consentEntries.map<ConsentData>(([key, value]) => ({
    id: `optional-cookie-consent-${key}`,
    checked: Boolean(value),
    text: getText(key),
    title: getTitle(key),
    onToggle: () => {
      onClick('changeConsent', { key, value: !value });
    },
  }));
  return (
    <>
      <span className={styles['emulated-h3']} role="heading" aria-level={3}>
        Muut evästeet
      </span>
      <p>Voit hyväksyä tai jättää hyväksymättä muut evästeet.</p>
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

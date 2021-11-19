import React, { useContext } from 'react';

import { getAriaLabel, getText } from '../texts';
import { ViewProps } from '../types';
import { Checkbox } from '../../checkbox';
import { CookieConsentContext } from '../CookieConsentContext';
import styles from '../CookieConsent.module.scss';

type ConsentData = {
  id: string;
  checked: boolean;
  text: string;
  ariaLabel: string;
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
    ariaLabel: getAriaLabel(key),
    onToggle: () => {
      onClick('changeConsent', { key, value: !value });
    },
  }));
  return (
    <>
      <span className={styles['emulated-h2']} role="heading" aria-level={2}>
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
              aria-label={data.ariaLabel}
              label={data.text}
            />
          </li>
        ))}
      </ul>
    </>
  );
}

export default OptionalConsents;

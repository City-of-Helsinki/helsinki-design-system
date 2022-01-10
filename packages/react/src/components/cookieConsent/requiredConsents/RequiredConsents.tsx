import React, { useContext } from 'react';

import { getText, getTitle } from '../texts';
import { CookieConsentContext } from '../CookieConsentContext';
import styles from '../CookieConsent.module.scss';
import { Checkbox } from '../../checkbox/Checkbox';

type ConsentData = {
  id: string;
  text: string;
  title: string;
};
type ConsentList = ConsentData[];

function RequiredConsents(): React.ReactElement {
  const cookieConsentContext = useContext(CookieConsentContext);
  const consents = cookieConsentContext.getRequired();
  const consentEntries = Object.entries(consents);
  const consentList: ConsentList = consentEntries.map<ConsentData>(([key]) => ({
    id: `required-cookie-consent-${key}`,
    title: getTitle(key),
    text: getText(key),
  }));
  return (
    <>
      <span className={styles['emulated-h3']} role="heading" aria-level={3}>
        Välttämättömät evästeet
      </span>
      <p>
        Välttämättömien evästeiden käyttöä ei voi kieltää. Ne mahdollistavat sivuston toiminnan ja vaikuttavat sivuston
        käyttäjäystävällisyyteen.
      </p>

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
            />
            <span>- {data.text}</span>
          </li>
        ))}
      </ul>
    </>
  );
}

export default RequiredConsents;

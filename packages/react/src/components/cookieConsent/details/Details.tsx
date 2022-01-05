import React from 'react';

import styles from '../CookieConsent.module.scss';
import { ViewProps } from '../types';
import RequiredConsents from '../requiredConsents/RequiredConsents';
import OptionalConsents from '../optionalConsents/OptionalConsents';

function Details({ onClick }: ViewProps): React.ReactElement {
  return (
    <div className={styles['text-content']} data-testid="cookie-consent-details">
      <span
        className={styles['emulated-h1']}
        role="heading"
        aria-level={1}
        id="cookie-consent-active-heading"
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
      >
        Tietoa sivustolla käytetyistä evästeistä
      </span>
      <p>
        Sivustolla käytetyt evästeet on luokiteltu käyttötarkoituksen mukaan. Alla voit lukea tietoa jokaisesta
        kategoriasta ja sallia tai kieltää evästeiden käytön.
      </p>
      <RequiredConsents />
      <OptionalConsents onClick={onClick} />
    </div>
  );
}

export default Details;

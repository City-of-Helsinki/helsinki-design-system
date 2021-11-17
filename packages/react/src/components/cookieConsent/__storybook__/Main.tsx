import React from 'react';

import { ViewProps } from '../types';
import styles from './styles.module.scss';

function Main({ onClick }: ViewProps): React.ReactElement {
  return (
    <div className={styles['text-content']} data-testid="cookie-consent-information">
      <span
        className={styles['emulated-h1']}
        role="heading"
        aria-level={1}
        id="cookie-consent-active-heading"
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
      >
        Evästesuostumukset
      </span>

      <p id="cookie-consent-description">
        Tämä sivusto käyttää välttämättömiä evästeitä suorituskyvyn varmistamiseksi sekä yleisen käytön seurantaan.
        Lisäksi käytämme kohdennusevästeitä käyttäjäkokemuksen parantamiseksi, analytiikkaan ja kohdistetun sisällön
        näyttämiseen. Jatkamalla sivuston käyttöä ilman asetusten muuttamista hyväksyt välttämättömien evästeiden
        käytön. &nbsp;
        <button
          type="button"
          className={styles['plain-text-button']}
          onClick={() => onClick('showDetails')}
          data-testid="cookie-consent-read-more-text-button"
        >
          Näytä evästeet
        </button>
      </p>
    </div>
  );
}

export default Main;

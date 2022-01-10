import React, { useEffect, useRef } from 'react';

import { ViewProps } from '../types';
import Buttons from '../buttons/Buttons';
import { IconAngleDown, IconAngleUp, IconCross } from '../../../icons';
import { useAccordion } from '../../accordion';
import Details from '../details/Details';
import styles from '../CookieConsent.module.scss';
import { Card } from '../../card/Card';

function Content({ onClick }: ViewProps): React.ReactElement {
  const { isOpen, buttonProps, contentProps } = useAccordion({
    initiallyOpen: false,
  });
  const titleRef = useRef<HTMLHeadingElement>();
  const Icon = isOpen ? IconAngleUp : IconAngleDown;
  const settingsButtonText = isOpen ? 'Piilota asetukset' : 'Näytä asetukset';

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.focus();
    }
  }, [titleRef]);
  return (
    <div className={styles.content} id="cookie-consent-content">
      <div className={styles['main-content']} data-testid="cookie-consent-information">
        <span
          className={styles['emulated-h1']}
          role="heading"
          aria-level={1}
          // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
          tabIndex={0}
          ref={titleRef}
        >
          Evästesuostumukset
        </span>
        <div className={styles['language-switcher']} data-testid="cookie-consent-language-switcher">
          <a href="/" tabIndex={0} title="This is a dummy language switcher" onClick={(e) => e.preventDefault()}>
            FI
          </a>
        </div>
        <p>
          Tämä sivusto käyttää välttämättömiä evästeitä suorituskyvyn varmistamiseksi sekä yleisen käytön seurantaan.
          Lisäksi käytämme kohdennusevästeitä käyttäjäkokemuksen parantamiseksi, analytiikkaan ja kohdistetun sisällön
          näyttämiseen. Jatkamalla sivuston käyttöä ilman asetusten muuttamista hyväksyt välttämättömien evästeiden
          käytön.
        </p>
      </div>
      <button type="button" className={styles['accordion-button']} {...buttonProps}>
        <Icon aria-hidden />
        <span>{settingsButtonText}</span>
      </button>
      <Card
        {...contentProps}
        theme={{
          '--padding-horizontal': '0',
          '--padding-vertical': 'var(--spacing-layout-2-xs)',
        }}
      >
        <Details onClick={onClick} />
      </Card>
      <Buttons onClick={onClick} hasOptionalConsents={isOpen} />
      <button
        type="button"
        title="Hyväksy valitut ja pakolliset evästeet"
        className={styles['close-button']}
        data-testid="cookie-consent-close-button"
        onClick={() => onClick('approveSelectedAndRequired')}
      >
        <IconCross aria-hidden />
      </button>
    </div>
  );
}

export default Content;

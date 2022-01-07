import React from 'react';

import { ViewProps } from '../types';
import Buttons from '../buttons/Buttons';
import { IconAngleDown, IconAngleUp, IconCross } from '../../../icons';
import { useAccordion } from '../../accordion';
import Details from '../details/Details';
import Main from '../main/Main';
import styles from '../CookieConsent.module.scss';
import { Card } from '../../card/Card';

function Content({ onClick }: ViewProps): React.ReactElement {
  const { isOpen, buttonProps, contentProps } = useAccordion({
    initiallyOpen: false,
  });
  const Icon = isOpen ? IconAngleUp : IconAngleDown;
  const settingsButtonText = isOpen ? 'Piilota asetukset' : 'Näytä asetukset';

  return (
    <div
      className={styles.content}
      role="dialog"
      aria-labelledby="cookie-consent-active-heading"
      aria-describedby="cookie-consent-description"
      id="cookie-consent-content"
      aria-live="assertive"
    >
      <div className={styles['language-switcher-and-close']}>
        <div className={styles['language-switcher']} data-testid="cookie-consent-language-switcher">
          <a href="/" title="This is a dummy language switcher" onClick={(e) => e.preventDefault()}>
            FI
          </a>
        </div>
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
      <Main />
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
    </div>
  );
}

export default Content;

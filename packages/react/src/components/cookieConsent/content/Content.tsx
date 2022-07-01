import React, { useEffect, useRef } from 'react';

import { ViewProps } from '../types';
import Buttons from '../buttons/Buttons';
import { IconAngleDown, IconAngleUp, IconCross } from '../../../icons';
import { useAccordion } from '../../accordion';
import Details from '../details/Details';
import styles from '../CookieConsent.module.scss';
import { Card } from '../../card/Card';
import { useCookieConsentContent } from '../CookieConsentContext';

function Content({ onClick }: ViewProps): React.ReactElement {
  const { isOpen, buttonProps, contentProps } = useAccordion({
    initiallyOpen: false,
  });
  const {
    mainTitle,
    mainText,
    hideSettings,
    showSettings,
    approveRequiredAndSelectedConsents,
    approveOnlyRequiredConsents,
  } = useCookieConsentContent();
  const titleRef = useRef<HTMLHeadingElement>();
  const Icon = isOpen ? IconAngleUp : IconAngleDown;
  const settingsButtonText = isOpen ? hideSettings : showSettings;
  const closeButtonTitle = isOpen ? approveRequiredAndSelectedConsents : approveOnlyRequiredConsents;
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
          {mainTitle}
        </span>
        <div className={styles['language-switcher']} data-testid="cookie-consent-language-switcher">
          <a href="/" tabIndex={0} title="This is a dummy language switcher" onClick={(e) => e.preventDefault()}>
            <span>Suomeksi (FI)</span> <IconAngleDown />
          </a>
        </div>
        <p>{mainText}</p>
      </div>
      <button
        type="button"
        className={styles['accordion-button']}
        data-testid="cookie-consent-settings-toggler"
        {...buttonProps}
      >
        <Icon aria-hidden />
        <span>{settingsButtonText}</span>
      </button>
      <Card
        {...contentProps}
        theme={{
          '--padding-horizontal': '0',
          '--padding-vertical': '0',
        }}
      >
        <Details onClick={onClick} />
      </Card>
      <Buttons onClick={onClick} hasOptionalConsents={isOpen} />
      <button
        type="button"
        title={closeButtonTitle}
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

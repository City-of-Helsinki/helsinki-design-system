import React, { useEffect, useRef } from 'react';

import Buttons from '../buttons/Buttons';
import { IconAngleDown, IconAngleUp } from '../../../icons';
import { useAccordion } from '../../accordion';
import Details from '../details/Details';
import styles from '../CookieConsent.module.scss';
import { Card } from '../../card/Card';
import { useCookieConsentSectionTexts, useCookieConsentUiTexts } from '../CookieConsentContext';
import LanguageSwitcher from '../languageSwitcher/LanguageSwitcher';
import classNames from '../../../utils/classNames';

function Content(): React.ReactElement {
  const { isOpen, buttonProps, contentProps } = useAccordion({
    initiallyOpen: false,
  });
  const { hideSettings, showSettings } = useCookieConsentUiTexts();
  const { title, text } = useCookieConsentSectionTexts('main');
  const titleRef = useRef<HTMLHeadingElement>();
  const Icon = isOpen ? IconAngleUp : IconAngleDown;
  const settingsButtonText = isOpen ? hideSettings : showSettings;
  const settingsButtonsClassName = isOpen
    ? styles['accordion-button']
    : classNames(styles['accordion-button'], styles['accordion-button-settings-closed']);
  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.focus();
    }
  }, [titleRef]);
  return (
    <div className={styles.content} id="cookie-consent-content">
      <div className={styles['main-content']} data-testid="cookie-consent-information">
        <span className={styles['emulated-h1']} role="heading" aria-level={1} tabIndex={-1} ref={titleRef}>
          {title}
        </span>
        <div className={styles['language-switcher']} data-testid="cookie-consent-language-switcher">
          <LanguageSwitcher />
        </div>
        <p>{text}</p>
      </div>
      <button
        type="button"
        className={settingsButtonsClassName}
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
        <Details />
      </Card>
      <Buttons detailsAreShown={isOpen} />
    </div>
  );
}

export default Content;

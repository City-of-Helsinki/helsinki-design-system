import React, { useEffect, useRef } from 'react';

import { Buttons } from '../buttons/Buttons';
import { IconAngleDown, IconAngleUp } from '../../../icons';
import { useAccordion } from '../../accordion';
import { Details } from '../details/Details';
import styles from '../CookieConsent.module.scss';
import { Card } from '../../card/Card';
import { useCookieConsentSectionTexts, useCookieConsentUiTexts } from '../CookieConsentContext';
import { LanguageSwitcher } from '../languageSwitcher/LanguageSwitcher';
import classNames from '../../../utils/classNames';

export function Content(): React.ReactElement {
  const { isOpen, buttonProps, contentProps } = useAccordion({
    initiallyOpen: false,
  });
  const { hideSettings, showSettings } = useCookieConsentUiTexts();
  const { title, text } = useCookieConsentSectionTexts('main');
  const titleRef = useRef<HTMLHeadingElement>();
  const Icon = isOpen ? IconAngleUp : IconAngleDown;
  const settingsButtonText = isOpen ? hideSettings : showSettings;
  const settingsButtonsClassName = isOpen
    ? classNames(styles.accordionButton, styles.hiddenWithoutFocus)
    : classNames(styles.accordionButton, styles.accordionButtonSettingsClosed, styles.hiddenWithoutFocus);
  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.focus();
    }
  }, [titleRef]);
  return (
    <div
      className={classNames(styles.content, isOpen ? '' : styles.shrinkOnBlur)}
      id="cookie-consent-content"
      tabIndex={-1}
    >
      <div className={styles.mainContent} data-testid="cookie-consent-information">
        <span
          className={classNames(styles.emulatedH1, styles.visuallyHiddenWithoutFocus)}
          role="heading"
          aria-level={1}
          tabIndex={-1}
          ref={titleRef}
        >
          {title}
        </span>
        <div className={styles.languageSwitcher} data-testid="cookie-consent-language-switcher">
          <LanguageSwitcher />
        </div>
        <p className={styles.cutTextWithoutFocus}>{text}</p>
        <button type="button" className={classNames(styles.accordionButton, styles.shownWithoutFocus)}>
          Lue lisää
        </button>
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

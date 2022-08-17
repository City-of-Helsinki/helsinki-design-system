import React, { useCallback, useEffect, useRef } from 'react';

import { Buttons } from '../buttons/Buttons';
import { IconAngleDown, IconAngleUp } from '../../../icons';
import { useAccordion } from '../../accordion';
import { Details } from '../details/Details';
import styles from '../CookieConsent.module.scss';
import { Card } from '../../card/Card';
import { useCookieConsentSectionTexts, useCookieConsentUiTexts } from '../CookieConsentContext';
import { LanguageSwitcher } from '../languageSwitcher/LanguageSwitcher';
import classNames from '../../../utils/classNames';
import { useEscKey } from '../useEscKey';

export function Content(): React.ReactElement {
  const { isOpen, buttonProps, contentProps, closeAccordion } = useAccordion({
    initiallyOpen: false,
  });
  const { hideSettings, showSettings, readMore } = useCookieConsentUiTexts();
  const { title, text } = useCookieConsentSectionTexts('main');
  const titleRef = useRef<HTMLHeadingElement>();
  const Icon = isOpen ? IconAngleUp : IconAngleDown;
  const settingsButtonText = isOpen ? hideSettings : showSettings;
  const detailsButtonClassName = isOpen
    ? classNames(styles.detailsAccordionButton, styles.accordionButton, styles.hiddenWithoutFocus)
    : classNames(
        styles.detailsAccordionButton,
        styles.accordionButton,
        styles.accordionButtonSettingsClosed,
        styles.hiddenWithoutFocus,
      );

  const setFocusToTitle = useCallback(() => {
    if (titleRef.current) {
      titleRef.current.focus();
    }
  }, [titleRef]);

  useEffect(() => {
    setFocusToTitle();
  }, [setFocusToTitle]);

  useEscKey(closeAccordion);

  return (
    <div
      className={classNames(styles.content, isOpen ? '' : styles.shrinkOnBlur)}
      id="cookie-consent-content"
      tabIndex={-1}
    >
      <div className={styles.mainContent} data-testid="cookie-consent-information">
        <span className={styles.emulatedH1} role="heading" aria-level={1} tabIndex={-1} ref={titleRef}>
          {title}
        </span>
        <div
          className={classNames(styles.languageSwitcher, styles.visuallyHiddenWithoutFocus)}
          data-testid="cookie-consent-language-switcher"
        >
          <LanguageSwitcher />
        </div>
        <p className={styles.visuallyHiddenWithoutFocus}>{text}</p>
        <button
          type="button"
          className={classNames(styles.accordionButton, styles.readMoreButton)}
          onMouseDown={(e) => {
            e.preventDefault();
            setFocusToTitle();
          }}
        >
          <span>{readMore}</span>
          <IconAngleUp aria-hidden />
        </button>
      </div>
      <button
        type="button"
        className={detailsButtonClassName}
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

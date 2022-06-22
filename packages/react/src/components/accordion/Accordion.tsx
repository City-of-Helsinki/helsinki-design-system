import React, { useEffect, useRef, useState } from 'react';
import uniqueId from 'lodash.uniqueid';

// import core base styles
import 'hds-core';

import styles from './Accordion.module.scss';
import classNames from '../../utils/classNames';
import { IconAngleDown, IconAngleUp } from '../../icons';
import { useAccordion } from './useAccordion';
import { useTheme } from '../../hooks/useTheme';
import { Button } from '../button';
import useHasMounted from '../../hooks/useHasMounted';

export interface AccordionCustomTheme {
  '--background-color'?: string;
  '--border-color'?: string;
  '--padding-horizontal'?: string;
  '--padding-vertical'?: string;
  '--header-font-color'?: string;
  '--header-font-size'?: string;
  '--header-line-height'?: string;
  '--button-size'?: string;
  '--header-focus-outline-color'?: string;
  '--content-font-size'?: string;
  '--content-line-height'?: string;
}

type Language = 'en' | 'fi' | 'sv';

export type CommonAccordionProps = React.PropsWithChildren<{
  /**
   * If `true` border will be drawn around the accordion card.
   */
  border?: false;
  /**
   * Use the card variant if `true`
   */
  card?: false;
  /**
   * Additional class names for accordion
   */
  className?: string;
  /**
   * Boolean indicating whether there is a close button at the bottom of the accordion or not.
   * @Default true
   */
  closeButton?: boolean;
  /**
   * className for close button to enable custom styling
   */
  closeButtonClassName?: string;
  /**
   * Heading text.
   */
  heading?: string;
  /**
   * Heading level
   * @default 2
   */
  headingLevel?: number;
  /**
   * The id for the accordion element
   */
  id?: string;
  /**
   * Boolean indicating whether the accordion is initially opened.
   * @default false
   */
  initiallyOpen?: boolean;
  /**
   * The language of the component. It affects which language is used for the close button text.
   *
   * @default "fi"
   */
  language?: Language;
  /**
   * Size
   * @default m
   */
  size?: 's' | 'm' | 'l';
  /**
   * Additional styles
   */
  style?: React.CSSProperties;
  /**
   * Custom theme styles
   */
  theme?: AccordionCustomTheme;
}>;

export type CardAccordionProps = Omit<CommonAccordionProps, 'card' | 'border'> & {
  /**
   * If `true` border will be drawn around the accordion card.
   */
  border?: boolean;
  /**
   * Use the card variant if `true`
   */
  card: true;
};

export type AccordionProps = CommonAccordionProps | CardAccordionProps;

const getCloseMessage = (language: Language): string => {
  return {
    en: `Close`,
    fi: `Sulje`,
    sv: `Stäng`,
  }[language];
};

export const Accordion = ({
  border = false,
  card = false,
  children,
  className,
  closeButtonClassName,
  closeButton = true,
  heading,
  headingLevel = 2,
  id,
  initiallyOpen = false,
  language = 'fi',
  size = 'm',
  style,
  theme,
}: AccordionProps) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const [beforeCloseButtonClick, setBeforeCloseButtonClick] = useState(false);
  // Create a unique id if not provided via prop
  const [accordionId] = useState(id || uniqueId('accordion-'));

  // Custom themes
  const sovereignThemeVariables = theme && {
    '--background-color': theme['--background-color'],
    '--border-color': theme['--border-color'],
    '--header-font-color': theme['--header-font-color'],
    '--header-focus-outline-color': theme['--header-focus-outline-color'],
    '--content-font-color': theme['--content-font-color'],
    '--content-font-size': theme['--content-font-size'],
    '--content-line-height': theme['--content-line-height'],
  };

  const sovereignThemeClass = useTheme<Partial<AccordionCustomTheme>>(styles.accordion, sovereignThemeVariables);

  const sizeDependentThemeVariables = theme && {
    '--header-font-size': theme['--header-font-size'],
    '--padding-vertical': theme['--padding-vertical'],
    '--padding-horizontal': theme['--padding-horizontal'],
    '--header-font-weight': theme['--header-font-weight'],
    '--header-letter-spacing': theme['--header-letter-spacing'],
    '--header-line-height': theme['--header-line-height'],
    '--button-size': theme['--button-size'],
  };

  const sizeDependentThemeClass = useTheme<Partial<AccordionCustomTheme>>(styles[size], sizeDependentThemeVariables);

  // Accordion logic
  const { isOpen, buttonProps, contentProps } = useAccordion({ initiallyOpen });

  // Switch icon based on isOpen state
  const icon = isOpen ? (
    <IconAngleUp aria-hidden className={styles.accordionButtonIcon} />
  ) : (
    <IconAngleDown aria-hidden className={styles.accordionButtonIcon} />
  );

  const hasMounted = useHasMounted();

  /*
    Close button does not work well with different screen readers. To avoid issues, we had to:
    1. Add aria-expanded to false before closing the accordion (state beforeCloseButtonClick)
    2. Wait for the new rendering (useEffect + timeout)
    3. Focus to the accordion main button to not lose focus when close button disappears
    4. Finally call the regular button onClick, which updates state and hides the content.
   */

  useEffect(() => {
    if (!hasMounted) {
      return;
    }
    const timer = setTimeout(() => {
      headerRef.current.focus();
      if (beforeCloseButtonClick === true) {
        setBeforeCloseButtonClick(false);
        buttonProps.onClick();
      }
    }, 50);
    // eslint-disable-next-line consistent-return
    return () => clearTimeout(timer);
  }, [beforeCloseButtonClick]);

  const onCloseButtonActivate = () => {
    setBeforeCloseButtonClick(true);
  };

  return (
    <div
      className={classNames(
        styles.accordion,
        card && styles.card,
        card && border && styles.border,
        isOpen && styles.isOpen,
        styles[size],
        sovereignThemeClass,
        sizeDependentThemeClass,
        className,
      )}
      style={style}
      id={accordionId}
    >
      <div className={classNames(styles.accordionHeader)}>
        <div
          ref={headerRef}
          role="button"
          tabIndex={0}
          onKeyPress={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              buttonProps.onClick();
            }
          }}
          className={styles.headingContainer}
          aria-labelledby={`${accordionId}-heading`}
          {...buttonProps}
          {...(beforeCloseButtonClick ? { 'aria-expanded': false } : {})}
        >
          <div role="heading" aria-level={headingLevel} id={`${accordionId}-heading`}>
            {heading}
          </div>
          {icon}
        </div>
      </div>
      <div
        {...contentProps}
        id={`${accordionId}-content`}
        role="region"
        className={classNames(
          styles.accordionContent,
          card && styles.card,
          closeButton && styles.contentWithCloseButton,
        )}
        aria-labelledby={`${accordionId}-heading`}
      >
        {children}
        {closeButton && (
          <Button
            data-testid={`${accordionId}-closeButton`}
            aria-label={`${getCloseMessage(language)} ${heading}`}
            className={classNames(styles.closeButton, closeButtonClassName)}
            theme="black"
            size="small"
            onKeyPress={(e) => {
              if (e.key === ' ') {
                onCloseButtonActivate();
              }
            }}
            onClick={() => {
              onCloseButtonActivate();
            }}
            variant="supplementary"
            iconRight={<IconAngleUp aria-hidden size="xs" className={styles.accordionButtonIcon} />}
          >
            {getCloseMessage(language)}
          </Button>
        )}
      </div>
    </div>
  );
};

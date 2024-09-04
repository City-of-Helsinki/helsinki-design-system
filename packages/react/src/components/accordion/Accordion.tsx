import React, { useEffect, useRef, useState } from 'react';
import { uniqueId, pickBy } from 'lodash';

import '../../styles/base.module.css';
import styles from './Accordion.module.scss';
import classNames from '../../utils/classNames';
import { IconAngleDown, IconAngleUp } from '../../icons';
import { useAccordion } from './useAccordion';
import { useTheme } from '../../hooks/useTheme';
import { Button } from '../button';
import useHasMounted from '../../hooks/useHasMounted';
import { AllElementPropsWithoutRef } from '../../utils/elementTypings';

export interface AccordionCustomTheme {
  '--background-color'?: string;
  '--border-color'?: string;
  '--padding-horizontal'?: string;
  '--padding-vertical'?: string;
  /**
   * @deprecated Will be replaced with --header-color in the next major release
   */
  '--header-font-color'?: string;
  '--header-font-size'?: string;
  '--header-font-weight'?: string;
  '--header-letter-spacing'?: string;
  '--header-line-height'?: string;
  /**
   * @deprecated Will be replaced with --icon-size in the next major release
   */
  '--button-size'?: string;
  /**
   * @deprecated Will be replaced with --header-outline-color-focus in the next major release
   */
  '--header-focus-outline-color'?: string;
  '--content-font-color'?: string;
  '--content-font-size'?: string;
  '--content-line-height'?: string;
  '--close-button-background-color-disabled'?: string;
  '--close-button-background-color-focus'?: string;
  /**
   * @deprecated Will be removed in the next major release
   */
  '--close-button-background-color-hover-focus'?: string;
  '--close-button-background-color-hover'?: string;
  '--close-button-background-color'?: string;
  '--close-button-border-color-active'?: string;
  '--close-button-border-color-disabled'?: string;
  '--close-button-border-color-focus'?: string;
  /**
   * @deprecated Will be removed in the next major release
   */
  '--close-button-border-color-hover-focus'?: string;
  '--close-button-border-color-hover'?: string;
  '--close-button-border-color'?: string;
  '--close-button-color-disabled'?: string;
  '--close-button-color-focus'?: string;
  /**
   * @deprecated Will be removed in the next major release
   */
  '--close-button-color-hover-focus'?: string;
  '--close-button-color-hover'?: string;
  '--close-button-color'?: string;
  /**
   * @deprecated Will be replaced with --close-button-outline-color-focus in the next major release
   */
  '--close-button-focus-outline-color'?: string;
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

export type AccordionProps = AllElementPropsWithoutRef<'div'> & (CommonAccordionProps | CardAccordionProps);

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
  theme,
  ...rest
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

    '--close-button-background-color-disabled': theme['--close-button-background-color-disabled'],
    '--close-button-background-color-focus': theme['--close-button-background-color-focus'],
    '--close-button-background-color-hover-focus': theme['--close-button-background-color-hover-focus'],
    '--close-button-background-color-hover': theme['--close-button-background-color-hover'],
    '--close-button-background-color': theme['--close-button-background-color'],
    '--close-button-border-color-active': theme['--close-button-border-color-active'],
    '--close-button-border-color-disabled': theme['--close-button-border-color-disabled'],
    '--close-button-border-color-focus': theme['--close-button-border-color-focus'],
    '--close-button-border-color-hover-focus': theme['--close-button-border-color-hover-focus'],
    '--close-button-border-color-hover': theme['--close-button-border-color-hover'],
    '--close-button-border-color': theme['--close-button-border-color'],
    '--close-button-color-disabled': theme['--close-button-color-disabled'],
    '--close-button-color-focus': theme['--close-button-color-focus'],
    '--close-button-color-hover-focus': theme['--close-button-color-hover-focus'],
    '--close-button-color-hover': theme['--close-button-color-hover'],
    '--close-button-color': theme['--close-button-color'],
    '--close-button-focus-outline-color': theme['--close-button-focus-outline-color'],
  };

  const filteredSovereignThemeVariables = pickBy(sovereignThemeVariables);

  const sovereignThemeClass = useTheme<Partial<AccordionCustomTheme>>(
    styles.accordion,
    Object.keys(filteredSovereignThemeVariables).length > 0 ? filteredSovereignThemeVariables : undefined,
  );

  const sizeDependentThemeVariables = theme && {
    '--header-font-size': theme['--header-font-size'],
    '--padding-vertical': theme['--padding-vertical'],
    '--padding-horizontal': theme['--padding-horizontal'],
    '--header-font-weight': theme['--header-font-weight'],
    '--header-letter-spacing': theme['--header-letter-spacing'],
    '--header-line-height': theme['--header-line-height'],
    '--button-size': theme['--button-size'],
  };

  const filteredSizeDependentThemeVariables = pickBy(sizeDependentThemeVariables);

  const sizeDependentThemeClass = useTheme<Partial<AccordionCustomTheme>>(
    styles[size],
    Object.keys(filteredSizeDependentThemeVariables).length > 0 ? filteredSizeDependentThemeVariables : undefined,
  );

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
      {...rest}
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
      id={accordionId}
    >
      <div className={classNames(styles.accordionHeader)}>
        <div role="heading" aria-level={headingLevel} id={`${accordionId}-heading`}>
          <div
            ref={headerRef}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                buttonProps.onClick();
              }
            }}
            className={styles.headingContainer}
            aria-labelledby={`${accordionId}-heading`}
            {...buttonProps}
            {...(beforeCloseButtonClick ? { 'aria-expanded': false } : {})}
          >
            <span className="label">{heading}</span>
            {icon}
          </div>
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

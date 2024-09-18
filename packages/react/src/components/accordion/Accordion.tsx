import React, { useEffect, useRef, useState } from 'react';
import { uniqueId } from 'lodash';

import '../../styles/base.module.css';
import styles from './Accordion.module.scss';
import classNames from '../../utils/classNames';
import { IconAngleDown, IconAngleUp } from '../../icons';
import { useAccordion } from './useAccordion';
import { useTheme } from '../../hooks/useTheme';
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../button';
import useHasMounted from '../../hooks/useHasMounted';
import { ThemePrefixer } from '../../utils/themePrefixer';
import { AllElementPropsWithoutRef } from '../../utils/elementTypings';

type CloseButtonTheme = ThemePrefixer<ButtonTheme, '--close-button'>;

export interface AccordionTheme extends CloseButtonTheme {
  '--background-color'?: string;
  '--border-color'?: string;
  '--content-color'?: string;
  '--content-font-size'?: string;
  '--content-line-height'?: string;
  '--header-outline-color-focus'?: string;
  '--header-color'?: string;
  '--header-font-size'?: string;
  '--header-font-weight'?: string;
  '--header-letter-spacing'?: string;
  '--header-line-height'?: string;
  '--padding-horizontal'?: string;
  '--padding-vertical'?: string;
}

export enum AccordionSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
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
   * @default AccordionSize.Medium
   */
  size?: AccordionSize;
  /**
   * Additional styles
   */
  style?: React.CSSProperties;
  /**
   * Custom theme styles
   */
  theme?: AccordionTheme;
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
  size = AccordionSize.Medium,
  theme,
  ...rest
}: AccordionProps) => {
  const headerRef = useRef<HTMLButtonElement>(null);
  const [beforeCloseButtonClick, setBeforeCloseButtonClick] = useState(false);
  // Create a unique id if not provided via prop
  const [accordionId] = useState(id || uniqueId('accordion-'));

  const customThemeClass = useTheme<AccordionTheme>(styles.accordion, theme);

  // Accordion logic
  const { isOpen, buttonProps, contentProps } = useAccordion({ initiallyOpen });

  // Switch icon based on isOpen state
  const icon = isOpen ? (
    <IconAngleUp style={{ width: '100%', height: '100%' }} />
  ) : (
    <IconAngleDown style={{ width: '100%', height: '100%' }} />
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
        customThemeClass,
        className,
      )}
      id={accordionId}
    >
      <div className={classNames(styles.accordionHeader)}>
        <div role="heading" aria-level={headingLevel} id={`${accordionId}-heading`}>
          <Button
            ref={headerRef}
            aria-labelledby={`${accordionId}-heading`}
            iconEnd={icon}
            {...buttonProps}
            variant={ButtonVariant.Supplementary}
            fullWidth
          >
            {heading}
          </Button>
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
            size={ButtonSize.Small}
            onKeyPress={(e) => {
              if (e.key === ' ') {
                onCloseButtonActivate();
              }
            }}
            onClick={() => {
              onCloseButtonActivate();
            }}
            variant={ButtonVariant.Supplementary}
            iconEnd={<IconAngleUp />}
          >
            {getCloseMessage(language)}
          </Button>
        )}
      </div>
    </div>
  );
};

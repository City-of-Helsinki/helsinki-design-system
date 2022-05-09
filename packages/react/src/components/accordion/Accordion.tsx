import React, { useState } from 'react';
import uniqueId from 'lodash.uniqueid';

// import core base styles
import 'hds-core';

import styles from './Accordion.module.scss';
import classNames from '../../utils/classNames';
import { IconAngleDown, IconAngleUp } from '../../icons';
import { useAccordion } from './useAccordion';
import { useTheme } from '../../hooks/useTheme';
import { Button } from '../button';

export interface AccordionCustomTheme {
  '--background-color'?: string;
  '--border-color'?: string;
  '--padding-horizontal'?: string;
  '--padding-vertical'?: string;
  '--header-font-color'?: string;
  '--header-font-size'?: string;
  '--header-line-height'?: string;
  '--button-size'?: string;
  '--button-border-color-hover'?: string; // Deprecated, use --header-focus-outline-color instead.
  '--header-focus-outline-color'?: string;
  '--content-font-size'?: string;
  '--content-line-height'?: string;
}

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

export const Accordion = ({
  border = false,
  card = false,
  children,
  className,
  closeButton = true,
  heading,
  headingLevel = 2,
  id,
  initiallyOpen = false,
  size = 'm',
  style,
  theme,
}: AccordionProps) => {
  if (theme && theme['--button-border-color-hover']) {
    // eslint-disable-next-line no-console
    console.warn(
      '--button-border-color-hover is deprecated, and will be removed in a future release. Please use --header-focus-outline-color instead',
    );

    /* eslint-disable no-param-reassign */
    theme['--header-focus-outline-color'] = theme['--button-border-color-hover'];
    delete theme['--button-border-color-hover'];
    /* eslint-enable no-param-reassign */
  }

  // Create a unique id if not provided via prop
  const [accordionId] = useState(id || uniqueId('accordion-'));

  // Custom theme
  const customThemeClass = useTheme<AccordionCustomTheme>(styles.accordion, theme);

  // Accordion logic
  const { isOpen, buttonProps, contentProps } = useAccordion({ initiallyOpen });

  // Switch icon based on isOpen state
  const icon = isOpen ? (
    <IconAngleUp aria-hidden className={styles.accordionButtonIcon} />
  ) : (
    <IconAngleDown aria-hidden className={styles.accordionButtonIcon} />
  );

  return (
    <div
      className={classNames(
        styles.accordion,
        card && styles.card,
        card && border && styles.border,
        isOpen && styles.isOpen,
        styles[size],
        customThemeClass,
        className,
      )}
      style={style}
      id={accordionId}
    >
      <div className={classNames(styles.accordionHeader)}>
        <div
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
            className={styles.closeButton}
            theme="black"
            size="small"
            onClick={() => buttonProps.onClick()}
            onKeyPress={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                buttonProps.onClick();
              }
            }}
            variant="supplementary"
            iconRight={<IconAngleUp aria-hidden size="xs" className={styles.accordionButtonIcon} />}
          >
            Close
          </Button>
        )}
      </div>
    </div>
  );
};

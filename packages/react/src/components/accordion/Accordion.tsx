import React, { useState } from 'react';
import uniqueId from 'lodash.uniqueid';

// import core base styles
import 'hds-core';

import styles from './Accordion.module.scss';
import classNames from '../../utils/classNames';
import { IconAngleDown, IconAngleUp } from '../../icons';
import { useAccordion } from './useAccordion';
import { useTheme } from '../../hooks/useTheme';

export interface AccordionCustomTheme {
  '--background-color'?: string;
  '--border-color'?: string;
  '--padding-horizontal'?: string;
  '--padding-vertical'?: string;
  '--header-font-color'?: string;
  '--header-font-size'?: string;
  '--header-line-height'?: string;
  '--button-size'?: string;
  '--button-border-color-hover'?: string;
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
  heading,
  headingLevel = 2,
  id,
  style,
  theme,
}: AccordionProps) => {
  // Create a unique id if not provided via prop
  const [accordionId] = useState(id || uniqueId('accordion-'));

  // Custom theme
  const customThemeClass = useTheme<AccordionCustomTheme>(styles.accordion, theme);

  // Accordion logic
  const { isOpen, buttonProps, contentProps } = useAccordion({ initiallyOpen: false });

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
        customThemeClass,
        className,
      )}
      style={style}
      id={accordionId}
    >
      <div className={styles.accordionHeader}>
        <div role="heading" aria-level={headingLevel} id={`${accordionId}-heading`}>
          {heading}
        </div>
        <button
          type="button"
          {...buttonProps}
          className={styles.accordionButton}
          aria-labelledby={`${accordionId}-heading`}
        >
          {icon}
        </button>
      </div>
      <div
        {...contentProps}
        id={`${accordionId}-content`}
        role="region"
        className={styles.accordionContent}
        aria-labelledby={`${accordionId}-heading`}
      >
        {children}
      </div>
    </div>
  );
};

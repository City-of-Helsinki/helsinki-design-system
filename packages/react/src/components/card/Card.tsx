import React from 'react';

// import base styles
import '../../styles/base.css';

import styles from './Card.module.scss';
import classNames from '../../utils/classNames';
import { useTheme } from '../../hooks/useTheme';

export interface CardCustomTheme {
  '--background-color'?: string;
  '--border-color'?: string;
  '--border-width'?: string;
  '--color'?: string;
  '--padding-horizontal': string;
  '--padding-vertical': string;
}

export type CardProps = {
  /**
   * Boolean indicating whether Card will have box shadow or not.
   */
  boxShadow?: boolean;
  /**
   * If `true` border will be drawn around the card.
   */
  border?: boolean;
  /**
   * Heading text.
   */
  heading?: string;
  /**
   * Heading aria-level.
   */
  headingAriaLevel?: number;
  /**
   * Body text.
   */
  text?: string;
  /**
   * Additional class names to apply to the card.
   */
  className?: string;
  /**
   * Custom theme styles
   */
  theme?: CardCustomTheme;
  /**
   * Additional children to render inside the card.
   */
  children?: React.ReactNode;
} & React.HTMLProps<HTMLDivElement>;

export const Card = ({
  border,
  heading,
  headingAriaLevel = 2,
  boxShadow = false,
  text,
  className,
  theme,
  children,
  ...divProps
}: CardProps) => {
  // custom theme
  const customThemeClass = useTheme<CardCustomTheme>(styles.card, theme);

  const hasBody = !!heading || !!text;
  return (
    <div
      className={classNames(
        styles.card,
        border && styles.border,
        boxShadow && styles.boxShadow,
        customThemeClass,
        className,
      )}
      role="region"
      {...divProps}
    >
      {hasBody && (
        <div className={styles.body}>
          {heading && (
            <div className="heading-m" role="heading" aria-level={headingAriaLevel}>
              {heading}
            </div>
          )}
          {text && <div className={styles.text}>{text}</div>}
        </div>
      )}
      {children}
    </div>
  );
};

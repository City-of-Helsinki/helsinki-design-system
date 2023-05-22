import React from 'react';

// import core base styles
import 'hds-core';
import classNames from '../../utils/classNames';
import { useTheme } from '../../hooks/useTheme';
import styles from './Highlight.module.scss';

export interface HighlightTheme {
  '--accent-line-color'?: string;
  '--text-color'?: string;
}

export type HighlightType = 'highlight' | 'quote';
export type HighlightVariant = 's' | 'm' | 'l';

export type HighlightProps = {
  /**
   * Highlight Theme
   */
  theme?: HighlightTheme;
  /**
   * Highlight size. Currently highlight comes in three sizes
   */
  variant?: HighlightVariant;
  /**
   * Highlight type
   */
  type?: HighlightType;
  /**
   * Highlight or Quote text
   */
  text: string;
  /**
   * Reference text. Used with quote
   */
  reference?: string;
};

export const Highlight = ({ theme, variant, type, text, reference }: HighlightProps) => {
  // custom theme
  const customThemeClass = useTheme<HighlightTheme>(styles.highlight, theme || {});
  const isQuote = type && type === 'quote';

  return (
    <figure className={classNames(styles.highlight, variant && styles[`size-${variant}`], customThemeClass)}>
      <blockquote>
        <p className={classNames(styles.text, isQuote && styles.quote)}>{text}</p>
      </blockquote>
      {reference && <figcaption className={styles.reference}>⁠{reference}</figcaption>}
    </figure>
  );
};

import React from 'react';

// import core base styles
import 'hds-core';
import classNames from '../../utils/classNames';
import { useTheme } from '../../hooks/useTheme';
import styles from './Highlight.module.scss';

export interface HighlightTheme {
  '--border-left-color'?: string;
  '--text-color'?: string;
}

export type HighlightProps = {
  /**
   * Highlight Theme
   */
  theme?: HighlightTheme;
  /**
   * Highlight size. Currently highlight comes in three sizes
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Highlight type
   */
  type?: 'highlight' | 'quote';
  /**
   * Highlight or Quote text
   */
  text: string;
  /**
   * Reference text. Used with quote
   */
  reference?: string;
};

export const Highlight = ({ theme, size, type, text, reference }: HighlightProps) => {
  // custom theme
  const customThemeClass = useTheme<HighlightTheme>(styles.highlight, theme || {});
  const isQuote = type && type === 'quote';

  return (
    <div className={classNames(styles.highlight, customThemeClass)} role="region">
      <div className={classNames(styles.text, isQuote && styles.quote, size && styles[size])}>
        {isQuote && '“'}
        {text}
        {isQuote && '”'}
      </div>
      {reference && <div className={styles.reference}>⁠—{reference}</div>}
    </div>
  );
};

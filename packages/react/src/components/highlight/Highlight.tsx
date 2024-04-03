import React from 'react';

import '../../styles/base.module.css';
import styles from './Highlight.module.scss';
import classNames from '../../utils/classNames';
import { useTheme } from '../../hooks/useTheme';

export interface HighlightTheme {
  '--accent-line-color'?: string;
  '--text-color'?: string;
}

export type HighlightType = 'highlight' | 'quote';
export type HighlightSize = 's' | 'm' | 'l';

export type HighlightProps = {
  /**
   * Highlight Theme
   */
  theme?: HighlightTheme;
  /**
   * Highlight size. Currently highlight comes in three sizes
   */
  size?: HighlightSize;
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

export const Highlight = ({ theme, size, type, text, reference }: HighlightProps) => {
  // custom theme
  const customThemeClass = useTheme<HighlightTheme>(styles.highlight, theme || {});
  const isQuote = type && type === 'quote';

  return (
    <figure className={classNames(styles.highlight, size && styles[`size-${size}`], customThemeClass)}>
      <blockquote className={styles.highlightBlockquote}>
        <p className={classNames(styles.text, isQuote && styles.quote)}>{text}</p>
      </blockquote>
      {reference && <figcaption className={styles.reference}>&#8212;⁠{reference}</figcaption>}
    </figure>
  );
};

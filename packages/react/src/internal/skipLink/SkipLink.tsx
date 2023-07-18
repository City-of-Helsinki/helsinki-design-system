import React from 'react';

// import core base styles
import '../../styles/base.css';
import styles from './SkipLink.module.scss';
import { useTheme } from '../../hooks/useTheme';
import classNames from '../../utils/classNames';

// custom theme for skip link position
export interface SkipLinkTheme {
  '--left'?: string;
  '--top'?: string;
}

export type SkipLinkProps = {
  /**
   * ID of the element which is reached by clicking "skip link" shortcut
   */
  skipTo: string;
  /**
   * Label for skip link shortcut
   */
  label: string;
  /**
   * Aria label for skip link shortcut (alternative text for screen reader)
   */
  ariaLabel?: string;
  /**
   * Custom styling for skip link (current only position)
   */
  theme?: SkipLinkTheme;
};
export const SkipLink = ({ skipTo, label, ariaLabel, theme }: SkipLinkProps) => {
  const href = skipTo.startsWith('#') ? skipTo : `#${skipTo}`;
  const customThemeClass = useTheme<SkipLinkTheme>(styles.skipLink, theme);

  return (
    <a href={href} aria-label={ariaLabel} className={classNames(styles.skipLink, customThemeClass)}>
      <span className={styles.skipLinkLabel}>{label}</span>
    </a>
  );
};

SkipLink.componentName = 'SkipLink';

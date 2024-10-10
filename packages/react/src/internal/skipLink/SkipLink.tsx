import React from 'react';

import '../../styles/base.module.css';
import styles from './SkipLink.module.scss';
import { useTheme } from '../../hooks/useTheme';
import classNames from '../../utils/classNames';
import { AllElementPropsWithoutRef } from '../../utils/elementTypings';

// custom theme for skip link position
export interface SkipLinkTheme {
  '--left'?: string;
  '--top'?: string;
}

export type SkipLinkProps = AllElementPropsWithoutRef<'a'> & {
  /**
   * Label for the SkipLink.
   */
  label: string;
  /**
   * ID of the element where the SkipLink jumps to.
   */
  skipTo: string;
  /**
   * Custom styling for SkipLink.
   */
  theme?: SkipLinkTheme;
};
export const SkipLink = ({ label, skipTo, theme, className, ...rest }: SkipLinkProps) => {
  const href = skipTo.startsWith('#') ? skipTo : `#${skipTo}`;
  const customThemeClass = useTheme<SkipLinkTheme>(styles.skipLink, theme);

  return (
    <a {...rest} href={href} className={classNames(styles.skipLink, customThemeClass, className)}>
      <span className={styles.skipLinkLabel}>{label}</span>
    </a>
  );
};

SkipLink.componentName = 'SkipLink';

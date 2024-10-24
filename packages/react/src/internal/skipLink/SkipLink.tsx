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
   * aria-label for describing SkipLink for screen readers.
   * @deprecated Will be replaced in the next major release with "aria-label"
   */
  // eslint-disable-next-line @typescript-eslint/naming-convention
  ariaLabel?: string;
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
export const SkipLink = ({ ariaLabel, label, skipTo, theme, className, ...rest }: SkipLinkProps) => {
  const href = skipTo.startsWith('#') ? skipTo : `#${skipTo}`;
  const customThemeClass = useTheme<SkipLinkTheme>(styles.skipLink, theme);

  return (
    <a
      {...rest}
      href={href}
      aria-label={ariaLabel}
      className={classNames(styles.skipLink, customThemeClass, className)}
    >
      <span className={styles.skipLinkLabel}>{label}</span>
    </a>
  );
};

SkipLink.componentName = 'SkipLink';

import React from 'react';

// import core base styles
import 'hds-core';
import styles from './Header.module.scss';
import classNames from '../../utils/classNames';
import { HeaderContext, HeaderContextProps } from './HeaderContext';
import { useMobile } from '../../hooks/useMobile';
import { HeaderTheme } from './Header.interface';
import { useTheme } from '../../hooks/useTheme';

export type HeaderProps = React.PropsWithChildren<{
  /**
   * Additional class names to apply to the header.
   */
  className?: string;
  /**
   * ID of the header element.
   */
  id?: string;
  /**
   * Defines the header theme.
   * @default 'white'
   */
  theme?: HeaderTheme;
}>;

export const Header = ({ children, className, theme = 'light' }: HeaderProps) => {
  const isMobile = useMobile();
  // Custom theme class that is applied to the root element
  const customThemeClass = useTheme<HeaderTheme>(styles.header, theme);
  const context: HeaderContextProps = { isMobile };
  return (
    <HeaderContext.Provider value={context}>
      <div className={classNames(styles.header, styles[`theme-${theme}`], customThemeClass, className)}>
        <div className={styles.headerBackgroundWrapper}>{children}</div>
      </div>
    </HeaderContext.Provider>
  );
};

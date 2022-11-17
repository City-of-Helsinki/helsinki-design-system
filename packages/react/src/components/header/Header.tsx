import React from 'react';

// import core base styles
import 'hds-core';
import styles from './Header.module.scss';
import classNames from '../../utils/classNames';
import { HeaderContext, HeaderContextProps } from './HeaderContext';
import { breakpoints, useMediaQuery } from '../../hooks/useMediaQuery';

export type HeaderProps = React.PropsWithChildren<{
  /**
   * Additional class names to apply to the header.
   */
  className?: string;
  /**
   * ID of the header element.
   */
  id?: string;
}>;

export const Header = ({ children, className, id }: HeaderProps) => {
  const isSmallScreen = useMediaQuery(() => breakpoints.down('s'));
  const context: HeaderContextProps = { isSmallScreen };
  return (
    <HeaderContext.Provider value={context}>
      <header id={id} className={classNames(styles.header, className)}>
        <div className={styles.headerBackgroundWrapper}>{children}</div>
      </header>
    </HeaderContext.Provider>
  );
};

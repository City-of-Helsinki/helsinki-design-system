import React from 'react';

// import core base styles
import 'hds-core';
import styles from './Header.module.scss';
import classNames from '../../utils/classNames';
import { HeaderContext, HeaderContextProps } from './HeaderContext';
import { useMobile } from '../../hooks/useMobile';

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

export const Header = ({ children, className }: HeaderProps) => {
  const isMobile = useMobile();
  const context: HeaderContextProps = { isMobile };
  return (
    <HeaderContext.Provider value={context}>
      <div className={classNames(styles.header, className)}>
        <div className={styles.headerBackgroundWrapper}>{children}</div>
      </div>
    </HeaderContext.Provider>
  );
};

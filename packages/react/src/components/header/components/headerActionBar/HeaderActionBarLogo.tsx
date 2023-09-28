import React from 'react';

import { LinkItem, LinkProps } from '../../../../internal/LinkItem';
import styles from './HeaderActionBarLogo.module.scss';

type HeaderActionBarLogoProps = {
  /**
   * Logo properties
   */
  logoProps: LinkProps;
  /**
   * Logo to use
   */
  logo: JSX.Element;
};

const HeaderActionBarLogo = ({ logoProps, logo }: HeaderActionBarLogoProps) => {
  return (
    <LinkItem {...logoProps}>
      <span className={styles.logoWrapper}>{logo}</span>
    </LinkItem>
  );
};

export default HeaderActionBarLogo;

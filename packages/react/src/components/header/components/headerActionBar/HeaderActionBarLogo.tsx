import React from 'react';

import styles from './HeaderActionBarLogo.module.scss';
import { LinkItem, LinkProps } from '../../../../internal/LinkItem';

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

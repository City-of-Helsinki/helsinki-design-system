import React from 'react';

// import core base styles
import 'hds-core';
import styles from './Hero.module.scss';

export type HeroProps = React.PropsWithChildren<{}>;

export const Hero = ({ children }: HeroProps) => {
  return <div className={styles.hero}>{children}</div>;
};

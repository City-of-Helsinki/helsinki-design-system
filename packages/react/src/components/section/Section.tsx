import React from 'react';

// import core base styles
import 'hds-core';
import classNames from '../../utils/classNames';
import { Koros, KorosType } from '../koros';
import styles from './Section.module.css';

export type SectionColor = 'primary' | 'secondary' | 'tertiary' | 'plain';

export type SectionProps = React.PropsWithChildren<{
  color?: SectionColor;
  className?: string;
  korosType?: KorosType;
}>;

export const Section = ({ children, className = '', color = 'plain', korosType = null }: SectionProps) => {
  const withKoros = korosType !== null;

  return (
    <div className={classNames(styles.section, styles[color], withKoros && styles.withKoros, className)}>
      {withKoros && <Koros type={korosType} className={`${styles.koros} ${styles.topKoros} ${styles[korosType]}`} />}
      <div className={styles.content}>{children}</div>
      {withKoros && (
        <Koros
          flipHorizontal
          type={korosType}
          className={`${styles.koros} ${styles.bottomKoros} ${styles[korosType]}`}
        />
      )}
    </div>
  );
};

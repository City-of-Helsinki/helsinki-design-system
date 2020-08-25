import React from 'react';

// import core base styles
import 'hds-core';
import classNames from '../../utils/classNames';
import { Koros, KorosType } from '../koros';
import styles from './Section.module.css';

export type SectionProps = React.PropsWithChildren<{
  color?: 'primary' | 'secondary' | 'tertiary' | 'plain';
  className?: string;
  korosType?: KorosType;
}>;

export function Section({ children, className = '', color = 'plain', korosType = null }: SectionProps) {
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
}

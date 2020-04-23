import React from 'react';

import classNames from '../../utils/classNames';
import Koros from '../koros/Koros';
import styles from './Section.module.css';

export type SectionProps = React.PropsWithChildren<{
  color?: 'primary' | 'secondary' | 'tertiary' | 'plain';
  className?: string;
  korosType?: 'basic' | 'beat' | 'pulse' | 'storm' | 'wave';
}>;

const Section: React.FC<SectionProps> = ({
  children,
  className = '',
  color = 'plain',
  korosType = null,
}: SectionProps) => {
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

export default Section;

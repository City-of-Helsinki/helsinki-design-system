import React from 'react';

import styles from './Section.module.css';
import Koros from '../koros/Koros';

export type SectionProps = React.PropsWithChildren<{
  color?: 'primary' | 'secondary' | 'tertiary' | 'plain';
  className?: string;
  koros?: 'basic' | 'beat' | 'pulse' | 'storm' | 'wave';
}>;

export default ({ children, color = 'plain', className = '', koros = null }: SectionProps) => {
  const content = (
    <div className={styles.contentWrapper}>
      <div className={styles.content}>{children}</div>
    </div>
  );

  return (
    <div
      className={[styles.section, styles[color], koros && styles.withKoros, koros && styles[koros], className]
        .filter(e => e)
        .join(' ')}
    >
      {koros ? (
        <>
          <Koros type={koros} color={color} />
          {content}
          <Koros type={koros} flipHorizontal color={color} />
        </>
      ) : (
        content
      )}
    </div>
  );
};

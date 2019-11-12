import React from 'react';

import styles from './Section.module.css';
import Koros from '../koros/Koros';

export type SectionProps = React.PropsWithChildren<{
  alternative?: boolean;
  className?: string;
  koros?: 'basic' | 'beat' | 'pulse' | 'storm' | 'wave';
}>;

export default ({ children, alternative = false, className = '', koros = null }: SectionProps) => {
  const content = (
    <div className={styles.contentWrapper}>
      <div className={styles.content}>{children}</div>
    </div>
  );

  return (
    <div
      className={[
        styles.section,
        koros && styles.withKoros,
        koros && styles[koros],
        alternative && styles.alternative,
        className,
      ]
        .filter(e => e)
        .join(' ')}
    >
      {koros ? (
        <>
          <Koros type={koros} alternative={alternative} />
          {content}
          <Koros type={koros} flipHorizontal alternative={alternative} />
        </>
      ) : (
        content
      )}
    </div>
  );
};

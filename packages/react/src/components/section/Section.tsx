import React from 'react';

import '../../styles/base.module.css';
import styles from './Section.module.css';
import classNames from '../../utils/classNames';
import { AllElementPropsWithoutRef } from '../../utils/elementTypings';
import { Koros, KorosType } from '../koros';

export type SectionColor = 'primary' | 'secondary' | 'tertiary' | 'plain';

export type SectionProps = React.PropsWithChildren<
  AllElementPropsWithoutRef<'div'> & {
    color?: SectionColor;
    className?: string;
    korosType?: KorosType;
  }
>;

export const Section = ({ children, className = '', color = 'plain', korosType = null, ...rest }: SectionProps) => {
  const withKoros = korosType !== null;

  return (
    <div {...rest} className={classNames(styles.section, styles[color], withKoros && styles.withKoros, className)}>
      {withKoros && <Koros type={korosType} className={`${styles.koros} ${styles.topKoros} ${styles[korosType]}`} />}
      <div className={styles.content}>{children}</div>
      {withKoros && (
        <Koros flipVertical type={korosType} className={`${styles.koros} ${styles.bottomKoros} ${styles[korosType]}`} />
      )}
    </div>
  );
};

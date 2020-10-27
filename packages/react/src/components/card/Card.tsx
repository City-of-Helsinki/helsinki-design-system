import React from 'react';

// import core base styles
import 'hds-core';
import styles from './Card.module.scss';
import classNames from '../../utils/classNames';

export type CardProps = {
  /**
   * If `true` border will be drawn around the card.
   */
  border?: boolean;
  /**
   * Heading text.
   */
  heading?: string;
  /**
   * Body text.
   */
  text?: string;
  /**
   * Additional class names to apply to the card.
   */
  className?: string;
  /**
   * Additional children to render inside the card.
   */
  children?: React.ReactNode;
} & React.HTMLProps<HTMLDivElement>;

export const Card = ({ border, heading, text, className, children, ...divProps }: CardProps) => {
  const hasBody = !!heading || !!text;
  return (
    <div className={classNames(styles.card, border && styles.border, className)} role="region" {...divProps}>
      {hasBody && (
        <div className={styles.body}>
          {heading && (
            <div className={styles.heading} role="heading" aria-level={2}>
              {heading}
            </div>
          )}
          {text && <div className={styles.text}>{text}</div>}
        </div>
      )}
      {children}
    </div>
  );
};

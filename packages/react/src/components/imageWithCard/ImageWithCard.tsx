import React from 'react';

// import core base styles
import 'hds-core';
import classNames from '../../utils/classNames';
import styles from './ImageWithCard.module.css';

export type ImageWithCardAlignment = 'left' | 'right';
export type ImageWithCardLayout = 'hover' | 'split';
export type ImageWithCardColor = 'primary' | 'secondary' | 'tertiary' | 'plain';

export type ImageWithCardProps = React.PropsWithChildren<{
  src: string;
  fullWidth?: boolean;
  cardAlignment?: ImageWithCardAlignment;
  cardLayout?: ImageWithCardLayout;
  color?: ImageWithCardColor;
  className?: string;
}>;

export const ImageWithCard = ({
  src,
  fullWidth = false,
  children,
  cardAlignment = 'left',
  color = 'plain',
  cardLayout = null,
  className = null,
}: ImageWithCardProps) => (
  <div
    className={classNames(
      styles.wrapper,
      styles[`${cardAlignment}Alignment`],
      cardLayout && styles[`${cardLayout}Layout`],
      styles[color],
      fullWidth && styles.fullWidth,
      className,
    )}
  >
    <div className={styles.image} style={{ backgroundImage: `url(${src})` }} />
    {children && (
      <div className={styles.cardContainer}>
        <div className={styles.card}>{children}</div>
      </div>
    )}
  </div>
);

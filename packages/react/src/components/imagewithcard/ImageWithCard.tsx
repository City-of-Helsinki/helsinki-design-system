import React from 'react';

import styles from './ImageWithCard.module.css';

export type ImageWithCardProps = React.PropsWithChildren<{
  src: string;
  fullWidth?: boolean;
  cardAlignment?: 'left' | 'right';
  cardLayout?: 'hover' | 'split';
  color?: 'primary' | 'secondary' | 'tertiary' | 'plain';
  className?: string;
}>;

export default ({
  src,
  fullWidth = false,
  children,
  cardAlignment = 'left',
  color = 'plain',
  cardLayout = null,
  className = null,
}: ImageWithCardProps) => {
  return (
    <div
      className={[
        styles.wrapper,
        styles[`${cardAlignment}Alignment`],
        cardLayout && styles[`${cardLayout}Layout`],
        styles[color],
        fullWidth && styles.fullWidth,
        className,
      ]
        .filter(e => e)
        .join(' ')}
    >
      <div className={styles.image} style={{ backgroundImage: `url(${src})` }} />
      {children && (
        <div className={styles.cardContainer}>
          <div className={styles.card}>{children}</div>
        </div>
      )}
    </div>
  );
};

import React from 'react';

import '../../styles/base.module.css';
import styles from './ImageWithCard.module.css';
import classNames from '../../utils/classNames';
import { AllElementPropsWithoutRef } from '../../utils/elementTypings';

export type ImageWithCardAlignment = 'left' | 'right';
export type ImageWithCardLayout = 'hover' | 'split';
export type ImageWithCardColor = 'primary' | 'secondary' | 'tertiary' | 'plain';

export type ImageWithCardProps = React.PropsWithChildren<
  AllElementPropsWithoutRef<'div'> & {
    src: string;
    fullWidth?: boolean;
    cardAlignment?: ImageWithCardAlignment;
    cardLayout?: ImageWithCardLayout;
    color?: ImageWithCardColor;
    className?: string;
  }
>;

export const ImageWithCard = ({
  src,
  fullWidth = false,
  children,
  cardAlignment = 'left',
  color = 'plain',
  cardLayout = null,
  className,
  ...rest
}: ImageWithCardProps) => (
  <div
    {...rest}
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

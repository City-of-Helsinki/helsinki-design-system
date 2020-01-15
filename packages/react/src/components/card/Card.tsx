import React from 'react';

import styles from './card.module.scss';

export interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const Card = ({ title, children, className }: CardProps) => (
  <div className={`${styles.container} ${className}`}>
    {title && <header className={styles.header}>{title}</header>}
    <section className={styles.body}>{children}</section>
  </div>
);

export default Card;

import React from 'react';

import styles from './text.module.scss';

export interface TextProps {
  color?: 'standard' | 'brand' | 'critical' | 'secondary' | 'info';
  as?: 'span' | 'em' | 'strong' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  size?: 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl' | 'xxl' | 'xxxl';
  bold?: boolean;
  italic?: boolean;
}

const Text: React.SFC<TextProps> = ({ color = 'standard', size, as: Element = 'span', bold, italic, children }) => {
  return (
    <Element
      className={`${styles.text} ${styles[color]} ${styles[Element]} ${styles[size]} ${bold && styles.bold} ${italic &&
        styles.italic}`}
    >
      {children}
    </Element>
  );
};

export default Text;

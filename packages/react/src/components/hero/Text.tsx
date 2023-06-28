import React from 'react';

import styles from './Hero.module.scss';
import classNames from '../../utils/classNames';

export const Text = (props: React.HtmlHTMLAttributes<HTMLParagraphElement>): React.ReactElement => {
  const { className, children, ...elementProps } = props;
  const classList = classNames(styles.text, className);
  return (
    <p {...elementProps} className={classList}>
      {children}
    </p>
  );
};

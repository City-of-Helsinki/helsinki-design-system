import React from 'react';

import styles from './DialogActionButtons.module.scss';
import classNames from '../../../utils/classNames';

export type DialogActionButtonProps = React.PropsWithChildren<{
  /**
   * className for custom styling
   */
  className?: string;
}>;

export const DialogActionButtons = ({ children, className }: DialogActionButtonProps) => {
  return <div className={classNames(styles.dialogActionButtons, className)}>{children}</div>;
};

DialogActionButtons.componentName = 'DialogActionButtons';

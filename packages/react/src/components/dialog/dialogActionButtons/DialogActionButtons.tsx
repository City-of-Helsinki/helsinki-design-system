import React, { ReactNode, ReactNodeArray } from 'react';

import styles from './DialogActionButtons.module.scss';

export type DialogActionButtonProps = React.PropsWithChildren<{
  /**
   * Children to render inside the action buttons element.
   */
  children: ReactNode | ReactNodeArray;
}>;

export const DialogActionButtons = ({ children }: DialogActionButtonProps) => {
  return <div className={styles.dialogActionButtons}>{children}</div>;
};

DialogActionButtons.componentName = 'DialogActionButtons';

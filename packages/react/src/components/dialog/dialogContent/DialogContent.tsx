import React, { ReactNode, ReactNodeArray } from 'react';

import styles from './DialogContent.module.scss';

export type DialogContentProps = React.PropsWithChildren<{
  /**
   * The id of the content element.
   */
  id?: string;
  /**
   * Children to render inside the content element.
   */
  children: ReactNode | ReactNodeArray;
}>;

export const DialogContent = ({ id, children }: DialogContentProps) => {
  return (
    <div id={id} className={styles.dialogContent}>
      {children}
    </div>
  );
};

DialogContent.componentName = 'DialogContent';

import React from 'react';

import styles from './DialogContent.module.scss';

export type DialogContentProps = React.PropsWithChildren<{
  /**
   * The id of the content element.
   */
  id?: string;
  /**
   * When `true` content is scrollable. Use only for long text contents.
   */
  scrollable?: true;
}>;

export const DialogContent = ({ id, children }: DialogContentProps) => {
  return (
    <div id={id} className={styles.dialogContent}>
      {children}
    </div>
  );
};

DialogContent.componentName = 'DialogContent';

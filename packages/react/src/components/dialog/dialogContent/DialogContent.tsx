import React, { useContext } from 'react';

import styles from './DialogContent.module.scss';
import classNames from '../../../utils/classNames';
import { DialogContext } from '../DialogContext';

export type DialogContentProps = React.PropsWithChildren<{
  /**
   * The id of the content element.
   */
  id?: string;
}>;

export const DialogContent = ({ id, children }: DialogContentProps) => {
  const { scrollable } = useContext(DialogContext);

  return (
    <div id={id} className={classNames(styles.dialogContent, scrollable && styles.dialogContentScrollable)}>
      {children}
    </div>
  );
};

DialogContent.componentName = 'DialogContent';

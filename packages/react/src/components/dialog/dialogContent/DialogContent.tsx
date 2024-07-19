import React, { useContext } from 'react';

import styles from './DialogContent.module.scss';
import classNames from '../../../utils/classNames';
import { DialogContext } from '../DialogContext';
import { AllElementPropsWithoutRef } from '../../../utils/elementTypings';

export type DialogContentProps = React.PropsWithChildren<
  AllElementPropsWithoutRef<'div'> & {
    /**
     * The id of the content element.
     */
    id?: string;
  }
>;
export const DialogContent = ({ children, className, ...rest }: DialogContentProps) => {
  const { scrollable } = useContext(DialogContext);

  return (
    <div
      className={classNames(styles.dialogContent, scrollable && styles.dialogContentScrollable, className)}
      {...rest}
    >
      {children}
    </div>
  );
};

DialogContent.componentName = 'DialogContent';

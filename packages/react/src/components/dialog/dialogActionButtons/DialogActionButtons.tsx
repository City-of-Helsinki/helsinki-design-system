import React from 'react';

import styles from './DialogActionButtons.module.scss';
import classNames from '../../../utils/classNames';
import { AllElementPropsWithoutRef } from '../../../utils/elementTypings';

export type DialogActionButtonProps = React.PropsWithChildren<
  AllElementPropsWithoutRef<'div'> & {
    /**
     * className for custom styling
     */
    className?: string;
  }
>;

export const DialogActionButtons = ({ children, className, ...rest }: DialogActionButtonProps) => {
  return (
    <div className={classNames(styles.dialogActionButtons, className)} {...rest}>
      {children}
    </div>
  );
};

DialogActionButtons.componentName = 'DialogActionButtons';

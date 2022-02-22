import React from 'react';

import styles from './DialogActionButtons.module.scss';

export type DialogActionButtonProps = React.PropsWithChildren<Record<string, unknown>>;

export const DialogActionButtons = ({ children }: DialogActionButtonProps) => {
  return <div className={styles.dialogActionButtons}>{children}</div>;
};

DialogActionButtons.componentName = 'DialogActionButtons';

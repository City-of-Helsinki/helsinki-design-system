import React, { ReactNode, ReactNodeArray, useEffect } from 'react';
import ReactDOM from 'react-dom';

// import core base styles
import 'hds-core';

import { DialogActionButtons } from './dialogActionButtons/DialogActionButtons';
import { DialogHeader } from './dialogHeader/DialogHeader';
import { DialogContent } from './dialogContent/DialogContent';
import styles from './Dialog.module.scss';

export interface DialogCustomTheme {
  '--accent-line'?: string;
}

export type DialogProps = React.PropsWithChildren<{
  /**
   * The id of the dialog element.
   */
  id: string;
  /**
   * The id of the heading element.
   */
  'aria-labelledby': string;
  /**
   * The id of the info element.
   */
  'aria-describedby': string;
  /**
   * When `true`, dialog is visible,
   */
  isOpen: boolean;
  /**
   * A function to control the isOpen property.
   */
  close?: () => void;
  /**
   * Children to render inside the dialog element.
   */
  children: ReactNode | ReactNodeArray;
}>;

export const Dialog = ({ id, isOpen, children, close, ...props }: DialogProps) => {
  const { 'aria-labelledby': ariaLabelledby, 'aria-describedby': ariaDescribedby } = props;

  const onClose = (): void => {
    close();
  };

  const onKeyDown = (event: KeyboardEvent): void => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add(styles.dialogVisibleBody);
      document.addEventListener('keydown', onKeyDown, false);
    }

    return (): void => {
      document.removeEventListener('keydown', onKeyDown, false);
      document.body.classList.remove(styles.dialogVisibleBody);
    };
  });

  const DialogComponent = (): JSX.Element => (
    <>
      <div className={styles.dialogBackdrop} />
      <div role="dialog" aria-modal="true" id={id} className={styles.dialogWrapper} aria-labelledby={ariaLabelledby}>
        <div className={styles.dialog} aria-describedby={ariaDescribedby}>
          {children}
        </div>
      </div>
    </>
  );

  return isOpen ? ReactDOM.createPortal(<DialogComponent />, document.body) : null;
};

Dialog.Header = DialogHeader;
Dialog.Content = DialogContent;
Dialog.ActionButtons = DialogActionButtons;

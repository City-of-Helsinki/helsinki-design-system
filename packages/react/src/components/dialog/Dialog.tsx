import React, { ReactNode, ReactNodeArray, useEffect } from 'react';
import ReactDOM from 'react-dom';

// import core base styles
import 'hds-core';
import styles from './Dialog.module.scss';
import classNames from '../../utils/classNames';
import { useTheme } from '../../hooks/useTheme';
import { DialogActionButtons } from './dialogActionButtons/DialogActionButtons';
import { DialogHeader } from './dialogHeader/DialogHeader';
import { DialogContent } from './dialogContent/DialogContent';

export interface DialogCustomTheme {
  '--accent-line'?: string;
  '--color-overlay'?: string;
  '--min-width'?: string;
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
   * Custom theme styles
   */
  theme?: DialogCustomTheme;
  /**
   * Additional class names to apply to the dialog.
   */
  className?: string;
  /**
   * Children to render inside the dialog element.
   */
  children: ReactNode | ReactNodeArray;
}>;

export const Dialog = ({ id, isOpen, children, close, className, theme, ...props }: DialogProps) => {
  const customThemeClass = useTheme<DialogCustomTheme>(styles.dialog, theme);

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
    <div className={styles.dialogContainer}>
      <div className={styles.dialogBackdrop} />
      <div
        role="dialog"
        aria-modal="true"
        id={id}
        className={classNames(styles.dialog, customThemeClass, className)}
        aria-labelledby={ariaLabelledby}
      >
        <div aria-describedby={ariaDescribedby}>{children}</div>
      </div>
    </div>
  );

  return isOpen ? ReactDOM.createPortal(<DialogComponent />, document.body) : null;
};

Dialog.Header = DialogHeader;
Dialog.Content = DialogContent;
Dialog.ActionButtons = DialogActionButtons;

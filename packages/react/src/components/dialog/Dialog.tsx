import React, { ReactNode, ReactNodeArray, RefObject, useEffect } from 'react';
import ReactDOM from 'react-dom';

// import core base styles
import 'hds-core';
import styles from './Dialog.module.scss';

export interface DialogCustomTheme {
  '--background-color'?: string;
  '--border-color'?: string;
  '--border-width'?: string;
  '--color'?: string;
  '--padding-horizontal': string;
  '--padding-vertical': string;
}

export type DialogHeaderProps = React.PropsWithChildren<{
  /**
   * The id of the heading element.
   */
  id: string;
  /**
   * The text of the heading element.
   */
  title: string;
  /**
   * Element placed on the left side of the heading element.
   */
  iconLeft?: React.ReactNode;
}>;

const DialogHeader = ({ id, title, iconLeft }: DialogHeaderProps) => {
  const titleRef: RefObject<HTMLHeadingElement> = React.createRef();

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.focus();
    }
  });

  return (
    <div className={styles.dialogHeader}>
      {iconLeft && (
        <div className={styles.icon} aria-hidden="true">
          {iconLeft}
        </div>
      )}
      <h2 id={id} className={styles.dialogTitle} ref={titleRef}>
        {title}
      </h2>
    </div>
  );
};

DialogHeader.componentName = 'DialogHeader';

export type DialogContentProps = React.PropsWithChildren<{
  /**
   * The id of the content element.
   */
  id: string;
  /**
   * Children to render inside the content element.
   */
  children: ReactNode | ReactNodeArray;
}>;

const DialogContent = ({ id, children }: DialogContentProps) => {
  return (
    <div id={id} className={styles.dialogContent}>
      {children}
    </div>
  );
};

DialogContent.componentName = 'DialogContent';

export type DialogActionButtonProps = React.PropsWithChildren<{
  /**
   * Children to render inside the action buttons element.
   */
  children: ReactNode | ReactNodeArray;
}>;

const DialogActionButtons = ({ children }: DialogActionButtonProps) => {
  return <div className={styles.dialogActionButtons}>{children}</div>;
};

DialogActionButtons.componentName = 'DialogActionButtons';

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

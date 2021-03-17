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
  id: string;
  title: string;
  leftIcon?: ReactNode;
}>;

export const DialogHeader = ({ id, title, leftIcon }: DialogHeaderProps) => {
  const titleRef: RefObject<HTMLHeadingElement> = React.createRef();

  useEffect(() => {
    const currentRef = titleRef.current;

    if (currentRef) currentRef.focus();
    return (): void => {
      if (currentRef) currentRef.blur();
    };
  });

  return (
    <div className={styles.dialogHeader}>
      {leftIcon && <span className={styles.dialogTitleIcon}>{leftIcon}</span>}
      <h2 id={id} className={styles.dialogTitle} ref={titleRef}>
        {title}
      </h2>
    </div>
  );
};

export type DialogContentProps = React.PropsWithChildren<{
  id: string;
  children: ReactNode | ReactNodeArray;
}>;

export const DialogContent = ({ id, children }: DialogContentProps) => {
  return (
    <div id={id} className={styles.dialogContent}>
      {children}
    </div>
  );
};

export type DialogActionButtonProps = React.PropsWithChildren<{
  children: ReactNode | ReactNodeArray;
}>;

export const DialogActionButtons = ({ children }: DialogActionButtonProps) => {
  return <div className={styles.dialogActionButtons}>{children}</div>;
};

export type DialogProps = React.PropsWithChildren<{
  id: string;
  'aria-labelledby': string;
  'aria-describedby': string;
  isOpen: boolean;
  close?: () => void;
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

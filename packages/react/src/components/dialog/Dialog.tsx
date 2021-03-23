import React, { useEffect, RefObject } from 'react';
import ReactDOM from 'react-dom';

// import core base styles
import 'hds-core';
import styles from './Dialog.module.scss';
import classNames from '../../utils/classNames';
import { useTheme } from '../../hooks/useTheme';
import { IconCross } from '../../icons';
import { DialogActionButtons } from './dialogActionButtons/DialogActionButtons';
import { DialogHeader } from './dialogHeader/DialogHeader';
import { DialogContent } from './dialogContent/DialogContent';

export interface DialogCustomTheme {
  '--accent-line'?: string;
  '--color-overlay'?: string;
  '--width'?: string;
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
   * The id of the content description element which is usually a paragraph. The paragraph should be part of the content.
   */
  'aria-describedby'?: string;
  /**
   * When `true`, dialog is visible,
   */
  isOpen: boolean;
  /**
   * A function to control the isOpen property.
   */
  close?: () => void;
  /**
   * The id of the element which will get focus after the dialog is closed.
   */
  focusAfterCloseId?: string;
  /**
   * Custom theme styles
   */
  theme?: DialogCustomTheme;
  /**
   * Additional class names to apply to the dialog.
   */
  className?: string;
}>;

export const Dialog = ({ id, isOpen, children, close, className, focusAfterCloseId, theme, ...props }: DialogProps) => {
  const customThemeClass = useTheme<DialogCustomTheme>(styles.dialogContainer, theme);
  const dialogRef: RefObject<HTMLInputElement> = React.createRef();

  const { 'aria-labelledby': ariaLabelledby, 'aria-describedby': ariaDescribedby } = props;

  const setFocusAfterClose = (): void => {
    const focusElement = document.getElementById(focusAfterCloseId);
    if (focusElement) {
      focusElement.focus();
    } else {
      // eslint-disable-next-line no-console
      console.warn('The "focusAfterCloseId" property did not match any element.');
    }
  };

  const onKeyDown = (event: KeyboardEvent): void => {
    if (event.key === 'Escape') {
      close();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add(styles.dialogVisibleBody);
      document.addEventListener('keydown', onKeyDown, false);
    }

    return (): void => {
      if (isOpen) {
        document.removeEventListener('keydown', onKeyDown, false);
        document.body.classList.remove(styles.dialogVisibleBody);
        if (focusAfterCloseId) {
          setFocusAfterClose();
        }
      }
    };
  });

  const onTabBarrierFocus = (isFirst: boolean) => () => {
    if (dialogRef.current) {
      const focusableElements: NodeList = dialogRef.current.querySelectorAll(
        'a, button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select',
      );

      if (focusableElements.length) {
        if (isFirst) {
          (focusableElements[focusableElements.length - 1] as HTMLElement).focus();
        } else {
          (focusableElements[0] as HTMLElement).focus();
        }
      }
    }
  };

  const DialogComponent = (): JSX.Element => (
    <div className={classNames(styles.dialogContainer, customThemeClass)}>
      <div className={styles.dialogBackdrop} />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        id={id}
        className={classNames(styles.dialog, className)}
        aria-labelledby={ariaLabelledby}
      >
        <div aria-describedby={ariaDescribedby}>
          {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
          <div onFocus={onTabBarrierFocus(true)} tabIndex={0} />
          <button className={styles.dialogClose} type="button" aria-label="Close" onClick={() => close()}>
            <IconCross aria-hidden="true" />
          </button>
          {children}
          {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
          <div onFocus={onTabBarrierFocus(false)} tabIndex={0} />
        </div>
      </div>
    </div>
  );

  return isOpen ? ReactDOM.createPortal(<DialogComponent />, document.body) : null;
};

Dialog.Header = DialogHeader;
Dialog.Content = DialogContent;
Dialog.ActionButtons = DialogActionButtons;

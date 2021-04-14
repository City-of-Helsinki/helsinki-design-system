import React, { useEffect, RefObject, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom';

// import core base styles
import 'hds-core';
import styles from './Dialog.module.scss';
import classNames from '../../utils/classNames';
import { useTheme } from '../../hooks/useTheme';
import { DialogActionButtons } from './dialogActionButtons/DialogActionButtons';
import { DialogHeader } from './dialogHeader/DialogHeader';
import { DialogContent } from './dialogContent/DialogContent';
import { DialogContext, DialogContextProps } from './DialogContext';

export interface DialogCustomTheme {
  '--accent-line-color'?: string;
  '--overlay-color'?: string;
  '--width'?: string;
}

type TabBarrierProps = {
  id: string;
  tabIndex: number;
  'aria-hidden': boolean;
};

const defaultBarrierProps: Partial<TabBarrierProps> = {
  tabIndex: 0,
  'aria-hidden': true,
};

const findFocusableDialogElements = (dialogElement: HTMLElement): NodeList =>
  dialogElement.querySelectorAll(
    'a, button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select',
  );

const focusFirstDialogElement = (dialogElement?: HTMLElement) => {
  if (dialogElement) {
    const focusableElements = findFocusableDialogElements(dialogElement);

    if (focusableElements.length) {
      (focusableElements[0] as HTMLElement).focus();
    }
  }
};

const focusLastDialogElement = (dialogElement?: HTMLElement) => {
  if (dialogElement) {
    const focusableElements = findFocusableDialogElements(dialogElement);
    if (focusableElements.length) {
      (focusableElements[focusableElements.length - 1] as HTMLElement).focus();
    }
  }
};

const addDocumentStartTabBarrier = (dialogElement?: HTMLElement): HTMLDivElement => {
  const element = document.createElement('div');
  element.className = 'hds-dialog-start-tab-barrier';
  element.tabIndex = defaultBarrierProps.tabIndex;
  element['aria-hidden'] = defaultBarrierProps.tabIndex['aria-hidden'];
  element.addEventListener('focus', () => focusFirstDialogElement(dialogElement));
  document.body.insertBefore(element, document.body.firstChild);
  return element;
};

const addDocumentEndTabBarrier = (dialogElement?: HTMLElement): HTMLDivElement => {
  const element = document.createElement('div');
  element.className = 'hds-dialog-end-tab-barrier';
  element.tabIndex = defaultBarrierProps.tabIndex;
  element['aria-hidden'] = defaultBarrierProps.tabIndex['aria-hidden'];
  element.addEventListener('focus', () => focusLastDialogElement(dialogElement));
  document.body.appendChild(element);
  return element;
};

const clearDocumentTabBarrier = (tabBarrier: HTMLDivElement): null => {
  tabBarrier.parentElement.removeChild(tabBarrier);
  return null;
};

export const useDocumentTabBarriers = (dialogRef: RefObject<HTMLDivElement>) => {
  const firstBarrier = useRef<HTMLDivElement>(null);
  const lastBarrier = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (dialogRef.current) {
      firstBarrier.current = addDocumentStartTabBarrier(dialogRef.current);
      lastBarrier.current = addDocumentEndTabBarrier(dialogRef.current);
    }
    return () => {
      if (firstBarrier.current && lastBarrier.current) {
        firstBarrier.current = clearDocumentTabBarrier(firstBarrier.current);
        lastBarrier.current = clearDocumentTabBarrier(lastBarrier.current);
      }
    };
  }, [dialogRef]);
};

const ContentTabBarrier = ({ onFocus }: { onFocus: () => void }): JSX.Element => {
  /* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */
  return <div {...defaultBarrierProps} onFocus={onFocus} />;
};

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
   * A function to set isOpen property to `false`.
   */
  close?: () => void;
  /**
   * The element which will get focus after the dialog is closed.
   */
  focusAfterCloseElement?: HTMLElement;
  /**
   * When `true` dialog content is scrollable if needed. Use only for long text contents.
   */
  scrollable?: true;
  /**
   * Custom theme styles
   */
  theme?: DialogCustomTheme;
  /**
   * Additional class names to apply to the dialog.
   */
  className?: string;
  /**
   * Target element where dialog is rendered. The dialog is rendered into the document.body by default.
   */
  targetElement?: HTMLElement;
}>;

export const Dialog = ({
  id,
  isOpen,
  children,
  close,
  focusAfterCloseElement,
  scrollable,
  theme,
  className,
  targetElement,
  ...props
}: DialogProps) => {
  const dialogContextProps: DialogContextProps = { scrollable };
  const customThemeClass = useTheme<DialogCustomTheme>(styles.dialogContainer, theme);
  const dialogRef: RefObject<HTMLInputElement> = React.createRef();

  const { 'aria-labelledby': ariaLabelledby, 'aria-describedby': ariaDescribedby } = props;

  const setFocusAfterClose = useCallback((): void => {
    if (focusAfterCloseElement) {
      focusAfterCloseElement.focus();
    } else {
      // eslint-disable-next-line no-console
      console.warn('The "focusAfterCloseElement" property did not match any element.');
    }
  }, [focusAfterCloseElement]);

  const onKeyDown = (event: KeyboardEvent): void => {
    if (close && event.key === 'Escape') {
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
        if (focusAfterCloseElement) {
          setFocusAfterClose();
        }
      }
    };
  });

  useDocumentTabBarriers(dialogRef);

  const DialogComponent = (): JSX.Element => (
    <DialogContext.Provider value={dialogContextProps}>
      <div className={classNames(styles.dialogContainer, customThemeClass)}>
        <div tabIndex={-1} className={styles.dialogBackdrop} />
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          id={id}
          className={classNames(styles.dialog, scrollable && styles.dialogScrollable, className)}
          aria-labelledby={ariaLabelledby}
          aria-describedby={ariaDescribedby}
        >
          <ContentTabBarrier onFocus={() => focusLastDialogElement(dialogRef.current)} />
          {children}
          <ContentTabBarrier onFocus={() => focusFirstDialogElement(dialogRef.current)} />
        </div>
      </div>
    </DialogContext.Provider>
  );

  return isOpen ? ReactDOM.createPortal(<DialogComponent />, targetElement || document.body) : null;
};

Dialog.Header = DialogHeader;
Dialog.Content = DialogContent;
Dialog.ActionButtons = DialogActionButtons;

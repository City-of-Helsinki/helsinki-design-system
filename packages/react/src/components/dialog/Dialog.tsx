import React, { useEffect, RefObject, useCallback, useState, useRef, createRef } from 'react';
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
}

enum TabBarrierPosition {
  top = 'top',
  bottom = 'bottom',
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

const focusToDialogElement = (position: TabBarrierPosition, dialogElement?: HTMLElement) => {
  if (dialogElement) {
    const focusableElements = findFocusableDialogElements(dialogElement);
    if (focusableElements.length) {
      (focusableElements[
        position === TabBarrierPosition.top ? 0 : focusableElements.length - 1
      ] as HTMLElement).focus();
    }
  }
};

const ContentTabBarrier = ({ onFocus }: { onFocus: () => void }): JSX.Element => {
  /* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */
  return <div {...defaultBarrierProps} onFocus={onFocus} />;
};

const addDocumentTabBarrier = (position: TabBarrierPosition, dialogElement?: HTMLElement): HTMLDivElement => {
  const element = document.createElement('div');
  element.className = 'hds-dialog-tab-barrier';
  element.tabIndex = defaultBarrierProps.tabIndex;
  element['aria-hidden'] = defaultBarrierProps.tabIndex['aria-hidden'];
  element.addEventListener('focus', () => focusToDialogElement(position, dialogElement));
  if (position === TabBarrierPosition.top) {
    document.body.insertBefore(element, document.body.firstChild);
  } else {
    document.body.appendChild(element);
  }
  return element;
};

export type DialogVariant = 'primary' | 'danger';

type DialogCloseProps =
  | {
      /**
       * A function to set isOpen property to `false`. The dialog header will have a close-button if this property exists. The dialog will also close on Escape keypress.
       */
      close: () => void;
      /**
       * The aria-label for the close button. Required with close property.
       */
      closeButtonLabelText: string;
    }
  | {
      close?: undefined;
      closeButtonLabelText?: undefined;
    };

export type DialogProps = React.PropsWithChildren<
  {
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
     * Boolean indicating whether dialog has box shadow or not.
     */
    boxShadow?: boolean;
    /**
     * When `true`, dialog is visible,
     */
    isOpen: boolean;
    /**
     * The element ref which will get focus after the dialog is closed.
     */
    focusAfterCloseRef?: RefObject<HTMLElement>;
    /**
     * The element which will get focus after the dialog is closed.
     */
    focusAfterCloseElement?: HTMLElement;
    /**
     * When `true` dialog content is scrollable if needed. Use only for long text contents.
     */
    scrollable?: boolean;
    /**
     * Defines the dialog variant
     */
    variant?: DialogVariant;
    /**
     * Additional styles
     */
    style?: React.CSSProperties;
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
  } & DialogCloseProps
>;

export const Dialog = ({
  boxShadow = false,
  id,
  isOpen,
  children,
  close,
  closeButtonLabelText,
  focusAfterCloseElement,
  focusAfterCloseRef,
  scrollable,
  variant = 'primary',
  style,
  theme,
  className,
  targetElement,
  ...props
}: DialogProps) => {
  const [isReadyToShowDialog, setIsReadyToShowDialog] = useState<boolean>(false);
  const dialogContextProps: DialogContextProps = { isReadyToShowDialog, scrollable, close, closeButtonLabelText };
  const customThemeClass = useTheme<DialogCustomTheme>(styles.dialogContainer, theme);
  const dialogRef: RefObject<HTMLInputElement> = createRef();
  const bodyRightPaddingStyleRef = useRef<string>(null);

  useEffect(() => {
    if (isOpen && dialogRef !== undefined) {
      addDocumentTabBarrier(TabBarrierPosition.top, dialogRef.current);
      addDocumentTabBarrier(TabBarrierPosition.bottom, dialogRef.current);

      return () => {
        const barriers = document.querySelectorAll('.hds-dialog-tab-barrier');
        barriers.forEach((element) => {
          element.remove();
        });
      };
    }
    return null;
  }, [dialogRef, isOpen]);

  const { 'aria-labelledby': ariaLabelledby, 'aria-describedby': ariaDescribedby } = props;

  const onKeyDown = useCallback(
    (event: KeyboardEvent): void => {
      if (close && event.key === 'Escape') {
        close();
      }
    },
    [close],
  );

  const getElementToFocusAfterClose = useCallback((): HTMLElement | undefined => {
    return focusAfterCloseElement || (focusAfterCloseRef && focusAfterCloseRef.current);
  }, [focusAfterCloseElement, focusAfterCloseRef]);

  useEffect(() => {
    if (isOpen) {
      const documentScrollbarWidth = window.innerWidth - document.body.offsetWidth;
      if (documentScrollbarWidth > 0) {
        bodyRightPaddingStyleRef.current = document.body.style.paddingRight;
        const bodyPaddingRightInPixels: number = parseInt(window.getComputedStyle(document.body).paddingRight, 10);
        document.body.style.paddingRight = `${bodyPaddingRightInPixels + documentScrollbarWidth}px`;
      }
      document.body.classList.add(styles.dialogVisibleBodyWithHiddenScrollbars);
      document.documentElement.classList.add(styles.dialogVisibleBodyWithHiddenScrollbars);
      document.addEventListener('keydown', onKeyDown, false);
      setIsReadyToShowDialog(true);
    }
    return (): void => {
      if (isOpen) {
        setIsReadyToShowDialog(false);
        document.body.classList.remove(styles.dialogVisibleBodyWithHiddenScrollbars);
        document.documentElement.classList.remove(styles.dialogVisibleBodyWithHiddenScrollbars);
        document.removeEventListener('keydown', onKeyDown, false);
        document.body.style.paddingRight = bodyRightPaddingStyleRef.current || '';
        const elementToFocus: HTMLElement | undefined = getElementToFocusAfterClose();
        if (elementToFocus) {
          elementToFocus.focus();
        }
      }
    };
    // Omitting onKeyDown on purpose; adding it will break the Dialog with controlled child components
  }, [isOpen, getElementToFocusAfterClose]);

  const renderDialogComponent = (): JSX.Element => (
    <DialogContext.Provider value={dialogContextProps}>
      <div className={classNames(styles.dialogContainer, customThemeClass)}>
        <ContentTabBarrier onFocus={() => focusToDialogElement(TabBarrierPosition.bottom, dialogRef.current)} />
        <div tabIndex={-1} className={styles.dialogBackdrop} />
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          id={id}
          className={classNames(
            styles.dialog,
            isReadyToShowDialog && styles.dialogVisible,
            scrollable && styles.dialogScrollable,
            styles[variant],
            boxShadow && styles.boxShadow,
            className,
          )}
          style={style}
          aria-labelledby={ariaLabelledby}
          aria-describedby={ariaDescribedby}
        >
          {children}
        </div>
        <ContentTabBarrier onFocus={() => focusToDialogElement(TabBarrierPosition.top, dialogRef.current)} />
      </div>
    </DialogContext.Provider>
  );

  return isOpen ? ReactDOM.createPortal(renderDialogComponent(), targetElement || document.body) : null;
};

Dialog.Header = DialogHeader;
Dialog.Content = DialogContent;
Dialog.ActionButtons = DialogActionButtons;

import React, { RefObject, useEffect } from 'react';

import { IconCross } from '../../../icons';
import styles from './DialogHeader.module.scss';

type HeaderCloseProps =
  | {
      /**
       * A function to set isOpen property to `false`. The dialog header will have a close-button if this property exists
       */
      close: () => void;
      /**
       * A close button label for screen readers. Required with close property.
       */
      closeButtonAriaLabel: string;
    }
  | {
      close?: undefined;
      closeButtonAriaLabel?: undefined;
    };

export type DialogHeaderProps = {
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
} & HeaderCloseProps;

export const DialogHeader = ({ id, title, iconLeft, close, closeButtonAriaLabel }: DialogHeaderProps) => {
  const titleRef: RefObject<HTMLHeadingElement> = React.createRef();

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.focus();
    }
  }, [titleRef]);

  return (
    <div className={styles.dialogHeader}>
      {close && (
        <button
          className={styles.dialogHeaderClose}
          type="button"
          aria-label={closeButtonAriaLabel || 'Close'}
          onClick={() => close()}
        >
          <IconCross aria-hidden="true" />
        </button>
      )}
      <h2 id={id} tabIndex={-1} className={styles.dialogTitle} ref={titleRef}>
        {iconLeft && (
          <span className={styles.dialogTitleLeftIcon} aria-hidden="true">
            {iconLeft}
          </span>
        )}
        {title}
      </h2>
    </div>
  );
};

DialogHeader.componentName = 'DialogHeader';

import React, { RefObject, useContext, useEffect } from 'react';

import styles from './DialogHeader.module.scss';
import { IconCross } from '../../../icons';
import { DialogContext } from '../DialogContext';

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
};

export const DialogHeader = ({ id, title, iconLeft }: DialogHeaderProps) => {
  const { close, closeButtonLabelText, isReadyToShowDialog } = useContext(DialogContext);
  const titleRef: RefObject<HTMLHeadingElement> = React.useRef();

  useEffect(() => {
    if (titleRef && isReadyToShowDialog) {
      titleRef.current.focus();
    }
  }, [titleRef, isReadyToShowDialog]);

  return (
    <div className={styles.dialogHeader}>
      <div className={styles.dialogHeaderContent}>
        {close && (
          <button
            className={styles.dialogHeaderClose}
            type="button"
            aria-label={closeButtonLabelText || 'Close'}
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
    </div>
  );
};

DialogHeader.componentName = 'DialogHeader';

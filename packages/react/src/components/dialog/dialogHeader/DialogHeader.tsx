import React, { RefObject, useContext, useEffect } from 'react';

import styles from './DialogHeader.module.scss';
import { IconCross } from '../../../icons';
import { DialogContext } from '../DialogContext';
import { AllElementPropsWithRef } from '../../../utils/elementTypings';
import classNames from '../../../utils/classNames';

export type DialogHeaderProps = AllElementPropsWithRef<'h2'> & {
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

export const DialogHeader = ({ title, iconLeft, className, ...rest }: DialogHeaderProps) => {
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
        <h2 tabIndex={-1} className={classNames(styles.dialogTitle, className)} ref={titleRef} {...rest}>
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

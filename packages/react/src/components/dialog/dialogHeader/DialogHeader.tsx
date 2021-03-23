import React, { RefObject, useEffect } from 'react';

import styles from './DialogHeader.module.scss';

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
  const titleRef: RefObject<HTMLHeadingElement> = React.createRef();

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.focus();
    }
  }, [titleRef]);

  return (
    <div className={styles.dialogHeader}>
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

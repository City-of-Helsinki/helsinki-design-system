import React, { RefObject, useEffect } from 'react';

import styles from './DialogHeader.module.scss';

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

export const DialogHeader = ({ id, title, iconLeft }: DialogHeaderProps) => {
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

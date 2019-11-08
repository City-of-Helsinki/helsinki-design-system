import React from 'react';

import styles from './Notification.module.css';
import IconClose from '../../icons/IconClose';
import IconInfo from '../../icons/IconInfo';

export type NotificationProps = React.PropsWithChildren<{
  labelText: string;
  onClickClose?: () => void;
  alternative?: boolean;
}>;

export default ({ children, labelText, alternative = false, onClickClose = null }: NotificationProps) => {
  return (
    <div className={styles.notification}>
      <div
        className={`
        ${alternative ? styles.alternative : ''} 
        ${styles.content}`}
      >
        <div>
          <IconInfo className={styles.iconInfo} />
          <span className={styles.labelText}>{labelText}</span>
          {onClickClose && (
            <button type="button" className={styles.buttonClose} onClick={onClickClose}>
              <IconClose />
              <span className={styles.buttonCloseText}>close tooltip</span>
            </button>
          )}
        </div>
        <div className={styles.bodyText}>{children}</div>
      </div>
    </div>
  );
};

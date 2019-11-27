import React from 'react';

import styles from './Notification.module.css';
import IconInfo from '../../icons/IconInfo';

export type NotificationProps = React.PropsWithChildren<{
  labelText: string;
  alternative?: boolean;
}>;

export default ({ children, labelText, alternative = false }: NotificationProps) => (
  <div className={[styles.notification, alternative && styles.alternative].filter(e => e).join(' ')}>
    <div className={styles.label}>
      <IconInfo className={styles.iconInfo} />
      <span className={styles.labelText}>{labelText}</span>
    </div>
    <div className={styles.bodyText}>{children}</div>
  </div>
);

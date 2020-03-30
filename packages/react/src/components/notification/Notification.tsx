import React from 'react';

import classNames from '../../utils/classNames';
import styles from './Notification.module.css';
import { IconInfo, IconWarning, IconAttention, IconCheck } from '../../icons';

export type NotificationProps = React.PropsWithChildren<{
  labelText: string;
  type?: 'notification' | 'error' | 'warning' | 'success';
  className?: string;
}>;

const icons = {
  notification: <IconInfo className={styles.iconInfo} />,
  error: <IconWarning className={styles.iconWarning} />,
  warning: <IconAttention className={styles.iconAttention} />,
  success: <IconCheck className={styles.iconCheck} />,
};

export default ({ children = null, labelText, type = 'notification', className }: NotificationProps) => (
  <div className={classNames(styles.notification, styles[type], className)}>
    <div className={styles.label}>
      <span className={styles.icon} aria-hidden="true">
        {icons[type]}
      </span>
      <span className={styles.labelText}>{labelText}</span>
    </div>
    {children && <div className={styles.bodyText}>{children}</div>}
  </div>
);

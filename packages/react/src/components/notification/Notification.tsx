import React from 'react';

import classNames from '../../utils/classNames';
import styles from './Notification.module.css';
import { IconInfoCircle, IconError, IconAlertCircle, IconCheck } from '../../icons';

export type NotificationProps = React.PropsWithChildren<{
  className?: string;
  labelText: string;
  type?: 'notification' | 'error' | 'warning' | 'success';
}>;

const icons = {
  notification: <IconInfoCircle className={styles.iconInfo} />,
  error: <IconError className={styles.iconWarning} />,
  warning: <IconAlertCircle className={styles.iconAttention} />,
  success: <IconCheck className={styles.iconCheck} />,
};

const Notification: React.FC<NotificationProps> = ({
  children = null,
  labelText,
  type = 'notification',
  className,
}: NotificationProps) => (
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

export default Notification;

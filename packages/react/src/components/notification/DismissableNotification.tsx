import React, { useState } from 'react';

import classNames from '../../utils/classNames';
import Notification, { NotificationProps } from './Notification';
import { IconCross } from '../../icons';
import styles from './DismissableNotification.module.css';

export type DismissableNotificationProps = {
  closeButtonLabelText: string;
  onClose?: () => void;
} & NotificationProps;

const DismissableNotification: React.FC<DismissableNotificationProps> = (props: DismissableNotificationProps) => {
  const [isOpen, setOpen] = useState(true);
  const { type = null, closeButtonLabelText = null, onClose = null, children = null } = props;

  return (
    isOpen && (
      <div style={{ overflowY: 'hidden', position: 'relative' }}>
        <Notification {...props}>
          <button
            className={classNames(styles.buttonClose, styles[type])}
            type="button"
            title={closeButtonLabelText}
            aria-label={closeButtonLabelText}
            onClick={() => {
              setOpen(false);
            }}
          >
            <IconCross className={styles.iconClose} onClick={onClose} />
          </button>
          {children}
        </Notification>
      </div>
    )
  );
};

export default DismissableNotification;

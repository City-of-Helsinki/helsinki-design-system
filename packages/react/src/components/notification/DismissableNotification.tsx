import React, { useState } from 'react';
import { Transition } from 'react-spring/renderprops.cjs';

import classNames from '../../utils/classNames';
import Notification, { NotificationProps } from './Notification';
import IconClose from '../../icons/IconClose';
import styles from './DismissableNotification.module.css';

export type DismissableNotificationProps = {
  closeButtonLabelText: string;
  onClose?: () => void;
} & NotificationProps;

export default (props: DismissableNotificationProps) => {
  const [isOpen, setOpen] = useState(true);
  const { type = null, closeButtonLabelText = null, onClose = null, children = null } = props;

  return (
    <Transition
      config={{ tension: 300, friction: 30 }}
      items={isOpen}
      enter={{ height: 'auto' }}
      leave={{ height: 0 }}
      onDestroyed={onClose}
    >
      {show =>
        show &&
        (transitionProps => (
          <div style={{ ...transitionProps, ...{ overflowY: 'hidden', position: 'relative' } }}>
            <Notification {...props}>{children}</Notification>
            <button
              className={classNames(styles.buttonClose, styles[type])}
              type="button"
              title={closeButtonLabelText}
              aria-label={closeButtonLabelText}
              onClick={() => {
                setOpen(false);
              }}
            >
              <IconClose className={styles.iconClose} />
            </button>
          </div>
        ))
      }
    </Transition>
  );
};

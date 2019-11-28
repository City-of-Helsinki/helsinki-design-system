import React, { useState } from 'react';
import { Transition } from 'react-spring/renderprops.cjs';

import classNames from '../../utils/classNames';
import Notification from './Notification';
import IconClose from '../../icons/IconClose';
import styles from './DismissableNotification.module.css';

export type DismissableNotificationProps = React.PropsWithChildren<{
  labelText: string;
  alternative?: boolean;
}>;

export default ({ children, labelText, alternative = false }: DismissableNotificationProps) => {
  const [isOpen, setOpen] = useState(true);

  return (
    <Transition config={{ tension: 300, friction: 30 }} items={isOpen} enter={{ height: 'auto' }} leave={{ height: 0 }}>
      {show =>
        show &&
        (props => (
          <div style={{ ...props, ...{ overflowY: 'hidden' } }}>
            <Notification labelText={labelText}>
              <button
                className={classNames(styles.buttonClose, alternative && styles.alternative)}
                type="button"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <IconClose className={styles.iconClose} />
              </button>
              {children}
            </Notification>
          </div>
        ))
      }
    </Transition>
  );
};

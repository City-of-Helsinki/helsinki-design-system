import React, { useState } from 'react';
import { Transition } from 'react-spring/renderprops.cjs';

import Notification from './Notification';
import IconClose from '../../icons/IconClose';
import styles from './DismissableNotification.module.css';

export type DismissableNotificationProps = React.PropsWithChildren<{
  labelText: string;
  closeLabel: string;
  alternative?: boolean;
}>;

export default ({ children, labelText, closeLabel, alternative = false }: DismissableNotificationProps) => {
  const [isOpen, setOpen] = useState(true);

  return (
    <Transition config={{ tension: 300, friction: 30 }} items={isOpen} enter={{ height: 'auto' }} leave={{ height: 0 }}>
      {show =>
        show &&
        (props => (
          <div style={{ ...props, ...{ overflowY: 'hidden' } }}>
            <Notification labelText={labelText} alternative={alternative}>
              <>
                <button
                  className={[styles.buttonClose, alternative && styles.alternative].filter(e => e).join(' ')}
                  type="button"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <IconClose />
                  <span className={styles.buttonCloseText}>{closeLabel}</span>
                </button>
                {children}
              </>
            </Notification>
          </div>
        ))
      }
    </Transition>
  );
};

import React, { AriaAttributes, PropsWithChildren, ReactNode } from 'react';
import { animated, useSpring } from 'react-spring';

import classNames from '../../utils/classNames';
import styles from './Notification.module.css';
import { IconInfoCircle, IconError, IconAlertCircle, IconCheck, IconCross } from '../../icons';

export type NotificationType = 'info' | 'error' | 'alert' | 'success';
export type NotificationInlineSize = 'default' | 'small' | 'large';
export type NotificationToastSize = Exclude<NotificationInlineSize, 'large'>;
export type NotificationPosition =
  | 'inline'
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

type Props = PropsWithChildren<{
  className?: string;
  dataTestId?: string;
  label: string | ReactNode;
  type?: NotificationType;
}>;

type Dismissible =
  | {
      dismissible?: false;
      closeButtonLabelText?: string;
      // todo
      onClose?: undefined;
    }
  | {
      dismissible: boolean;
      closeButtonLabelText: string;
      onClose?: () => void;
    };

type PositionAndSize =
  | { position?: 'inline'; size?: NotificationInlineSize }
  | { position?: NotificationPosition; size?: NotificationToastSize };

export type NotificationProps = Props & PositionAndSize & Dismissible;

const icons = {
  info: IconInfoCircle,
  success: IconCheck,
  error: IconError,
  alert: IconAlertCircle,
};

const Notification = ({
  children,
  className = '',
  closeButtonLabelText,
  dataTestId,
  dismissible = false,
  label,
  position = 'inline',
  onClose = () => {
    // do nothing by default
  },
  size = 'default',
  type = 'info',
}: NotificationProps) => {
  const Icon = icons[type];

  // notification transition
  const centerPositioned = position.includes('center');
  const animateFromTop = position.includes('top');
  const transitionProps =
    position !== 'inline'
      ? {
          from: {
            transform: `translate3d(${centerPositioned ? '-50%' : '0'}, ${animateFromTop ? '-' : ''}32px, 0)`,
            opacity: 0.66,
          },
          to: { transform: `translate3d(${centerPositioned ? '-50%' : '0'}, 0, 0)`, opacity: 1 },
          config: {
            friction: 30,
            tension: 300,
          },
        }
      : {};

  const transition = useSpring(transitionProps);

  // accessibility attributes
  const ariaLive: AriaAttributes['aria-live'] = type === 'error' ? 'assertive' : 'polite';
  const role = type === 'error' ? 'alert' : 'status';

  return (
    <animated.div
      style={transition}
      className={classNames(styles[position], styles.notification, styles[size], styles[type], className)}
      role={role}
      aria-live={ariaLive}
      aria-atomic="true"
      data-testid={dataTestId}
    >
      <div className={styles.label}>
        <Icon className={styles.icon} />
        <span>{label}</span>
      </div>
      {children && <div>{children}</div>}
      {dismissible && (
        <button
          className={classNames(styles.close, styles[type])}
          type="button"
          title={closeButtonLabelText}
          aria-label={closeButtonLabelText}
          onClick={onClose}
        >
          <IconCross />
        </button>
      )}
    </animated.div>
  );
};

export default Notification;

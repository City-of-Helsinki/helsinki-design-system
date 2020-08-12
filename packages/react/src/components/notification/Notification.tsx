import React, { AriaAttributes, PropsWithChildren, ReactNode, useEffect } from 'react';
import { animated, useSpring } from 'react-spring';
import { VisuallyHidden } from '@react-aria/visually-hidden';

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

// todo: rename to CommonProps?
type Props = PropsWithChildren<{
  autoClose?: boolean;
  autoCloseDuration?: number;
  onClose?: () => void;

  className?: string;
  dataTestId?: string;
  /**
   * Determines whether the notification should be visually hidden. Useful when notification should only be "seen" by screen readers.
   * @default false
   */
  invisible?: boolean;
  label?: string | ReactNode;
  open?: boolean;
  type?: NotificationType;
}>;

type Dismissible =
  | {
      dismissible?: false;
      closeButtonLabelText?: string;
      // todo
      // onClose?: undefined;
    }
  | {
      dismissible: boolean;
      closeButtonLabelText: string;
      // onClose?: () => void;
    };

type PositionAndSize =
  | { position?: 'inline'; size?: NotificationInlineSize }
  /* todo: does the type checking work? */
  | { position?: NotificationPosition; size?: NotificationToastSize };

// type AutoClose =
//   | { autoClose?: false; autoCloseDuration?: undefined }
//   | { autoClose?: boolean; autoCloseDuration?: number; onClose?: () => void };

export type NotificationProps = Props & PositionAndSize & Dismissible;

const icons = {
  info: IconInfoCircle,
  success: IconCheck,
  error: IconError,
  alert: IconAlertCircle,
};

/**
 * Returns the properties for the "open" transition
 * @param position
 */
const getOpenTransition = (position: NotificationPosition) => {
  const centerPositioned = position.includes('center');
  const animateFromTop = position.includes('top');

  return {
    from: {
      transform: `translate3d(${centerPositioned ? '-50%' : '0'}, ${animateFromTop ? '-' : ''}32px, 0)`,
      opacity: 0.66,
    },
    to: { transform: `translate3d(${centerPositioned ? '-50%' : '0'}, 0, 0)`, opacity: 1 },
    config: {
      friction: 30,
      tension: 300,
    },
  };
};

/**
 * Returns the properties for the "auto close" transition
 * @param duration
 */
const getAutoCloseTransition = (duration: number) => ({
  from: { transform: 'translate3d(-100%, 0, 0)' },
  to: { transform: 'translate3d(0%, 0, 0)' },
  config: {
    duration,
  },
});

const Notification = ({
  autoClose = false,
  autoCloseDuration = 6000,
  children,
  className = '',
  closeButtonLabelText,
  dataTestId,
  dismissible = false,
  invisible = false,
  label,
  position = 'inline',
  onClose = () => {
    // do nothing by default
  },
  open = true,
  size = 'default',
  type = 'info',
}: NotificationProps) => {
  /* eslint-disable */
  // only allow size 'large' for inline notifications
  if (position !== 'inline' && size === 'large') {
    console.warn(`Size '${size}' is only allowed for inline positioned notifications`);
    size = 'default';
  }
  // don't allow autoClose for inline notifications
  if (position === 'inline' && autoClose) {
    console.warn(`The 'autoClose' property is not allowed for inline positioned notifications`);
    autoClose = false;
  }
  /* eslint-enable */

  useEffect(() => {
    const interval = setTimeout(() => {
      if (autoClose) onClose();
    }, autoCloseDuration);
    return () => clearTimeout(interval);
  }, [autoClose, autoCloseDuration, onClose]);

  // icon
  const Icon = icons[type];

  // notification transition
  const openTransitionProps = position !== 'inline' ? getOpenTransition(position) : {};
  const autoCloseTransitionProps = getAutoCloseTransition(autoCloseDuration);

  const openTransition = useSpring(openTransitionProps);
  const autoCloseTransition = useSpring(autoCloseTransitionProps);

  // accessibility attributes
  const ariaLive: AriaAttributes['aria-live'] = type === 'error' ? 'assertive' : 'polite';
  const role = type === 'error' ? 'alert' : 'status';

  return (
    open && (
      <ConditionalVisuallyHidden visuallyHidden={invisible}>
        <animated.div
          style={openTransition}
          className={classNames(
            styles[position],
            styles.notification,
            styles[size],
            styles[type],
            autoClose && styles.noBorder,
            className,
          )}
          role={role}
          aria-live={ariaLive}
          aria-atomic="true"
          data-testid={dataTestId}
        >
          {autoClose && <animated.div style={autoCloseTransition} className={styles.autoClose} />}
          <div className={styles.label}>
            <Icon className={styles.icon} />
            <ConditionalVisuallyHidden visuallyHidden={size === 'small'}>{label}</ConditionalVisuallyHidden>
          </div>
          {children && <div className={styles.body}>{children}</div>}
          {dismissible && (
            <button
              className={classNames(styles.close, styles[type])}
              type="button"
              title={closeButtonLabelText}
              aria-label={closeButtonLabelText}
              onClick={onClose}
            >
              <IconCross aria-hidden />
            </button>
          )}
        </animated.div>
      </ConditionalVisuallyHidden>
    )
  );
};

/**
 * Conditionally hides the children visually, but leaves them accessible to assistive technology
 * @param visuallyHidden  Flag that determines whether the children should be invisible
 * @param children
 * @constructor
 */
const ConditionalVisuallyHidden = ({ visuallyHidden, children }) =>
  visuallyHidden ? <VisuallyHidden>{children}</VisuallyHidden> : children;

export default Notification;

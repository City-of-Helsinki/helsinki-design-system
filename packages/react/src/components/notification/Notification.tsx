import React, { useCallback, useEffect, useState } from 'react';
import { animated, useSpring } from 'react-spring';
import { VisuallyHidden } from '@react-aria/visually-hidden';

// import core base styles
import 'hds-core';
import classNames from '../../utils/classNames';
import styles from './Notification.module.css';
import { IconInfoCircle, IconError, IconAlertCircle, IconCheck, IconCross } from '../../icons';

export type NotificationType = 'info' | 'error' | 'alert' | 'success';
export type NotificationSizeInline = 'default' | 'small' | 'large';
export type NotificationSizeToast = Exclude<NotificationSizeInline, 'large'>;

export type NotificationPosition =
  | 'inline'
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

type CommonProps = React.PropsWithChildren<{
  /**
   * Whether the notification should be closed automatically after a certain time
   * @default false
   */
  autoClose?: boolean;
  /**
   * The duration before the notification is automatically closed. Used together with the `autoClose` prop.
   * @default 6000
   */
  autoCloseDuration?: number;
  /**
   * Additional class names to apply to the notification
   */
  className?: string;
  /**
   * Duration of the close fade-out animation
   * @default 85
   */
  closeAnimationDuration?: number;
  /**
   * Value for the data-testid attribute that is applied to the root component.
   */
  dataTestId?: string;
  /**
   * Displays a progress bar on top of the notification when `true`
   * @default true
   */
  displayAutoCloseProgress?: boolean;
  /**
   * Determines whether the notification should be visually hidden. Useful when notification should only be "seen" by screen readers.
   * @default false
   */
  invisible?: boolean;
  /**
   * The label of the notification.
   * Note: Labels are not displayed visually for small notifications, but they are still accessible to assistive technology. This could be used to help screen reader users to better understand the context of the notification.
   */
  label?: string | React.ReactNode;
  /**
   * Callback fired when the notification is closed
   */
  onClose?: () => void;
  /**
   * Override or extend the styles applied to the component
   */
  style?: React.CSSProperties;
  /**
   * The type of the notification
   * @default 'info'
   */
  type?: NotificationType;
}>;

type PositionAndSize =
  | { position?: 'inline'; size?: NotificationSizeInline }
  | {
      /**
       * The position of the notification
       */
      position?: NotificationPosition;
      /**
       * The size of the notification
       */
      size?: NotificationSizeToast;
    };

type Dismissible =
  | { dismissible?: false; closeButtonLabelText?: string }
  | {
      /**
       * Whether the notification can be closed
       * @default false
       */
      dismissible?: boolean;
      /**
       * The aria-label and title for the close button
       */
      closeButtonLabelText: string;
    };

export type NotificationProps = CommonProps & PositionAndSize & Dismissible;

// Icon mapping for notification types
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
    to: {
      transform: `translate3d(${centerPositioned ? '-50%' : '0'}, 0, 0)`,
      opacity: 1,
    },
    config: {
      friction: 30,
      tension: 300,
    },
  };
};

/**
 * Returns the properties for the "close" transition
 * @param duration
 */
const getCloseTransition = (duration: number) => ({
  from: { opacity: 1 },
  to: { opacity: 0 },
  config: { duration },
});

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

/**
 * Conditionally hides the children visually, but leaves them accessible to assistive technology
 * @param visuallyHidden  Determines whether the children should be invisible
 * @param children
 * @constructor
 */
const ConditionalVisuallyHidden = ({ visuallyHidden, children }) =>
  visuallyHidden ? <VisuallyHidden>{children}</VisuallyHidden> : children;

export const Notification = ({
  autoClose = false,
  autoCloseDuration = 6000,
  children,
  className = '',
  closeAnimationDuration = 85,
  closeButtonLabelText,
  dataTestId,
  dismissible = false,
  displayAutoCloseProgress = true,
  invisible = false,
  label,
  position = 'inline',
  onClose = () => null,
  size = 'default',
  style,
  type = 'info',
}: NotificationProps) => {
  // only allow size 'large' for inline notifications
  if (position !== 'inline' && size === 'large') {
    // eslint-disable-next-line no-console
    console.warn(`Size '${size}' is only allowed for inline positioned notifications`);
    // eslint-disable-next-line no-param-reassign
    size = 'default';
  }
  // don't allow autoClose for inline notifications
  if (position === 'inline' && autoClose) {
    // eslint-disable-next-line no-console
    console.warn(`The 'autoClose' property is not allowed for inline positioned notifications`);
    // eslint-disable-next-line no-param-reassign
    autoClose = false;
  }

  // internal state used for transitions
  const [open, setOpen] = useState(true);

  const handleClose = useCallback(() => {
    // trigger close animation
    setOpen(false);
    // emit onClose callback after the animation is completed
    setTimeout(() => onClose(), closeAnimationDuration);
  }, [onClose, closeAnimationDuration]);

  useEffect(() => {
    const interval = setTimeout(() => {
      if (autoClose) handleClose();
    }, autoCloseDuration);
    return () => clearTimeout(interval);
  }, [autoClose, autoCloseDuration, handleClose]);

  // icon
  const Icon = icons[type];

  // notification transitions
  const openTransitionProps = position !== 'inline' ? getOpenTransition(position) : {};
  const closeTransitionProps = getCloseTransition(closeAnimationDuration);
  const autoCloseTransitionProps = displayAutoCloseProgress ? getAutoCloseTransition(autoCloseDuration) : {};

  const notificationTransition = useSpring(open ? openTransitionProps : closeTransitionProps);
  const autoCloseTransition = useSpring(autoCloseTransitionProps);

  // Set role="alert" for non-inline notifications
  const role = position !== 'inline' ? 'alert' : null;

  return (
    <ConditionalVisuallyHidden visuallyHidden={invisible}>
      <animated.section
        // there is an issue with react-spring -rc3 and a new version of @types/react: https://github.com/react-spring/react-spring/issues/1102
        // eslint-disable-next-line  @typescript-eslint/no-explicit-any
        style={{ ...notificationTransition, ...(style as any) }}
        className={classNames(
          styles[position],
          styles.notification,
          styles[size],
          styles[type],
          autoClose && styles.noBorder,
          className,
        )}
        aria-label="Notification"
        aria-atomic="true"
        data-testid={dataTestId}
      >
        {autoClose && <animated.div style={autoCloseTransition} className={styles.autoClose} />}
        <div className={styles.content} role={role}>
          <div className={styles.label} role="heading" aria-level={2}>
            <Icon className={styles.icon} />
            <ConditionalVisuallyHidden visuallyHidden={size === 'small'}>{label}</ConditionalVisuallyHidden>
          </div>
          {children && <div className={styles.body}>{children}</div>}
        </div>
        {dismissible && (
          <button
            className={classNames(styles.close, styles[type])}
            type="button"
            title={closeButtonLabelText}
            aria-label={closeButtonLabelText}
            onClick={handleClose}
          >
            <IconCross aria-hidden />
          </button>
        )}
      </animated.section>
    </ConditionalVisuallyHidden>
  );
};

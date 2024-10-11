import React, { useCallback, useEffect, useState } from 'react';
import { animated, useSpring } from '@react-spring/web';
import { VisuallyHidden } from '@react-aria/visually-hidden';

import '../../styles/base.module.css';
import styles from './Notification.module.css';
import classNames from '../../utils/classNames';
import { IconInfoCircleFill, IconErrorFill, IconAlertCircleFill, IconCheckCircleFill, IconCross } from '../../icons';
import { AllElementPropsWithoutRef } from '../../utils/elementTypings';

export type NotificationType = 'info' | 'error' | 'alert' | 'success';

export enum NotificationSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

export type NotificationPosition =
  | 'inline'
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

type CommonProps = React.PropsWithChildren<
  AllElementPropsWithoutRef<'section'> & {
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
     * Boolean indication whether notification has box shadow or not.
     */
    boxShadow?: boolean;
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
     * The aria-label of the notification region
     * @default "Notification"
     */
    notificationAriaLabel?: string;
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
    /**
     * The aria-level of the heading element
     * @default 2
     */
    headingLevel?: number;
  }
>;

type PositionAndSize =
  | { position?: 'inline'; size?: NotificationSize }
  | {
      /**
       * The position of the notification
       */
      position?: NotificationPosition;
      /**
       * The size of the notification
       */
      size?: Exclude<NotificationSize, NotificationSize.Large>;
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
  info: IconInfoCircleFill,
  success: IconCheckCircleFill,
  error: IconErrorFill,
  alert: IconAlertCircleFill,
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
  from: { transform: 'translate3d(0%, 0, 0)' },
  to: { transform: 'translate3d(-100%, 0, 0)' },
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

export const Notification = React.forwardRef<HTMLDivElement, NotificationProps>(
  (
    {
      autoClose = false,
      autoCloseDuration = 6000,
      boxShadow = false,
      children,
      className = '',
      closeAnimationDuration = 85,
      closeButtonLabelText,
      dismissible = false,
      displayAutoCloseProgress = true,
      invisible = false,
      label,
      notificationAriaLabel = 'Notification',
      position = 'inline',
      onClose = () => null,
      size = NotificationSize.Medium,
      style,
      type = 'info',
      headingLevel = 2,
      ...rest
    }: NotificationProps,
    ref,
  ) => {
    const isToast: boolean = position !== 'inline';
    // only allow size 'large' for inline notifications
    if (isToast && size === NotificationSize.Large) {
      // eslint-disable-next-line no-console
      console.warn(`Size '${size}' is only allowed for inline positioned notifications`);
      // eslint-disable-next-line no-param-reassign
      size = NotificationSize.Medium;
    }
    // don't allow autoClose for inline notifications
    if (!isToast && autoClose) {
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
    const openTransitionProps = isToast ? getOpenTransition(position) : {};
    const closeTransitionProps = getCloseTransition(closeAnimationDuration);
    const autoCloseTransitionProps = displayAutoCloseProgress ? getAutoCloseTransition(autoCloseDuration) : {};

    const notificationTransition = useSpring(open ? openTransitionProps : closeTransitionProps);
    const autoCloseTransition = useSpring(autoCloseTransitionProps);

    return (
      <ConditionalVisuallyHidden visuallyHidden={invisible}>
        <animated.section
          // this "as" fixes ts error with wrong types. Seen only when running ts-check-stories.
          {...(rest as Record<string, unknown>)}
          // there is an issue with react-spring -rc3 and a new version of @types/react: https://github.com/react-spring/react-spring/issues/1102
          // eslint-disable-next-line  @typescript-eslint/no-explicit-any
          style={{ ...notificationTransition, ...(style as any) }}
          className={classNames(
            styles[position],
            styles.notification,
            styles[size],
            styles[type],
            autoClose && styles.noBorder,
            boxShadow && styles.boxShadow,
            className,
          )}
          aria-label={notificationAriaLabel}
          // Toast or invisible notifications require a role alert to ensure the screen readers will notify the content change.
          role={isToast || invisible ? 'alert' : undefined}
        >
          {autoClose && <animated.div style={autoCloseTransition} className={styles.autoClose} />}
          <div className={styles.content} ref={ref}>
            {label && (
              // Toast or invisible notifications do not always notice heading if role heading or aria-level is present.
              <div
                className={styles.label}
                {...(isToast || invisible ? {} : { role: 'heading', 'aria-level': headingLevel })}
              >
                <Icon className={styles.icon} />
                <ConditionalVisuallyHidden visuallyHidden={size === NotificationSize.Small}>
                  {label}
                </ConditionalVisuallyHidden>
              </div>
            )}
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
              <IconCross />
            </button>
          )}
        </animated.section>
      </ConditionalVisuallyHidden>
    );
  },
);

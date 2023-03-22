import React, { useRef, useEffect } from 'react';

// import base styles
import '../../styles/base.css';

import notificationStyles from '../notification/Notification.module.css';
import errorSummaryStyles from './ErrorSummary.module.scss';
import { IconAlertCircleFill } from '../../icons';
import classNames from '../../utils/classNames';

export type ErrorSummarySize = 'default' | 'large';

export type ErrorSummaryProps = React.PropsWithChildren<{
  /**
   * Automatically focus the label of the error summary
   */
  autofocus?: boolean;
  /**
   * Additional class names to apply to the error summary
   */
  className?: string;
  /**
   * The label of the error summary.
   */
  label: string | React.ReactNode;
  /**
   * The size of the error summary
   */
  size?: ErrorSummarySize;
  /**
   * Override or extend the styles applied to the component
   */
  style?: React.CSSProperties;
}>;

export const ErrorSummary = React.forwardRef<HTMLDivElement, ErrorSummaryProps>(
  ({ autofocus = false, className, label, size = 'default', style, children }: ErrorSummaryProps, ref) => {
    const labelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (autofocus === true) {
        labelRef.current.focus();
      }
    }, [autofocus]);

    return (
      <div
        ref={ref}
        className={classNames(
          notificationStyles.notification,
          notificationStyles[size],
          notificationStyles.error,
          className,
        )}
        style={style}
        aria-label="Error summary"
        aria-atomic="true"
      >
        <div className={notificationStyles.content}>
          <div
            className={classNames(notificationStyles.label, errorSummaryStyles.label)}
            role="heading"
            aria-level={2}
            tabIndex={-1}
            ref={labelRef}
          >
            <IconAlertCircleFill className={notificationStyles.icon} aria-hidden />
            {label}
          </div>
          <div className={(notificationStyles.body, errorSummaryStyles.errorSummaryBody)}>{children}</div>
        </div>
      </div>
    );
  },
);

import React, { useRef, useEffect } from 'react';

import '../../styles/base.module.css';
import errorSummaryStyles from './ErrorSummary.module.scss';
import notificationStyles from '../notification/Notification.module.css';
import { IconErrorFill } from '../../icons';
import classNames from '../../utils/classNames';
import { AllElementPropsWithoutRef } from '../../utils/elementTypings';
import { NotificationSize } from '../notification';

// ErrorSummary doesn't have a size of smallimport { AllElementPropsWithoutRef } from '../../utils/elementTypings';

export enum ErrorSummarySize {
  Medium = NotificationSize.Medium,
  Large = NotificationSize.Large,
}

export type ErrorSummaryProps = React.PropsWithChildren<
  AllElementPropsWithoutRef<'div'> & {
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
  }
>;

export const ErrorSummary = React.forwardRef<HTMLDivElement, ErrorSummaryProps>(
  (
    { autofocus = false, className, label, size = ErrorSummarySize.Medium, children, ...rest }: ErrorSummaryProps,
    ref,
  ) => {
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
        aria-label="Error summary"
        aria-atomic="true"
        {...rest}
      >
        <div className={notificationStyles.content}>
          <div
            className={classNames(notificationStyles.label, errorSummaryStyles.label)}
            role="heading"
            aria-level={2}
            tabIndex={-1}
            ref={labelRef}
          >
            <IconErrorFill className={notificationStyles.icon} />
            {label}
          </div>
          <div className={(notificationStyles.body, errorSummaryStyles.errorSummaryBody)}>{children}</div>
        </div>
      </div>
    );
  },
);

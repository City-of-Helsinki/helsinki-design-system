import React, { cloneElement, forwardRef, ReactNode } from 'react';

import classes from './HeaderActionBarSubItem.module.scss';
import classNames from '../../../../utils/classNames';

export interface HeaderActionBarSubItemProps {
  /**
   * Aria label for the item.
   */
  ariaLabel?: string;
  /**
   * Icon element (on the left side of the label) for the action bar item.
   */
  iconLeft?: ReactNode;
  /**
   * Icon element (on the right side of the label) for the action bar item.
   */
  iconRight?: ReactNode;
  /**
   * Icon element (on the right side of the item) for the action bar item.
   */
  iconNotification?: ReactNode;
  /**
   * Label for the action bar item.
   */
  label?: string | JSX.Element;
  heading?: boolean;
  subheading?: boolean;
  /**
   * Hypertext Reference of the link.
   * @default #
   */
  href?: string;
  className?: string;
}

export const HeaderActionBarSubItem = forwardRef<HTMLButtonElement, HeaderActionBarSubItemProps>(
  ({ iconLeft, iconRight, iconNotification, label, heading, subheading, href, className, ariaLabel, ...rest }, ref) => {
    const itemClassName = classNames({
      [classes.actionBarSubItem]: true,
      ...(className && { [className]: true }),
    });

    const Icon = ({ element, elementClassName }: { element: ReactNode; elementClassName?: string }) => {
      if (!element && !React.isValidElement(element)) {
        return null;
      }
      return (
        <span className={elementClassName}>{cloneElement(element as React.ReactElement, { 'aria-hidden': true })}</span>
      );
    };

    const Label = ({ text }: { text: HeaderActionBarSubItemProps['label'] }) => {
      if (!text) {
        return null;
      }
      return <span className={classNames(classes.actionBarSubItemLabel)}>{text}</span>;
    };

    const Content = () => (
      <>
        <Icon element={iconLeft} elementClassName={classNames(classes.actionBarSubItemIcon)} />
        <Label text={label} />
        <Icon element={iconRight} elementClassName={classNames(classes.actionBarSubItemIcon)} />
        <Icon
          element={iconNotification}
          elementClassName={classNames(classes.actionBarSubItemIcon, classes.iconNotification)}
        />
      </>
    );

    const LinkOrStatic = (attr) =>
      attr.href && attr.href !== '' ? (
        <a {...attr}>
          <Content />
        </a>
      ) : (
        <div>
          <Content />
        </div>
      );

    const isLink = href && href !== '';
    const linkAttr = {
      ...(ariaLabel && { 'aria-label': ariaLabel }),
      ...(isLink && { href }),
      ...rest,
    };

    /* eslint-disable-next-line no-nested-ternary */
    return heading ? (
      <h3 className={itemClassName}>
        <LinkOrStatic {...linkAttr} />
      </h3>
    ) : subheading ? (
      <h4 className={itemClassName}>
        <LinkOrStatic {...linkAttr} />
      </h4>
    ) : (
      <LinkOrStatic className={itemClassName} ref={ref} {...linkAttr} />
    );
  },
);

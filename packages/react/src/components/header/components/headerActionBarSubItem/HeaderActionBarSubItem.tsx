import React, { cloneElement, forwardRef, ReactNode } from 'react';

import classes from './HeaderActionBarSubItem.module.scss';
import classNames from '../../../../utils/classNames';
import { IconLinkExternal } from '../../../../icons';

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
   * Count for the right aligned red notification circle
   */
  notificationCount?: number;
  /**
   * Label for the action bar item.
   */
  label?: string | JSX.Element;
  /**
   * If heading style is used
   */
  heading?: boolean;
  /**
   * If bold
   */
  bold?: boolean;
  /**
   * Hypertext Reference of the link.
   * @default #
   */
  href?: string;
  /**
   * If external link
   */
  external?: boolean;
  className?: string;
}

export const HeaderActionBarSubItem = forwardRef<HTMLButtonElement, HeaderActionBarSubItemProps>(
  (
    { iconLeft, iconRight, notificationCount, label, heading, href, className, bold, external, ariaLabel, ...rest },
    ref,
  ) => {
    const itemClassName = classNames({
      [classes.actionBarSubItem]: true,
      ...(className && { [className]: true }),
      [classes.bold]: bold,
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
        {external ? (
          <IconLinkExternal />
        ) : (
          <Icon element={iconRight} elementClassName={classNames(classes.actionBarSubItemIcon)} />
        )}
        <span className={classNames(classes.grow)} />
        <span className={classNames(classes.notificationCount)}>{notificationCount}</span>
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
      <h4 className={itemClassName}>
        <LinkOrStatic {...linkAttr} />
      </h4>
    ) : (
      <LinkOrStatic className={itemClassName} ref={ref} {...linkAttr} />
    );
  },
);

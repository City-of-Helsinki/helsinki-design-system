import React, { cloneElement, forwardRef, ReactNode } from 'react';
import { VisuallyHidden } from '@react-aria/visually-hidden';

import classes from './HeaderActionBarSubItem.module.scss';
import classNames from '../../../../utils/classNames';
import { IconLinkExternal } from '../../../../icons';
import parentClasses from '../headerActionBarItem/HeaderActionBarItem.module.scss';

export interface HeaderActionBarSubItemProps extends React.HTMLAttributes<HTMLButtonElement> {
  /**
   * Icon element (on the left side of the label) for the action bar item.
   */
  iconLeft?: ReactNode;
  /**
   * Icon element (on the right side of the label) for the action bar item.
   */
  iconRight?: ReactNode;
  /**
   * Content for the right aligned red notification bubble
   */
  notificationBubbleContent?: string;
  /**
   * Aria label for notification bubble.
   */
  notificationBubbleAriaLabel?: string;
  /**
   * Label for the action bar item.
   */
  label?: string | JSX.Element;
  /**
   * If heading style is used
   */
  isHeading?: boolean;
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
  /**
   * The aria-label for opening link in an external domain
   */
  openInExternalDomainAriaLabel?: string;
  className?: string;
}

export const HeaderActionBarSubItem = forwardRef<HTMLButtonElement, HeaderActionBarSubItemProps>(
  (
    {
      'aria-label': ariaLabel,
      iconLeft,
      iconRight,
      notificationBubbleContent,
      notificationBubbleAriaLabel,
      label,
      isHeading,
      href,
      onClick,
      className,
      bold,
      external,
      openInExternalDomainAriaLabel,
      ...rest
    },
    ref,
  ) => {
    const itemClassName = classNames({
      [classes.actionBarSubItem]: true,
      ...(className && { [className]: true }),
      [classes.bold]: bold,
    });

    const composeAriaLabel = () => {
      let linkText = ariaLabel || String(label);
      const externalText = external ? openInExternalDomainAriaLabel || 'Siirtyy toiseen sivustoon.' : '';

      if (linkText && linkText.slice(-1) !== '.') {
        linkText = `${linkText}.`;
      }

      return [linkText, externalText].filter((text) => text).join(' ');
    };

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
        <Icon
          element={iconLeft}
          elementClassName={classNames(classes.actionBarSubItemIcon, classes.actionBarSubItemIconLeft)}
        />
        <Label text={label} />
        {external ? (
          <IconLinkExternal className={classNames(classes.actionBarSubItemIcon)} />
        ) : (
          <Icon element={iconRight} elementClassName={classNames(classes.actionBarSubItemIcon)} />
        )}
        {notificationBubbleContent !== undefined && (
          <>
            <span className={classNames(classes.grow)} />
            <span className={classNames(classes.notificationBubble)}>
              {notificationBubbleAriaLabel && <VisuallyHidden>{`${notificationBubbleAriaLabel} `}</VisuallyHidden>}
              {notificationBubbleContent}
            </span>
          </>
        )}
      </>
    );

    const LinkOrStatic = (attr) => {
      if (attr.href && attr.href !== '') {
        return (
          <a {...attr}>
            <Content />
          </a>
        );
      }
      if (attr.onClick) {
        return (
          <button {...attr} type="button">
            <Content />
          </button>
        );
      }
      return <Content />;
    };

    const isLink = href && href !== '';
    const linkAttr = {
      ...((external || ariaLabel) && { 'aria-label': composeAriaLabel() }),
      ...(isLink && { href }),
      ...(onClick && { onClick }),
      ...rest,
    };

    /* eslint-disable-next-line no-nested-ternary */
    return (
      <>
        {' '}
        {isHeading ? (
          <h4 className={itemClassName}>
            <LinkOrStatic {...linkAttr} />
          </h4>
        ) : (
          <li className={parentClasses.dropdownItem}>
            <LinkOrStatic className={itemClassName} ref={ref} {...linkAttr} />
          </li>
        )}
      </>
    );
  },
);

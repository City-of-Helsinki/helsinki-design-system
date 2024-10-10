import React, {
  cloneElement,
  ForwardedRef,
  forwardRef,
  HTMLAttributes,
  PropsWithChildren,
  ReactNode,
  useCallback,
} from 'react';
import { VisuallyHidden } from '@react-aria/visually-hidden';

import classes from './HeaderActionBarSubItem.module.scss';
import classNames from '../../../../utils/classNames';
import { IconLinkExternal } from '../../../../icons';
import actionBarItemClasses from '../headerActionBarItem/HeaderActionBarItem.module.scss';
import { CommonHTMLAttributes } from '../../../../utils/commonHTMLAttributes';

// AllElementPropsWithoutRef not used here, because intersection types cannot be extended and ts errors are shown
type ElementProps = React.HTMLAttributes<HTMLButtonElement | HTMLAnchorElement> & CommonHTMLAttributes;

export interface HeaderActionBarSubItemProps extends ElementProps {
  /**
   * Icon element (on the start side of the label) for the action bar item.
   */
  iconStart?: ReactNode;
  /**
   * Icon element (on the end side of the label) for the action bar item.
   */
  iconEnd?: ReactNode;
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
}

export const HeaderActionBarSubItem = forwardRef<HTMLButtonElement | HTMLAnchorElement, HeaderActionBarSubItemProps>(
  (
    {
      'aria-label': ariaLabel,
      iconStart,
      iconEnd,
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
          element={iconStart}
          elementClassName={classNames(classes.actionBarSubItemIcon, classes.actionBarSubItemIconStart)}
        />
        <Label text={label} />
        {external ? (
          <IconLinkExternal className={classNames(classes.actionBarSubItemIcon)} />
        ) : (
          <Icon element={iconEnd} elementClassName={classNames(classes.actionBarSubItemIcon)} />
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

    const isLink = href && href !== '';
    const linkAttr = {
      ...((external || ariaLabel) && { 'aria-label': composeAriaLabel() }),
      ...(isLink && { href }),
      ...(onClick && { onClick }),
      ...rest,
    };

    const Wrapper = useCallback(
      ({ children }: PropsWithChildren<unknown>) => {
        return isHeading ? (
          <h4 className={itemClassName}>{children}</h4>
        ) : (
          <li className={actionBarItemClasses.dropdownItem}>{children}</li>
        );
      },
      [isHeading, itemClassName],
    );

    if (isLink) {
      return (
        <Wrapper>
          <a
            className={itemClassName}
            {...(linkAttr as unknown as HTMLAttributes<HTMLAnchorElement>)}
            ref={ref as ForwardedRef<HTMLAnchorElement>}
          >
            <Content />
          </a>
        </Wrapper>
      );
    }

    if (linkAttr.onClick) {
      return (
        <Wrapper>
          <button type="button" className={itemClassName} ref={ref as ForwardedRef<HTMLButtonElement>} {...linkAttr}>
            <Content />
          </button>
        </Wrapper>
      );
    }

    return (
      <Wrapper>
        <Content />
      </Wrapper>
    );
  },
);

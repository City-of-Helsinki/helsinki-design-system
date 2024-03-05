import React, { forwardRef } from 'react';

import '../../styles/base.module.css';
import styles from './Tag.module.scss';
import { IconCross } from '../../icons';
import classNames from '../../utils/classNames';
import { useTheme } from '../../hooks/useTheme';

export interface TagCustomTheme {
  '--tag-action-border-color'?: string;
  '--tag-background-color'?: string;
  '--tag-color'?: string;
  '--tag-focus-outline-color'?: string;
  '--tag-hover-background-color'?: string;
}

export type TagVariant = 'action' | 'informative' | 'link';

enum TagSize {
  Small = 's',
  Large = 'l',
}

export type TagProps = {
  /**
   * The label for the tag
   */
  children: React.ReactNode;
  /**
   * Additional class names to apply to the tag
   */
  className?: string;
  /**
   * Url to go to after Link variant is clicked
   */
  href?: string;
  /**
   * Link's _target -attribute
   */
  target?: React.AnchorHTMLAttributes<HTMLAnchorElement>['target'];
  /*
  /**
   * Element placed on the left side of the label
   */
  iconLeft?: React.ReactNode;
  /**
   * Element placed on the right side of the label
   */
  iconRight?: React.ReactNode;
  /**
   * Should Tag span to multiple lines
   * @default false
   */
  multiline?: boolean;
  /**
   * Callback function fired when the tag is clicked. If set, the tag will be clickable.
   */
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent> | React.KeyboardEvent<HTMLDivElement>) => void;
  /**
   * Callback function fired when the tag is clicked. If set, a delete button will be shown.
   */
  onDelete?: (event: React.MouseEvent<HTMLDivElement, MouseEvent> | React.KeyboardEvent<HTMLDivElement>) => void;
  /**
   * Size variant for the Tag.
   * @default TagSize.Small
   */
  size?: TagSize;
  /**
   * Custom theme styles
   */
  theme?: TagCustomTheme;
  /**
   * Ref is set to the main element
   */
  ref?: React.Ref<HTMLDivElement> | React.LegacyRef<HTMLAnchorElement>;
};

export const Tag = forwardRef<HTMLDivElement | HTMLAnchorElement, React.ComponentProps<'div'> & TagProps>(
  (
    {
      children,
      className,
      onClick,
      onDelete,
      size = TagSize.Small,
      theme,
      href,
      iconLeft,
      iconRight,
      multiline = false,
      ...rest
    },
    ref: React.Ref<HTMLDivElement | HTMLAnchorElement>,
  ) => {
    const deletable = !!onDelete;
    const onAction = onDelete || onClick;
    const hasAction = !!onAction;

    let variant: TagVariant = 'informative';
    let role: string | null = null;

    if (onAction) {
      variant = 'action';
      role = 'button';
    } else if (href) {
      variant = 'link';
    }

    // custom theme class that is applied to the root element
    const customThemeClass = useTheme<TagCustomTheme>(styles.tag, theme);
    const largeClass = styles.large;
    const containerClassName = classNames(
      styles.tag,
      size === TagSize.Large && largeClass,
      customThemeClass,
      className,
      styles[variant],
    );

    const iconElementLeft = iconLeft ? (
      <div className={classNames(styles.icon)} aria-hidden="true">
        {iconLeft}
      </div>
    ) : null;

    const iconElementRight = iconRight ? (
      <div className={classNames(styles.icon)} aria-hidden="true">
        {iconRight}
      </div>
    ) : null;

    // handle key down
    const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Enter' || event.key === ' ') {
        onAction(event);
      }
    };

    const LinkWrapper: React.FC = (props) => {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={classNames(containerClassName, styles.link)}
          href={href}
          {...(rest as unknown as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {props.children}
        </a>
      );
    };

    const Wrapper: React.FC = (props) => {
      return (
        <div
          className={containerClassName}
          ref={ref as React.Ref<HTMLDivElement>}
          {...(hasAction && { tabIndex: 0, role, onClick: onAction, onKeyDown })}
          {...rest}
        >
          {props.children}
        </div>
      );
    };

    const content = (
      <>
        {iconElementLeft}
        <span className={classNames(styles.label, multiline ? styles.multilineLabel : null)}>{children}</span>
        {iconElementRight}
        {deletable && !iconElementRight ? <IconCross className={styles.icon} aria-hidden /> : null}
      </>
    );

    return href ? <LinkWrapper>{content}</LinkWrapper> : <Wrapper>{content}</Wrapper>;
  },
);

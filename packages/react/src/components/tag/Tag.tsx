import React, { forwardRef } from 'react';

import '../../styles/base.module.css';
import styles from './Tag.module.scss';
import { IconCross } from '../../icons';
import classNames from '../../utils/classNames';
import { useTheme } from '../../hooks/useTheme';

export interface TagTheme {
  '--background-color-hover'?: string;
  '--background-color'?: string;
  '--border-color-action'?: string;
  '--color'?: string;
  '--outline-color'?: string;
}

export enum TagVariant {
  Action = 'action',
  Informative = 'informative',
  Link = 'link',
}

export enum TagSize {
  Small = 'small',
  Large = 'large',
}

// Common props shared by both variants
type BaseTagProps = {
  /**
   * The label for the tag
   */
  children: string;
  /**
   * Additional class names to apply to the tag
   */
  className?: string;
  /**
   * Element placed on the starting side of the label
   */
  iconStart?: React.ReactNode;
  /**
   * Element placed on the ending side of the label
   */
  iconEnd?: React.ReactNode;
  /**
   * Should Tag span to multiple lines
   * @default false
   */
  multiline?: boolean;
  /**
   * Size variant for the Tag.
   * @default TagSize.Small
   */
  size?: TagSize;
  /**
   * Custom theme styles
   * Will contain more properties in the next major release.
   */
  theme?: TagTheme;
  /**
   * Callback function fired when the lement is clicked. If set, the element will be clickable.
   */
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent> | React.KeyboardEvent<HTMLElement>) => void;
};

// Tag as a link (when href is provided)
export type TagAsLink = BaseTagProps & {
  /**
   * Url to go to after Link variant is clicked
   */
  href: string;
  /**
   * Link's _target -attribute
   */
  target?: React.AnchorHTMLAttributes<HTMLAnchorElement>['target'];
  /**
   * Callback function fired when the tag is clicked. If set, a delete button will be shown.
   */
  onDelete?: never;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'children'>;

// Tag as a div (when href is not provided)
export type TagAsDiv = BaseTagProps & {
  /**
   * Url to go to after Link variant is clicked
   */
  href?: never;
  /**
   * Link's _target -attribute
   */
  target?: never;
  /**
   * Callback function fired when the tag is clicked. If set, a delete button will be shown.
   */
  onDelete?: (event: React.MouseEvent<HTMLDivElement, MouseEvent> | React.KeyboardEvent<HTMLDivElement>) => void;
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>;

export type TagProps = TagAsLink | TagAsDiv;

export const Tag = forwardRef<HTMLDivElement | HTMLAnchorElement, TagProps>(
  (
    {
      children,
      className,
      onClick,
      onDelete,
      size = TagSize.Small,
      theme,
      href,
      iconStart,
      iconEnd,
      multiline = false,
      ...rest
    },
    ref: React.Ref<HTMLDivElement | HTMLAnchorElement>,
  ) => {
    const deletable = !!onDelete;
    const onAction = onDelete || onClick;
    const hasAction = !!onAction;

    let variant: TagVariant = TagVariant.Informative;
    let role: string | null = null;

    if (onAction) {
      variant = TagVariant.Action;
      role = 'button';
    } else if (href) {
      variant = TagVariant.Link;
    }

    // custom theme class that is applied to the root element
    const customThemeClass = useTheme<TagTheme>(styles.tag, theme);
    const largeClass = styles.large;
    const containerClassName = classNames(
      styles.tag,
      size === TagSize.Large && largeClass,
      customThemeClass,
      className,
      styles[variant],
      multiline && styles.multiline,
    );

    const iconElementStart = iconStart ? (
      <div className={classNames(styles.icon)} aria-hidden="true">
        {iconStart}
      </div>
    ) : null;

    const iconElementEnd = iconEnd ? (
      <div className={classNames(styles.icon)} aria-hidden="true">
        {iconEnd}
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
          {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
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
          {...(rest as React.HTMLAttributes<HTMLDivElement>)}
        >
          {props.children}
        </div>
      );
    };

    const content = (
      <>
        {iconElementStart}
        <span>{children}</span>
        {iconElementEnd}
        {deletable && !iconElementEnd ? <IconCross className={styles.icon} /> : null}
      </>
    );

    return href ? <LinkWrapper>{content}</LinkWrapper> : <Wrapper>{content}</Wrapper>;
  },
);

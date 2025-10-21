import React, { ElementType, forwardRef } from 'react';

import '../../styles/base.module.css';
import styles from './Tag.module.scss';
import { IconCross } from '../../icons';
import classNames from '../../utils/classNames';
import { useTheme } from '../../hooks/useTheme';
import { AllElementPropsWithoutRef, MergeAndOverrideProps } from '../../utils/elementTypings';

export interface TagTheme {
  '--background-color-hover'?: string;
  '--background-color'?: string;
  '--border-color-action'?: string;
  '--color'?: string;
  '--outline-color'?: string;
}

export enum TagVariant {
  Informative = 'informative',
  Action = 'action',
  Link = 'link',
  StatusLabelNeutral = 'statusLabelNeutral',
  StatusLabelInfo = 'statusLabelInfo',
  StatusLabelSuccess = 'statusLabelSuccess',
  StatusLabelAlert = 'statusLabelAlert',
  StatusLabelError = 'statusLabelError',
}

export enum TagSize {
  Small = 'small',
  Large = 'large',
}

export type TagProps<E extends ElementType = 'div'> = MergeAndOverrideProps<
  AllElementPropsWithoutRef<E>,
  {
    /**
     * The label for the tag
     */
    children: string;
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
     * Will contain more properties in the next major release.
     */
    theme?: TagTheme;
    /**
     * Variant of the tag
     * @default TagVariant.Informative
     */
    variant?: TagVariant;
    /**
     * Ref is set to the main element
     */
    ref?: React.Ref<React.ElementRef<E>>;
  }
>;

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
      variant = TagVariant.Informative,
      ...rest
    },
    ref: React.Ref<HTMLDivElement | HTMLAnchorElement>,
  ) => {
    const deletable = !!onDelete;
    const onAction = onDelete || onClick;
    const hasAction = !!onAction;

    let computedVariant: TagVariant = variant;
    let role: string | null = null;

    if (onAction) {
      computedVariant = TagVariant.Action;
      role = 'button';
    } else if (href) {
      computedVariant = TagVariant.Link;
    }

    // custom theme class that is applied to the root element
    const customThemeClass = useTheme<TagTheme>(styles.tag, theme);
    const largeClass = styles.large;
    const containerClassName = classNames(
      styles.tag,
      size === TagSize.Large && largeClass,
      customThemeClass,
      className,
      styles[computedVariant],
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
        {iconElementStart}
        <span>{children}</span>
        {iconElementEnd}
        {deletable && !iconElementEnd ? <IconCross className={styles.icon} /> : null}
      </>
    );

    return href ? <LinkWrapper>{content}</LinkWrapper> : <Wrapper>{content}</Wrapper>;
  },
);

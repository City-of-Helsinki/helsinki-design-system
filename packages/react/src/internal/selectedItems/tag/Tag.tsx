import React, { forwardRef } from 'react';

import '../../../styles/base.module.css';
import styles from './Tag.module.scss';
import { IconCross } from '../../../icons';
import classNames from '../../../utils/classNames';
import { useTheme } from '../../../hooks/useTheme';

/**
 * @internal
 */
export interface TagCustomTheme {
  '--tag-background'?: string;
  '--tag-color'?: string;
  '--tag-focus-outline-color'?: string;
}

/**
 * @internal
 */
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
   * The aria-label for the delete button
   */
  deleteButtonAriaLabel?: string;
  /**
   * Prop will be passed to the delete button `<button>` element. It also hides the default label from screen readers to prevent confusion with labels when present.
   */
  deleteButtonProps?: React.ComponentPropsWithoutRef<'button'>;
  /**
   * Used to generate the first part of the id on the elements.
   * Default value `hds-tag` will be removed in the next major release.
   */
  id?: string;
  /**
   * Additional class names to apply to the tag's label element
   */
  labelClassName?: string;
  /**
   * Props that will be passed to the label `<span>` element.
   */
  labelProps?: React.ComponentPropsWithoutRef<'span'>;
  /**
   * Callback function fired when the tag is clicked. If set, the tag will be clickable.
   */
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent> | React.KeyboardEvent<HTMLDivElement>) => void;
  /**
   * Callback function fired when the delete icon is clicked. If set, a delete button will be shown.
   */
  onDelete?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  /**
   * Sets the role of the tag when it's clickable. Uses 'link' by default.
   */
  role?: 'link' | 'button';
  /**
   * Size variant for the Tag.
   * @default 'm'
   */
  size?: 'm' | 'l';
  /**
   * The label is only visible to screen readers. Can be used to give screen reader users additional information about the tag.
   */
  srOnlyLabel?: string;
  /**
   * Custom theme styles
   */
  theme?: TagCustomTheme;
};

/**
 * @internal
 */
export const Tag = forwardRef<HTMLDivElement, TagProps>(
  (
    {
      children,
      className,
      deleteButtonAriaLabel,
      deleteButtonProps,
      id = 'hds-tag', // Default value will be removed in the next major release
      labelClassName,
      labelProps,
      onClick,
      onDelete,
      role = 'link',
      size = 'm',
      srOnlyLabel,
      theme,
      ...rest
    },
    ref: React.Ref<HTMLDivElement>,
  ) => {
    // custom theme class that is applied to the root element
    const customThemeClass = useTheme<TagCustomTheme>(styles.tag, theme);
    const largeClass = styles.large;
    const containerClassName = classNames(styles.tag, size === 'l' && largeClass, customThemeClass, className);
    const clickable = typeof onClick === 'function';
    const deletable = typeof onDelete === 'function';
    const hideLabelFromScreenReaders = srOnlyLabel || deleteButtonAriaLabel;

    // handle key down
    const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Enter' || event.key === ' ') onClick(event);
    };

    const labelContainerClassName = classNames(styles.label, labelClassName);

    return (
      <div
        id={id}
        className={containerClassName}
        ref={ref}
        {...(clickable && { tabIndex: 0, role, onClick, onKeyDown })}
        {...rest}
      >
        <span id={id && `${id}-label`} className={labelContainerClassName} {...labelProps}>
          {srOnlyLabel && <span className={styles.visuallyHidden}>{srOnlyLabel}</span>}
          <span {...(hideLabelFromScreenReaders ? { 'aria-hidden': true } : {})}>{children}</span>
        </span>

        {deletable && (
          <button
            {...deleteButtonProps}
            id={id && `${id}-delete-button`}
            type="button"
            className={styles.deleteButton}
            aria-label={deleteButtonAriaLabel}
            onClick={onDelete}
          >
            <IconCross className={styles.icon} />
          </button>
        )}
      </div>
    );
  },
);

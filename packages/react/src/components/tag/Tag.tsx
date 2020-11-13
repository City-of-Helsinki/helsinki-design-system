// eslint-disable-next-line import/order
import React from 'react';

// import core base styles
import 'hds-core';

import styles from './Tag.module.scss';
import { IconCross } from '../../icons';
import classNames from '../../utils/classNames';
import { useTheme } from '../../hooks/useTheme';
import getModulesClassName from '../../utils/getModulesClassName';

export interface TagCustomTheme {
  '--tag-background'?: string;
  '--tag-color'?: string;
  '--tag-focus-outline-color'?: string;
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
   * The aria-label for the delete button
   */
  deleteButtonAriaLabel?: string;
  /**
   * Props that will be passed to the delete button `<button>` element.
   */
  deleteButtonProps?: React.ComponentPropsWithoutRef<'button'>;
  /**
   * Used to generate the first part of the id on the elements.
   */
  id?: string;
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
   * Label that is only visible to screen readers. Can be used to to give screen reader users additional information about the tag.
   */
  srOnlyLabel?: string;
  /**
   * Custom theme styles
   */
  theme?: TagCustomTheme;
};

export const Tag = React.forwardRef<HTMLDivElement, TagProps>(
  (
    {
      children,
      className,
      deleteButtonAriaLabel,
      deleteButtonProps,
      id = 'hds-tag',
      labelProps,
      onClick,
      onDelete,
      role = 'link',
      srOnlyLabel,
      theme,
      ...rest
    }: TagProps,
    ref: React.Ref<HTMLDivElement>,
  ) => {
    // custom theme class that is applied to the root element
    const customThemeClass = useTheme<TagCustomTheme>(getModulesClassName(styles.tag), theme);
    const clickable = typeof onClick === 'function';
    const deletable = typeof onDelete === 'function';

    // handle key down
    const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Enter' || event.key === ' ') onClick(event);
    };

    return (
      <div
        id={id}
        className={classNames(styles.tag, customThemeClass, className)}
        ref={ref}
        {...(clickable && { tabIndex: 0, role, onClick, onKeyDown })}
        {...rest}
      >
        <span id={id && `${id}-label`} className={styles.label} {...labelProps}>
          {srOnlyLabel && <span className={styles.visuallyHidden}>{srOnlyLabel}</span>}
          <span aria-hidden={!!srOnlyLabel}>{children}</span>
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
            <IconCross className={styles.icon} aria-hidden />
          </button>
        )}
      </div>
    );
  },
);

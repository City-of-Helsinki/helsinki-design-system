// eslint-disable-next-line import/order
import React from 'react';

// import core base styles
import 'hds-core';

import styles from './Tag.module.scss';
import { IconCross } from '../../icons';
import classNames from '../../utils/classNames';

export type TagProps = {
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
   * The label for the tag
   */
  label: React.ReactNode;
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
};

export const Tag = React.forwardRef<HTMLDivElement, TagProps>(
  (
    {
      className,
      deleteButtonAriaLabel,
      deleteButtonProps,
      id = 'hds-tag',
      label,
      labelProps,
      onClick,
      onDelete,
      role = 'link',
      srOnlyLabel,
      ...rest
    }: TagProps,
    ref: React.Ref<HTMLDivElement>,
  ) => {
    const clickable = typeof onClick === 'function';
    const deletable = typeof onDelete === 'function';

    // handle key down
    const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Enter' || event.key === ' ') onClick(event);
    };

    return (
      <div
        id={id}
        className={classNames(styles.tag, className)}
        ref={ref}
        {...(clickable && { tabIndex: 0, role, onClick, onKeyDown })}
        {...rest}
      >
        <span id={id && `${id}-label`} className={styles.label} {...labelProps}>
          {srOnlyLabel && <span className={styles.visuallyHidden}>{srOnlyLabel}</span>}
          <span aria-hidden={!!srOnlyLabel}>{label}</span>
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

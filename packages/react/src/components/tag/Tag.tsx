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
   * Callback function fired when the delete icon is clicked. If set, the delete icon will be shown.
   */
  onDelete?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
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
      onDelete,
      srOnlyLabel,
      ...rest
    }: TagProps,
    ref: React.Ref<HTMLDivElement>,
  ) => (
    <div id={id} className={classNames(styles.tag, className)} ref={ref} {...rest}>
      <span id={id && `${id}-label`} {...labelProps}>
        {srOnlyLabel && <span className={styles.visuallyHidden}>{srOnlyLabel}</span>}
        <span aria-hidden={!!srOnlyLabel}>{label}</span>
      </span>
      {typeof onDelete === 'function' && (
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
  ),
);

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
  onDelete?: () => void;
};

export const Tag = React.forwardRef<HTMLDivElement, TagProps>(
  (
    { className, deleteButtonAriaLabel, label, labelProps, onDelete, ...rest }: TagProps,
    ref: React.Ref<HTMLDivElement>,
  ) => {
    return (
      <div className={classNames(styles.tag, className)} ref={ref} {...rest}>
        <span id="hds-tag-label" {...labelProps} className={styles.label}>
          {label}
        </span>
        {typeof onDelete === 'function' && (
          <button
            // todo: remove. allow passing props to button instead
            tabIndex={-1}
            type="button"
            className={styles.deleteButton}
            aria-label={deleteButtonAriaLabel}
            onClick={() => onDelete()}
            onKeyUp={(e) => {
              if (e.key === 'Backspace' || e.key === 'Delete') {
                onDelete();
              }
            }}
          >
            <IconCross className={styles.icon} />
          </button>
        )}
      </div>
    );
  },
);

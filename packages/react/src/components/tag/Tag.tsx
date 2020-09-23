import React from 'react';

// import core base styles
import 'hds-core';
import styles from './Tag.module.scss';
import { IconCross } from '../../icons';

export type TagProps = {
  /**
   * The label for the tag
   */
  label: React.ReactNode;
  /**
   * Props that will be passed to the label `<span>` element.
   */
  // todo: delete?
  labelProps?: React.ComponentPropsWithoutRef<'span'>;
} & {
  /**
   * Callback function fired when the delete icon is clicked. If set, the delete icon will be shown.
   */
  onDelete?: () => void;
  /**
   * The aria-label for the delete button
   */
  deleteButtonAriaLabel: string;
};

export const Tag = ({ deleteButtonAriaLabel, label, labelProps, onDelete }: TagProps) => {
  return (
    <div className={styles.tag}>
      <span {...labelProps} className={styles.label}>
        {label}
      </span>
      {typeof onDelete === 'function' && (
        <button
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
};

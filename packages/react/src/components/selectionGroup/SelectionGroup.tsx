import React from 'react';

// import core base styles
import 'hds-core';
import styles from './SelectionGroup.module.scss';
import classNames from '../../utils/classNames';
import { RequiredIndicator } from '../../internal/required-indicator/RequiredIndicator';
import { Tooltip } from '../tooltip';

export type Direction = 'vertical' | 'horizontal';

export type SelectionGroupProps = React.PropsWithChildren<{
  /**
   * The label for the selection group.
   */
  label?: string;
  /**
   * The direction in which child components should be rendered in.
   */
  direction?: Direction;
  /**
   * If `true`, the label is displayed as required.
   */
  required?: boolean;
  /**
   * Aria-label text for the tooltip
   */
  tooltipLabel?: string;
  /**
   * Aria-label text for the tooltip trigger button
   */
  tooltipButtonLabel?: string;
  /**
   * The text content of the tooltip
   */
  tooltipText?: string;
}>;

export const SelectionGroup = ({
  label,
  direction = 'vertical',
  required,
  tooltipLabel,
  tooltipButtonLabel,
  tooltipText,
  children,
}: SelectionGroupProps) => {
  return (
    <fieldset className={styles.selectionGroup}>
      <legend className={styles.label}>
        {label} {required && <RequiredIndicator />}
      </legend>
      {tooltipText && (
        <Tooltip buttonClassName={styles.tooltipButton} tooltipLabel={tooltipLabel} buttonLabel={tooltipButtonLabel}>
          {tooltipText}
        </Tooltip>
      )}
      <div className={classNames(styles.items, styles[direction])}>
        {React.Children.map(children, (child) => (
          <div className={styles.item}>{child}</div>
        ))}
      </div>
    </fieldset>
  );
};

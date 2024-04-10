import React from 'react';

import styles from '../../Select.module.scss';
import { ButtonElementProps, SelectDataHandlers } from '../../types';
import { IconCrossCircle } from '../../../../icons';
import classNames from '../../../../utils/classNames';
import { createOnClickListener } from '../../utils';
import { eventTypes, eventIds } from '../../events';
import { useSelectDataHandlers } from '../../hooks/useSelectDataHandlers';

type Props = { visuallyHidden?: boolean };

const createClearButtonProps = (
  visuallyHidden: Props['visuallyHidden'],
  { getData, getMetaData, trigger }: SelectDataHandlers,
): ButtonElementProps | null => {
  const { elementIds, selectedOptions } = getMetaData();
  const { disabled } = getData();
  if (!selectedOptions.length) {
    return null;
  }
  return {
    className: classNames(
      styles.dropdownButton,
      !visuallyHidden && styles.withVisibleFocus,
      styles.icon,
      disabled && styles.disabledButton,
      visuallyHidden && styles.visuallyHidden,
    ),
    ...createOnClickListener({ id: eventIds.clearButton, type: eventTypes.click, trigger }),
    id: !visuallyHidden ? elementIds.clearButton : undefined,
    disabled,
    'aria-label': `Remove all ${selectedOptions.length} selections`,
    'aria-hidden': !visuallyHidden,
    ...(visuallyHidden && { tabIndex: -1 }),
  };
};

export function ClearButton({ visuallyHidden }: Props) {
  const buttonProps = createClearButtonProps(visuallyHidden, useSelectDataHandlers());
  if (!buttonProps) {
    return null;
  }
  return (
    <button type="button" {...buttonProps}>
      <IconCrossCircle className={styles.angleIcon} aria-hidden />
    </button>
  );
}

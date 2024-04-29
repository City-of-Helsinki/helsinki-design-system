import React from 'react';

import styles from '../../Select.module.scss';
import { ButtonElementProps, SelectDataHandlers } from '../../types';
import { IconCrossCircle } from '../../../../icons';
import classNames from '../../../../utils/classNames';
import { createOnClickListener } from '../../utils';
import { eventTypes, eventIds } from '../../events';
import { useSelectDataHandlers } from '../../hooks/useSelectDataHandlers';

const createClearButtonProps = ({ getData, getMetaData, trigger }: SelectDataHandlers): ButtonElementProps | null => {
  const { elementIds, selectedOptions } = getMetaData();
  const { disabled } = getData();
  if (!selectedOptions.length) {
    return null;
  }
  return {
    className: classNames(
      styles.dropdownButton,
      styles.withVisibleFocus,
      styles.icon,
      disabled && styles.disabledButton,
    ),
    ...createOnClickListener({ id: eventIds.clearButton, type: eventTypes.click, trigger }),
    id: elementIds.clearButton,
    disabled,
    'aria-label': `Remove all ${selectedOptions.length} selections`,
  };
};

export function ClearButton() {
  const buttonProps = createClearButtonProps(useSelectDataHandlers());
  if (!buttonProps) {
    return null;
  }
  return (
    <button type="button" {...buttonProps}>
      <IconCrossCircle className={styles.angleIcon} aria-hidden />
    </button>
  );
}

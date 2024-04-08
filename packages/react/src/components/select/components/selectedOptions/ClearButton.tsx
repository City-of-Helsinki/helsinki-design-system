import React from 'react';

import styles from '../../Select.module.scss';
import { ButtonElementProps, SelectDataHandlers } from '../../types';
import { IconCrossCircle } from '../../../../icons';
import classNames from '../../../../utils/classNames';
import { createOnClickListener } from '../../utils';
import { eventTypes, eventIds } from '../../events';
import { useSelectDataHandlers } from '../../hooks/useSelectDataHandlers';

type Props = { visuallyhidden?: boolean };

const createClearButtonProps = (
  visuallyHidden: Props['visuallyhidden'],
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
      styles.icon,
      disabled && styles.disabledButton,
      visuallyHidden && styles.visuallyHidden,
    ),
    ...createOnClickListener({ id: eventIds.clearButton, type: eventTypes.click, trigger }),
    id: elementIds.clearButton,
    disabled,
    'aria-label': 'Remove all selections',
    'aria-hidden': !visuallyHidden,
    ...(visuallyHidden && { tabIndex: -1 }),
  };
};

export function ClearButton({ visuallyhidden }: Props) {
  const buttonProps = createClearButtonProps(visuallyhidden, useSelectDataHandlers());
  if (!buttonProps) {
    return null;
  }
  return (
    <button type="button" {...buttonProps}>
      <IconCrossCircle className={styles.angleIcon} aria-hidden />
    </button>
  );
}

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
    className: classNames(styles.button, styles.icon, disabled && styles.disabledButton),
    ...createOnClickListener({ id: eventIds.clearButton, type: eventTypes.click, trigger }),
    id: elementIds.clearButton,
    disabled,
    'aria-label': 'Remove all selections',
  };
};

export function ClearButton() {
  const props = createClearButtonProps(useSelectDataHandlers());
  if (!props) {
    return null;
  }
  return (
    <button type="button" {...props}>
      <IconCrossCircle className={styles.angleIcon} aria-hidden />
    </button>
  );
}

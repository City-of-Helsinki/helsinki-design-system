import React from 'react';

import styles from '../../Select.module.scss';
import { ButtonElementProps, SelectDataHandlers } from '../../types';
import classNames from '../../../../utils/classNames';
import { createOnClickListener } from '../../utils';
import { eventTypes, eventIds } from '../../events';
import { useSelectDataHandlers } from '../../typedHooks';
import { IconAngleDown } from '../../../../icons';

const createArrowButtonProps = ({ getMetaData, trigger, getData }: SelectDataHandlers): ButtonElementProps => {
  const { elementIds } = getMetaData();
  const { disabled } = getData();
  return {
    className: classNames(styles.button, styles.icon, disabled && styles.disabledButton),
    ...createOnClickListener({ id: eventIds.arrowButton, type: eventTypes.click, trigger }),
    id: elementIds.arrowButton,
    disabled,
  };
};

export function ArrowButton() {
  const props = createArrowButtonProps(useSelectDataHandlers());
  return (
    <button type="button" {...props} aria-hidden>
      <IconAngleDown className={styles.angleIcon} aria-hidden />
    </button>
  );
}

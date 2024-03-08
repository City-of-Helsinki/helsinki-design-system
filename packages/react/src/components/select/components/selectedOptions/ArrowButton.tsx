import React from 'react';

import styles from '../../Select.module.scss';
import { ButtonElementProps, SelectDataHandlers } from '../../types';
import classNames from '../../../../utils/classNames';
import { createOnClickListener } from '../../utils';
import { eventTypes, eventIds } from '../../events';
import { useSelectDataHandlers } from '../../hooks/useSelectDataHandlers';
import { IconAngleDown } from '../../../../icons';

const createArrowButtonProps = ({ getMetaData, trigger }: SelectDataHandlers): ButtonElementProps => {
  const { elementIds } = getMetaData();
  return {
    className: classNames(styles.button, styles.icon),
    ...createOnClickListener({ id: eventIds.arrowButton, type: eventTypes.click, trigger }),
    id: elementIds.arrowButton,
    'aria-hidden': true,
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

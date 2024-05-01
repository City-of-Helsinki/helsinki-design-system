import React from 'react';

import styles from '../../Select.module.scss';
import { Button, ButtonProps, ButtonVariant } from '../../../button/Button';
import { createOnClickListener } from '../../utils';
import { IconCrossCircleFill } from '../../../../icons';
import { SelectDataHandlers } from '../../types';
import { eventIds } from '../../events';
import { useSelectDataHandlers } from '../../hooks/useSelectDataHandlers';

const clearAllButtonPropSetter = ({ getData, trigger, getMetaData }: SelectDataHandlers): ButtonProps => {
  const { disabled } = getData();
  const { elementIds, selectedOptions } = getMetaData();
  return {
    ...createOnClickListener({ id: eventIds.clearAllButton, trigger }),
    children: 'Clear all',
    variant: ButtonVariant.Secondary,
    className: styles.clearAllButton,
    disabled,
    id: elementIds.clearAllButton,
    'aria-label': `Clear all ${selectedOptions.length} selected options.`,
  };
};

export function ClearAllButton() {
  const { children, ...attr } = clearAllButtonPropSetter(useSelectDataHandlers());
  return (
    <Button {...attr} iconEnd={<IconCrossCircleFill />}>
      {children}
    </Button>
  );
}

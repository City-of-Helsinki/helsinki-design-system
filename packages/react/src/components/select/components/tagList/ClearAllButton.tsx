import React from 'react';

import styles from '../../Select.module.scss';
import { Button, ButtonProps } from '../../../button/Button';
import { createOnClickListener } from '../../utils';
import { IconCrossCircleFill } from '../../../../icons';
import { SelectDataHandlers } from '../../types';
import { eventIds } from '../../events';
import { useSelectDataHandlers } from '../../hooks/useSelectDataHandlers';

const clearAllButtonPropSetter = ({ getData, trigger, getMetaData }: SelectDataHandlers): ButtonProps => {
  const { disabled } = getData();
  const { elementIds } = getMetaData();
  return {
    ...createOnClickListener({ id: eventIds.clearAllButton, trigger }),
    children: 'Clear all',
    variant: 'secondary',
    className: styles.clearAllButton,
    disabled,
    id: elementIds.clearAllButton,
  };
};

export function ClearAllButton() {
  const { children, ...attr } = clearAllButtonPropSetter(useSelectDataHandlers());
  return (
    <Button {...attr} iconRight={<IconCrossCircleFill />}>
      {children}
    </Button>
  );
}

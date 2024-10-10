import React from 'react';

import styles from '../../Select.module.scss';
import { Button, ButtonProps, ButtonVariant } from '../../../button/Button';
import { createOnClickListener } from '../../utils';
import { IconCrossCircleFill } from '../../../../icons';
import { SelectDataHandlers } from '../../types';
import { eventIds } from '../../events';
import { useSelectDataHandlers } from '../../hooks/useSelectDataHandlers';
import { getTextFromMetaData } from '../../texts';

const clearAllButtonPropSetter = ({ getData, trigger, getMetaData }: SelectDataHandlers): ButtonProps => {
  const { disabled } = getData();
  const metaData = getMetaData();
  const { elementIds } = metaData;
  const clearAllText = getTextFromMetaData('tagsClearAllButton', metaData) as string;
  const clearAllAriaLabel = getTextFromMetaData('tagsClearAllButtonAriaLabel', metaData) as string;
  return {
    ...createOnClickListener({ id: eventIds.clearAllButton, trigger }),
    children: clearAllText,
    variant: ButtonVariant.Secondary,
    className: styles.clearAllButton,
    disabled,
    id: elementIds.clearAllButton,
    'aria-label': clearAllAriaLabel,
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

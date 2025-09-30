import React from 'react';

import styles from '../../Select.module.scss';
import { Button, ButtonProps, ButtonVariant } from '../../../../button/Button';
import { createOnClickListener } from '../../utils';
import { IconCrossCircleFill } from '../../../../../icons';
import { SelectDataHandlers } from '../../types';
import { eventIds } from '../../events';
import { useSelectDataHandlers } from '../../hooks/useSelectDataHandlers';
import { getNumberedVariationsTextKey, getTextFromMetaData } from '../../texts';

const clearAllButtonPropSetter = ({ getData, trigger, getMetaData }: SelectDataHandlers): ButtonProps => {
  const { disabled } = getData();
  const metaData = getMetaData();
  const { elementIds, selectedOptions } = metaData;
  const clearAllText = getTextFromMetaData('tagsClearAllButton', metaData) as string;
  const clearAllAriaLabel = getNumberedVariationsTextKey('tagsClearAllButtonAriaLabel', metaData, 'selectionCount', {
    label: selectedOptions.length > 0 ? selectedOptions[0].label : '',
  }) as string;
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

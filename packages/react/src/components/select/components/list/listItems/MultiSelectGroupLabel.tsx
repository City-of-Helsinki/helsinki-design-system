import React from 'react';

import styles from '../../../Select.module.scss';
import classNames from '../../../../../utils/classNames';
import { eventIds, eventTypes } from '../../../events';
import { SelectItemProps } from '../common';
import { MultiSelectOptionElement, MultiSelectOptionProps } from './MultiSelectOption';

export type MultiSelectGroupLabelProps = SelectItemProps & {
  isIntermediate: boolean;
  isGroupDisabled: boolean;
};

const createMultiSelectGroupLabelProps = ({
  option,
  trigger,
  getOptionId,
  isIntermediate,
  isGroupDisabled,
}: MultiSelectGroupLabelProps): MultiSelectOptionProps => {
  const { label, disabled } = option;
  return {
    className: classNames(
      styles.listItem,
      styles.groupLabel,
      styles.focusableListItem,
      styles.selectableListItem,
      styles.multiSelectListItem,
      isGroupDisabled && styles.disabledOption,
    ),
    label,
    disabled: disabled || isGroupDisabled,
    indeterminate: isIntermediate,
    checked: option.selected,
    'aria-checked': isIntermediate ? 'mixed' : option.selected,
    role: 'checkbox',
    'aria-disabled': disabled || isGroupDisabled,
    'aria-label': `${label} (choose all)`,
    tabIndex: -1,
    isInGroup: true,
    onClick: (originalEvent: React.MouseEvent) => {
      if (isGroupDisabled) {
        return;
      }
      trigger({
        id: eventIds.listGroup,
        type: eventTypes.click,
        payload: { originalEvent, value: option },
      });
    },
    id: getOptionId(option),
  };
};

export function MultiSelectGroupLabel(props: MultiSelectGroupLabelProps) {
  const elementProps = createMultiSelectGroupLabelProps(props);
  return <MultiSelectOptionElement {...elementProps} isInGroup />;
}

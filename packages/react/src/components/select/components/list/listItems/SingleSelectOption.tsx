import React from 'react';

import styles from '../../../Select.module.scss';
import classNames from '../../../../../utils/classNames';
import { LiElementProps } from '../../../types';
import { eventIds, eventTypes } from '../../../events';
import { SelectItemProps } from '../common';

const createSingleSelectItemProps = ({ option, trigger, getOptionId }: SelectItemProps): LiElementProps => {
  const { label, selected, disabled } = option;
  return {
    className: classNames(
      styles.listItem,
      styles.selectableListItem,
      selected && styles.selected,
      disabled && styles.disabledOption,
    ),
    children: label,
    onClick: (originalEvent: React.MouseEvent) => {
      trigger({
        id: eventIds.listItem,
        type: eventTypes.click,
        payload: { originalEvent, value: option },
      });
    },
    role: 'option',
    'aria-selected': selected,
    tabIndex: -1,
    id: getOptionId(option),
  };
};

export function SingleSelectOption(props: SelectItemProps) {
  const { children, ...attr } = createSingleSelectItemProps(props);
  return <li {...attr}>{children}</li>;
}

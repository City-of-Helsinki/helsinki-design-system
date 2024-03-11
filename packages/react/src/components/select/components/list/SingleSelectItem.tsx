import React from 'react';

import styles from '../../Select.module.scss';
import classNames from '../../../../utils/classNames';
import { LiElementProps, Option } from '../../types';
import { eventIds, eventTypes } from '../../events';
import { ChangeTrigger } from '../../../dataProvider/DataContext';

export type SelectItemProps = {
  option: Option;
  trigger: ChangeTrigger;
};

export const singleSelectElementSelectorFromListRoot = 'li[role=option]';

export const isSingleSelectElement = (element: HTMLElement) => {
  return element.nodeName === 'LI' && element.getAttribute('role') === 'option';
};

export const createSingleSelectItemProps = ({ option, trigger }: SelectItemProps): LiElementProps => {
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
  };
};

export const createSingleSelectGroupLabelProps = (option: SelectItemProps['option']): LiElementProps => {
  const { label } = option;
  return {
    className: classNames(styles.listItem, styles.groupLabel),
    children: label,
    tabIndex: -1,
  };
};

export function OptionListItem(props: LiElementProps) {
  const { children, ...attr } = props;
  return <li {...attr}>{children}</li>;
}

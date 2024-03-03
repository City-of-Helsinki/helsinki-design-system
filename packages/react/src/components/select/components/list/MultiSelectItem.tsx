import React from 'react';

import styles from '../../Select.module.scss';
import classNames from '../../../../utils/classNames';
import { LiElementProps } from '../../types';
import { Checkbox } from '../../../checkbox/Checkbox';
import { eventIds, eventTypes } from '../../events';
import { SelectItemProps } from './SingleSelectItem';

export type MultiSelectGroupLabelProps = SelectItemProps & {
  isMultiSelect: boolean;
  isIntermediate: boolean;
  isGroupDisabled: boolean;
};

export type LiElementWithCheckboxProps = LiElementProps & {
  label?: string;
  selected?: boolean;
  indeterminate?: boolean;
};

export const createMultiSelectItemProps = ({ option, trigger }: SelectItemProps): LiElementWithCheckboxProps => {
  const { label, selected, disabled } = option;
  return {
    className: classNames(
      styles.listItem,
      styles.selectableListItem,
      styles.multiSelectListItem,
      selected && styles.selected,
      disabled && styles.disabledOption,
    ),
    children: null,
    label,
    selected,
    role: 'option',
    'aria-checked': selected,
    'aria-label': label,
    indeterminate: undefined,
    tabIndex: -1,
    onClick: (originalEvent: React.MouseEvent) => {
      if (disabled) {
        return;
      }
      trigger({
        id: eventIds.listItem,
        type: eventTypes.click,
        payload: { originalEvent, value: option },
      });
    },
  };
};

export const createMultiSelectGroupLabelProps = ({
  option,
  trigger,
  isIntermediate,
  isGroupDisabled,
}: MultiSelectGroupLabelProps): LiElementWithCheckboxProps => {
  const { label } = option;
  return {
    className: classNames(
      styles.listItem,
      styles.groupLabel,
      styles.selectableListItem,
      styles.multiSelectListItem,
      isGroupDisabled && styles.disabledOption,
    ),
    label,
    indeterminate: isIntermediate,
    selected: option.selected,
    'aria-checked': option.selected,
    role: 'option',
    tabIndex: -1,
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
  };
};

export function MultiSelectOptionListItem(props: LiElementWithCheckboxProps) {
  const { label, selected, indeterminate, ...attr } = props;
  return (
    <li {...attr}>
      <Checkbox
        indeterminate={indeterminate}
        id={label as string}
        onChange={(e) => {
          e.preventDefault();
        }}
        checked={selected}
        aria-hidden
        tabIndex={-1}
      />
      <label aria-hidden>{label}</label>
    </li>
  );
}

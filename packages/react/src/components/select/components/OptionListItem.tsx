import React from 'react';

import styles from '../Select.module.scss';
import classNames from '../../../utils/classNames';
import { LiElementProps, Option } from '../types';
import { Checkbox } from '../../checkbox/Checkbox';
import { eventIds, eventTypes } from '../events';
import { ChangeTrigger } from '../../dataProvider/DataContext';

export type SelectItemProps = {
  option: Option;
  trigger: ChangeTrigger;
};

export type MultiSelectGroupLabelProps = SelectItemProps & {
  isMultiSelect: boolean;
  isIntermediate: boolean;
};

export type LiElementWithCheckboxProps = LiElementProps & {
  label?: string;
  selected?: boolean;
  indeterminate?: boolean;
};

export const createSingleSelectItemProps = ({ option, trigger }: SelectItemProps): LiElementProps => {
  const { label, selected } = option;
  return {
    className: classNames(styles.listItem, styles.selectableListItem, selected && styles.selected),
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
  };
};

export const createSingleSelectGroupLabelProps = (option: SelectItemProps['option']): LiElementProps => {
  const { label } = option;
  return {
    className: classNames(styles.listItem, styles.groupLabel),
    children: label,
  };
};

export const createMultiSelectItemProps = ({ option, trigger }: SelectItemProps): LiElementWithCheckboxProps => {
  const { label, selected } = option;
  return {
    className: classNames(
      styles.listItem,
      styles.selectableListItem,
      styles.multiSelectListItem,
      selected && styles.selected,
    ),
    children: null,
    label,
    selected,
    role: 'option',
    'aria-selected': selected,
    indeterminate: undefined,
    onClick: (originalEvent: React.MouseEvent) => {
      trigger({
        id: eventIds.listItem,
        type: eventTypes.click,
        payload: { originalEvent, value: option },
      });
    },
    onKeyDown: (originalEvent: React.KeyboardEvent) => {
      console.log('KD', originalEvent.key);
    },
  };
};
export const createMultiSelectGroupLabelProps = ({
  option,
  trigger,
  isIntermediate,
}: MultiSelectGroupLabelProps): LiElementWithCheckboxProps => {
  const { label } = option;
  return {
    className: classNames(styles.listItem, styles.groupLabel, styles.selectableListItem, styles.multiSelectListItem),
    label,
    indeterminate: isIntermediate,
    selected: option.selected,
    onClick: (originalEvent: React.MouseEvent) => {
      trigger({
        id: eventIds.listGroup,
        type: eventTypes.click,
        payload: { originalEvent, value: option },
      });
    },
    onKeyDown: (originalEvent: React.KeyboardEvent) => {
      console.log('KD', originalEvent.key);
    },
  };
};

export function OptionListItem(props: LiElementProps) {
  const { children, ...attr } = props;
  return <li {...attr}>{children}</li>;
}

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
      />
      <label>{label}</label>
    </li>
  );
}

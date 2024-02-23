import React, { ChangeEventHandler } from 'react';

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
  checked?: boolean;
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
    className: classNames(styles.listItem, styles.selectableListItem, selected && styles.selected),
    children: null,
    label,
    checked: option.selected,
    indeterminate: undefined,
    onClick: (originalEvent: React.MouseEvent) => {
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
}: MultiSelectGroupLabelProps): LiElementWithCheckboxProps => {
  const { label } = option;
  return {
    className: classNames(styles.listItem, styles.groupLabel, styles.selectableListItem),
    label,
    indeterminate: isIntermediate,
    checked: option.selected,
    onClick: (originalEvent: React.MouseEvent) => {
      trigger({
        id: eventIds.listGroup,
        type: eventTypes.click,
        payload: { originalEvent, value: option },
      });
    },
  };
};

export function OptionListItem(props: LiElementProps) {
  const { children, ...attr } = props;
  return <li {...attr}>{children}</li>;
}

export function MultiSelectOptionListItem(props: LiElementWithCheckboxProps) {
  const { label, checked, onClick, indeterminate, ...attr } = props;
  return (
    <li {...attr}>
      <Checkbox
        indeterminate={indeterminate}
        id={label as string}
        onChange={(onClick as unknown) as ChangeEventHandler<HTMLInputElement>}
        checked={checked}
        label={label}
      />
    </li>
  );
}

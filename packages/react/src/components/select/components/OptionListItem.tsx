import React, { ChangeEventHandler } from 'react';

import styles from '../Select.module.scss';
import classNames from '../../../utils/classNames';
import { eventTypes, groupIds, LiElementProps, Option } from '../index';
import { Controller } from '../../group/utils';
import { Checkbox } from '../../checkbox/Checkbox';

export type ListItemProps = LiElementProps & { label?: string; checked?: boolean; indeterminate?: boolean };

type ListItemPropSetterProps = {
  option: Option;
  controller: Controller;
  isMultiSelect: boolean;
  isIntermediate: boolean;
};

export const createOptionsListItemProps = ({
  option,
  controller,
  isMultiSelect,
  isIntermediate,
}: ListItemPropSetterProps): ListItemProps => {
  const { isGroupLabel, label, selected } = option;

  if (isGroupLabel) {
    return !isMultiSelect
      ? {
          className: classNames(styles.listItem, styles.groupLabel),
          children: label,
        }
      : {
          className: classNames(styles.listItem, styles.groupLabel, styles.selectableListItem),
          label,
          indeterminate: isIntermediate,
          checked: option.selected,
          onClick: (originalEvent: React.MouseEvent) => {
            controller.triggerChange({
              id: groupIds.listGroup,
              type: eventTypes.click,
              payload: { originalEvent, value: option },
            });
          },
        };
  }
  return {
    className: classNames(styles.listItem, styles.selectableListItem, selected && styles.selected),
    children: isMultiSelect ? null : label,
    label: isMultiSelect ? label : undefined,
    checked: isMultiSelect ? option.selected : undefined,
    indeterminate: undefined,
    onClick: (originalEvent: React.MouseEvent) => {
      controller.triggerChange({
        id: groupIds.listItem,
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

export function MultiSelectOptionListItem(props: ListItemProps) {
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

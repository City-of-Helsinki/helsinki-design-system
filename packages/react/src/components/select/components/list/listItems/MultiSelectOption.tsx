import React from 'react';

import styles from '../../../Select.module.scss';
import classNames from '../../../../../utils/classNames';
import { DivElementProps, LiElementProps } from '../../../types';
import { Checkbox } from '../../../../checkbox/Checkbox';
import { eventIds, eventTypes } from '../../../events';
import { SelectItemProps } from '../common';

type CommonMultiSelectOptionProps = {
  label?: string;
  checked?: boolean;
  indeterminate?: boolean;
};

export type MultiSelectOptionProps = (DivElementProps | LiElementProps) &
  CommonMultiSelectOptionProps & { isInGroup: boolean };

const createMultiSelectItemProps = ({ option, trigger }: SelectItemProps): MultiSelectOptionProps => {
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
    checked: selected,
    role: 'checkbox',
    'aria-checked': selected,
    'aria-label': label,
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
    isInGroup: false,
  };
};

export function MultiSelectOptionElement(props: MultiSelectOptionProps) {
  const { label, checked, indeterminate, isInGroup, ...attr } = props;
  if (isInGroup) {
    //
  }
  return (
    <div {...(attr as DivElementProps)}>
      <Checkbox
        indeterminate={indeterminate}
        id={label as string}
        onChange={(e) => {
          e.preventDefault();
        }}
        checked={checked}
        aria-hidden
        tabIndex={-1}
      />
      <label aria-hidden>{label}</label>
    </div>
  );
}
export function MultiSelectOption(props: SelectItemProps & { isInGroup: boolean }) {
  const elementProps = createMultiSelectItemProps(props);
  return <MultiSelectOptionElement {...elementProps} />;
}

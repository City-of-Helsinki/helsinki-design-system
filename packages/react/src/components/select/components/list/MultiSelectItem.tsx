import React from 'react';

import styles from '../../Select.module.scss';
import classNames from '../../../../utils/classNames';
import { DivElementProps } from '../../types';
import { Checkbox } from '../../../checkbox/Checkbox';
import { eventIds, eventTypes } from '../../events';
import { SelectItemProps } from './SingleSelectItem';

export type MultiSelectGroupLabelProps = SelectItemProps & {
  isIntermediate: boolean;
  isGroupDisabled: boolean;
};

type DivElementWithCheckboxProps = DivElementProps & {
  label?: string;
  selected?: boolean;
  indeterminate?: boolean;
};

export const multiSelectElementSelectorFromListRoot = 'div[role=checkbox]';

export const isMultiSelectElement = (element: HTMLElement) => {
  return element.nodeName === 'div' && element.getAttribute('role') === 'checkbox';
};

export const createMultiSelectItemProps = ({ option, trigger }: SelectItemProps): DivElementWithCheckboxProps => {
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
  };
};

export const createMultiSelectGroupLabelProps = ({
  option,
  trigger,
  isIntermediate,
  isGroupDisabled,
}: MultiSelectGroupLabelProps): DivElementWithCheckboxProps => {
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
    'aria-checked': isIntermediate ? 'mixed' : option.selected,
    role: 'checkbox',
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

export function MultiSelectOptionListItem(props: DivElementWithCheckboxProps) {
  const { label, selected, indeterminate, ...attr } = props;
  return (
    <div {...attr}>
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
    </div>
  );
}

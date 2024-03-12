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
  isIntermediate,
  isGroupDisabled,
}: MultiSelectGroupLabelProps): MultiSelectOptionProps => {
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
    checked: option.selected,
    'aria-checked': isIntermediate ? 'mixed' : option.selected,
    role: 'checkbox',
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
    key: option.label,
  };
};

/*
export function MultiSelectGroupLabel(props: MultiSelectGroupLabelProps) {
  const { label, selected, indeterminate, ...attr } = createMultiSelectGroupLabelProps(props);
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
} */

export function MultiSelectGroupLabel(props: MultiSelectGroupLabelProps) {
  const elementProps = createMultiSelectGroupLabelProps(props);
  return <MultiSelectOptionElement {...elementProps} isInGroup />;
}

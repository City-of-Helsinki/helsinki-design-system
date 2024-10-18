import React from 'react';

import styles from '../../../Select.module.scss';
import classNames from '../../../../../utils/classNames';
import { eventIds, eventTypes } from '../../../events';
import { SelectItemProps } from '../common';
import { MultiSelectOptionElement, MultiSelectOptionProps } from './MultiSelectOption';
import { SelectDataHandlers } from '../../../types';
import { useSelectDataHandlers } from '../../../hooks/useSelectDataHandlers';
import { getTextKey } from '../../../texts';

export type MultiSelectGroupLabelProps = SelectItemProps & {
  isIntermediate: boolean;
  isGroupDisabled: boolean;
};

const multiSelectGroupLabelClassNameSelector = `.${styles.multiSelectListItem}.${styles.groupLabel}`;
export const multiSelectGroupLabelSelector = `div${multiSelectGroupLabelClassNameSelector},li${multiSelectGroupLabelClassNameSelector}`;

export const isMultiSelectGroupLabel = (element: HTMLElement | null | undefined) => {
  return element && element.matches(multiSelectGroupLabelSelector);
};
const createMultiSelectGroupLabelProps = (
  { option, trigger, getOptionId, isIntermediate, isGroupDisabled }: MultiSelectGroupLabelProps,
  dataHandlers: SelectDataHandlers,
): MultiSelectOptionProps => {
  const { label, disabled } = option;
  const ariaLabel = getTextKey('multiSelectGroupAriaLabel', dataHandlers.getMetaData(), {
    optionLabel: label,
  }) as string;
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
    'aria-label': ariaLabel,
    tabIndex: -1,
    isInGroup: true,
    onClick: (originalEvent: React.MouseEvent) => {
      // Clicking the label triggers a click, of course.
      // But the label is linked to checkbox with "htmlFor"
      // Therefore the click also triggers checkbox click and this callback is called twice.
      // Therefore preventDefault() is called.
      originalEvent.preventDefault();
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
  const elementProps = createMultiSelectGroupLabelProps(props, useSelectDataHandlers());
  return <MultiSelectOptionElement {...elementProps} isInGroup />;
}

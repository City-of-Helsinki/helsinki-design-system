import React from 'react';

import styles from '../../Select.module.scss';
import classNames from '../../../../utils/classNames';
import { SelectDataHandlers, SelectMetaData, Option, LiElementProps } from '../../types';
import { getOptionGroupIndex, getSelectedOptionsPerc, getAllOptions } from '../../utils';
import {
  MultiSelectGroupLabelProps,
  createMultiSelectGroupLabelProps,
  createMultiSelectItemProps,
  MultiSelectOptionListItem,
} from './MultiSelectItem';
import { createSingleSelectGroupLabelProps, createSingleSelectItemProps, OptionListItem } from './SingleSelectItem';
import { useSelectDataHandlers } from '../../hooks/useSelectDataHandlers';

type LiElementWithCheckboxProps = LiElementProps & {
  label?: string;
  selected?: boolean;
  indeterminate?: boolean;
};

const createOptionsListItemProps = ({
  option,
  isMultiSelect,
  isIntermediate,
  isGroupDisabled,
  trigger,
}: MultiSelectGroupLabelProps & { isMultiSelect: boolean }): LiElementWithCheckboxProps => {
  const { isGroupLabel } = option;

  if (isGroupLabel) {
    return !isMultiSelect
      ? createSingleSelectGroupLabelProps(option)
      : createMultiSelectGroupLabelProps({ option, trigger, isIntermediate, isGroupDisabled });
  }
  return isMultiSelect
    ? createMultiSelectItemProps({ option, trigger })
    : createSingleSelectItemProps({ option, trigger });
};

const createOptionElements = ({ getData, trigger, getMetaData }: SelectDataHandlers) => {
  const { groups, multiSelect, open } = getData();
  const { isSearching } = getMetaData();
  if (!open || isSearching) {
    return [];
  }
  const getGroupLabelIntermediateState = (option: Option): boolean => {
    if (!option.isGroupLabel) {
      return false;
    }
    const optionGroup = groups[getOptionGroupIndex(groups, option)];
    const perc = optionGroup ? getSelectedOptionsPerc(optionGroup) : 0;
    return perc < 1 && perc > 0;
  };
  const getGroupLabelDisabledState = (option: Option): boolean => {
    if (!option.isGroupLabel) {
      return false;
    }
    const optionGroup = groups[getOptionGroupIndex(groups, option)];
    return !optionGroup.options.some((opt) => !opt.isGroupLabel && !opt.disabled);
  };
  return getAllOptions(groups, false)
    .map((option) => {
      const { children, ...attr } = createOptionsListItemProps({
        option,
        isMultiSelect: multiSelect,
        isIntermediate: getGroupLabelIntermediateState(option),
        isGroupDisabled: getGroupLabelDisabledState(option),
        trigger,
      });
      if (!option.visible) {
        return null;
      }
      const Component = multiSelect ? MultiSelectOptionListItem : OptionListItem;
      return (
        <Component {...attr} key={option.value as string}>
          {children}
        </Component>
      );
    })
    .filter((option) => !!option);
};

const createListElementProps = ({ getMetaData }: SelectDataHandlers) => {
  const { refs, elementIds } = getMetaData() as SelectMetaData;

  return {
    className: classNames(styles.list),
    ref: refs.list,
    tabIndex: 0,
    id: elementIds.list,
    role: 'listbox',
  };
};

export function SingleSelectAndGrouplessList() {
  const dataHandlers = useSelectDataHandlers();
  const attr = createListElementProps(dataHandlers);
  const children = createOptionElements(dataHandlers);
  return <ul {...attr}>{children}</ul>;
}

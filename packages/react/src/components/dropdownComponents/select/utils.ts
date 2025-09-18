import React from 'react';

import { SelectData, SelectMetaData, FilterFunction } from './types';
import { Group, Option, ModularOptionListData, ModularOptionListProps } from '../modularOptionList/types';
import { ChangeEvent } from '../../dataProvider/DataContext';
import { eventTypes } from './events';
import {
  iterateAndCopyGroup,
  getGroupLabelOption,
  getAllOptions,
  propsToGroups,
  getSelectedOptions,
} from '../modularOptionList/utils';
import { createElementIds, ElementIdsConfig } from '../shared/utils/elementIds';

// Configuration for Select component element IDs
const selectElementIds: ElementIdsConfig = {
  container: true,
  button: true,
  list: true,
  clearButton: true,
  label: true,
  selectionsAndListsContainer: true,
  tagList: true,
  searchOrFilterInput: true,
  searchOrFilterInputLabel: true,
  clearAllButton: true,
  showAllButton: true,
};

// Re-export commonly used utility functions
export {
  getAllOptions,
  getSelectedOptions,
  propsToGroups,
  updateGroupLabelAndOptions,
  updateOptionInGroup,
  defaultFilter,
} from '../modularOptionList/utils';

type DomHandlerProps = {
  id: string;
  type?: string;
  trigger: (event: ChangeEvent) => void;
};

export type OptionIterator = (
  option: Option,
  group: Group,
  optionIndex: number,
  groupIndex: number,
) => Option | undefined;

export const DROPDOWN_MENU_ITEM_HEIGHT = 52;

export function createOnClickListener(props: DomHandlerProps) {
  const { id, type = eventTypes.click, trigger } = props;
  return {
    onClick: (originalEvent: React.MouseEvent) => {
      trigger({ id, type, payload: { originalEvent } });
    },
  };
}

export function createInputOnChangeListener(props: DomHandlerProps) {
  const { id, type = eventTypes.change, trigger } = props;
  return {
    onChange: (originalEvent: React.ChangeEvent<HTMLInputElement>) => {
      trigger({
        id,
        type,
        payload: { value: originalEvent.currentTarget.value, originalEvent },
      });
    },
  };
}

export function getElementIds(containerId: string): SelectMetaData['elementIds'] {
  return createElementIds(containerId, selectElementIds);
}

export function countVisibleOptions(groups: SelectData['groups']): number {
  let count = 0;
  groups.forEach((group) => {
    group.options.forEach((option) => {
      if (!option.isGroupLabel && option.visible) {
        count += 1;
      }
    });
  });
  return count;
}

export function filterOptions(groups: ModularOptionListData['groups'], filterStr: string, filterFunc: FilterFunction) {
  const newGroupsWithFilteredOptions = iterateAndCopyGroup(groups, (option) => {
    if (option.isGroupLabel) {
      return { ...option };
    }
    return { ...option, visible: !filterStr || filterFunc(option, filterStr) };
  });

  // check if group label should be visible....
  newGroupsWithFilteredOptions.forEach((group) => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    const groupLabel = getGroupLabelOption(group);
    if (!groupLabel) {
      return;
    }
    groupLabel.visible = !!groupLabel.label && group.options.findIndex((opt) => !opt.isGroupLabel && opt.visible) > -1;
  });

  return newGroupsWithFilteredOptions;
}

export function filterSelectableOptions(
  groups: ModularOptionListData['groups'],
  filterStr: string,
  filterFunc: FilterFunction,
  isMultiSelect: boolean,
) {
  return getAllOptions(groups, !isMultiSelect).filter((option) => filterFunc(option, filterStr));
}

export function mergeSearchResultsToCurrent(
  props: Pick<ModularOptionListProps, 'groups' | 'options'>,
  currentGroups: ModularOptionListData['groups'],
): ModularOptionListData['groups'] {
  const newData = propsToGroups(props) || [];
  const newOptions = getAllOptions(newData);
  const currentOptionsWithoutMatches = getSelectedOptions(currentGroups).filter((option) => {
    const sameInNewOptionsIndex = newOptions.findIndex((newOption) => {
      return newOption.value === option.value;
    });
    if (sameInNewOptionsIndex > -1) {
      newOptions[sameInNewOptionsIndex].selected = true;
      return false;
    }
    return true;
  });

  const currentHiddenOptionsInAGroup = currentOptionsWithoutMatches.length
    ? [{ options: currentOptionsWithoutMatches.map((opt) => ({ ...opt, visible: false, selected: true })) } as Group]
    : [];

  return [...currentHiddenOptionsInAGroup, ...newData];
}

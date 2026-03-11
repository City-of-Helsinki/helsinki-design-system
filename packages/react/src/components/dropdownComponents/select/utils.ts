import { SelectData, SelectMetaData, FilterFunction } from './types';
import { Group, Option, ModularOptionListData, ModularOptionListProps } from '../modularOptionList/types';
import {
  iterateAndCopyGroup,
  getGroupLabelOption,
  getAllOptions,
  propsToGroups,
  getSelectedOptions,
} from '../modularOptionList/utils';
import {
  ElementIdsConfig,
  createGenericElementIds,
  createOnClickListener,
  createInputOnChangeListener,
} from '../shared';

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

// Create Select-specific element IDs function
export const getElementIds = createGenericElementIds<SelectMetaData['elementIds']>(selectElementIds);

// Re-export commonly used utility functions
export {
  getAllOptions,
  getSelectedOptions,
  propsToGroups,
  updateGroupLabelAndOptions,
  updateOptionInGroup,
  defaultFilter,
} from '../modularOptionList/utils';

// Re-export DOM handler creators for backward compatibility
export { createOnClickListener, createInputOnChangeListener };

export type OptionIterator = (
  option: Option,
  group: Group,
  optionIndex: number,
  groupIndex: number,
) => Option | undefined;

export const DROPDOWN_MENU_ITEM_HEIGHT = 52;

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

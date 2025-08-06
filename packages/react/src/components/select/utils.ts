import React, { ReactElement, ReactNode } from 'react';

import {
  SelectData,
  Group,
  SelectProps,
  Option,
  OptionInProps,
  SelectMetaData,
  GroupInProps,
  FilterFunction,
  ScreenReaderNotification,
  SelectDataHandlers,
} from './types';
import { getChildrenAsArray } from '../../utils/getChildren';
import { ChangeEvent } from '../dataProvider/DataContext';
import { eventTypes } from './events';

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

export function getOptionIndex(options: OptionInProps[], option: OptionInProps): number {
  return options.findIndex(
    ({ value, isGroupLabel }) => value === option.value && !!isGroupLabel === !!option.isGroupLabel,
  );
}

export function getOptionGroupIndex(groups: SelectData['groups'], option: OptionInProps): number {
  if (groups.length === 0) {
    return -1;
  }
  if (groups.length === 1) {
    return 0;
  }
  return groups.findIndex(({ options }) => {
    return getOptionIndex(options, option) > -1;
  });
}

export function iterateAndCopyGroup(groups: Group[], iterator: OptionIterator): Group[] {
  return groups.map((group, groupIndex) => {
    return {
      options: group.options.map((opt, optionIndex) => {
        return iterator(opt, group, optionIndex, groupIndex) || { ...opt };
      }),
    };
  });
}

export function getSelectedOptionsPerc(group: Group, pendingSelectionCount = 0): number {
  const optionCountWithoutGroupLabel = group.options.length - 1;
  if (!optionCountWithoutGroupLabel) {
    return 0;
  }
  return (
    (group.options.filter((option) => !option.isGroupLabel && option.selected).length + pendingSelectionCount) /
    optionCountWithoutGroupLabel
  );
}

export function mutateGroupLabelSelections(groups: SelectData['groups']) {
  groups.forEach((group) => {
    // Only update the group label, don't touch other options
    const groupLabel = group.options[0];
    if (groupLabel && groupLabel.isGroupLabel) {
      const perc = getSelectedOptionsPerc(group);
      // eslint-disable-next-line no-param-reassign
      groupLabel.selected = perc === 1;
    }
  });

  return groups;
}

// this function mutates given data so pass a copy of groups and their options array.
// options are not mutated.
function mutateGroupsWithOptions(
  groups: SelectData['groups'],
  partialOptionsToUpdate: Partial<Option>[],
  isMultiSelect: boolean,
) {
  partialOptionsToUpdate.forEach((partial) => {
    if (!partial.value) {
      return;
    }
    const groupIndex = getOptionGroupIndex(groups, { ...partial, isGroupLabel: !!partial.isGroupLabel });
    if (groupIndex < 0) {
      return;
    }
    const group = groups[groupIndex];
    const optionIndex = getOptionIndex(group.options, partial);
    const option = optionIndex > -1 ? group.options[optionIndex] : undefined;
    if (option) {
      group.options[optionIndex] = {
        ...option,
        ...partial,
      };
    }
  });

  if (isMultiSelect) {
    mutateGroupLabelSelections(groups);
  }
  return groups;
}

export function updateOptionInGroup(
  groups: SelectData['groups'],
  updatedOption: Option,
  isMultiSelect: boolean,
): SelectData['groups'] {
  if (updatedOption.isGroupLabel) {
    throw new Error('Use updateGroupLabelAndOptions to update groupLabel and its related options');
  }

  const copy = iterateAndCopyGroup(groups, (opt) => {
    // unselect others if single select and option is selected
    if (!isMultiSelect && !opt.isGroupLabel && updatedOption.selected) {
      return {
        ...opt,
        selected: false,
      };
    }
    return { ...opt };
  });

  return mutateGroupsWithOptions(copy, [{ ...updatedOption, selected: !!updatedOption.selected }], isMultiSelect);
}

export function updateGroupLabelAndOptions(groups: SelectData['groups'], updatedOption: Option): SelectData['groups'] {
  if (!updatedOption.isGroupLabel) {
    throw new Error('Use updateOptionInGroup to update non-groupLabel options.');
  }
  if (!updatedOption.visible) {
    throw new Error('Cannot click an group label that is not visible (without a label)');
  }
  const targetGroupIndex = getOptionGroupIndex(groups, updatedOption);
  if (targetGroupIndex < 0) {
    return groups;
  }

  return iterateAndCopyGroup(groups, (option, group, optionIndex, groupIndex) => {
    if (groupIndex !== targetGroupIndex) {
      return { ...option };
    }
    return option.visible && !option.disabled
      ? {
          ...option,
          selected: updatedOption.selected,
        }
      : { ...option };
  });
}

export function clearAllSelectedOptions(groups: SelectData['groups'], keepDisabled = true): SelectData['groups'] {
  return iterateAndCopyGroup(groups, (option) => {
    return {
      ...option,
      selected: option.disabled && keepDisabled ? option.selected : false,
    };
  });
}

export function getAllOptions(groups: SelectData['groups'], filterOutGroupLabels = true): Option[] {
  const options: Option[] = [];
  groups.forEach((group) => {
    group.options.forEach((option) => {
      if (filterOutGroupLabels && option.isGroupLabel) {
        return;
      }
      options.push(option);
    });
  });
  return options;
}

export function getVisibleGroupLabels(groups: SelectData['groups']): Option[] {
  return groups.map((group) => group.options[0]).filter((option) => option && option.label && option.visible);
}

export function getSelectedOptions(groups: SelectData['groups']): Option[] {
  return getAllOptions(groups).filter((option) => !!option.selected);
}

export function validateOption(option: OptionInProps | string): Option {
  if (typeof option === 'string') {
    return { value: option, label: option, selected: false, isGroupLabel: false, visible: true, disabled: false };
  }

  const label = option.label || option.value || '';
  const value = option.value || label;

  return {
    label,
    value,
    selected: !!option.selected,
    isGroupLabel: false,
    visible: typeof option.visible === 'boolean' ? option.visible : true,
    disabled: typeof option.disabled === 'boolean' ? option.disabled : false,
  };
}

export function createGroupLabel(label: string) {
  return { ...validateOption(String(label)), isGroupLabel: true, visible: !!label, disabled: false };
}

export function propsToGroups(props: Pick<SelectProps, 'groups' | 'options'>): SelectData['groups'] | undefined {
  if (!props.groups && !props.options) {
    return undefined;
  }
  if (props.groups) {
    return (props.groups as Group[]).map((group: Group) => {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      const hasLabelOptionAlready = !!getGroupLabelOption(group);
      const groupOptions = group.options.map(validateOption) as Option[];
      if (hasLabelOptionAlready) {
        return {
          options: [group.options[0], ...groupOptions.slice(1)],
        };
      }
      const labelOption: Option = createGroupLabel((group as GroupInProps).label);

      return {
        options: [labelOption, ...groupOptions],
      };
    });
  }

  if (props.options) {
    const option = props.options[0];
    if (option && (option as OptionInProps).isGroupLabel) {
      return [props] as Group[];
    }
  }

  return [
    {
      options: [createGroupLabel(''), ...(props.options || []).map(validateOption)],
    },
  ];
}

export function defaultFilter(option: Option, filterStr: string) {
  return option.label.toLowerCase().indexOf(filterStr.toLowerCase()) > -1;
}

export function filterOptions(groups: SelectData['groups'], filterStr: string, filterFunc: FilterFunction) {
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

export function childrenToGroups(children: SelectProps['children']): SelectData['groups'] | undefined {
  if (!children || typeof children !== 'object') {
    return undefined;
  }
  const childArray = getChildrenAsArray(children) as ReactElement[];
  if (!childArray.length) {
    return [{ options: [] }];
  }
  const hasOptionGroups = childArray[0].type === 'optgroup';
  const optionElementToOption = (optionEl: ReactNode | ReactElement) => {
    const props = (
      optionEl && typeof optionEl === 'object' ? (optionEl as ReactElement).props : {}
    ) as ReactElement<HTMLOptionElement>['props'];
    const label = String(props.children);
    const value = props && String(props.value);
    const selected = !!(props && props.selected);
    const disabled = !!(props && props.disabled);
    return validateOption({ label, value, selected, disabled });
  };
  if (hasOptionGroups) {
    return childArray.map((child) => {
      const optionElements = child.props.children;
      const options = optionElements ? getChildrenAsArray(optionElements).map(optionElementToOption) : [];
      const label = createGroupLabel(String(child.props.label));
      options.unshift(label);
      return { options };
    });
  }
  return [{ options: [createGroupLabel(''), ...childArray.map(optionElementToOption)] }];
}

export function mergeSearchResultsToCurrent(
  props: Pick<SelectProps, 'groups' | 'options'>,
  currentGroups: SelectData['groups'],
): SelectData['groups'] {
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

export function createSelectedOptionsList(currentSelections: Option[], groups: SelectData['groups']) {
  const selections = getSelectedOptions(groups);
  const selectionsAsValues = new Set(selections.map((opt) => opt.value));
  const stillSelected = currentSelections.filter((opt) => selectionsAsValues.has(opt.value));
  const selectedValues = new Set(stillSelected.map((opt) => opt.value));
  return [...stillSelected, ...selections.filter((opt) => !selectedValues.has(opt.value))];
}

export function getElementIds(containerId: string): SelectMetaData['elementIds'] {
  return {
    container: containerId,
    button: `${containerId}-main-button`,
    list: `${containerId}-list`,
    clearButton: `${containerId}-clear-button`,
    label: `${containerId}-label`,
    selectionsAndListsContainer: `${containerId}-sl-container`,
    tagList: `${containerId}-tag-list`,
    searchOrFilterInput: `${containerId}-input-element`,
    searchOrFilterInputLabel: `${containerId}-input-element-label`,
    clearAllButton: `${containerId}-clear-all-button`,
    showAllButton: `${containerId}-show-all-button`,
  };
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

export function getGroupLabelOption(group: Group): Option | undefined {
  const firstOption = group.options[0];
  return firstOption && firstOption.isGroupLabel ? firstOption : undefined;
}

export function createScreenReaderNotification(type: string, content: string, delay = 0): ScreenReaderNotification {
  return {
    type,
    content,
    delay,
    showTime: 0,
    addTime: Date.now(),
  };
}

/**
 *
 * @param notification
 * @param dataHandlers
 * @returns Returns true, if notification was added
 */
export function addOrUpdateScreenReaderNotificationByType(
  notification: ScreenReaderNotification,
  dataHandlers: SelectDataHandlers,
) {
  const { screenReaderNotifications } = dataHandlers.getMetaData();
  const indexOfSameType = screenReaderNotifications.findIndex((n) => n.type === notification.type);
  if (indexOfSameType > -1) {
    const updatedList = [...screenReaderNotifications];
    const prev = updatedList[indexOfSameType];
    if (prev.content === notification.content) {
      return false;
    }
    updatedList[indexOfSameType] = notification;
    dataHandlers.updateMetaData({ screenReaderNotifications: updatedList });
    return false;
  }
  const updatedList = [...screenReaderNotifications, notification];
  dataHandlers.updateMetaData({ screenReaderNotifications: updatedList });
  return true;
}

export function removeScreenReaderNotification(
  target: Partial<ScreenReaderNotification>,
  dataHandlers: SelectDataHandlers,
) {
  const { screenReaderNotifications } = dataHandlers.getMetaData();
  const indexOfMatch = screenReaderNotifications.findIndex((n) => {
    const hasTypeMatch = !target.type || n.type === target.type;
    const hasContentMatch = !target.content || n.content === target.content;
    return hasTypeMatch && hasContentMatch;
  });
  if (indexOfMatch > -1) {
    screenReaderNotifications.splice(indexOfMatch, 1);
    dataHandlers.updateMetaData({ screenReaderNotifications });
    return true;
  }
  return false;
}

export function filterSelectableOptions(
  groups: SelectData['groups'],
  filterStr: string,
  filterFunc: FilterFunction,
  isMultiSelect: boolean,
) {
  return getAllOptions(groups, !isMultiSelect).filter((option) => filterFunc(option, filterStr));
}

export function findSelectableOptionIndex(
  groups: SelectData['groups'],
  iterator: (option: Option) => boolean,
  isMultiSelect: boolean,
) {
  return getAllOptions(groups, !isMultiSelect).findIndex(iterator);
}

export function pickSelectedValues(selectedOptions?: Option[]): string[] {
  if (!selectedOptions || !selectedOptions.length) {
    return [];
  }
  return selectedOptions.map((opt) => opt.value);
}

export function getNewSelections(prev: Option[], current: Option[]): Option[] {
  if (!prev.length) {
    return current;
  }
  const prevValues = pickSelectedValues(prev);
  return current.filter((opt) => !prevValues.includes(opt.value));
}

// this function does not update groupLabel's selected with multiselect,
// because isMultiSelect does not exist where this is used.
// use mutateGroupLabelSelections to update group label selections too.
export function updateSelectedOptionsInGroups(
  groups: SelectProps['groups'],
  selectedOptions?: Array<Option | OptionInProps | string> | string,
) {
  if (selectedOptions === undefined) {
    return groups;
  }
  const selectedOptionsAsOptions = (typeof selectedOptions === 'string' ? [selectedOptions] : selectedOptions).map(
    (opt) => {
      const { value } = validateOption(opt);
      return { value, selected: true };
    },
  );
  // passing groups as groups does not matter
  const copy = iterateAndCopyGroup(groups as Group[], (opt) => {
    // unselect others if single select and option is selected
    const validOption = typeof opt === 'string' ? validateOption(opt) : opt;

    return {
      ...validOption,
      selected: false,
    };
  });
  // keep labels if groups were GroupInProps
  (groups as GroupInProps[]).forEach((group, index) => {
    if (group.label) {
      (copy[index] as GroupInProps).label = group.label;
    }
  });
  return mutateGroupsWithOptions(copy, selectedOptionsAsOptions, false);
}

export function convertPropsToGroups({
  groups,
  options,
  value,
  children,
}: Pick<SelectProps, 'groups' | 'options' | 'value' | 'children'>): Group[] {
  const fromGroupsAndOptions = propsToGroups({ options, groups });
  if (fromGroupsAndOptions) {
    if (value) {
      const selectedOptions = getSelectedOptions(fromGroupsAndOptions);
      if (selectedOptions.length > 0) {
        // eslint-disable-next-line no-console
        console.warn('HDS Select component has both selected options and value set. Value is discarded');
        return fromGroupsAndOptions;
      }
      const valueAsArray = typeof value === 'string' ? [value] : value;
      const valueOptions = valueAsArray.map((opt) => validateOption(opt));
      // Find value options that don't exist in current groups/options
      const allCurrentOptions = getAllOptions(fromGroupsAndOptions);
      const missingOptions = valueOptions.filter((valueOpt) => {
        return !allCurrentOptions.some((currentOpt) => currentOpt.value === valueOpt.value);
      });
      // First, update selections in existing groups
      let finalGroups = updateSelectedOptionsInGroups(fromGroupsAndOptions, value) as Group[];
      // Then, if there are missing options, add them as hidden selected options
      if (missingOptions.length > 0) {
        const hiddenGroup: Group = {
          options: [createGroupLabel(''), ...missingOptions.map((opt) => ({ ...opt, visible: false, selected: true }))],
        };
        finalGroups = [hiddenGroup, ...finalGroups];
      }
      return finalGroups;
    }
    return fromGroupsAndOptions;
  }
  return childrenToGroups(children) || [];
}

export function createMetaDataAfterSelectionChange(
  groups: SelectData['groups'],
  selectedOptions: SelectMetaData['selectedOptions'],
  lastClickedOption?: Option,
): Partial<Pick<SelectMetaData, 'selectedOptions' | 'textContent' | 'lastClickedOption'>> {
  const data: Partial<SelectMetaData> = {
    selectedOptions: createSelectedOptionsList(selectedOptions, groups),
    lastClickedOption,
    // textContent is re-created, when a textProvider is called
    textContent: undefined,
  };

  return data;
}

import React, { ReactElement, ReactNode } from 'react';

import {
  SelectData,
  Group,
  SelectProps,
  Option,
  OptionInProps,
  FilterFunction,
  SelectMetaData,
  SelectDataHandlers,
  ScreenReaderNotification,
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

export function getOptionGroupIndex(groups: SelectData['groups'], option: OptionInProps): number {
  if (groups.length === 0) {
    return -1;
  }
  if (groups.length === 1) {
    return 0;
  }
  return groups.findIndex(({ options }) => {
    return (
      options.findIndex(({ value, isGroupLabel }) => value === option.value && isGroupLabel === option.isGroupLabel) >
      -1
    );
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

export function iterateAndCopyGroup(groups: Group[], iterator: OptionIterator): Group[] {
  return groups.map((group, groupIndex) => {
    return {
      options: group.options.map((opt, optionIndex) => {
        return iterator(opt, group, optionIndex, groupIndex) || { ...opt };
      }),
    };
  });
}

export function updateSelectedOptionInGroups(
  groups: SelectData['groups'],
  updatedOption: Option,
  isMultiSelect: boolean,
): SelectData['groups'] {
  const groupIndex = getOptionGroupIndex(groups, updatedOption);

  return groups.map((group, index) => {
    const selectedOptionPerc =
      index === groupIndex && isMultiSelect ? getSelectedOptionsPerc(group, updatedOption.selected ? 1 : -1) : 0;
    return {
      options: group.options.map((option) => {
        if (option.isGroupLabel) {
          if (index === groupIndex && isMultiSelect) {
            return {
              ...option,
              selected: selectedOptionPerc === 1,
            };
          }
          return option;
        }
        if (index === groupIndex && option.value === updatedOption.value) {
          return {
            ...updatedOption,
            selected: !!updatedOption.selected,
          };
        }
        return {
          ...option,
          selected: !isMultiSelect ? false : option.selected,
        };
      }),
    };
  });
}

export function updateSelectedGroupOptions(groups: SelectData['groups'], updatedOption: Option): SelectData['groups'] {
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

export function clearAllEnabledSelectedOptions(groups: SelectData['groups']): SelectData['groups'] {
  return iterateAndCopyGroup(groups, (option) => {
    return {
      ...option,
      selected: option.disabled ? option.selected : false,
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

export function getVisibleGroupLabels(groups: SelectData['groups']): Option[] {
  return groups.map((group) => group.options[0]).filter((option) => option && option.label && option.visible);
}

export function getGroupLabelOption(group: Group): Option | undefined {
  const firstOption = group.options[0];
  return firstOption && firstOption.isGroupLabel ? firstOption : undefined;
}

export function getGroupOptions(groupLabel: Option, groups: Group[]): Option[] {
  const groupIndex = getOptionGroupIndex(groups, groupLabel);
  if (groupIndex < 0) {
    return [];
  }
  const group = groups[groupIndex];
  return group.options.slice(1);
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

function createGroupLabel(label: string) {
  return { ...validateOption(label), isGroupLabel: true, visible: !!label, disabled: false };
}

export function propsToGroups(props: Pick<SelectProps, 'groups' | 'options'>): SelectData['groups'] | undefined {
  if (!props.groups && !props.options) {
    return undefined;
  }
  // if group has options and the first option is a group label, groups/options have been parsed already
  if (props.groups && props.groups[0] && getGroupLabelOption(props.groups[0] as Group)) {
    return props.groups as Group[];
  }
  if (props.groups) {
    return props.groups.map((group) => {
      const labelOption: Option = createGroupLabel(group.label);
      const groupOptions = group.options.map(validateOption);
      const allSelected = groupOptions.findIndex((option) => !option.selected) === -1;
      if (allSelected) {
        labelOption.selected = true;
      }
      return {
        options: [labelOption, ...groupOptions],
      };
    });
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
  groups.forEach((group) => {
    // do not count the label
    let visibleOptions = group.options.length - 1;
    group.options.forEach((option) => {
      if (option.isGroupLabel) {
        return;
      }
      // eslint-disable-next-line no-param-reassign
      option.visible = !filterStr || filterFunc(option, filterStr);
      if (!option.visible) {
        visibleOptions -= 1;
      }
    });
    const groupLabel = group.options[0];
    groupLabel.visible = !!groupLabel.label && visibleOptions > 0;
    // check if group label should be visible....
  });
  return groups;
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
      const allSelected = options.findIndex((option) => !option.selected) === -1;
      if (allSelected) {
        label.selected = true;
      }
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
    ? [{ options: currentOptionsWithoutMatches.map((opt) => ({ ...opt, visible: false })) } as Group]
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

export function pickSelectedValues(selectedOptions?: Option[]): string[] {
  if (!selectedOptions || !selectedOptions.length) {
    return [];
  }
  return selectedOptions.map((opt) => opt.value);
}

export function pickSelectedLabels(selectedOptions?: Option[]): string[] {
  if (!selectedOptions || !selectedOptions.length) {
    return [];
  }
  return selectedOptions.map((opt) => opt.label);
}

export function getNewSelections(prev: Option[], current: Option[]): Option[] {
  if (!prev.length) {
    return current;
  }
  const prevValues = pickSelectedValues(prev);
  return current.filter((opt) => !prevValues.includes(opt.value));
}

export function getElementIds(containerId: string): SelectMetaData['elementIds'] {
  return {
    container: containerId,
    dropdownButton: `${containerId}-dropdown-button`,
    list: `${containerId}-list`,
    clearButton: `${containerId}-clear-button`,
    arrowButton: `${containerId}-arrow-button`,
    label: `${containerId}-label`,
    tagList: `${containerId}-tag-list`,
    searchOrFilterInput: `${containerId}-input-element`,
    searchOrFilterInputLabel: `${containerId}-input-element-label`,
    clearAllButton: `${containerId}-clear-all-button`,
    showAllButton: `${containerId}-show-all-button`,
  };
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
    const updatedList = [...dataHandlers.getMetaData().screenReaderNotifications];
    updatedList[indexOfSameType] = notification;
    dataHandlers.updateMetaData({ screenReaderNotifications: updatedList });
    return false;
  }
  const updatedList = [...dataHandlers.getMetaData().screenReaderNotifications, notification];
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

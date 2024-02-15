import React, { ReactElement, ReactNode } from 'react';

import { SelectData, Group, SelectProps, Option } from '.';
import { getChildrenAsArray } from '../../utils/getChildren';
import { ChangeEvent } from '../dataContext/DataContext';

type DomHandlerProps = {
  id: string;
  type?: string;
  trigger: (event: ChangeEvent) => void;
};

export function createOnClickListener(props: DomHandlerProps) {
  const { id, type = 'click', trigger } = props;
  return {
    onClick: (originalEvent: React.MouseEvent) => {
      trigger({ id, type, payload: { originalEvent } });
    },
  };
}

export function createInputOnChangeListener(props: DomHandlerProps) {
  const { id, type = 'change', trigger } = props;
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

export function getOptionGroupIndex(groups: SelectData['groups'], option: Option): number {
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

export function updateSelectedOptionInGroups(
  groups: SelectData['groups'],
  updatedOption: Required<Option>,
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

export function updateSelectedGroupOptions(
  groups: SelectData['groups'],
  updatedOption: Required<Option>,
): SelectData['groups'] {
  const groupIndex = getOptionGroupIndex(groups, updatedOption);
  if (groupIndex < 0) {
    return groups;
  }
  return groups.map((group, index) => {
    if (index === groupIndex) {
      return {
        options: group.options.map((option) => {
          return {
            ...option,
            selected: updatedOption.selected,
          };
        }),
      };
    }
    return group;
  });
}

export function clearAllSelectedOptions(groups: SelectData['groups']): SelectData['groups'] {
  return groups.map((group) => {
    return {
      options: group.options.map((option) => {
        return {
          ...option,
          selected: false,
        };
      }),
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

type NewType = Option;

export function getSelectedOptions(groups: SelectData['groups']): NewType[] {
  return getAllOptions(groups).filter((option) => !!option.selected);
}

export function validateOption(option: Option | string): Required<Option> {
  return typeof option === 'string'
    ? { value: option, label: option, selected: false, isGroupLabel: false, visible: true }
    : {
        ...option,
        selected: !!option.selected,
        isGroupLabel: false,
        visible: typeof option.visible === 'boolean' ? option.visible : true,
      };
}

function createGroupLabel(label: string) {
  return { ...validateOption(label), isGroupLabel: true, visible: !!label };
}

export function propsToGroups(props: Pick<SelectProps, 'groups' | 'options'>): SelectData['groups'] {
  if (props.groups) {
    return props.groups.map((group) => {
      const labelOption: Required<Option> = createGroupLabel(group.label);
      const groupOptions = group.options.map(validateOption);
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

export function filterOptions(groups: SelectData['groups'], filterStr: string) {
  groups.forEach((group) => {
    // do not count the label
    let visibleOptions = group.options.length - 1;
    group.options.forEach((option) => {
      if (option.isGroupLabel) {
        return;
      }
      // eslint-disable-next-line no-param-reassign
      option.visible = !filterStr || defaultFilter(option, filterStr);
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

export function childrenToGroups(children: SelectProps<ReactElement>['children']): SelectData['groups'] {
  if (!children || typeof children !== 'object') {
    return [];
  }
  const childArray = getChildrenAsArray(children) as ReactElement[];
  if (!childArray.length) {
    return [{ options: [] }];
  }
  const hasOptionGroups = childArray[0].type === 'optgroup';
  const optionElementToOption = (optionEl: ReactNode | ReactElement) => {
    const props = (optionEl && typeof optionEl === 'object' ? (optionEl as ReactElement).props : {}) as ReactElement<
      HTMLOptionElement
    >['props'];
    const label = String(props.children);
    const value = props && String(props.value);
    const selected = !!(props && props.selected);
    return validateOption({ label, value, selected });
  };
  if (hasOptionGroups) {
    return childArray.map((child) => {
      const optionElements = child.props.children;
      const options = optionElements ? getChildrenAsArray(optionElements).map(optionElementToOption) : [];
      options.unshift(createGroupLabel(String(child.props.label)));
      return { options };
    });
  }
  return [{ options: [createGroupLabel(''), ...childArray.map(optionElementToOption)] }];
}

export function mergeSearchResultsToCurrent(
  props: Pick<SelectProps, 'groups' | 'options'>,
  currentGroups: SelectData['groups'],
): SelectData['groups'] {
  const newData = propsToGroups(props);
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

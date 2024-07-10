import React, { ReactElement, ReactNode } from 'react';

import { SelectData, Group, SelectProps, Option, OptionInProps } from './types';
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
): SelectData['groups'] {
  const groupIndex = getOptionGroupIndex(groups, updatedOption);
  return groups.map((group, index) => {
    return {
      options: group.options.map((option) => {
        if (option.isGroupLabel) {
          return { ...option };
        }
        if (index === groupIndex && option.value === updatedOption.value) {
          return {
            ...updatedOption,
            selected: !!updatedOption.selected,
          };
        }
        return {
          ...option,
          selected: false,
        };
      }),
    };
  });
}

export function clearAllSelectedOptions(groups: SelectData['groups']): SelectData['groups'] {
  return iterateAndCopyGroup(groups, (option) => {
    return {
      ...option,
      selected: false,
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
  return { ...validateOption(label), isGroupLabel: true, visible: !!label, disabled: false };
}

export function propsToGroups(props: Pick<SelectProps, 'groups' | 'options'>): SelectData['groups'] | undefined {
  if (!props.groups && !props.options) {
    return undefined;
  }
  if (props.groups) {
    return props.groups.map((group) => {
      const hasLabelOptionAlready = !!group.options[0].isGroupLabel;
      const groupOptions = group.options.map(validateOption) as Option[];
      if (hasLabelOptionAlready) {
        return {
          options: [group.options[0], ...groupOptions.slice(1)],
        };
      }
      const labelOption: Option = createGroupLabel(group.label);

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

export function createSelectedOptionsList(currentSelections: Option[], groups: SelectData['groups']) {
  const selections = getSelectedOptions(groups);
  const selectionsAsValues = new Set(selections.map((opt) => opt.value));
  const stillSelected = currentSelections.filter((opt) => selectionsAsValues.has(opt.value));
  const selectedValues = new Set(stillSelected.map((opt) => opt.value));
  return [...stillSelected, ...selections.filter((opt) => !selectedValues.has(opt.value))];
}

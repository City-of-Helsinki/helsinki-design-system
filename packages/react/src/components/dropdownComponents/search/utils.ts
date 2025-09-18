import React from 'react';

import { SearchData, SearchMetaData } from './types';
import { Group, Option, ModularOptionListData, ModularOptionListProps } from '../modularOptionList/types';
import { ChangeEvent } from '../../dataProvider/DataContext';
import { eventTypes } from './events';
import { getAllOptions, propsToGroups, getSelectedOptions } from '../modularOptionList/utils';
import {
  createElementIds,
  ElementIdsConfig,
} from '../shared/utils/elementIds';

// Configuration for Search component element IDs
const searchElementIds: ElementIdsConfig = {
  container: true,
  list: true,
  clearButton: true,
  label: true,
  searchContainer: true,
  searchInput: true,
  searchInputLabel: true,
};

// Re-export commonly used utility functions
export {
  getAllOptions,
  getSelectedOptions,
  propsToGroups,
  updateGroupLabelAndOptions,
  updateOptionInGroup,
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

export function getElementIds(containerId: string): SearchMetaData['elementIds'] {
  return createElementIds(containerId, searchElementIds);
}

export function countVisibleOptions(groups: SearchData['groups']): number {
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

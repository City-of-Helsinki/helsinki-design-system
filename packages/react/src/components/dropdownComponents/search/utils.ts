import React from 'react';

import { SearchData, SearchMetaData, SearchDataHandlers } from './types';
import {
  Group,
  Option,
  ModularOptionListData,
  ModularOptionListProps,
  ScreenReaderNotification,
} from '../modularOptionList/types';
import { ChangeEvent } from '../../dataProvider/DataContext';
import { eventTypes } from './events';
import { getAllOptions, propsToGroups, getSelectedOptions } from '../modularOptionList/utils';

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
  return {
    container: containerId,
    list: `${containerId}-list`,
    clearButton: `${containerId}-clear-button`,
    label: `${containerId}-label`,
    searchContainer: `${containerId}-search-container`,
    searchInput: `${containerId}-search-input`,
    searchInputLabel: `${containerId}-search-input-label`,
  };
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

export function createScreenReaderNotification(type: string, content: string, delay = 0): ScreenReaderNotification {
  return {
    type,
    content,
    delay,
    showTime: 0,
    addTime: Date.now(),
  };
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

/**
 *
 * @param notification
 * @param dataHandlers
 * @returns Returns true, if notification was added
 */
export function addOrUpdateScreenReaderNotificationByType(
  notification: ScreenReaderNotification,
  dataHandlers: SearchDataHandlers,
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
  dataHandlers: SearchDataHandlers,
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

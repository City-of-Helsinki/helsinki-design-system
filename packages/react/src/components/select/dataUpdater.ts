import { Option, SearchResult, SelectData, SelectMetaData } from './types';
import { ChangeHandler } from '../dataContext/DataContext';
import {
  updateSelectedOptionInGroups,
  updateSelectedGroupOptions,
  filterOptions,
  mergeSearchResultsToCurrent,
  clearAllSelectedOptions,
} from './utils';
import { eventIds, events, eventTypes } from './events';

export const dataUpdater: ChangeHandler<SelectData, SelectMetaData> = (event, tools) => {
  const { id, type, payload } = event;
  const current = tools.getData();
  const { showAllTags } = tools.getMetaData();
  const eventIdWithType = `${id}_${type}`;
  if (eventIdWithType === events.selectedOptionsClick || eventIdWithType === events.arrowClick) {
    tools.updateData({ open: !current.open });
  } else if (eventIdWithType === events.listItemClick || eventIdWithType === events.tagClick) {
    const clickedOption = payload && (payload.value as Required<Option>);
    if (!clickedOption) {
      return false;
    }
    tools.updateData({
      groups: updateSelectedOptionInGroups(
        current.groups,
        { ...clickedOption, selected: !clickedOption.selected },
        current.multiSelect,
      ),
      open: eventIdWithType !== events.tagClick && current.multiSelect,
    });
    tools.updateMetaData({ selectionUpdate: Date.now() });
  } else if (eventIdWithType === events.listGroupClick) {
    const clickedOption = payload && (payload.value as Required<Option>);
    if (!clickedOption) {
      return false;
    }
    tools.updateData({
      groups: updateSelectedGroupOptions(current.groups, { ...clickedOption, selected: !clickedOption.selected }),
      open: true,
    });
    tools.updateMetaData({ selectionUpdate: Date.now() });
  } else if (eventIdWithType === events.clearClick || eventIdWithType === events.clearAllClick) {
    tools.updateData({
      groups: clearAllSelectedOptions(current.groups),
    });
    tools.updateMetaData({ selectionUpdate: Date.now() });
  } else if (type === eventTypes.outSideclick) {
    tools.updateData({ open: false });
  } else if (eventIdWithType === events.filterChange) {
    const filterValue = (payload && (payload.value as string)) || '';
    tools.updateMetaData({ filter: filterValue });
    tools.updateData({ groups: filterOptions(current.groups, filterValue) });
  } else if (eventIdWithType === events.searchChange) {
    const searchValue = (payload && (payload.value as string)) || '';
    tools.updateMetaData({ search: searchValue, searchUpdate: Date.now() });
    if (!searchValue) {
      tools.updateData({ groups: mergeSearchResultsToCurrent({}, current.groups) });
    }
  } else if (eventIdWithType === events.showAllClick) {
    tools.updateMetaData({ showAllTags: !showAllTags });
  } else if (id === eventIds.searchResult) {
    if (type === eventTypes.success) {
      tools.updateMetaData({ isSearching: false });
      tools.updateData({
        groups: mergeSearchResultsToCurrent(payload?.value as SearchResult, current.groups),
      });
    }
  }
  return true;
};

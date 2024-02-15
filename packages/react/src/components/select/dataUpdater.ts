import { Option, SearchResult, SelectData, SelectMetaData } from './types';
import { ChangeHandler } from '../dataContext/DataContext';
import {
  updateSelectedOptionInGroups,
  updateSelectedGroupOptions,
  filterOptions,
  mergeSearchResultsToCurrent,
  clearAllSelectedOptions,
} from './utils';
import { events, eventTypes } from './events';

export const dataUpdater: ChangeHandler<SelectData, SelectMetaData> = (event, tools) => {
  const { id, type, payload } = event;
  const current = tools.getData();
  const { showAllTags } = tools.getMetaData();
  const groupIdWithType = `${id}_${type}`;

  if (groupIdWithType === events.selectedOptionsClick || groupIdWithType === events.arrowClick) {
    tools.updateData({ open: !current.open });
  } else if (groupIdWithType === events.listItemClick || groupIdWithType === events.tagClick) {
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
      open: groupIdWithType !== events.tagClick && current.multiSelect,
    });
    tools.updateMetaData({ selectionUpdate: Date.now() });
  } else if (groupIdWithType === events.listGroupClick) {
    const clickedOption = payload && (payload.value as Required<Option>);
    if (!clickedOption) {
      return false;
    }
    tools.updateData({
      groups: updateSelectedGroupOptions(current.groups, { ...clickedOption, selected: !clickedOption.selected }),
      open: true,
    });
    tools.updateMetaData({ selectionUpdate: Date.now() });
  } else if (groupIdWithType === events.clearClick || groupIdWithType === events.clearAllClick) {
    tools.updateData({
      groups: clearAllSelectedOptions(current.groups),
    });
    tools.updateMetaData({ selectionUpdate: Date.now() });
  } else if (type === eventTypes.outSideclick) {
    tools.updateData({ open: false });
  } else if (groupIdWithType === events.filterChange) {
    const filterValue = (payload && (payload.value as string)) || '';
    tools.updateMetaData({ filter: filterValue });
    tools.updateData({ groups: filterOptions(current.groups, filterValue) });
  } else if (groupIdWithType === events.searchChange) {
    const searchValue = (payload && (payload.value as string)) || '';
    tools.updateMetaData({ search: searchValue, searchUpdate: searchValue ? Date.now() : -1 });
    tools.updateData(!searchValue ? { groups: mergeSearchResultsToCurrent({}, current.groups) } : {});
  } else if (groupIdWithType === events.showAllClick) {
    tools.updateMetaData({ showAllTags: !showAllTags });
    // empty upate to cause re-render
    tools.updateData({});
  } else if (id === 'searchResults') {
    if (type === 'success') {
      tools.updateMetaData({ isSearching: false });
      tools.updateData({
        groups: mergeSearchResultsToCurrent(payload?.value as SearchResult, current.groups),
      });
    }
  }
  return true;
};

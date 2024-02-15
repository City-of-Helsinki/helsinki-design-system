import { Option, SearchResult, SelectData, SelectMetaData } from './index';
import { ChangeHandler } from '../dataContext/DataContext';
import {
  updateSelectedOptionInGroups,
  updateSelectedGroupOptions,
  filterOptions,
  mergeSearchResultsToCurrent,
  clearAllSelectedOptions,
} from './utils';
import { groupIdEvents, eventTypes } from './groupData';

export const groupDataUpdater: ChangeHandler<SelectData, SelectMetaData> = (event, tools) => {
  const { id, type, payload } = event;
  const current = tools.getData();
  const { showAllTags } = tools.getMetaData();
  console.log('id,type', id, type, payload);

  const groupIdWithType = `${id}_${type}`;

  if (groupIdWithType === groupIdEvents.selectedOptionsClick || groupIdWithType === groupIdEvents.arrowClick) {
    tools.updateData({ open: !current.open });
  } else if (groupIdWithType === groupIdEvents.listItemClick || groupIdWithType === groupIdEvents.tagClick) {
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
      open: groupIdWithType !== groupIdEvents.tagClick && current.multiSelect,
    });
    tools.updateMetaData({ selectionUpdate: Date.now() });
  } else if (groupIdWithType === groupIdEvents.listGroupClick) {
    const clickedOption = payload && (payload.value as Required<Option>);
    if (!clickedOption) {
      return false;
    }
    tools.updateData({
      groups: updateSelectedGroupOptions(current.groups, { ...clickedOption, selected: !clickedOption.selected }),
      open: true,
    });
    tools.updateMetaData({ selectionUpdate: Date.now() });
  } else if (groupIdWithType === groupIdEvents.clearClick || groupIdWithType === groupIdEvents.clearAllClick) {
    tools.updateData({
      groups: clearAllSelectedOptions(current.groups),
    });
    tools.updateMetaData({ selectionUpdate: Date.now() });
  } else if (type === eventTypes.outSideclick) {
    tools.updateData({ open: false });
  } else if (groupIdWithType === groupIdEvents.filterChange) {
    const filterValue = (payload && (payload.value as string)) || '';
    tools.updateMetaData({ filter: filterValue });
    tools.updateData({ groups: filterOptions(current.groups, filterValue) });
  } else if (groupIdWithType === groupIdEvents.searchChange) {
    const searchValue = (payload && (payload.value as string)) || '';
    tools.updateMetaData({ search: searchValue, searchUpdate: searchValue ? Date.now() : -1 });
    tools.updateData(!searchValue ? { groups: mergeSearchResultsToCurrent({}, current.groups) } : {});
  } else if (groupIdWithType === groupIdEvents.showAllClick) {
    tools.updateMetaData({ showAllTags: !showAllTags });
    // empty upate to cause re-render
    tools.updateData({});
  } else if (id === 'searchResults') {
    if (type === 'success') {
      console.log('sucess', payload);
      tools.updateMetaData({ isSearching: false });
      tools.updateData({
        groups: mergeSearchResultsToCurrent(payload?.value as SearchResult, current.groups),
      });
    }
  }
  return true;
};

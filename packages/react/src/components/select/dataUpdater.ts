import debounce from 'lodash.debounce';

import { Option, SearchFunction, SearchResult, SelectData, SelectMetaData } from './types';
import { ChangeEvent, ChangeHandler, Tools } from '../dataContext/DataContext';
import {
  updateSelectedOptionInGroups,
  updateSelectedGroupOptions,
  filterOptions,
  mergeSearchResultsToCurrent,
  clearAllSelectedOptions,
  getSelectedOptions,
} from './utils';
import { eventIds, events, eventTypes } from './events';

const dataUpdater: ChangeHandler<SelectData, SelectMetaData> = (event, tools) => {
  const { id, type, payload } = event;
  const current = tools.getData();
  const { showAllTags } = tools.getMetaData();
  const eventIdWithType = `${id}_${type}`;
  if (eventIdWithType === events.selectedOptionsClick || eventIdWithType === events.arrowClick) {
    const willOpen = !current.open;
    tools.updateData({ open: willOpen });
    if (willOpen) {
      tools.updateMetaData({
        focusTarget: 'list',
      });
    }
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
    if (eventIdWithType === events.listItemClick) {
      tools.updateMetaData({
        focusTarget: 'button',
      });
    }
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
  } else if (type === eventTypes.outSideClick) {
    tools.updateData({ open: false });
    tools.updateMetaData({
      focusTarget: 'button',
    });
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

const executeSearch = (search: string, searchFunc: SearchFunction): [() => void, Promise<ChangeEvent>] => {
  let isCancelled = false;
  const request = new Promise<ChangeEvent>((resolve) => {
    searchFunc(search as string, [], {} as SelectData)
      .then((res) => {
        if (isCancelled) {
          resolve({ id: eventIds.searchResult, type: eventTypes.cancelled });
        }
        resolve({ id: eventIds.searchResult, type: eventTypes.success, payload: { value: res } });
      })
      .catch(() => {
        resolve({ id: eventIds.searchResult, type: eventTypes.error });
      });
  });
  const cancel = () => {
    isCancelled = true;
  };
  return [cancel, request];
};

const debouncedSearch = debounce((tools: Tools<SelectData, SelectMetaData>, searchFunc?: SearchFunction) => {
  if (!searchFunc) {
    return;
  }
  const { cancelCurrentSearch, search } = tools.getMetaData();
  if (cancelCurrentSearch) {
    cancelCurrentSearch();
  }
  if (!search) {
    return;
  }
  const [cancel, request] = executeSearch(search, searchFunc);
  tools.updateMetaData({ cancelCurrentSearch: cancel });
  tools.asyncRequestWithTrigger(request);
}, 300);

export const changeChandler: ChangeHandler<SelectData, SelectMetaData> = (event, tools): boolean => {
  const { updateMetaData, updateData, getData, getMetaData } = tools;
  const lastSelectionUpdate = getMetaData().selectionUpdate;
  const lastSearchUpdate = getMetaData().searchUpdate;
  const { onSearch, onChange } = getData();
  dataUpdater(event, tools);

  if (getMetaData().searchUpdate > lastSearchUpdate && onSearch) {
    tools.updateMetaData({ isSearching: !!getMetaData().search });
    debouncedSearch(tools, onSearch);
  }
  if (getMetaData().selectionUpdate !== lastSelectionUpdate) {
    const current = getData();
    const newProps = onChange(
      getSelectedOptions(current.groups).map((opt) => opt.value),
      current,
    );
    updateMetaData({ selectionUpdate: Date.now() });
    if (newProps) {
      updateData(newProps);
    }
  }
  // needs fixing:
  return true;
};

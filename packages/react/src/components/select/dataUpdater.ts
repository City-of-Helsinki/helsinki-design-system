import debounce from 'lodash.debounce';

import { Option, SearchFunction, SearchResult, SelectData, SelectMetaData } from './types';
import { ChangeEvent, ChangeHandler, DataHandlers } from '../dataProvider/DataContext';
import {
  updateSelectedOptionInGroups,
  updateSelectedGroupOptions,
  filterOptions,
  mergeSearchResultsToCurrent,
  clearAllSelectedOptions,
  getSelectedOptions,
  propsToGroups,
} from './utils';
import { eventIds, events, eventTypes } from './events';

const dataUpdater: ChangeHandler<SelectData, SelectMetaData> = (event, dataHandlers) => {
  const { id, type, payload } = event;
  const current = dataHandlers.getData();
  if (current.disabled) {
    return false;
  }
  const { showAllTags } = dataHandlers.getMetaData();
  const eventIdWithType = `${id}_${type}`;
  if (eventIdWithType === events.selectedOptionsClick || eventIdWithType === events.arrowClick) {
    const willOpen = !current.open;
    dataHandlers.updateData({ open: willOpen });
    if (willOpen) {
      dataHandlers.updateMetaData({
        focusTarget: current.showSearch || current.showFiltering ? 'searchOrFilterInput' : 'list',
      });
    }
  } else if (eventIdWithType === events.listItemClick || eventIdWithType === events.tagClick) {
    const clickedOption = payload && (payload.value as Option);
    if (!clickedOption) {
      return false;
    }
    dataHandlers.updateData({
      groups: updateSelectedOptionInGroups(
        current.groups,
        { ...clickedOption, selected: !clickedOption.selected },
        current.multiSelect,
      ),
      open: eventIdWithType !== events.tagClick && current.multiSelect,
    });
    dataHandlers.updateMetaData({ selectionUpdate: Date.now(), lastClickedOption: clickedOption });
    if (eventIdWithType === events.listItemClick && !current.multiSelect) {
      dataHandlers.updateMetaData({
        focusTarget: 'button',
      });
    }
  } else if (eventIdWithType === events.listGroupClick) {
    const clickedOption = payload && (payload.value as Option);
    if (!clickedOption) {
      return false;
    }
    dataHandlers.updateData({
      groups: updateSelectedGroupOptions(current.groups, { ...clickedOption, selected: !clickedOption.selected }),
    });
    dataHandlers.updateMetaData({ selectionUpdate: Date.now(), lastClickedOption: clickedOption });
  } else if (eventIdWithType === events.clearClick || eventIdWithType === events.clearAllClick) {
    dataHandlers.updateData({
      groups: clearAllSelectedOptions(current.groups),
    });
    dataHandlers.updateMetaData({ selectionUpdate: Date.now(), lastClickedOption: undefined });
  } else if (type === eventTypes.outSideClick) {
    dataHandlers.updateData({ open: false });
    dataHandlers.updateMetaData({
      focusTarget: 'button',
    });
  } else if (eventIdWithType === events.filterChange) {
    const filterValue = (payload && (payload.value as string)) || '';
    dataHandlers.updateMetaData({ filter: filterValue });
    dataHandlers.updateData({ groups: filterOptions(current.groups, filterValue) });
  } else if (eventIdWithType === events.searchChange) {
    const searchValue = (payload && (payload.value as string)) || '';
    dataHandlers.updateMetaData({ search: searchValue, searchUpdate: Date.now() });
    if (!searchValue) {
      dataHandlers.updateData({ groups: mergeSearchResultsToCurrent({}, current.groups) });
    }
  } else if (eventIdWithType === events.showAllClick) {
    dataHandlers.updateMetaData({ showAllTags: !showAllTags });
  } else if (id === eventIds.searchResult) {
    if (type === eventTypes.success) {
      dataHandlers.updateMetaData({ isSearching: false });
      dataHandlers.updateData({
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

const debouncedSearch = debounce(
  (dataHandlers: DataHandlers<SelectData, SelectMetaData>, searchFunc?: SearchFunction) => {
    if (!searchFunc) {
      return;
    }
    const { cancelCurrentSearch, search } = dataHandlers.getMetaData();
    if (cancelCurrentSearch) {
      cancelCurrentSearch();
    }
    if (!search) {
      return;
    }
    const [cancel, request] = executeSearch(search, searchFunc);
    dataHandlers.updateMetaData({ cancelCurrentSearch: cancel });
    dataHandlers.asyncRequestWithTrigger(request);
  },
  300,
);

export const changeChandler: ChangeHandler<SelectData, SelectMetaData> = (event, dataHandlers): boolean => {
  const { updateMetaData, updateData, getData, getMetaData } = dataHandlers;
  const lastSelectionUpdate = getMetaData().selectionUpdate;

  const lastSearchUpdate = getMetaData().searchUpdate;
  const { onSearch, onChange } = getData();
  dataUpdater(event, dataHandlers);

  if (getMetaData().searchUpdate > lastSearchUpdate && onSearch) {
    dataHandlers.updateMetaData({ isSearching: !!getMetaData().search });
    debouncedSearch(dataHandlers, onSearch);
  }
  if (getMetaData().selectionUpdate !== lastSelectionUpdate) {
    const current = getData();
    const { lastClickedOption } = getMetaData();
    const newProps = onChange(getSelectedOptions(current.groups), lastClickedOption as Option, current);
    updateMetaData({ selectionUpdate: Date.now() });
    if (newProps) {
      if (newProps.groups) {
        updateData({ groups: propsToGroups({ groups: newProps.groups }) });
      }
      const { error, assistiveText } = newProps;
      updateData({ error, assistiveText });
    }
  }
  // needs fixing:
  return true;
};

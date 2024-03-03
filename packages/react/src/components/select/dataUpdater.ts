import { debounce } from 'lodash';

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
import {
  EventId,
  eventIds,
  EventType,
  eventTypes,
  isClearOptionsClickEvent,
  isCloseEvent,
  isFilterChangeEvent,
  isGroupClickEvent,
  isOpenOrCloseEvent,
  isOptionClickEvent,
  isOutsideClickEvent,
  isSearchChangeEvent,
  isSearchUpdateEvent,
  isShowAllClickEvent,
} from './events';

const MIN_USER_INTERACTION_TIME_IN_MS = 100;

const dataUpdater: ChangeHandler<SelectData, SelectMetaData> = (event, dataHandlers) => {
  const { id, type, payload } = event as ChangeEvent<EventId, EventType>;
  const current = dataHandlers.getData();
  if (current.disabled) {
    return false;
  }
  const openOrClose = (open: boolean) => {
    const now = Date.now();
    if (now - dataHandlers.getMetaData().lastToggleCommand < MIN_USER_INTERACTION_TIME_IN_MS) {
      return false;
    }
    dataHandlers.updateData({ open });
    dataHandlers.updateMetaData({ lastToggleCommand: Date.now() });
    return true;
  };

  const setFocusTarget = (focusTarget: SelectMetaData['focusTarget']) => {
    dataHandlers.updateMetaData({
      focusTarget,
    });
  };

  const { showAllTags } = dataHandlers.getMetaData();

  if (isOpenOrCloseEvent(id, type)) {
    const willOpen = !current.open;
    const didUpdate = openOrClose(willOpen);
    if (didUpdate && willOpen) {
      setFocusTarget(current.showSearch || current.showFiltering ? 'searchOrFilterInput' : 'list');
    }
    return true;
  }

  if (isOptionClickEvent(id, type)) {
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
    });
    openOrClose(id !== eventIds.tag && current.multiSelect);
    dataHandlers.updateMetaData({ selectionUpdate: Date.now(), lastClickedOption: clickedOption });
    if (id === eventIds.listItem && !current.multiSelect) {
      dataHandlers.updateMetaData({
        focusTarget: 'button',
      });
    }
    return true;
  }

  if (isGroupClickEvent(id, type)) {
    const clickedOption = payload && (payload.value as Option);
    if (!clickedOption) {
      return false;
    }
    dataHandlers.updateData({
      groups: updateSelectedGroupOptions(current.groups, { ...clickedOption, selected: !clickedOption.selected }),
    });
    dataHandlers.updateMetaData({ selectionUpdate: Date.now(), lastClickedOption: clickedOption });
    return true;
  }

  if (isClearOptionsClickEvent(id, type)) {
    dataHandlers.updateData({
      groups: clearAllSelectedOptions(current.groups),
    });
    dataHandlers.updateMetaData({ selectionUpdate: Date.now(), lastClickedOption: undefined });
    return true;
  }

  if (isOutsideClickEvent(id, type) || isCloseEvent(id, type)) {
    if (openOrClose(false)) {
      dataHandlers.updateMetaData({
        focusTarget: 'button',
      });
      return true;
    }
  }

  if (isFilterChangeEvent(id, type)) {
    const filterValue = (payload && (payload.value as string)) || '';
    dataHandlers.updateMetaData({ filter: filterValue });
    dataHandlers.updateData({ groups: filterOptions(current.groups, filterValue) });
    return true;
  }

  if (isSearchChangeEvent(id, type)) {
    const searchValue = (payload && (payload.value as string)) || '';
    dataHandlers.updateMetaData({ search: searchValue, searchUpdate: Date.now() });
    if (!searchValue) {
      dataHandlers.updateData({ groups: mergeSearchResultsToCurrent({}, current.groups) });
    }
    return true;
  }

  if (isShowAllClickEvent(id, type)) {
    dataHandlers.updateMetaData({ showAllTags: !showAllTags });
    return true;
  }

  if (isSearchUpdateEvent(id, type)) {
    if (type === eventTypes.success) {
      dataHandlers.updateMetaData({ isSearching: false });
      dataHandlers.updateData({
        groups: mergeSearchResultsToCurrent(payload?.value as SearchResult, current.groups),
      });
    }
    return true;
  }
  return false;
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

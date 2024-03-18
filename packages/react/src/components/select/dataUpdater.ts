import { debounce } from 'lodash';

import { FilterFunction, Option, SearchFunction, SearchResult, SelectData, SelectMetaData } from './types';
import { ChangeEvent, ChangeHandler, DataHandlers } from '../dataProvider/DataContext';
import {
  updateSelectedOptionInGroups,
  updateSelectedGroupOptions,
  filterOptions,
  mergeSearchResultsToCurrent,
  clearAllEnabledSelectedOptions,
  propsToGroups,
  createSelectedOptionsList,
} from './utils';
import {
  EventId,
  eventIds,
  EventType,
  eventTypes,
  isClearOptionsClickEvent,
  isCloseEvent,
  isFilterChangeEvent,
  isGenericBlurEvent,
  isGroupClickEvent,
  isOpenOrCloseEvent,
  isOptionClickEvent,
  isOutsideClickEvent,
  isSearchChangeEvent,
  isSearchUpdateEvent,
  isShowAllClickEvent,
} from './events';

const MIN_USER_INTERACTION_TIME_IN_MS = 200;

const dataUpdater: ChangeHandler<SelectData, SelectMetaData> = (event, dataHandlers) => {
  const { id, type, payload } = event as ChangeEvent<EventId, EventType>;
  const current = dataHandlers.getData();
  if (current.disabled) {
    return false;
  }
  // console.log('-.-', id, type);
  const openOrClose = (open: boolean) => {
    const now = Date.now();
    if (now - dataHandlers.getMetaData().lastToggleCommand < MIN_USER_INTERACTION_TIME_IN_MS) {
      return false;
    }
    dataHandlers.updateData({ open });
    dataHandlers.updateMetaData({ lastToggleCommand: now });
    if (!open) {
      dataHandlers.updateMetaData({ activeDescendant: undefined });
    }
    return true;
  };

  const setFocusTarget = (focusTarget: SelectMetaData['focusTarget']) => {
    dataHandlers.updateMetaData({
      focusTarget,
    });
  };

  const updateGroups = (groups: SelectData['groups'], clickedOption?: Option) => {
    dataHandlers.updateData({ groups });
    dataHandlers.updateMetaData({
      selectedOptions: createSelectedOptionsList(dataHandlers.getMetaData().selectedOptions, groups),
      didSelectionsChange: true,
      lastClickedOption: clickedOption,
    });
  };

  const { showAllTags } = dataHandlers.getMetaData();

  if (isOpenOrCloseEvent(id, type)) {
    const willOpen = !current.open;
    const didUpdate = openOrClose(willOpen);
    if (didUpdate && willOpen) {
      setFocusTarget(dataHandlers.getMetaData().listInputType ? 'searchOrFilterInput' : 'list');
    }
    return true;
  }

  if (isOptionClickEvent(id, type)) {
    const clickedOption = payload && (payload.value as Option);
    if (!clickedOption) {
      return false;
    }
    // add to docs that the clicked option is updated before onChange
    const updatedOption = {
      ...clickedOption,
      selected: !clickedOption.selected,
    };
    const newGroups = updateSelectedOptionInGroups(current.groups, updatedOption, current.multiSelect);
    updateGroups(newGroups, updatedOption);
    openOrClose(id !== eventIds.tag && current.multiSelect);
    if (id === eventIds.listItem && !current.multiSelect) {
      setFocusTarget('button');
    }
    return true;
  }

  if (isGroupClickEvent(id, type)) {
    const clickedOption = payload && (payload.value as Option);
    if (!clickedOption) {
      return false;
    }
    // add to docs that the clicked option is updated before onChange
    const updatedOption = {
      ...clickedOption,
      selected: !clickedOption.selected,
    };
    const newGroups = updateSelectedGroupOptions(current.groups, updatedOption);
    updateGroups(newGroups, updatedOption);
    return true;
  }

  if (isClearOptionsClickEvent(id, type)) {
    const newGroups = clearAllEnabledSelectedOptions(current.groups);
    updateGroups(newGroups);
    return true;
  }

  if (isOutsideClickEvent(id, type) || isCloseEvent(id, type)) {
    if (openOrClose(false)) {
      setFocusTarget('button');
      return true;
    }
  }

  if (isFilterChangeEvent(id, type)) {
    const filterValue = (payload && (payload.value as string)) || '';
    dataHandlers.updateMetaData({ filter: filterValue });
    dataHandlers.updateData({
      groups: filterOptions(current.groups, filterValue, current.filterFunction as FilterFunction),
    });
    return true;
  }

  if (isSearchChangeEvent(id, type)) {
    const searchValue = (payload && (payload.value as string)) || '';
    dataHandlers.updateMetaData({ search: searchValue, didSearchChange: true });
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
  if (isGenericBlurEvent(id, type) && current.open) {
    return openOrClose(false);
  }
  return false;
};

const executeSearch = (
  searchFunc: SearchFunction,
  search: string,
  selectedOptions: SelectMetaData['selectedOptions'],
  data: SelectData,
): [() => void, Promise<ChangeEvent>] => {
  let isCancelled = false;
  const request = new Promise<ChangeEvent>((resolve) => {
    searchFunc(search as string, selectedOptions, data)
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
    const { cancelCurrentSearch, search, selectedOptions } = dataHandlers.getMetaData();
    if (cancelCurrentSearch) {
      cancelCurrentSearch();
    }
    if (!search) {
      return;
    }
    const [cancel, request] = executeSearch(searchFunc, search, selectedOptions, dataHandlers.getData());
    dataHandlers.updateMetaData({ cancelCurrentSearch: cancel });
    dataHandlers.asyncRequestWithTrigger(request);
  },
  300,
);

export const changeChandler: ChangeHandler<SelectData, SelectMetaData> = (event, dataHandlers): boolean => {
  const { updateMetaData, updateData, getData, getMetaData } = dataHandlers;
  const { onSearch, onChange } = getData();
  dataUpdater(event, dataHandlers);
  // dataUpdater sets these metadata values to "true":
  const { didSearchChange, didSelectionsChange } = getMetaData();

  if (didSearchChange && onSearch) {
    dataHandlers.updateMetaData({ isSearching: !!getMetaData().search, didSearchChange: false });
    debouncedSearch(dataHandlers, onSearch);
  }

  if (didSelectionsChange) {
    const current = getData();
    const { lastClickedOption } = getMetaData();
    const newProps = onChange(getMetaData().selectedOptions, lastClickedOption as Option, current);
    updateMetaData({ didSelectionsChange: false });
    if (newProps) {
      if (newProps.groups) {
        // NOTE: propsToGroups loses group labels selected status:
        const groups = propsToGroups({ groups: newProps.groups }) || [];
        updateData({ groups });
        updateMetaData({
          selectedOptions: createSelectedOptionsList(dataHandlers.getMetaData().selectedOptions, groups),
        });
      }
      const { error, assistiveText } = newProps;
      updateData({ error, assistiveText });
    }
  }
  // needs fixing:
  return true;
};

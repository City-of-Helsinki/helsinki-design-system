import { debounce } from 'lodash';

import { SelectData, SelectDataHandlers, SelectMetaData, FilterFunction, SearchFunction, SearchResult } from './types';
import { Option } from '../modularOptionList/types';
import { ChangeEvent, ChangeHandler, DataHandlers } from '../../dataProvider/DataContext';
import {
  addOrUpdateScreenReaderNotificationByType,
  createScreenReaderNotification,
} from '../shared/utils/screenReader';
import { filterOptions, mergeSearchResultsToCurrent } from './utils';
import {
  getSelectedOptions,
  propsToGroups,
  createMetaDataAfterSelectionChange,
  clearAllSelectedOptions,
} from '../modularOptionList/utils';
import {
  EventId,
  eventIds,
  EventType,
  eventTypes,
  isClearOptionsClickEvent,
  isCloseEvent,
  isCloseOnFocusMoveEvent,
  isFilterChangeEvent,
  isGenericBlurEvent,
  isOpenOrCloseEvent,
  isOutsideClickEvent,
  isRemoveTagEventId,
  isSearchChangeEvent,
  isSearchSuccessEvent,
  isSearchErrorEvent,
  isShowAllClickEvent,
} from './events';
import { appendTexts, getTextKey, getNumberedVariationsTextKey } from './texts';
import { changeHandler as modularOptionListChangeHandler } from '../modularOptionList/dataUpdater';

const MIN_USER_INTERACTION_TIME_IN_MS = 200;

const dataUpdater = (
  event: ChangeEvent,
  dataHandlers: SelectDataHandlers,
): { didSearchChange: boolean; didSelectionsChange: boolean; didDataChange: boolean } => {
  const { id, type, payload } = event as ChangeEvent<EventId, EventType>;
  const current = dataHandlers.getData();
  const returnValue = {
    didSearchChange: false,
    didSelectionsChange: false,
    didDataChange: false,
  };
  if (current.disabled) {
    return returnValue;
  }

  if (isFilterChangeEvent(id, type)) {
    const filterValue = (payload && (payload.value as string)) || '';
    dataHandlers.updateMetaData({ filter: filterValue });
    dataHandlers.updateData({
      groups: filterOptions(current.groups, filterValue, current.filterFunction as FilterFunction),
    });
    return {
      ...returnValue,
      didDataChange: true,
    };
  }

  if (isSearchSuccessEvent(id, type)) {
    dataHandlers.updateMetaData({ isSearching: false, hasSearchError: false });
    dataHandlers.updateData({
      groups: mergeSearchResultsToCurrent(payload?.value as SearchResult, current.groups),
    });

    return {
      ...returnValue,
      didDataChange: true,
    };
  }

  if (isSearchChangeEvent(id, type)) {
    const searchValue = (payload && (payload.value as string)) || '';
    dataHandlers.updateMetaData({ search: searchValue, hasSearchError: false });
    if (!searchValue) {
      dataHandlers.updateData({ groups: mergeSearchResultsToCurrent({}, current.groups) });
    }
    return {
      ...returnValue,
      didSearchChange: true,
      didDataChange: true,
    };
  }

  if (isSearchErrorEvent(id, type)) {
    dataHandlers.updateMetaData({ isSearching: false, hasSearchError: true });
    dataHandlers.updateData({ groups: mergeSearchResultsToCurrent({}, current.groups) });
    return {
      ...returnValue,
      didDataChange: true,
    };
  }

  const didModularOptionListChange = modularOptionListChangeHandler(event, dataHandlers);

  const openOrClose = (open: boolean) => {
    if (current.open === open) {
      return false;
    }
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
    dataHandlers.updateMetaData(
      createMetaDataAfterSelectionChange(groups, dataHandlers.getMetaData().selectedOptions, clickedOption),
    );
  };

  if (didModularOptionListChange) {
    if (id === eventIds.listItem && !current.multiSelect) {
      openOrClose(false);
      setFocusTarget('button');
    } else if (isRemoveTagEventId(id)) {
      const currentMetaData = dataHandlers.getMetaData();
      const remainingOptions = currentMetaData.selectedOptions.length;
      const hasSelectedItems = !!remainingOptions;
      setFocusTarget(hasSelectedItems ? 'tag' : 'button');
      const { lastClickedOption } = currentMetaData;
      if (lastClickedOption) {
        const removalText = getTextKey('tagRemoved', currentMetaData, {
          value: lastClickedOption.label,
        });
        const currentCountText = getNumberedVariationsTextKey('tagsRemaining', currentMetaData, 'selectionCount');
        const notification = createScreenReaderNotification(eventIds.tag, `${removalText} ${currentCountText}`);

        addOrUpdateScreenReaderNotificationByType(notification, dataHandlers);
      }
    }
    return {
      ...returnValue,
      didSelectionsChange: true,
      didDataChange: true,
    };
  }

  if (isOpenOrCloseEvent(id, type)) {
    const willOpen = !current.open;
    const didUpdate = openOrClose(willOpen);
    if (didUpdate && willOpen) {
      setFocusTarget(dataHandlers.getMetaData().listInputType ? 'searchOrFilterInput' : 'list');
    }
    return {
      ...returnValue,
      didDataChange: didUpdate,
    };
  }

  if (isClearOptionsClickEvent(id, type)) {
    const newGroups = clearAllSelectedOptions(current.groups);
    updateGroups(newGroups);
    setFocusTarget('button');
    return {
      ...returnValue,
      didSelectionsChange: true,
      didDataChange: true,
    };
  }

  if (isFilterChangeEvent(id, type)) {
    const filterValue = (payload && (payload.value as string)) || '';
    dataHandlers.updateMetaData({ filter: filterValue });
    dataHandlers.updateData({
      groups: filterOptions(current.groups, filterValue, current.filterFunction as FilterFunction),
    });
    return {
      ...returnValue,
      didDataChange: true,
    };
  }

  if (isShowAllClickEvent(id, type)) {
    const { showAllTags } = dataHandlers.getMetaData();
    dataHandlers.updateMetaData({ showAllTags: !showAllTags });
    if (!showAllTags) {
      // when "Show all" was clicked, move focus to #1 tag
      setFocusTarget('tag');
    } else {
      // when "Show less" was clicked, tell screen reader some tag are hidden
      const notification = createScreenReaderNotification(
        eventIds.tag,
        getTextKey('tagsPartiallyHidden', dataHandlers.getMetaData()) as string,
      );

      addOrUpdateScreenReaderNotificationByType(notification, dataHandlers);
    }
    return {
      ...returnValue,
      didDataChange: true,
    };
  }

  if (isOutsideClickEvent(id, type) || isCloseEvent(id, type)) {
    if (openOrClose(false)) {
      setFocusTarget('button');
      return {
        ...returnValue,
        didDataChange: true,
      };
    }
  }

  if (isCloseOnFocusMoveEvent(id, type) && current.open) {
    return {
      ...returnValue,
      didDataChange: openOrClose(false),
    };
  }

  if (isSearchSuccessEvent(id, type)) {
    dataHandlers.updateMetaData({ isSearching: false, hasSearchError: false });
    dataHandlers.updateData({
      groups: mergeSearchResultsToCurrent(payload?.value as SearchResult, current.groups),
    });

    return {
      ...returnValue,
      didDataChange: true,
    };
  }

  if (isSearchChangeEvent(id, type)) {
    const searchValue = (payload && (payload.value as string)) || '';
    dataHandlers.updateMetaData({ search: searchValue, hasSearchError: false });
    if (!searchValue) {
      dataHandlers.updateData({ groups: mergeSearchResultsToCurrent({}, current.groups) });
    }
    return {
      ...returnValue,
      didSearchChange: true,
      didDataChange: true,
    };
  }

  if (isSearchErrorEvent(id, type)) {
    dataHandlers.updateMetaData({ isSearching: false, hasSearchError: true });
    dataHandlers.updateData({ groups: mergeSearchResultsToCurrent({}, current.groups) });
    return {
      ...returnValue,
      didDataChange: true,
    };
  }
  if (isGenericBlurEvent(id, type) && current.open) {
    return {
      ...returnValue,
      didDataChange: openOrClose(false),
    };
  }
  return returnValue;
};

// payload in resolve() will be triggered to the dataUpdater as an event
// also errors are resolved, so there is no extra need for catching.
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
        } else {
          resolve({ id: eventIds.searchResult, type: eventTypes.success, payload: { value: res } });
        }
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
    // dataHandler will listen to the promise and trigger an event when promise fulfills:
    dataHandlers.asyncRequestWithTrigger(request);
  },
  300,
);

const isCloseTriggerEvent = (event: ChangeEvent) => {
  // check if the event is something that should trigger onClose
  const onCloseTriggerEvents = [
    'cancelled',
    'close',
    'clearButton',
    'clearAllButton',
    'tag',
    'selectedOptions',
    'focusMovedToNonListElement',
  ];

  return onCloseTriggerEvents.includes(event.type || '') || onCloseTriggerEvents.includes(event.id || '');
};

export const changeHandler: ChangeHandler<SelectData, SelectMetaData> = (event, dataHandlers): boolean => {
  const { updateData, updateMetaData, getData, getMetaData } = dataHandlers;

  const { didSearchChange, didSelectionsChange, didDataChange } = dataUpdater(event, dataHandlers);
  const current = getData();

  const { onSearch, onChange, onClose, multiSelect, open } = current;

  const closeChange = multiSelect && isCloseTriggerEvent(event) && !open;
  let closeHasChanges = false;

  if (didSearchChange && onSearch) {
    dataHandlers.updateMetaData({ isSearching: !!getMetaData().search });
    debouncedSearch(dataHandlers, onSearch);
  }

  if (closeChange && onClose) {
    const closeProps = onClose(getSelectedOptions(current.groups), undefined, current);
    if (closeProps) {
      const { groups, options, invalid, texts } = closeProps;
      if (groups || options) {
        const newGroups = propsToGroups(closeProps) || [];
        updateData({ groups: newGroups });
        updateMetaData(
          createMetaDataAfterSelectionChange(newGroups, dataHandlers.getMetaData().selectedOptions, undefined),
        );
      }
      if (invalid !== undefined && invalid !== current.invalid) {
        // update invalid state
        updateData({ invalid });
        closeHasChanges = true;
      }
      if (texts) {
        appendTexts(texts, getMetaData());
        closeHasChanges = true;
      }
    }
  }

  if (didSearchChange && onSearch) {
    dataHandlers.updateMetaData({ isSearching: !!getMetaData().search });
    dataHandlers.updateData({ open: true });
    debouncedSearch(dataHandlers, onSearch);
  }
  if (didSelectionsChange) {
    const { lastClickedOption } = getMetaData();
    const newProps = onChange?.(getSelectedOptions(current.groups), lastClickedOption as Option, current);
    let newPropsHasChanges = false;
    if (newProps) {
      const { groups, options, invalid, texts } = newProps;
      if (groups || options) {
        const newGroups = propsToGroups(newProps) || [];
        updateData({ groups: newGroups });
        updateMetaData(
          createMetaDataAfterSelectionChange(newGroups, dataHandlers.getMetaData().selectedOptions, lastClickedOption),
        );
        newPropsHasChanges = true;
      }
      if (invalid !== undefined && invalid !== current.invalid) {
        updateData({ invalid });
        newPropsHasChanges = true;
      }
      if (texts) {
        appendTexts(texts, getMetaData());
        newPropsHasChanges = true;
      }
    }
    if (newPropsHasChanges) {
      return true;
    }
  }

  return didDataChange || closeHasChanges;
};

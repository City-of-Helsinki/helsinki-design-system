import { debounce } from 'lodash';

import { SearchData, SearchDataHandlers, SearchMetaData, SearchFunction, SearchResult } from './types';
import { Option } from '../modularOptionList/types';
import { ChangeEvent, ChangeHandler, DataHandlers } from '../../dataProvider/DataContext';
import { MIN_USER_INTERACTION_TIME_IN_MS, createIsCloseTriggerEvent } from '../shared';
import { mergeSearchResultsToCurrent } from './utils';
import { getSelectedOptions, propsToGroups, createMetaDataAfterSelectionChange } from '../modularOptionList/utils';
import {
  EventId,
  eventIds,
  EventType,
  eventTypes,
  isClearButtonClickEvent,
  isCloseEvent,
  isCloseOnFocusMoveEvent,
  isOutsideClickEvent,
  isSearchChangeEvent,
  isSearchSuccessEvent,
  isSearchErrorEvent,
  isGenericBlurEvent,
} from './events';
import { appendTexts } from './texts';
import { changeHandler as modularOptionListChangeHandler } from '../modularOptionList/dataUpdater';

const dataUpdater = (
  event: ChangeEvent,
  dataHandlers: SearchDataHandlers,
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

  // Handle modular option list changes by creating a compatible wrapper
  const modularDataHandlers = {
    getData: dataHandlers.getData,
    updateData: dataHandlers.updateData,
    getMetaData: () => {
      const metaData = dataHandlers.getMetaData();
      return {
        ...metaData,
        refs: { list: metaData.refs.list },
        elementIds: { list: metaData.elementIds.list },
      };
    },
    updateMetaData: (newData: unknown) => {
      dataHandlers.updateMetaData(newData as Partial<SearchMetaData>);
      return dataHandlers.getMetaData();
    },
    asyncRequestWithTrigger: dataHandlers.asyncRequestWithTrigger,
  };
  const didModularOptionListChange = modularOptionListChangeHandler(event, modularDataHandlers as never);

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

  const setFocusTarget = (focusTarget: SearchMetaData['focusTarget']) => {
    dataHandlers.updateMetaData({
      focusTarget,
    });
  };

  if (didModularOptionListChange) {
    if (id === eventIds.listItem && !current.multiSelect) {
      openOrClose(false);
      setFocusTarget('searchInput');
    }
    return {
      ...returnValue,
      didSelectionsChange: true,
      didDataChange: true,
    };
  }

  if (isClearButtonClickEvent(id, type)) {
    dataHandlers.updateMetaData({ search: '' });
    dataHandlers.updateData({ groups: mergeSearchResultsToCurrent({}, current.groups) });
    setFocusTarget('searchInput');
    return {
      ...returnValue,
      didSearchChange: true,
      didDataChange: true,
    };
  }

  if (isOutsideClickEvent(id, type) || isCloseEvent(id, type)) {
    if (openOrClose(false)) {
      setFocusTarget('searchInput');
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
  selectedOptions: SearchMetaData['selectedOptions'],
  data: SearchData,
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
  (dataHandlers: DataHandlers<SearchData, SearchMetaData>, searchFunc?: SearchFunction) => {
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

// Event IDs and types that should trigger the onClose callback for Search
const isCloseTriggerEvent = createIsCloseTriggerEvent([
  'cancelled',
  'close',
  'clearButton',
  'focusMovedToNonListElement',
]);

export const changeHandler: ChangeHandler<SearchData, SearchMetaData> = (event, dataHandlers): boolean => {
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

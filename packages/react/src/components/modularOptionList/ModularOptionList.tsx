import { uniqueId } from 'lodash';
import React, { useMemo, createRef, useEffect, forwardRef, useCallback } from 'react';

import {
  ModularOptionListProps,
  ModularOptionListMetaData,
  ModularOptionListData,
  Option,
  AcceptedNativeDivProps,
} from './types';
import { changeHandler } from './dataUpdater';
import { getSelectedOptions, getElementIds, convertPropsToGroups, mutateGroupLabelSelections } from './utils';
import { DataProvider, DataProviderProps } from '../dataProvider/DataProvider';
import { List } from './components/List';
import { createTextProvider } from './texts';
import { eventIds } from './events';
// import { ScreenReaderNotifications } from './components/ScreenReaderNotifications';

import { useModularOptionListDataHandlers } from './hooks/useModularOptionListDataHandlers';

export const checkDataProviderPresence = () => {
  try {
    // Check if dataHandlers itself is valid
    const dataHandlers = useModularOptionListDataHandlers();
    if (!dataHandlers || typeof dataHandlers.getData !== 'function' || typeof dataHandlers.getMetaData !== 'function') {
      return false;
    }

    // Explicitly check if data or metaData is undefined, null, or empty
    const data = dataHandlers.getData();
    const metaData = dataHandlers.getMetaData();
    if (!data || !metaData || Object.keys(data).length === 0 || Object.keys(metaData).length === 0) {
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
};

export const ModularOptionList = forwardRef<
  HTMLButtonElement,
  Omit<ModularOptionListProps & AcceptedNativeDivProps, 'ref'>
>(
  (
    {
      options,
      groups,
      icon,
      required,
      onChange,
      children,
      id,
      onFocus,
      onBlur,
      onClose,
      disabled,
      texts,
      invalid,
      multiSelect,
      noTags,
      visibleOptions,
      virtualize,
      value,
      theme,
      clearable,
      tooltip,
      ...divElementProps
    },
    ref,
  ) => {
    const initialData = useMemo<ModularOptionListData>(() => {
      const data = {
        groups: convertPropsToGroups({ options, groups, value, children }),
        required: !!required,
        invalid: !!invalid,
        disabled: !!disabled,
        multiSelect: !!multiSelect,
        noTags: !!noTags,
        visibleOptions: visibleOptions || 5.5,
        virtualize: !!virtualize,
        onChange,
        onFocus,
        onBlur,
        onClose,
        clearable: !!clearable,
      };
      if (data.multiSelect) {
        mutateGroupLabelSelections(data.groups);
      }
      return data;
    }, [
      options,
      groups,
      onChange,
      disabled,
      invalid,
      required,
      noTags,
      virtualize,
      visibleOptions,
      onFocus,
      onBlur,
      onClose,
      value,
      children,
      clearable,
    ]);

    const metaData = useMemo((): ModularOptionListMetaData => {
      const containerId = `${id || uniqueId('hds-select-')}`;
      const optionIds = new Map<string, string>();
      let optionIdCounter = 0;
      return {
        lastToggleCommand: 0,
        lastClickedOption: undefined,
        icon,
        activeDescendant: undefined,
        refs: {
          button: typeof ref === 'function' ? createRef<HTMLButtonElement>() : ref || createRef<HTMLButtonElement>(),
          listContainer: createRef<HTMLDivElement>(),
          list: createRef<HTMLUListElement>(),
          selectionsAndListsContainer: createRef<HTMLDivElement>(),
          tagList: createRef<HTMLDivElement>(),
          showAllButton: createRef<HTMLButtonElement>(),
          searchOrFilterInput: createRef<HTMLInputElement>(),
          container: createRef<HTMLDivElement>(),
        },
        selectedOptions: getSelectedOptions(initialData.groups),
        elementIds: getElementIds(containerId),
        textProvider: createTextProvider(texts),
        getOptionId: (option: Option) => {
          const identifier = option.isGroupLabel ? `hds-group-${option.label}` : option.value;
          const current = optionIds.get(identifier);
          if (!current) {
            const optionId = `${containerId}-option-${optionIdCounter}`;
            optionIdCounter += 1;
            optionIds.set(identifier, optionId);
            return optionId;
          }
          return current;
        },
        screenReaderNotifications: [],
      };
    }, [id, initialData.groups, texts, ref]);


    // TODO: not sure what this should do
    const onReset: DataProviderProps<ModularOptionListData, ModularOptionListMetaData>['onReset'] = useCallback(
      ({ previousData, currentData, currentMetaData }) => {
        if (currentData) {
          if (previousData) {
            return { ...currentData };
          }
          return currentData;
        }
        return currentMetaData;
      },
      [],
    );
    const isDataProvider = checkDataProviderPresence();
    console.log('isDataProvider', isDataProvider);
    console.log('initialData', initialData);


    return (
       isDataProvider ? (
        <List />
      ) : (
        <DataProvider<ModularOptionListData, ModularOptionListMetaData>
          initialData={initialData}
          metaData={metaData}
          onChange={changeHandler}
          onReset={onReset}
        >
          <List/>
        </DataProvider>
      )
    );
  },
);

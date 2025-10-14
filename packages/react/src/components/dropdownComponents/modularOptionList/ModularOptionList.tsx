import { uniqueId } from 'lodash';
import React, { useMemo, createRef, forwardRef } from 'react';

import {
  ModularOptionListProps,
  ModularOptionListMetaData,
  ModularOptionListData,
  Option,
  AcceptedNativeDivProps,
} from './types';
import { changeHandler } from './dataUpdater';
import { getSelectedOptions, getElementIds, convertPropsToGroups, mutateGroupLabelSelections } from './utils';
import { DataProvider } from '../../dataProvider/DataProvider';
import { List } from './components/List';
import { createTextProvider } from './texts';
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
      onChange,
      children,
      id,
      onFocus,
      onBlur,
      disabled,
      texts,
      invalid,
      multiSelect,
      visibleOptions,
      virtualize,
      value,
    },
    ref,
  ) => {
    const initialData = useMemo<ModularOptionListData>(() => {
      const data = {
        groups: convertPropsToGroups({ options, groups, value, children }),
        invalid: !!invalid,
        disabled: !!disabled,
        multiSelect: !!multiSelect,
        visibleOptions: visibleOptions || 5.5,
        virtualize: !!virtualize,
        onChange,
        onFocus,
        onBlur,
      };
      if (data.multiSelect) {
        mutateGroupLabelSelections(data.groups);
      }
      return data;
    }, [options, groups, onChange, disabled, invalid, virtualize, visibleOptions, onFocus, onBlur, value, children]);

    const metaData = useMemo((): ModularOptionListMetaData => {
      const containerId = `${id || uniqueId('hds-select-')}`;
      const optionIds = new Map<string, string>();
      let optionIdCounter = 0;
      return {
        lastToggleCommand: 0,
        lastClickedOption: undefined,
        activeDescendant: undefined,
        refs: {
          list: createRef<HTMLUListElement>(),
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

    const isDataProvider = checkDataProviderPresence();

    return isDataProvider ? (
      <List />
    ) : (
      <DataProvider<ModularOptionListData, ModularOptionListMetaData>
        initialData={initialData}
        metaData={metaData}
        onChange={changeHandler}
      >
        <List />
      </DataProvider>
    );
  },
);

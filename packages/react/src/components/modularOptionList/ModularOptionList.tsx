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
import { Container } from './components/Container';
import { getSelectedOptions, getElementIds, convertPropsToGroups, mutateGroupLabelSelections } from './utils';
import { DataProvider, DataProviderProps } from '../dataProvider/DataProvider';
import { List } from './components/List';
import { createTextProvider } from './texts';
import { eventIds } from './events';
// import { ScreenReaderNotifications } from './components/ScreenReaderNotifications';

export const ModularOptionList = forwardRef<
  HTMLButtonElement,
  Omit<ModularOptionListProps & AcceptedNativeDivProps, 'ref'>
>(
  (
    {
      options,
      open,
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
      filter,
      onSearch,
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
        open: true,
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
        filterFunction: filter,
        onSearch,
        clearable: !!clearable,
        initialOpenValue: open,
      };
      if (data.multiSelect) {
        mutateGroupLabelSelections(data.groups);
      }
      return data;
    }, [
      options,
      open,
      groups,
      onChange,
      disabled,
      invalid,
      required,
      noTags,
      virtualize,
      visibleOptions,
      onSearch,
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
      const getListInputType = () => {
        if (!initialData.onSearch && !initialData.filterFunction) {
          return undefined;
        }
        return initialData.onSearch ? eventIds.search : eventIds.filter;
      };
      return {
        lastToggleCommand: 0,
        lastClickedOption: undefined,
        showAllTags: false,
        icon,
        activeDescendant: undefined,
        focusTarget: undefined,
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
        listInputType: getListInputType(),
        hasListInput: !!getListInputType(),
        filter: '',
        search: '',
        isSearching: false,
        hasSearchError: false,
        cancelCurrentSearch: undefined,
        screenReaderNotifications: [],
        tooltip,
      };
    }, [id, initialData.groups, initialData.filterFunction, initialData.onSearch, texts, ref]);

    useEffect(() => {
      return () => {
        if (metaData.cancelCurrentSearch) {
          metaData.cancelCurrentSearch();
        }
      };
    }, []);

    const onReset: DataProviderProps<ModularOptionListData, ModularOptionListMetaData>['onReset'] = useCallback(
      ({ previousData, currentData, currentMetaData }) => {
        if (currentData) {
          if (previousData) {
            // if the "open"-prop is explicitly set and has changed, it must be deliberate.
            if (
              typeof currentData.initialOpenValue !== 'undefined' &&
              previousData.initialOpenValue !== currentData.initialOpenValue
            ) {
              return { ...currentData, open: currentData.initialOpenValue };
            }
            // if the list was open prior to the re-render, it should still be
            if (previousData.open) {
              return { ...currentData, open: true };
            }
          }
          return currentData;
        }
        return currentMetaData;
      },
      [],
    );
    console.log('initialData', initialData);
    console.log(Container, theme, divElementProps);

    return (
      <DataProvider<ModularOptionListData, ModularOptionListMetaData>
        initialData={initialData}
        metaData={metaData}
        onChange={changeHandler}
        onReset={onReset}
      >
        <List />
      </DataProvider>
    );
    /*
        <Container {...divElementProps} theme={theme}>
          <List />
        </Container>
    */
  },
);

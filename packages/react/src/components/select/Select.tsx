import { uniqueId } from 'lodash';
import React, { useMemo, createRef, useEffect, forwardRef } from 'react';

import { SelectProps, SelectMetaData, SelectData, Option, AcceptedNativeDivProps } from './types';
import { Container } from './components/Container';
import { Label } from './components/Label';
import { changeHandler } from './dataUpdater';
import { getSelectedOptions, getElementIds, convertPropsToGroups } from './utils';
import { DataProvider } from '../dataProvider/DataProvider';
import { SelectedOptionsContainer } from './components/selectedOptions/SelectedOptionsContainer';
import { SelectionsAndListsContainer } from './components/SelectionsAndListsContainer';
import { List } from './components/list/List';
import { ListAndInputContainer } from './components/list/ListAndInputContainer';
import { SearchOrFilterInput } from './components/list/searchAndFilter/SearchOrFilterInput';
import { SearchAndFilterInfo } from './components/list/searchAndFilter/SearchAndFilterInfo';
import { TagList } from './components/tagList/TagList';
import { ErrorNotification } from './components/Error';
import { AssistiveText } from './components/AssistiveText';
import { createTextProvider } from './texts';
import { eventIds } from './events';
import { ScreenReaderNotifications } from './components/ScreenReaderNotifications';

export const Select = forwardRef<HTMLButtonElement, Omit<SelectProps & AcceptedNativeDivProps, 'ref'>>(
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
    const initialData = useMemo<SelectData>(() => {
      return {
        groups: convertPropsToGroups({ options, groups, value, children }),
        open: !!open,
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
        filterFunction: filter,
        onSearch,
        clearable: !!clearable,
      };
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
      value,
      children,
      clearable,
    ]);

    const metaData = useMemo((): SelectMetaData => {
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

    return (
      <DataProvider<SelectData, SelectMetaData> initialData={initialData} metaData={metaData} onChange={changeHandler}>
        <Container {...divElementProps} theme={theme}>
          <Label />
          <SelectionsAndListsContainer>
            <SelectedOptionsContainer />
            <ListAndInputContainer>
              <SearchOrFilterInput />
              <List />
              <SearchAndFilterInfo />
            </ListAndInputContainer>
          </SelectionsAndListsContainer>
          <ErrorNotification />
          <AssistiveText />
          <TagList />
          <ScreenReaderNotifications />
        </Container>
      </DataProvider>
    );
  },
);

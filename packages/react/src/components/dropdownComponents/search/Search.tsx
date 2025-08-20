import { uniqueId } from 'lodash';
import React, { useMemo, createRef, useEffect, forwardRef, useCallback } from 'react';

import { SelectProps, SelectMetaData, SelectData } from '../select/types';
import { AcceptedNativeDivProps, Option } from '../modularOptionList/types';
import { Container } from '../select/components/Container';
import { Label } from '../select/components/Label';
import { changeHandler } from '../select/dataUpdater';
import { getElementIds } from '../select/utils';
import { DataProvider, DataProviderProps } from '../../dataProvider/DataProvider';
import { SelectionsAndListsContainer } from '../select/components/SelectionsAndListsContainer';
import { ModularOptionList } from '../modularOptionList';
import { ListAndInputContainer } from '../select/components/ListAndInputContainer';
import { TagList } from '../select/components/tagList/TagList';
import { ErrorNotification } from '../select/components/Error';
import { AssistiveText } from '../select/components/AssistiveText';
import { createTextProvider } from '../select/texts';
import { eventIds } from '../select/events';
import { ScreenReaderNotifications } from '../select/components/ScreenReaderNotifications';
import { getSelectedOptions, convertPropsToGroups, mutateGroupLabelSelections } from '../modularOptionList/utils';
import { SearchInput } from '../select/components/searchInput/SearchInput';

export const Search = forwardRef<HTMLButtonElement, Omit<SelectProps & AcceptedNativeDivProps, 'ref'>>(
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
    const initialData = useMemo<SelectData>(() => {
      const data = {
        groups: convertPropsToGroups({ groups, options, value, children }),
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

    const onReset: DataProviderProps<SelectData, SelectMetaData>['onReset'] = useCallback(
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

    return (
      <DataProvider<SelectData, SelectMetaData>
        initialData={initialData}
        metaData={metaData}
        onChange={changeHandler}
        onReset={onReset}
      >
        <Container {...divElementProps} theme={theme}>
          <Label />
          <SelectionsAndListsContainer>
            <SearchInput id={`${id}-searchInput`} />
            <ListAndInputContainer>
              <ModularOptionList {...divElementProps} theme={theme} />
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

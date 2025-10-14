import { uniqueId } from 'lodash';
import React, { useMemo, createRef, useEffect, forwardRef, useCallback } from 'react';

import { SearchProps, SearchMetaData, SearchData } from './types';
import { AcceptedNativeDivProps, Option } from '../modularOptionList/types';
import { Container } from './components/Container';
import { Label } from './components/Label';
import { changeHandler } from './dataUpdater';
import { getElementIds } from './utils';
import { DataProvider, DataProviderProps } from '../../dataProvider/DataProvider';
import { SearchContainer } from './components/SearchContainer';
import { ModularOptionList } from '../modularOptionList';
import { ErrorNotification } from './components/Error';
import { AssistiveText } from './components/AssistiveText';
import { createTextProvider } from './texts';
import { ScreenReaderNotifications } from './components/ScreenReaderNotifications';
import { getSelectedOptions, convertPropsToGroups, mutateGroupLabelSelections } from '../modularOptionList/utils';
import { SearchInput } from './components/SearchInput';

export const Search = forwardRef<HTMLInputElement, Omit<SearchProps & AcceptedNativeDivProps, 'ref'>>(
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
      visibleOptions,
      virtualize,
      onSearch,
      value,
      theme,
      clearable,
      tooltip,
      placeholder,
      ...divElementProps
    },
    ref,
  ) => {
    const initialData = useMemo<SearchData>(() => {
      const data = {
        groups: convertPropsToGroups({ groups, options, value, children }),
        open: !!open,
        required: !!required,
        invalid: !!invalid,
        disabled: !!disabled,
        multiSelect: !!multiSelect,
        visibleOptions: visibleOptions || 5.5,
        virtualize: !!virtualize,
        onChange,
        onFocus,
        onBlur,
        onClose,
        onSearch,
        clearable: !!clearable,
        initialOpenValue: open,
        placeholder,
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
      virtualize,
      visibleOptions,
      onSearch,
      onFocus,
      onBlur,
      onClose,
      value,
      children,
      clearable,
      placeholder,
    ]);

    const metaData = useMemo((): SearchMetaData => {
      const containerId = `${id || uniqueId('hds-search-')}`;
      const optionIds = new Map<string, string>();
      let optionIdCounter = 0;
      return {
        lastToggleCommand: 0,
        lastClickedOption: undefined,
        icon,
        activeDescendant: undefined,
        focusTarget: undefined,
        refs: {
          searchInput: typeof ref === 'function' ? createRef<HTMLInputElement>() : ref || createRef<HTMLInputElement>(),
          listContainer: createRef<HTMLDivElement>(),
          list: createRef<HTMLUListElement>(),
          searchContainer: createRef<HTMLDivElement>(),
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
        hasSearchInput: !!onSearch,
        search: '',
        isSearching: false,
        hasSearchError: false,
        cancelCurrentSearch: undefined,
        screenReaderNotifications: [],
        tooltip,
      };
    }, [id, initialData.groups, onSearch, texts, ref]);

    useEffect(() => {
      return () => {
        if (metaData.cancelCurrentSearch) {
          metaData.cancelCurrentSearch();
        }
      };
    }, []);

    const onReset: DataProviderProps<SearchData, SearchMetaData>['onReset'] = useCallback(
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
      <DataProvider<SearchData, SearchMetaData>
        initialData={initialData}
        metaData={metaData}
        onChange={changeHandler}
        onReset={onReset}
      >
        <Container {...divElementProps} theme={theme}>
          <Label />
          <SearchContainer>
            <SearchInput />
            <ModularOptionList {...divElementProps} theme={theme} />
          </SearchContainer>
          <ErrorNotification />
          <AssistiveText />
          <ScreenReaderNotifications />
        </Container>
      </DataProvider>
    );
  },
);

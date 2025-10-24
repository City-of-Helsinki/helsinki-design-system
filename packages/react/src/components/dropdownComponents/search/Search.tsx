import { uniqueId } from 'lodash';
import React, { useMemo, createRef, useEffect, forwardRef } from 'react';

import { SearchData, SearchMetaData, SearchProps as SearchPropsType } from './types';
import { SearchHistoryProvider } from './SearchHistoryContext';
import { AcceptedNativeDivProps, Option } from '../modularOptionList/types';
import { Container } from './components/Container';
import { Label } from './components/Label';
import { changeHandler } from './dataUpdater';
import { getElementIds } from './utils';
import { DataProvider } from '../../dataProvider/DataProvider';
import { SelectionsAndListsContainer } from '../select/components/SelectionsAndListsContainer';
import { ModularOptionList } from '../modularOptionList';
import { ListAndInputContainer } from '../select/components/ListAndInputContainer';
import { ErrorNotification } from './components/Error';
import { AssistiveText } from './components/AssistiveText';
import { createTextProvider } from './texts';
import { ScreenReaderNotifications } from './components/ScreenReaderNotifications';
import { getSelectedOptions, convertPropsToGroups } from '../modularOptionList/utils';
import { SearchInput } from './components/SearchInput';
import { SearchInfo } from './components/SearchInfo';

export type SearchFieldProps = Omit<SearchPropsType & AcceptedNativeDivProps, 'ref' | 'onChange' | 'value'> & {
  onSend?: (value: string) => void;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  value?: string;
};

const SearchField = forwardRef<HTMLInputElement, SearchFieldProps>(
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
      visibleOptions,
      virtualize,
      onSearch,
      onSend,
      value,
      theme,
      tooltip,
      ...divElementProps
    },
    ref,
  ) => {
    const initialData = useMemo<SearchData>(() => {
      return {
        groups: convertPropsToGroups({ groups, options, children }),
        open: false,
        required: !!required,
        invalid: !!invalid,
        disabled: !!disabled,
        multiSelect: false,
        visibleOptions: visibleOptions || 5.5,
        virtualize: !!virtualize,
        onChange: undefined,
        onFocus,
        onBlur,
        onClose,
        onSearch,
        clearable: false,
        initialOpenValue: false,
      };
    }, [
      // Note: DO NOT include props that change frequently (open, value, callbacks)
      // They would cause recalculation and reset internal DataProvider state
      options,
      groups,
      disabled,
      invalid,
      required,
      virtualize,
      visibleOptions,
      children,
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
          listContainer: createRef<HTMLDivElement>(),
          list: createRef<HTMLUListElement>(),
          searchContainer: createRef<HTMLDivElement>(),
          searchInput: typeof ref === 'function' ? createRef<HTMLInputElement>() : ref || createRef<HTMLInputElement>(),
          container: createRef<HTMLDivElement>(),
        },
        selectedOptions: getSelectedOptions(initialData.groups),
        elementIds: {
          ...getElementIds(containerId),
          searchInput: `${containerId}-search-input`,
          searchContainer: `${containerId}-search-container`,
          container: `${containerId}-container`,
          searchInputLabel: `${containerId}-search-input-label`,
          clearButton: `${containerId}-clear-button`,
          label: `${containerId}-label`,
        },
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
        hasSearchInput: true,
        search: '',
        isSearching: false,
        hasSearchError: false,
        cancelCurrentSearch: undefined,
        screenReaderNotifications: [],
        tooltip,
      };
    }, [id, initialData.groups, initialData.onSearch, texts, ref]);

    useEffect(() => {
      return () => {
        if (metaData.cancelCurrentSearch) {
          metaData.cancelCurrentSearch();
        }
      };
    }, []);

    return (
      <DataProvider<SearchData, SearchMetaData> initialData={initialData} metaData={metaData} onChange={changeHandler}>
        <Container {...divElementProps} theme={theme}>
          <Label />
          <SelectionsAndListsContainer>
            <ListAndInputContainer>
              <SearchInput
                id={`${id}-search-input`}
                onSearch={onSearch}
                onSend={onSend}
                onChange={onChange}
                value={value}
                ref={metaData.refs.searchInput}
              />
              <ModularOptionList {...divElementProps} theme={theme} />
              <SearchInfo />
            </ListAndInputContainer>
          </SelectionsAndListsContainer>
          <ErrorNotification />
          <AssistiveText />
          <ScreenReaderNotifications />
        </Container>
      </DataProvider>
    );
  },
);

export type SearchProps = SearchFieldProps & {
  historyId?: string;
};

export const Search = forwardRef<HTMLInputElement, SearchProps>((props, ref) => {
  const { historyId, ...rest } = props;
  return (
    <SearchHistoryProvider historyId={historyId}>
      <SearchField {...rest} ref={ref} />
    </SearchHistoryProvider>
  );
});

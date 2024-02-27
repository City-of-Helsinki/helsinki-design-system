import uniqueId from 'lodash.uniqueid';
import React, { ReactElement, useMemo, createRef } from 'react';

import { SelectProps, SelectMetaData, SelectData } from './types';
import { Container } from './components/Container';
import { Label } from './components/Label';
import { changeChandler } from './dataUpdater';
import { propsToGroups, childrenToGroups } from './utils';
import { DataProvider } from '../dataProvider/DataProvider';
import { SelectedOptions } from './components/SelectedOptions';
import { SelectionsAndListsContainer } from './components/SelectionsAndListsContainer';
import { OptionsList } from './components/OptionsList';
import { ListAndInputContainer } from './components/ListAndInputContainer';
import { ErrorNotification } from './components/Error';
import { AssistiveText } from './components/AssistiveText';
import { FilterInput } from './components/FilterInput';
import { SearchInput } from './components/SearchInput';
import { SearchAndFilterInfo } from './components/SearchAndFilterInfo';
import { TagList } from './components/TagList';

export function Select({
  options,
  open,
  groups,
  multiSelect,
  showFiltering,
  showSearch,
  placeholder,
  icon,
  required,
  onChange,
  onSearch,
  children,
  assistiveText,
  virtualize,
  id,
  onFocus,
  onBlur,
  error,
  disabled,
}: SelectProps<ReactElement<HTMLOptGroupElement | HTMLOptionElement>>) {
  const initialData = useMemo<SelectData>(() => {
    return {
      groups: propsToGroups({ options, groups }) || childrenToGroups(children) || [],
      label: 'Label',
      open: !!open,
      required: !!required,
      disabled: !!disabled,
      multiSelect: !!multiSelect,
      showFiltering: !!showFiltering,
      showSearch: !!showSearch,
      virtualize: !!virtualize,
      placeholder: placeholder || '',
      assistiveText: assistiveText || '',
      error: error || '',
      onSearch,
      onChange,
      onFocus,
      onBlur,
    };
  }, [options, open, groups, disabled]);

  const metaData = useMemo((): SelectMetaData => {
    const containerId = `${id || uniqueId('hds-select-')}`;
    return {
      searchUpdate: -1,
      selectionUpdate: -1,
      filter: '',
      search: '',
      isSearching: false,
      showAllTags: false,
      cancelCurrentSearch: undefined,
      focusTarget: undefined,
      lastClickedOption: undefined,
      icon,
      refs: {
        listContainer: createRef<HTMLDivElement>(),
        list: createRef<HTMLUListElement>(),
        selectContainer: createRef<HTMLDivElement>(),
        tagList: createRef<HTMLDivElement>(),
        showAllButton: createRef<HTMLButtonElement>(),
        selectionButton: createRef<HTMLButtonElement>(),
        filterOrSearchInput: createRef<HTMLInputElement>(),
      },
      elementIds: {
        container: containerId,
        button: `${containerId}-main-button`,
        clearButton: `${containerId}-clear-button`,
        arrowButton: `${containerId}-arrow-button`,
        label: `${containerId}-label`,
        tagList: `${containerId}-tag-list`,
        searchOrFilterInput: `${containerId}-input-element`,
      },
    };
  }, [id]);

  // unmount => cancel asyncs

  return (
    <DataProvider<SelectData, SelectMetaData> initialData={initialData} metaData={metaData} onChange={changeChandler}>
      <Container>
        <Label />
        <SelectionsAndListsContainer>
          <SelectedOptions />
          <ListAndInputContainer>
            {initialData.showFiltering && <FilterInput />}
            {initialData.showSearch && <SearchInput />}
            <OptionsList />
            <SearchAndFilterInfo />
          </ListAndInputContainer>
        </SelectionsAndListsContainer>
        <ErrorNotification />
        <AssistiveText />
        {initialData.multiSelect && <TagList />}
      </Container>
    </DataProvider>
  );
}

import { uniqueId } from 'lodash';
import React, { ReactElement, useMemo, createRef } from 'react';

import { SelectProps, SelectMetaData, SelectData } from './types';
import { Container } from './components/Container';
import { Label } from './components/Label';
import { changeChandler } from './dataUpdater';
import { propsToGroups, childrenToGroups } from './utils';
import { DataProvider } from '../dataProvider/DataProvider';
import { SelectedOptionsContainer } from './components/selectedOptions/SelectedOptionsContainer';
import { SelectionsAndListsContainer } from './components/SelectionsAndListsContainer';
import { OptionsList } from './components/dropdown/OptionsList';
import { ListAndInputContainer } from './components/dropdown/ListAndInputContainer';
import { ErrorNotification } from './components/Error';
import { AssistiveText } from './components/AssistiveText';
import { FilterInput } from './components/dropdown/FilterInput';
import { SearchInput } from './components/dropdown/SearchInput';
import { SearchAndFilterInfo } from './components/dropdown/SearchAndFilterInfo';
import { TagList } from './components/tagList/TagList';
import { ArrowButton } from './components/selectedOptions/ArrowButton';
import { ButtonWithSelectedOptions } from './components/selectedOptions/ButtonWithSelectedOptions';
import { ClearButton } from './components/selectedOptions/ClearButton';

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
      lastToggleCommand: 0,
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
        list: `${containerId}-list`,
        clearButton: `${containerId}-clear-button`,
        arrowButton: `${containerId}-arrow-button`,
        label: `${containerId}-label`,
        tagList: `${containerId}-tag-list`,
        searchOrFilterInput: `${containerId}-input-element`,
        selectionsAndListsContainer: `${containerId}-sl-container`,
      },
    };
  }, [id]);

  // unmount => cancel asyncs

  return (
    <DataProvider<SelectData, SelectMetaData> initialData={initialData} metaData={metaData} onChange={changeChandler}>
      <Container>
        <Label />
        <SelectionsAndListsContainer>
          <SelectedOptionsContainer>
            <ButtonWithSelectedOptions />
            <ClearButton />
            <ArrowButton />
          </SelectedOptionsContainer>
          <ListAndInputContainer>
            <FilterInput />
            <SearchInput />
            <OptionsList />
            <SearchAndFilterInfo />
          </ListAndInputContainer>
        </SelectionsAndListsContainer>
        <ErrorNotification />
        <AssistiveText />
        <TagList />
      </Container>
    </DataProvider>
  );
}

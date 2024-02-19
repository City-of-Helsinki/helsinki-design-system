import uniqueId from 'lodash.uniqueid';
import React, { ReactElement, useMemo, createRef } from 'react';

import { SelectProps, SelectMetaData, SelectData } from './types';
import { Container } from './components/Container';
import { Label } from './components/Label';
import { changeChandler } from './dataUpdater';
import { propsToGroups, childrenToGroups } from './utils';
import DataContainer from '../dataContext/DataContext';
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
}: SelectProps<ReactElement<HTMLOptGroupElement | HTMLOptionElement>>) {
  const initialData = useMemo<SelectData>(
    () => ({
      groups: propsToGroups({ options, groups }) || childrenToGroups(children) || [],
      label: 'Label',
      open: !!open,
      required: !!required,
      multiSelect: !!multiSelect,
      showFiltering: !!showFiltering,
      showSearch: !!showSearch,
      virtualize: !!virtualize,
      placeholder: placeholder || '',
      assistiveText: assistiveText || '',
      onSearch,
      onChange,
    }),
    [options, open, groups],
  );
  const metaData = useMemo((): SelectMetaData => {
    const containerId = `${id || uniqueId('hds-select')}`;
    return {
      listContainerRef: createRef<HTMLDivElement>(),
      listRef: createRef<HTMLUListElement>(),
      selectContainerRef: createRef<HTMLDivElement>(),
      tagListRef: createRef<HTMLDivElement>(),
      showAllButtonRef: createRef<HTMLButtonElement>(),
      selectionButtonRef: createRef<HTMLButtonElement>(),
      searchUpdate: -1,
      selectionUpdate: -1,
      filter: '',
      search: '',
      isSearching: false,
      showAllTags: false,
      cancelCurrentSearch: undefined,
      lastEventTarget: undefined,
      icon,
      elementIds: {
        button: `${containerId}-button`,
        label: `${containerId}-label`,
        tagList: `${containerId}-tag-list`,
        container: containerId,
      },
    };
  }, [id]);

  // unmount => cancel asyncs

  return (
    <DataContainer<SelectData, SelectMetaData> initialData={initialData} metaData={metaData} onChange={changeChandler}>
      <Container>
        <Label key="label" />
        <SelectionsAndListsContainer key="selectionsAndListsContainer">
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
    </DataContainer>
  );
}

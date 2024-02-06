import React, { createRef, ReactElement, useMemo } from 'react';

import { OptionsList } from './components/OptionsList';
import { SelectedOptions } from './components/SelectedOptions';
import { Group } from '../group/Group';
import { ChangeHandler } from '../group/utils';
import { SelectProps, SelectData, groupIds } from '.';
import {
  getMetaDataFromController,
  getSelectDataFromController,
  getSelectedOptions,
  mergeSearchResultsToCurrent,
  propsToGroups,
} from './utils';
import { TrackEvents } from './components/TrackEvents';
import { Label } from './components/Label';
import { SelectionsAndListsContainer } from './components/SelectionsAndListsContainer';
import { selectPropSetter } from './propSetters';
import { groupDataUpdater } from './groupDataUpdater';
import { Container } from './components/Container';
import { FilterInput } from './components/FilterInput';
import { ListAndInputContainer } from './components/ListAndInputContainer';
import { SearchAndFilterInfo } from './components/SearchAndFilterInfo';
import { SearchInput } from './components/SearchInput';
import { Error } from './components/Error';
import { AssistiveText } from './components/AssistiveText';

export function Select({
  options,
  open,
  groups,
  multiSelect,
  showFiltering,
  showSearch,
  placeholder,
  onChange,
  onSearch,
}: SelectProps<ReactElement<HTMLOptGroupElement | HTMLOptionElement>>) {
  const initialData = useMemo(
    () => ({
      groups: propsToGroups({ options, groups }),
      label: 'Label',
      open: !!open,
      multiSelect: !!multiSelect,
      showFiltering: !!showFiltering,
      showSearch: !!showSearch,
      placeholder: placeholder || '',
    }),
    [options, open],
  );
  const metaData = useMemo(
    () => ({
      listContainerRef: createRef<HTMLElement>(),
      searchUpdate: -1,
      selectionUpdate: -1,
      idPrefix: 'select-',
      filter: '',
      search: '',
      isSearching: false,
      currentSearchPromise: null,
    }),
    [],
  );
  const handleChanges: ChangeHandler = (changeProps) => {
    const { controller } = changeProps;
    const { updateMetaData, updateData } = controller;
    const getData = () => getSelectDataFromController(controller);
    const getMetaData = () => getMetaDataFromController(controller);
    const lastSelectionUpdate = getMetaData().selectionUpdate;
    const lastSearchUpdate = getMetaData().searchUpdate;

    groupDataUpdater(changeProps);

    if (getMetaData().searchUpdate > lastSearchUpdate && onSearch) {
      const current = getData() as SelectData;
      updateMetaData({ isSearching: true });
      onSearch(
        getMetaData().search as string,
        getSelectedOptions(current.groups).map((opt) => opt.value),
        current,
      )
        .then((res) => {
          updateMetaData({ isSearching: false });
          updateData({ data: { groups: mergeSearchResultsToCurrent(res, current.groups) } });
        })
        .catch(() => {
          // ignore
        });
    }
    if (getMetaData().selectionUpdate !== lastSelectionUpdate) {
      const current = getData() as SelectData;
      const newProps = onChange(
        getSelectedOptions(current.groups).map((opt) => opt.value),
        current,
      );
      updateMetaData({ selectionUpdate: Date.now() });
      if (newProps) {
        updateData({ data: newProps });
      }
    }
  };

  return (
    <Group initialData={initialData} metaData={metaData} onChange={handleChanges} propSetter={selectPropSetter}>
      {({ controller }) => {
        return (
          <Container data-hds-group-id={groupIds.container}>
            <Label data-hds-group-id={groupIds.label} />
            <SelectionsAndListsContainer data-hds-group-id={groupIds.selectionsAndLists}>
              <SelectedOptions data-hds-group-id={groupIds.selectedOptions} />
              <ListAndInputContainer data-hds-group-id={groupIds.listAndInputContainer}>
                {initialData.showFiltering && <FilterInput data-hds-group-id={groupIds.filter} key={groupIds.filter} />}
                {initialData.showSearch && <SearchInput data-hds-group-id={groupIds.search} key={groupIds.search} />}
                <OptionsList data-hds-group-id={groupIds.list} />
                <SearchAndFilterInfo data-hds-group-id={groupIds.searchAndFilterInfo} />
              </ListAndInputContainer>
            </SelectionsAndListsContainer>
            <Error groupId={groupIds.error} />
            <AssistiveText groupId={groupIds.assistiveText} />
            <TrackEvents controller={controller} listElementRef={metaData.listContainerRef} key="tracker" />
          </Container>
        );
      }}
    </Group>
  );
}

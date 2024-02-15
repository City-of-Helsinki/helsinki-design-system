import uniqueId from 'lodash.uniqueid';
import React, { ReactElement, useMemo, createRef } from 'react';

import { SelectProps, SelectMetaData, SelectData, SearchFunction } from './types';
import { Container } from './components/Container';
import { Label } from './components/Label';
import { dataUpdater } from './dataUpdater';
import { propsToGroups, getSelectedOptions } from './utils';
import DataContainer, { ChangeEvent, ChangeHandler } from '../dataContext/DataContext';
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
import { eventIds, eventTypes } from './events';

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
  id,
}: SelectProps<ReactElement<HTMLOptGroupElement | HTMLOptionElement>>) {
  const initialData = useMemo(
    () => ({
      groups: propsToGroups({ options, groups }),
      label: 'Label',
      open: !!open,
      required: !!required,
      multiSelect: !!multiSelect,
      showFiltering: !!showFiltering,
      showSearch: !!showSearch,
      placeholder: placeholder || '',
    }),
    [options, open],
  );
  const metaData: SelectMetaData = useMemo(() => {
    const containerId = `${id || uniqueId('hds-select')}`;
    return {
      listContainerRef: createRef<HTMLDivElement>(),
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
      icon,
      elementIds: {
        button: `${containerId}-button`,
        label: `${containerId}-label`,
        tagList: `${containerId}-tag-list`,
        container: containerId,
      },
    };
  }, [id]);

  const executeSearch = (search: string, searchFunc: SearchFunction): [() => void, Promise<ChangeEvent>] => {
    let isCancelled = false;
    const request = new Promise<ChangeEvent>((resolve) => {
      searchFunc(search as string, [], {} as SelectData)
        .then((res) => {
          if (isCancelled) {
            resolve({ id: eventIds.searchResult, type: eventTypes.cancelled });
          }
          resolve({ id: eventIds.searchResult, type: eventTypes.success, payload: { value: res } });
        })
        .catch(() => {
          resolve({ id: eventIds.searchResult, type: eventTypes.error });
        });
    });
    const cancel = () => {
      isCancelled = true;
    };
    return [cancel, request];
  };

  const handleChanges: ChangeHandler<SelectData, SelectMetaData> = (event, tools): boolean => {
    const { updateMetaData, updateData, getData, getMetaData, asyncRequestWithTrigger } = tools;
    const lastSelectionUpdate = getMetaData().selectionUpdate;
    const lastSearchUpdate = getMetaData().searchUpdate;
    dataUpdater(event, tools);

    if (getMetaData().searchUpdate > lastSearchUpdate && onSearch) {
      const { cancelCurrentSearch, search } = getMetaData();
      if (cancelCurrentSearch) {
        cancelCurrentSearch();
      }
      // const current = getData();
      const [cancel, request] = executeSearch(search, onSearch);
      updateMetaData({ isSearching: true, cancelCurrentSearch: cancel });
      asyncRequestWithTrigger(request);
      /* onSearch(
        getMetaData().search as string,
        getSelectedOptions(current.groups).map((opt) => opt.value),
        current,
      )
        .then((res) => {
          console.log('then', res);
          updateMetaData({ isSearching: false });
          updateData({ groups: mergeSearchResultsToCurrent(res, current.groups) });
        })
        .catch(() => {
          // ignore
        });
        */
    }
    if (getMetaData().selectionUpdate !== lastSelectionUpdate) {
      const current = getData();
      const newProps = onChange(
        getSelectedOptions(current.groups).map((opt) => opt.value),
        current,
      );
      updateMetaData({ selectionUpdate: Date.now() });
      if (newProps) {
        updateData(newProps);
      }
    }
    // needs fixing:
    return true;
  };

  // unmount => cancel asyncs

  return (
    <DataContainer<SelectData, SelectMetaData> initialData={initialData} metaData={metaData} onChange={handleChanges}>
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

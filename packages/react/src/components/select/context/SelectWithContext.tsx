import uniqueId from 'lodash.uniqueid';
import React, { ReactElement, useMemo, createRef } from 'react';

import { SelectProps, SelectMetaData, SelectData } from '..';
import { Container } from './components/Container';
import { Label } from './components/Label';
/* import { AssistiveText } from '../components/AssistiveText';
import { FilterInput } from '../components/FilterInput';
import { ListAndInputContainer } from '../components/ListAndInputContainer';
import { OptionsList } from '../components/OptionsList';
import { SearchAndFilterInfo } from '../components/SearchAndFilterInfo';
import { SearchInput } from '../components/SearchInput';
import { SelectedOptions } from '../components/SelectedOptions';
import { SelectionsAndListsContainer } from '../components/SelectionsAndListsContainer';
import { TagList } from '../components/TagList';
import { Error } from '../components/Error';
import { TrackEvents } from '../components/TrackEvents';
import { groupIds } from '../groupData'; */
import { groupDataUpdater } from './groupDataUpdater';
import { propsToGroups, getSelectedOptions, mergeSearchResultsToCurrent } from '../utils';
import DataContainer, { ChangeHandler } from './DataContext';
import { SelectedOptions } from './components/SelectedOptions';
import { SelectionsAndListsContainer } from './components/SelectionsAndListsContainer';

export function SelectWitContext({
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
      currentSearchPromise: undefined,
      icon,
      elementIds: {
        button: `${containerId}-button`,
        label: `${containerId}-label`,
        tagList: `${containerId}-tag-list`,
        container: containerId,
      },
    };
  }, [id]);
  const handleChanges: ChangeHandler<SelectData, SelectMetaData> = (event, tools): boolean => {
    const { updateMetaData, updateData, getData, getMetaData } = tools;
    const lastSelectionUpdate = getMetaData().selectionUpdate;
    const lastSearchUpdate = getMetaData().searchUpdate;

    groupDataUpdater(event, tools);

    if (getMetaData().searchUpdate > lastSearchUpdate && onSearch) {
      const current = getData();
      updateMetaData({ isSearching: true });
      onSearch(
        getMetaData().search as string,
        getSelectedOptions(current.groups).map((opt) => opt.value),
        current,
      )
        .then((res) => {
          updateMetaData({ isSearching: false });
          updateData({ groups: mergeSearchResultsToCurrent(res, current.groups) });
        })
        .catch(() => {
          // ignore
        });
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

  return (
    <DataContainer<SelectData, SelectMetaData> initialData={initialData} metaData={metaData} onChange={handleChanges}>
      <Container>
        <Label />
        <SelectionsAndListsContainer>
          <SelectedOptions />
        </SelectionsAndListsContainer>
      </Container>
    </DataContainer>
  );
}

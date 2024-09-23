import { uniqueId } from 'lodash';
import React, { useMemo, createRef } from 'react';

import { SelectProps, SelectMetaData, SelectData, Option } from './types';
import { Container } from './components/Container';
import { Label } from './components/Label';
import { changeHandler } from './dataUpdater';
import { propsToGroups, childrenToGroups, getSelectedOptions, getElementIds } from './utils';
import { DataProvider } from '../dataProvider/DataProvider';
import { SelectedOptionsContainer } from './components/selectedOptions/SelectedOptionsContainer';
import { SelectionsAndListsContainer } from './components/SelectionsAndListsContainer';
import { List } from './components/list/List';
import { ListAndInputContainer } from './components/list/ListAndInputContainer';
import { TagList } from './components/tagList/TagList';
import { ArrowButton } from './components/selectedOptions/ArrowButton';
import { ButtonWithSelectedOptions } from './components/selectedOptions/ButtonWithSelectedOptions';
import { ClearButton } from './components/selectedOptions/ClearButton';
import { ErrorNotification } from './components/Error';
import { AssistiveText } from './components/AssistiveText';
import { createTextProvider } from './texts';

export function Select({
  options,
  open,
  groups,
  icon,
  required,
  onChange,
  children,
  id,
  disabled,
  texts,
  invalid,
  multiSelect,
  noTags,
  visibleOptions,
  virtualize,
}: SelectProps) {
  const initialData = useMemo<SelectData>(() => {
    return {
      groups: propsToGroups({ options, groups }) || childrenToGroups(children) || [],
      open: !!open,
      required: !!required,
      invalid: !!invalid,
      disabled: !!disabled,
      multiSelect: !!multiSelect,
      noTags: !!noTags,
      visibleOptions: visibleOptions || 5.5,
      virtualize: !!virtualize,
      onChange,
    };
  }, [options, open, groups, onChange, disabled, invalid, required, noTags, virtualize, visibleOptions]);

  const metaData = useMemo((): SelectMetaData => {
    const containerId = `${id || uniqueId('hds-select-')}`;
    const optionIds = new Map<string, string>();
    let optionIdCounter = 0;
    return {
      lastToggleCommand: 0,
      lastClickedOption: undefined,
      showAllTags: false,
      icon,
      refs: {
        listContainer: createRef<HTMLDivElement>(),
        list: createRef<HTMLUListElement>(),
        selectContainer: createRef<HTMLDivElement>(),
        selectionButton: createRef<HTMLButtonElement>(),
        tagList: createRef<HTMLDivElement>(),
        showAllButton: createRef<HTMLButtonElement>(),
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
    };
  }, [id, initialData.groups]);

  return (
    <DataProvider<SelectData, SelectMetaData> initialData={initialData} metaData={metaData} onChange={changeHandler}>
      <Container>
        <Label />
        <SelectionsAndListsContainer>
          <SelectedOptionsContainer>
            <ButtonWithSelectedOptions />
            <ClearButton />
            <ArrowButton />
          </SelectedOptionsContainer>
          <ListAndInputContainer>
            <List />
          </ListAndInputContainer>
        </SelectionsAndListsContainer>
        <ErrorNotification />
        <AssistiveText />
        <TagList />
      </Container>
    </DataProvider>
  );
}

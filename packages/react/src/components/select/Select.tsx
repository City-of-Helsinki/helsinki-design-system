import { uniqueId } from 'lodash';
import React, { useMemo, createRef } from 'react';

import { SelectProps, SelectMetaData, SelectData } from './types';
import { Container } from './components/Container';
import { Label } from './components/Label';
import { changeChandler } from './dataUpdater';
import { propsToGroups, childrenToGroups, getSelectedOptions } from './utils';
import { DataProvider } from '../dataProvider/DataProvider';
import { SelectedOptionsContainer } from './components/selectedOptions/SelectedOptionsContainer';
import { SelectionsAndListsContainer } from './components/SelectionsAndListsContainer';
import { List } from './components/list/List';
import { ListAndInputContainer } from './components/list/ListAndInputContainer';
import { ArrowButton } from './components/selectedOptions/ArrowButton';
import { ButtonWithSelectedOptions } from './components/selectedOptions/ButtonWithSelectedOptions';
import { ClearButton } from './components/selectedOptions/ClearButton';

export function Select({
  options,
  open,
  groups,
  placeholder,
  icon,
  label,
  required,
  onChange,
  children,
  id,
  disabled,
  invalid,
}: SelectProps) {
  const initialData = useMemo<SelectData>(() => {
    return {
      groups: propsToGroups({ options, groups }) || childrenToGroups(children) || [],
      label,
      open: !!open,
      required: !!required,
      invalid: !!invalid,
      disabled: !!disabled,
      placeholder: placeholder || '',
      onChange,
    };
  }, [options, label, open, groups, onChange, placeholder, disabled, invalid, required]);

  const metaData = useMemo((): SelectMetaData => {
    const containerId = `${id || uniqueId('hds-select-')}`;
    return {
      lastToggleCommand: 0,
      lastClickedOption: undefined,
      icon,
      refs: {
        listContainer: createRef<HTMLDivElement>(),
        list: createRef<HTMLUListElement>(),
        selectContainer: createRef<HTMLDivElement>(),
        selectionButton: createRef<HTMLButtonElement>(),
      },
      selectedOptions: getSelectedOptions(initialData.groups),
      elementIds: {
        container: containerId,
        button: `${containerId}-main-button`,
        list: `${containerId}-list`,
        clearButton: `${containerId}-clear-button`,
        arrowButton: `${containerId}-arrow-button`,
        label: `${containerId}-label`,
        selectionsAndListsContainer: `${containerId}-sl-container`,
      },
    };
  }, [id, initialData.groups]);

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
            <List />
          </ListAndInputContainer>
        </SelectionsAndListsContainer>
      </Container>
    </DataProvider>
  );
}

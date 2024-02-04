import React, { createRef, ReactElement, useMemo } from 'react';

import { OptionsList, optionsListPropSetter, UlElementProps } from './components/OptionsList';
import { SelectButton, ButtonElementProps, selectButtonPropSetter } from './components/SelectButton';
import { Group } from '../group/Group';
import { selectWrapperPropSetter, DivElementProps, SelectWrapperX } from './components/SelectWrapper';
import { ChangeHandler, GroupProps, PropSetter } from '../group/utils';
import { SelectProps, Option, SelectData } from '.';
import {
  filterOptions,
  getSelectDataFromController,
  getSelectedOptions,
  propsToGroups,
  updateControllerSelectData,
  updateSelectedGroupOptions,
  updateSelectedOptionInGroups,
} from './utils';
import { TrackEvents } from './components/TrackEvents';
import { SelectLabel, selectLabelPropSetter, LabelElementProps } from './components/SelectLabel';
import { selectBorderedContainerPropSetter, SelectBorderedContainerX } from './components/SelectBorderedContainer';
import { AssistiveText, Error, FilterInput, ListAndInputContainer } from './Components';
import { filterInputPropSetter, listAndInputContainerPropSetter } from './propSetters';

export const selectPropSetter: PropSetter<ButtonElementProps | DivElementProps | UlElementProps | LabelElementProps> = (
  propSetterProps,
) => {
  const { id } = propSetterProps;
  if (id === 'button') {
    return selectButtonPropSetter(propSetterProps);
  }
  if (id === 'wrapper') {
    return selectWrapperPropSetter(propSetterProps);
  }
  if (id === 'borderedContainer') {
    return selectBorderedContainerPropSetter(propSetterProps);
  }
  if (id === 'list') {
    return optionsListPropSetter(propSetterProps);
  }
  if (id === 'label') {
    return selectLabelPropSetter(propSetterProps);
  }
  if (id === 'filter') {
    return filterInputPropSetter(propSetterProps);
  }
  if (id === 'listAndInputContainer') {
    return listAndInputContainerPropSetter(propSetterProps);
  }
  const data = propSetterProps.controller.getData() as SelectData;
  if (id === 'assistiveText') {
    return {
      children: data.assistiveText || '',
    };
  }
  if (id === 'error') {
    return {
      children: data.error || '',
    };
  }
  return {};
};

export const selectChangeHandler: ChangeHandler = ({ id, type, controller, payload }) => {
  const current = getSelectDataFromController(controller);
  console.log('id,type', id, type, payload);
  if (id === 'button' && type === 'click') {
    controller.updateData({ data: { open: !current.open } });
  } else if ((id === 'list-item' && type === 'click') || (id === 'tag' && type === 'tag-click')) {
    const clickedOption = payload && (payload.value as Required<Option>);
    if (!clickedOption) {
      return;
    }
    updateControllerSelectData(controller, {
      groups: updateSelectedOptionInGroups(
        current.groups,
        { ...clickedOption, selected: !clickedOption.selected },
        current.multiSelect,
      ),
      open: current.multiSelect,
    });
    controller.updateMetaData({ selectionUpdate: Date.now() });
  } else if (id === 'list-group' && type === 'click') {
    const clickedOption = payload && (payload.value as Required<Option>);
    if (!clickedOption) {
      return;
    }
    updateControllerSelectData(controller, {
      groups: updateSelectedGroupOptions(current.groups, { ...clickedOption, selected: !clickedOption.selected }),
      open: true,
    });
    controller.updateMetaData({ selectionUpdate: Date.now() });
  } else if (type === 'outside-click') {
    controller.updateData({ data: { open: false } });
  } else if (id === 'filter' && type === 'change') {
    const filterValue = (payload && (payload.value as string)) || '';
    controller.updateMetaData({ filter: filterValue });
    controller.updateData({ data: { groups: filterOptions(current.groups, filterValue) } });
  }
};

export function Select({
  options,
  open,
  groups,
  multiSelect,
  onChange,
}: SelectProps<ReactElement<HTMLOptGroupElement | HTMLOptionElement>>) {
  // console.log('--', childrenToGroups(children));
  const initialData = useMemo(
    () => ({
      groups: propsToGroups({ options, groups }),
      label: 'Label',
      open: !!open,
      multiSelect: !!multiSelect,
    }),
    [options, open],
  );
  const metaData = useMemo(
    () => ({
      listContainerRef: createRef<HTMLElement>(),
      filterUpdate: -1,
      selectionUpdate: -1,
      idPrefix: 'select-',
      filter: '',
    }),
    [],
  );
  const changeProxy: ChangeHandler = (changeProps) => {
    const { controller } = changeProps;
    const { getData, getMetaData, updateMetaData, updateData } = controller;
    const lastSelectionUpdate = getMetaData().selectionUpdate;
    const lastSearchUpdate = getMetaData().filterUpdate;
    selectChangeHandler(changeProps);
    if (getMetaData().filterUpdate !== lastSearchUpdate) {
      /* props.onChange(data)
        .then((newData)=>{
          //if new update after this, ignore this result.
          // parse selected & options
        })
        .catch(()=>{})

      */
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
      /* props.onSearch()
      
      */
    }
  };

  return (
    <Group
      initialData={initialData}
      metaData={metaData}
      onChange={changeProxy}
      propSetter={selectPropSetter as GroupProps['propSetter']}
    >
      {({ controller }) => {
        return (
          <SelectWrapperX data-hds-group-id="wrapper">
            <SelectLabel data-hds-group-id="label" key="label" />
            <SelectBorderedContainerX data-hds-group-id="borderedContainer" key="borderedContainer">
              <SelectButton data-hds-group-id="button" key="button" />
              <ListAndInputContainer data-hds-group-id="listAndInputContainer" key="list">
                <FilterInput data-hds-group-id="filter" key="ff" />
                <OptionsList data-hds-group-id="list" key="list" />
              </ListAndInputContainer>
            </SelectBorderedContainerX>
            <Error groupId="error" />
            <AssistiveText groupId="assistiveText" />
            <TrackEvents controller={controller} listElementRef={metaData.listContainerRef} key="tracker" />
          </SelectWrapperX>
        );
      }}
    </Group>
  );
}

/* eslint-disable camelcase */
import React from 'react';

// eslint-disable-next-line jest/no-mocks-import
import {
  createGroup,
  getTriggeredEvents,
  mockUseSelectDataHandlersContents,
  resetAllMocks,
} from './hooks/__mocks__/useSelectDataHandlers';
import {
  createInputOnChangeListener,
  createOnClickListener,
  filterOptions,
  mergeSearchResultsToCurrent,
} from './utils';
import {
  getAllOptions,
  getGroupLabelOption,
  getSelectedOptions,
  iterateAndCopyGroup,
} from '../modularOptionList/utils';
import { FilterFunction, SelectDataHandlers } from './types';
import { ChangeEvent, ChangeEventPayload } from '../../dataProvider/DataContext';
import { eventTypes } from './events';

describe('utils', () => {
  const createMultipleGroups = () => {
    const group1 = createGroup({ label: 'group1' });
    const group2 = createGroup({ label: 'group2' });
    const group3 = createGroup({ label: 'group3' });
    return { groups: [group1, group2, group3] };
  };
  describe('createOnClickListener creates object with an onClick function which triggers a changeEvent', () => {
    const dataHandlers = mockUseSelectDataHandlersContents as SelectDataHandlers;
    const mouseEvent = {} as unknown as React.MouseEvent;
    const id = 'eventId';
    const type = 'eventType';
    beforeEach(() => {
      resetAllMocks();
    });
    it('triggered event id is the given id, default type is eventTypes.click and originalEvent is the mouse event', () => {
      const { onClick } = createOnClickListener({ id, trigger: dataHandlers.trigger });
      onClick(mouseEvent);
      const triggeredEvent = getTriggeredEvents()[0] as ChangeEvent;
      expect(triggeredEvent.id).toBe(id);
      expect(triggeredEvent.type).toBe(eventTypes.click);
      expect(triggeredEvent.payload?.originalEvent).toBe(mouseEvent);
    });
    it('type can be set', () => {
      const { onClick } = createOnClickListener({ id, type, trigger: dataHandlers.trigger });
      onClick(mouseEvent);
      const triggeredEvent = getTriggeredEvents()[0] as ChangeEvent;
      expect(triggeredEvent.id).toBe(id);
      expect(triggeredEvent.type).toBe(type);
      expect(triggeredEvent.payload?.originalEvent).toBe(mouseEvent);
    });
  });
  describe('createInputOnChangeListener creates object with an onChange function which triggers a changeEvent', () => {
    const dataHandlers = mockUseSelectDataHandlersContents as SelectDataHandlers;
    const keyboardEvent = { currentTarget: { value: 'text' } } as unknown as React.ChangeEvent<HTMLInputElement>;
    const id = 'eventId';
    const type = 'eventType';
    beforeEach(() => {
      resetAllMocks();
    });
    it('triggered event id is the given id, default type is eventTypes.change and originalEvent is the keyboard event', () => {
      const { onChange } = createInputOnChangeListener({ id, trigger: dataHandlers.trigger });
      onChange(keyboardEvent);
      const triggeredEvent = getTriggeredEvents()[0] as ChangeEvent;
      expect(triggeredEvent.id).toBe(id);
      expect(triggeredEvent.type).toBe(eventTypes.change);
      expect(triggeredEvent.payload?.originalEvent).toBe(keyboardEvent);
    });
    it('type can be set', () => {
      const { onChange } = createInputOnChangeListener({ id, type, trigger: dataHandlers.trigger });
      onChange(keyboardEvent);
      const triggeredEvent = getTriggeredEvents()[0] as ChangeEvent;
      expect(triggeredEvent.type).toBe(type);
    });
    it('Payload value is the input element value picked from keyboard event', () => {
      const { onChange } = createInputOnChangeListener({ id, type, trigger: dataHandlers.trigger });
      onChange(keyboardEvent);
      const triggeredEvent = getTriggeredEvents()[0] as ChangeEvent;
      expect((triggeredEvent.payload as ChangeEventPayload).value).toBe(keyboardEvent.currentTarget.value);
    });
  });
  describe('filterOptions sets option.visible true/false', () => {
    const optionsInGroup = 20;
    const groupCount = 3;

    it('if filterStr is not empty, the "visible" prop matches the returned filterFunction value', () => {
      const { groups } = createMultipleGroups();

      const resultingGroupsWithAllHidden = filterOptions(groups, 'filter', () => false);
      expect(getAllOptions(resultingGroupsWithAllHidden).filter((opt) => opt.visible === true)).toHaveLength(0);

      const resultingGroupsWithAllVisible = filterOptions(resultingGroupsWithAllHidden, 'filter', () => true);
      expect(getAllOptions(resultingGroupsWithAllVisible).filter((opt) => opt.visible === false)).toHaveLength(0);

      let count = 0;
      const resultingGroupsWithHalfVisible = filterOptions(resultingGroupsWithAllHidden, 'filter', () => {
        count += 1;
        return count % 2 === 0;
      });
      expect(getAllOptions(resultingGroupsWithHalfVisible).filter((opt) => opt.visible === false)).toHaveLength(
        (groupCount * optionsInGroup) / 2,
      );
    });
    it('if filterStr is empty, the "visible" prop is always true', () => {
      const { groups } = createMultipleGroups();

      const resultingGroupsWithAllHidden = filterOptions(groups, '', () => false);
      expect(getAllOptions(resultingGroupsWithAllHidden).filter((opt) => opt.visible === true)).toHaveLength(
        groupCount * optionsInGroup,
      );
    });
    it('A group label is hidden if all of its options are hidden or visible if one option is visible', () => {
      const { groups } = createMultipleGroups();
      const groupFilter: FilterFunction = (option, filter) => {
        return option.label.includes(filter);
      };
      const resultingGroupsWithGroup1Visible = filterOptions(groups, 'group1', groupFilter);
      expect(getAllOptions(resultingGroupsWithGroup1Visible).filter((opt) => opt.visible === true)).toHaveLength(
        optionsInGroup,
      );
      const groupLabels = resultingGroupsWithGroup1Visible.map((g) => getGroupLabelOption(g)) as Option[];
      expect(groupLabels[0].visible).toBeTruthy();
      expect(groupLabels[1].visible).toBeFalsy();
      expect(groupLabels[2].visible).toBeFalsy();

      const getOneOptionFromOtherGroups = () => {
        const allOptions = getAllOptions(resultingGroupsWithGroup1Visible);
        return [allOptions[optionsInGroup * 2 - 1], allOptions[optionsInGroup * 3 - 1]];
      };
      const visibleOptionLabels = getOneOptionFromOtherGroups().map((opt) => opt.label);
      const filterSelected: FilterFunction = (option) => {
        return visibleOptionLabels.includes(option.label);
      };
      const allGroupsVisible = filterOptions(resultingGroupsWithGroup1Visible, 'group1', filterSelected);
      const groupLabels2 = allGroupsVisible.map((g) => getGroupLabelOption(g)) as Option[];
      expect(groupLabels2[0].visible).toBeFalsy();
      expect(groupLabels2[1].visible).toBeTruthy();
      expect(groupLabels2[2].visible).toBeTruthy();
    });
    it('If a group label is not set, it stays hidden', () => {
      const { groups } = createMultipleGroups();
      const firstGroupLabel = getGroupLabelOption(groups[0]) as Option;
      firstGroupLabel.label = '';
      const allOptionsVisible = filterOptions(groups, 'group1', () => true);
      const groupLabels2 = allOptionsVisible.map((g) => getGroupLabelOption(g)) as Option[];
      expect(groupLabels2[0].visible).toBeFalsy();
      expect(groupLabels2[1].visible).toBeTruthy();
      expect(groupLabels2[2].visible).toBeTruthy();
    });

    it('clones the given groups and options and does not mutate', () => {
      const { groups } = createMultipleGroups();
      const stringBackup = JSON.stringify(groups);
      let callCount = 0;
      const filter = () => {
        callCount += 1;
        return callCount === 1;
      };

      const result = filterOptions(groups, 'group1', filter);

      expect(result === groups).not.toBeTruthy();
      expect(JSON.stringify(result)).not.toBe(stringBackup);
      expect(JSON.stringify(groups)).toBe(stringBackup);
    });
  });
  describe('mergeSearchResultsToCurrent merges search results to current groups', () => {
    it('New groups override old groups, if old one has no selected items', () => {
      const existingGroups = [createGroup({ label: 'Existing' }), createGroup({ label: 'Existing 2' })];
      const newGroup = createGroup({ label: 'New' });

      const results = mergeSearchResultsToCurrent(newGroup, existingGroups);
      expect(JSON.stringify(results)).toBe(JSON.stringify([newGroup]));
    });
    it('New group overrides old group, but keeps selected ones and hides them.', () => {
      const existingGroups = [createGroup({ label: 'Existing 1' }), createGroup({ label: 'Existing 2' })];
      const selected = [
        existingGroups[0].options[1],
        existingGroups[0].options[8],
        existingGroups[1].options[3],
        existingGroups[1].options[4],
      ];
      selected.forEach((opt) => {
        // eslint-disable-next-line no-param-reassign
        opt.selected = true;
      });

      const newGroup = createGroup({ label: 'New' });

      const copyOfSelectedWithHiddenOptions = selected.map((opt) => {
        return { ...opt, visible: false };
      });

      const results = mergeSearchResultsToCurrent(newGroup, existingGroups);
      expect(JSON.stringify(results)).toBe(JSON.stringify([{ options: copyOfSelectedWithHiddenOptions }, newGroup]));
    });
    it('If new group has options with same value that are selected, new group options will be selected.', () => {
      const existingGroups = [createGroup({ label: 'Existing 1' }), createGroup({ label: 'Existing 2' })];
      // select 4 options which values will be found in newGroups
      // select also 2 options which values will not be found
      const selectedOptions = [
        existingGroups[0].options[1],
        existingGroups[0].options[8],
        existingGroups[1].options[3],
        existingGroups[1].options[4],
        existingGroups[0].options[5],
        existingGroups[1].options[5],
      ];
      const selectedValues = selectedOptions.map((opt) => opt.value);
      selectedOptions.forEach((opt) => {
        // eslint-disable-next-line no-param-reassign
        opt.selected = true;
      });

      const newGroup1 = createGroup({ label: 'New' });
      const newGroup2 = createGroup({ label: 'New 2' });
      // match 2 values in each group to the selected values
      newGroup1.options[5].value = selectedOptions[0].value;
      newGroup1.options[6].value = selectedOptions[1].value;
      newGroup2.options[2].value = selectedOptions[2].value;
      newGroup2.options[7].value = selectedOptions[3].value;

      const selectedOptionsThatAreNotInNewGroups = [existingGroups[0].options[5], existingGroups[1].options[5]].map(
        (opt) => {
          return { ...opt, visible: false };
        },
      );

      const results = mergeSearchResultsToCurrent({ groups: [newGroup1, newGroup2] }, existingGroups);
      const newGroupsWithSelected = iterateAndCopyGroup([newGroup1, newGroup2], (opt) => {
        return { ...opt, selected: selectedValues.includes(opt.value) };
      });
      expect(JSON.stringify(results)).toBe(
        JSON.stringify([{ options: selectedOptionsThatAreNotInNewGroups }, ...newGroupsWithSelected]),
      );
      expect(getSelectedOptions(results)).toHaveLength(6);
      expect(getSelectedOptions(existingGroups)).toHaveLength(6);
    });
  });
});

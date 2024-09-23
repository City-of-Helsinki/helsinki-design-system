/* eslint-disable camelcase */
import React, { PropsWithChildren, ReactElement } from 'react';
import { render } from '@testing-library/react';

// eslint-disable-next-line jest/no-mocks-import
import {
  createDataWithSelectedOptions,
  getTriggeredEvents,
  mockUseSelectDataHandlersContents,
  resetAllMocks,
} from './hooks/__mocks__/useSelectDataHandlers';
import {
  childrenToGroups,
  clearAllSelectedOptions,
  createGroupLabel,
  createInputOnChangeListener,
  createOnClickListener,
  filterOptions,
  getAllOptions,
  getGroupLabelOption,
  getOptionGroupIndex,
  getSelectedOptions,
  getSelectedOptionsPerc,
  getVisibleGroupLabels,
  iterateAndCopyGroup,
  OptionIterator,
  propsToGroups,
  updateGroupLabelAndOptions,
  updateOptionInGroup,
  validateOption,
} from './utils';
import { FilterFunction, Group, Option, SelectDataHandlers } from './types';
import { ChangeEvent, ChangeEventPayload } from '../dataProvider/DataContext';
import { eventTypes } from './events';

describe('utils', () => {
  const createMultipleGroups = () => {
    const prefixOptionLabelsAndValues = (prefix: string, options: Option[]) => {
      return options.map((opt) => {
        return {
          ...opt,
          label: `${prefix} ${opt.label}`,
          value: `${prefix} ${opt.value}`,
          visible: true,
        };
      });
    };
    const group1 = createDataWithSelectedOptions({ selectedOptionsCount: 0 }).groups[0];
    const group2 = createDataWithSelectedOptions({ selectedOptionsCount: 0 }).groups[0];
    const group3 = createDataWithSelectedOptions({ selectedOptionsCount: 0 }).groups[0];
    group1.options = prefixOptionLabelsAndValues('group1', group1.options);
    group2.options = prefixOptionLabelsAndValues('group2', group2.options);
    group3.options = prefixOptionLabelsAndValues('group3', group3.options);
    return { groups: [group1, group2, group3] };
  };
  describe('iterateAndCopyGroup', () => {
    it('clones a group with each option cloned by the given iterator function. If function returns undefined, option is cloned.', () => {
      const createNewOptionValue: OptionIterator = (option, group, optionIndex, groupIndex) => {
        return {
          value: `${option.label} ${optionIndex} ${groupIndex} ${group.options[0].label}`,
        } as Option;
      };
      const iterator: OptionIterator = (option, group, optionIndex, groupIndex) => {
        if (groupIndex === 0) {
          return {
            ...option,
            ...createNewOptionValue(option, group, optionIndex, groupIndex),
          };
        }

        return undefined;
      };
      const { groups } = createMultipleGroups();
      const stringBackup = JSON.stringify(groups);
      const newGroups = iterateAndCopyGroup(groups, iterator);
      expect(JSON.stringify(groups)).toBe(stringBackup);
      newGroups.forEach((group, groupIndex) => {
        group.options.forEach((option, optionIndex) => {
          if (groupIndex === 0) {
            // eslint-disable-next-line jest/no-conditional-expect
            expect(option.value).toBe((createNewOptionValue(option, group, optionIndex, groupIndex) as Option).value);
          } else {
            // eslint-disable-next-line jest/no-conditional-expect
            expect(option).toMatchObject(groups[groupIndex].options[optionIndex]);
          }
        });
      });
    });
  });
  describe('getOptionGroupIndex', () => {
    it('Returns index of the group where the given option is found.', () => {
      const { groups } = createMultipleGroups();
      groups.forEach((group, index) => {
        group.options.forEach((option) => {
          expect(getOptionGroupIndex(groups, option)).toBe(index);
        });
      });
    });
    it('If same label is in many groups, the index of the first group is returned', () => {
      const { groups } = createMultipleGroups();
      const group1 = groups[0];
      const group2 = groups[1];
      const sameGroupMultipleTimes = [group1, group2, group1, group2];
      sameGroupMultipleTimes.forEach((group, index) => {
        group.options.forEach((option) => {
          const assumedIndex = index === 0 || index === 2 ? 0 : 1;
          expect(getOptionGroupIndex(sameGroupMultipleTimes, option)).toBe(assumedIndex);
        });
      });
    });
    it('Returns -1  if group is not found', () => {
      const { groups } = createMultipleGroups();
      groups.forEach((group) => {
        group.options.forEach(() => {
          expect(getOptionGroupIndex(groups, { label: 'X' })).toBe(-1);
        });
      });
    });
    it('Only option "value" and "isGroupLabel" are compared.', () => {
      const { groups } = createMultipleGroups();
      const commonProps: Partial<Option> = {
        selected: true,
        disabled: true,
        label: '',
      };
      const mutualGroups = groups.map((group) => {
        return {
          options: group.options.map((option) => {
            return {
              ...commonProps,
              value: option.value,
              isGroupLabel: option.isGroupLabel,
            } as Option;
          }),
        };
      });
      mutualGroups.forEach((mutualGroup, index) => {
        mutualGroup.options.forEach((option) => {
          expect(getOptionGroupIndex(groups, option)).toBe(index);
        });
      });
    });
  });
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
  describe('updateOptionInGroup when multiselect === false', () => {
    it('sets given option as selected or unselected', () => {
      const { groups } = createMultipleGroups();
      expect(getSelectedOptions(groups)).toHaveLength(0);
      const selectedOption = groups[1].options[10];
      // select an option
      selectedOption.selected = true;
      const newGroups = updateOptionInGroup(groups, selectedOption, false);
      const selectedOptionInResults = newGroups[1].options[10];
      expect(selectedOptionInResults.selected).toBeTruthy();
      expect(getSelectedOptions(newGroups)).toHaveLength(1);
      const assumedResult = [...groups];
      assumedResult[1].options[10].selected = true;
      expect(assumedResult).toMatchObject(newGroups);

      // unselect same option
      selectedOptionInResults.selected = false;
      const latestGroups = updateOptionInGroup(newGroups, selectedOptionInResults, false);
      const unselectedOptionInResults = latestGroups[1].options[10];
      expect(unselectedOptionInResults.selected).toBeFalsy();
      const assumedLastResult = [...latestGroups];
      assumedLastResult[1].options[10].selected = false;
      expect(assumedLastResult).toMatchObject(latestGroups);
      expect(getSelectedOptions(latestGroups)).toHaveLength(0);
    });
    it('clones the given groups and options and does not mutate', () => {
      const { groups } = createMultipleGroups();
      const stringBackup = JSON.stringify(groups);
      groups.forEach((group) => {
        group.options.forEach((option) => {
          if (option.isGroupLabel) {
            return;
          }
          const updatedGroups = updateOptionInGroup(groups, option, false);
          updatedGroups.forEach((updatedGroup) => {
            updatedGroup.options.forEach((updatedGroupOption) => {
              Reflect.deleteProperty(updatedGroupOption, 'label');
              Reflect.set(updatedGroupOption, 'value', '');
            });
          });
          expect(JSON.stringify(updatedGroups)).not.toBe(stringBackup);
          expect(JSON.stringify(groups)).toBe(stringBackup);
        });
      });
    });
  });
  describe('updateOptionInGroup when multiselect === true', () => {
    it('sets given option as selected or unselected and does not change current selections', () => {
      const { groups } = createMultipleGroups();
      let currentGroups: Group[] = groups;
      const toggleOption = (groupIndex: number, selectionIndex: number) => {
        const targetOption = { ...(currentGroups[groupIndex].options[selectionIndex] as Option) };
        const oldSelectionValue = targetOption.selected;
        targetOption.selected = !oldSelectionValue;
        const previousGroups = [...currentGroups];
        currentGroups = updateOptionInGroup(currentGroups, targetOption, true);
        const optionInNewGroups = currentGroups[groupIndex].options[selectionIndex] as Option;
        const optionInOldGroups = previousGroups[groupIndex].options[selectionIndex] as Option;
        // check that new option has new selected value
        expect(optionInNewGroups.selected !== oldSelectionValue).toBeTruthy();
        // check that old option is unchanged
        expect(optionInOldGroups.selected === oldSelectionValue).toBeTruthy();
        return optionInNewGroups;
      };
      expect(getSelectedOptions(currentGroups)).toHaveLength(0);
      const changedOption_0_1 = toggleOption(0, 1);
      const changedOption_1_1 = toggleOption(1, 1);
      const changedOption_2_2 = toggleOption(2, 2);
      expect(getSelectedOptions(currentGroups)).toMatchObject([
        changedOption_0_1,
        changedOption_1_1,
        changedOption_2_2,
      ]);
      const changedOption_2_3 = toggleOption(2, 3);
      const changedOption_1_3 = toggleOption(1, 3);
      const changedOption_0_3 = toggleOption(0, 3);
      expect(getSelectedOptions(currentGroups)).toMatchObject([
        changedOption_0_1,
        changedOption_0_3,
        changedOption_1_1,
        changedOption_1_3,
        changedOption_2_2,
        changedOption_2_3,
      ]);
      // unselect all selected
      getSelectedOptions(currentGroups).forEach((option) => {
        currentGroups = updateOptionInGroup(currentGroups, { ...option, selected: false }, true);
      });
      expect(getSelectedOptions(currentGroups)).toHaveLength(0);
    });
    it('Throws when trying to change a group label', () => {
      const { groups } = createMultipleGroups();
      const groupLabel = groups[0].options[0];
      expect(() => updateOptionInGroup([], groupLabel, true)).toThrow();
      expect(() => updateOptionInGroup([], groupLabel, false)).toThrow();
    });
  });
  describe('updateGroupLabelAndOptions', () => {
    const getOptionAtIndex = (group: Group, index: number) => group.options[index] as Option;
    const getUnselectedOptions = (group: Group) => group.options.filter((opt) => opt.selected === false);
    const selectNotLabelOptions = (group: Group, indeOfOptionNotToSelect = -1) => {
      group.options.forEach((opt, index) => {
        if (index === 0 || index === indeOfOptionNotToSelect) {
          return;
        }
        // eslint-disable-next-line no-param-reassign
        opt.selected = true;
      });
    };
    it('selects all group options when none are previously selected and label.selected = true', () => {
      const { groups } = createMultipleGroups();
      const groupLabel0 = getOptionAtIndex(groups[0], 0);
      const groupsWithIndex0Selected = updateGroupLabelAndOptions(groups, { ...groupLabel0, selected: true });
      // All items in group 0 are selected
      expect(getUnselectedOptions(groupsWithIndex0Selected[0])).toHaveLength(0);
      // Initial array is unmutated
      expect(getUnselectedOptions(groups[0])).toHaveLength(groups[0].options.length);
      // Zero items in group 1 are selected
      expect(getUnselectedOptions(groupsWithIndex0Selected[1])).toHaveLength(
        groupsWithIndex0Selected[1].options.length,
      );
      // Zero items in group 2 are selected
      expect(getUnselectedOptions(groupsWithIndex0Selected[2])).toHaveLength(
        groupsWithIndex0Selected[2].options.length,
      );
      const groupLabel1 = getOptionAtIndex(groups[1], 0);
      const groupsWithIndex0And1Selected = updateGroupLabelAndOptions(groupsWithIndex0Selected, {
        ...groupLabel1,
        selected: true,
      });
      expect(getUnselectedOptions(groupsWithIndex0And1Selected[0])).toHaveLength(0);
      expect(getUnselectedOptions(groupsWithIndex0And1Selected[1])).toHaveLength(0);
      expect(getUnselectedOptions(groupsWithIndex0And1Selected[2])).toHaveLength(
        groupsWithIndex0And1Selected[2].options.length,
      );
      const groupLabel2 = getOptionAtIndex(groups[2], 0);
      const groupsWithAllSelected = updateGroupLabelAndOptions(groupsWithIndex0And1Selected, {
        ...groupLabel2,
        selected: true,
      });
      expect(getUnselectedOptions(groupsWithAllSelected[0])).toHaveLength(0);
      expect(getUnselectedOptions(groupsWithAllSelected[1])).toHaveLength(0);
      expect(getUnselectedOptions(groupsWithAllSelected[2])).toHaveLength(0);
    });
    it('selects all group options when not all are previously selected and label.selected = true', () => {
      const { groups } = createMultipleGroups();
      // set all but label and first option selected
      selectNotLabelOptions(groups[0], 1);
      const groupLabel0 = getOptionAtIndex(groups[0], 0);
      const groupsWithIndex0Selected = updateGroupLabelAndOptions(groups, { ...groupLabel0, selected: true });
      expect(getUnselectedOptions(groupsWithIndex0Selected[0])).toHaveLength(0);
    });
    it('unselects no group options when all are previously selected and label.selected = true', () => {
      const { groups } = createMultipleGroups();
      // set all but label selected
      selectNotLabelOptions(groups[0]);
      const groupLabel0 = getOptionAtIndex(groups[0], 0);
      const groupsWithIndex0Selected = updateGroupLabelAndOptions(groups, { ...groupLabel0, selected: true });
      expect(getUnselectedOptions(groupsWithIndex0Selected[0])).toHaveLength(0);
    });
    it('unselects all group options when all are previously selected and label.selected = false', () => {
      const { groups } = createMultipleGroups();
      // set all but label selected
      selectNotLabelOptions(groups[0]);
      const groupLabel0 = getOptionAtIndex(groups[0], 0);
      const groupsWithIndex0Selected = updateGroupLabelAndOptions(groups, { ...groupLabel0, selected: false });
      expect(groupsWithIndex0Selected[0].options.filter((opt) => opt.selected === true)).toHaveLength(0);
    });
    it('Not visible or disabled options are not affected', () => {
      const { groups } = createMultipleGroups();
      const groupLabel0 = getOptionAtIndex(groups[0], 0);
      getOptionAtIndex(groups[0], 1).disabled = true;
      getOptionAtIndex(groups[0], 2).visible = false;
      const notVisibleAndDisabledOption = getOptionAtIndex(groups[0], 3);
      notVisibleAndDisabledOption.visible = false;
      notVisibleAndDisabledOption.disabled = true;
      const updatedGroups = updateGroupLabelAndOptions(groups, { ...groupLabel0, selected: true });
      // All items expect #1,2,3 in group 0 are selected
      expect(getUnselectedOptions(updatedGroups[0])).toHaveLength(3);
      expect(getOptionAtIndex(updatedGroups[0], 1).selected).toBeFalsy();
      expect(getOptionAtIndex(updatedGroups[0], 2).selected).toBeFalsy();
      expect(getOptionAtIndex(updatedGroups[0], 3).selected).toBeFalsy();
      // make all options selectable
      getOptionAtIndex(updatedGroups[0], 1).disabled = false;
      getOptionAtIndex(updatedGroups[0], 2).visible = true;
      const newNotVisibleAndDisabledOption = getOptionAtIndex(updatedGroups[0], 3);
      newNotVisibleAndDisabledOption.visible = true;
      newNotVisibleAndDisabledOption.disabled = false;
      const latestGroups = updateGroupLabelAndOptions(updatedGroups, { ...groupLabel0, selected: true });
      expect(getUnselectedOptions(latestGroups[0])).toHaveLength(0);
    });
    it('Throws when trying to change a non-group option', () => {
      const { groups } = createMultipleGroups();
      const nonGroupLabel = groups[0].options[1];
      expect(() => updateGroupLabelAndOptions([], nonGroupLabel)).toThrow();
    });
  });
  describe('clearAllSelectedOptions', () => {
    it('Clones the groups and sets all options as unselected', () => {
      const { groups } = createMultipleGroups();
      getAllOptions(groups).forEach((opt) => {
        // eslint-disable-next-line  no-param-reassign
        opt.selected = true;
      });
      const stringBackup = JSON.stringify(groups);
      expect(getSelectedOptions(groups)).toHaveLength(60);
      const newGroups = clearAllSelectedOptions(groups);
      expect(getSelectedOptions(newGroups)).toHaveLength(0);
      expect(getSelectedOptions(groups)).toHaveLength(60);
      expect(JSON.stringify(groups)).toBe(stringBackup);
    });
  });
  describe('getAllOptions', () => {
    const iterateAllOptions = (filterOutGroupLabels = true) => {
      const { groups } = createMultipleGroups();
      let counter = 0;
      const allOptions = getAllOptions(groups, filterOutGroupLabels);
      groups.forEach((group) => {
        group.options.forEach((option) => {
          if (!option.isGroupLabel || option.isGroupLabel === !filterOutGroupLabels) {
            // eslint-disable-next-line jest/no-conditional-expect
            expect(option).toBe(allOptions[counter]);
            counter += 1;
          }
        });
      });
      return counter;
    };
    it('Collects all options from groups. By default, group labels are ignored.', () => {
      const options = iterateAllOptions();
      expect(options).toBe(60);
    });
    it('Collects also group labels when filterOutGroupLabels is set to false.', () => {
      const options = iterateAllOptions(false);
      expect(options).toBe(60 + 3);
    });
  });
  describe('getSelectedOptions', () => {
    it('Collects all selected options from groups.', () => {
      expect(getSelectedOptions([])).toHaveLength(0);
      expect(getSelectedOptions(createDataWithSelectedOptions({ selectedOptionsCount: 0 }).groups)).toHaveLength(0);
      expect(getSelectedOptions(createDataWithSelectedOptions({ selectedOptionsCount: 10 }).groups)).toHaveLength(10);
      const groupWith10SelectedOptions = createDataWithSelectedOptions({ selectedOptionsCount: 10 }).groups[0];
      expect(
        getSelectedOptions([groupWith10SelectedOptions, groupWith10SelectedOptions, groupWith10SelectedOptions]),
      ).toHaveLength(30);
    });
    // .... add test to verify order
  });
  describe('getVisibleGroupLabels', () => {
    it('Returns list of group labels that are visible and label is not empty', () => {
      const visibleLabel = { options: [{ isGroupLabel: true, label: 'label', visible: true }] } as Group;
      const emptyLabel = { options: [{ isGroupLabel: true, label: '', visible: true }] } as Group;
      const hiddenLabel = { options: [{ isGroupLabel: true, label: 'Label', visible: false }] } as Group;
      expect(getVisibleGroupLabels([visibleLabel, emptyLabel, hiddenLabel])).toHaveLength(1);
      expect(getVisibleGroupLabels([emptyLabel, hiddenLabel])).toHaveLength(0);
      expect(getVisibleGroupLabels([visibleLabel, visibleLabel, visibleLabel])).toHaveLength(3);
    });
  });
  describe('getSelectedOptionsPerc', () => {
    it('Counts percentage (0...1) how many non-group label options are selected', () => {
      const maxOptions = 10;
      for (let i = 0; i <= maxOptions; i += 1) {
        const { groups } = createDataWithSelectedOptions({ selectedOptionsCount: i, totalOptionsCount: maxOptions });
        expect(getSelectedOptionsPerc(groups[0])).toBe(i / maxOptions);
      }
    });
  });
  describe('validateOption', () => {
    const validOption: Option = {
      label: 'Label',
      value: 'Value',
      selected: false,
      disabled: false,
      visible: true,
      isGroupLabel: false,
    };
    it('Converts string to an option where label and value are the string', () => {
      expect(validateOption('optionX')).toMatchObject({ ...validOption, label: 'optionX', value: 'optionX' });
    });
    it('Set all props for partial option', () => {
      const partial: Partial<Option> = { label: 'partial label', value: 'partial value' };
      expect(validateOption(partial)).toMatchObject({ ...validOption, ...partial });
      partial.selected = true;
      expect(validateOption(partial)).toMatchObject({ ...validOption, ...partial });
      partial.disabled = true;
      expect(validateOption(partial)).toMatchObject({ ...validOption, ...partial });
      partial.visible = false;
      expect(validateOption(partial)).toMatchObject({ ...validOption, ...partial });
    });
    it('Value is set as label if not set', () => {
      const partial: Partial<Option> = { label: 'partial label' };
      expect(validateOption(partial)).toMatchObject({ ...validOption, ...partial, value: partial.label });
    });
    it('Label is set as value if not set', () => {
      const partial: Partial<Option> = { value: 'partial value' };
      expect(validateOption(partial)).toMatchObject({ ...validOption, ...partial, label: partial.value });
    });
    it('Label and value are empty if either is set', () => {
      const partial: Partial<Option> = {};
      expect(validateOption(partial)).toMatchObject({ ...validOption, value: '', label: '' });
    });
    it('Sets group label always false.', () => {
      const partial: Partial<Option> = { label: 'partial label', value: 'partial value', isGroupLabel: true };
      expect(validateOption(partial)).toMatchObject({ ...validOption, ...partial, isGroupLabel: false });
    });
  });
  describe('createGroupLabel', () => {
    const validOption: Option = {
      label: 'Label',
      value: 'Value',
      selected: false,
      disabled: false,
      visible: true,
      isGroupLabel: false,
    };
    it('Uses validateOption() to convert a string to an option and sets isGroupLabel to true', () => {
      expect(createGroupLabel('optionX')).toMatchObject({
        ...validOption,
        label: 'optionX',
        value: 'optionX',
        isGroupLabel: true,
      });
    });
  });
  describe('propsToGroups converts given data in SelectProps format to SelectData', () => {
    it('String options are converted to groups', () => {
      const options = ['option 0', 'option 1'];
      expect(propsToGroups({ options })).toMatchObject([
        {
          options: [createGroupLabel(''), validateOption(options[0]), validateOption(options[1])],
        },
      ]);
    });
    it('Groups with string options are converted to groups with labels', () => {
      const options1 = ['option 0', 'option 1'];
      const options2 = ['option 2', 'option 3'];
      expect(
        propsToGroups({
          groups: [
            { label: 'Group1', options: options1 },
            { label: 'Group2', options: options2 },
          ],
        }),
      ).toMatchObject([
        {
          options: [createGroupLabel('Group1'), validateOption(options1[0]), validateOption(options1[1])],
        },
        {
          options: [createGroupLabel('Group2'), validateOption(options2[0]), validateOption(options2[1])],
        },
      ]);
    });
    it('Empty props are handled', () => {
      expect(propsToGroups({})).toBeUndefined();
      expect(propsToGroups({ options: [] })).toMatchObject([
        {
          options: [createGroupLabel('')],
        },
      ]);
      expect(propsToGroups({ groups: [] })).toMatchObject([]);
    });
  });
  describe('childrenToGroups converts React children to groups', () => {
    let groups: Group[] | undefined;
    beforeEach(() => {
      groups = undefined;
    });
    it('Dom options are converted to groups', () => {
      const Component = (props: PropsWithChildren<unknown>) => {
        groups = childrenToGroups(props.children as ReactElement);
        return <div />;
      };
      render(
        <Component>
          <option value="Value 1" disabled>
            Label 1
          </option>
          <option value="Value 2" selected>
            Label 2
          </option>
        </Component>,
      );
      expect(groups).toMatchObject([
        {
          options: [
            createGroupLabel(''),
            validateOption({ value: 'Value 1', label: 'Label 1', disabled: true }),
            validateOption({ value: 'Value 2', label: 'Label 2', selected: true }),
          ],
        },
      ]);
    });
    it('Dom groups are converted to groups', () => {
      const Component = (props: PropsWithChildren<unknown>) => {
        groups = childrenToGroups(props.children as ReactElement);
        return <div />;
      };
      render(
        <Component>
          <optgroup label="Group 1">
            <option value="Value 1">Label 1</option>
            <option value="Value 2">Label 2</option>
          </optgroup>
          <optgroup label="Group 2">
            <option value="Value 3">Label 3</option>
            <option value="Value 4">Label 4</option>
          </optgroup>
        </Component>,
      );
      expect(groups).toMatchObject([
        {
          options: [
            createGroupLabel('Group 1'),
            validateOption({ value: 'Value 1', label: 'Label 1' }),
            validateOption({ value: 'Value 2', label: 'Label 2' }),
          ],
        },
        {
          options: [
            createGroupLabel('Group 2'),
            validateOption({ value: 'Value 3', label: 'Label 3' }),
            validateOption({ value: 'Value 4', label: 'Label 4' }),
          ],
        },
      ]);
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
});

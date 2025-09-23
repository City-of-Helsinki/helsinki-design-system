import { getLastMockCallArgs } from '../../../utils/testHelpers';
import { changeHandler } from './dataUpdater';
import { eventIds, eventTypes } from './events';
// eslint-disable-next-line jest/no-mocks-import
import {
  mockUseModularOptionListDataHandlersContents,
  resetAllMocks,
  getDataUpdates,
  createDataWithSelectedOptions,
  updateMockData,
  getCurrentMockData,
  getCurrentMockMetaData,
} from './hooks/__mocks__/useModularOptionListDataHandlers';
import { getTextKey } from './texts';
import {
  Group,
  OptionInProps,
  ModularOptionListData,
  ModularOptionListDataHandlers,
  ModularOptionListMetaData,
  ModularOptionListProps,
  TextKey,
  Texts,
} from './types';
import {
  getAllOptions,
  getSelectedOptions,
  propsToGroups,
  updateGroupLabelAndOptions,
  updateOptionInGroup,
} from './utils';

describe('dataUpdater', () => {
  const getDataHandlers = () => {
    return mockUseModularOptionListDataHandlersContents as ModularOptionListDataHandlers;
  };


  const getCurrentGroupsFromData = () => {
    return getCurrentMockData().groups as Group[];
  };
  const getAllOptionsFromData = () => {
    return getAllOptions(getCurrentGroupsFromData(), false);
  };
  const filterLastDataUpdateFromEvents = (filter: (args: ModularOptionListData) => boolean) => {
    const filteredData = getDataUpdates()
      .filter((args) => args[0] && filter(args[0]))
      .map((args) => args[0]);
    return filteredData.length ? filteredData[filteredData.length - 1] : null;
  };
  const getLastGroupUpdateFromEvents = () => {
    const lastUpdateWithGroups = filterLastDataUpdateFromEvents((args) => !!args.groups);
    return lastUpdateWithGroups ? (lastUpdateWithGroups.groups as Group[]) : [];
  };

  const getAllOptionsFromLastUpdate = () => {
    return getAllOptions(getLastGroupUpdateFromEvents(), false);
  };

  const getOnChangeMock = () => {
    return getCurrentMockData().onChange as jest.Mock;
  };

  const setOnChangeReturnValue = (value: Partial<ModularOptionListProps>) => {
    getOnChangeMock().mockReturnValue(value);
  };

  const getOnChangeCallArgs = () => {
    return getLastMockCallArgs(getOnChangeMock());
  };

  let dateNowSpy: jest.SpyInstance | null = null;
  let dataHandlers: ModularOptionListDataHandlers;

  const selectOptionByIndex = (index: number) => {
    const options = getAllOptionsFromData();
    const targetOption = options[index];
    const updatedOption = { ...targetOption, selected: !targetOption.selected };
    const updatedGroups = updatedOption.isGroupLabel
      ? updateGroupLabelAndOptions(getCurrentGroupsFromData(), updatedOption)
      : updateOptionInGroup(getCurrentGroupsFromData(), updatedOption, false);
    const eventId = updatedOption.isGroupLabel ? eventIds.listGroup : eventIds.listItem;
    const didUpdate = changeHandler(
      { id: eventId, type: eventTypes.click, payload: { value: targetOption } },
      dataHandlers,
    );

    const selectedOptions = getSelectedOptions(updatedGroups);
    return { selectedOption: targetOption, selectedOptions, updatedGroups, didUpdate };
  };

  beforeEach(() => {
    resetAllMocks();
    dataHandlers = getDataHandlers();
  });

  afterEach(() => {
    if (dateNowSpy) {
      dateNowSpy.mockRestore();
    }
    dateNowSpy = null;
  });

  describe('option click events', () => {
    it('does nothing if payload does not have an option', () => {
      updateMockData({
        ...createDataWithSelectedOptions(),
      });
      const updateCount = getDataUpdates().length;

      const didUpdate = changeHandler({ id: eventIds.listItem, type: eventTypes.click, payload: {} }, dataHandlers);
      expect(didUpdate).toBeFalsy();
      expect(getDataUpdates()).toHaveLength(updateCount);
    });
    /* TODO: Re-enable when screenReaderNotifications are implemented for tag removal
    // eslint-disable-next-line jest/no-commented-out-tests
    it('if a tag is clicked it is removed and a screen reader notification is added', () => {
      updateMockData({
        ...createDataWithSelectedOptions({ totalOptionsCount: 3, selectedOptionsCount: 3 }),
        multiSelect: true,
      });
      const options = getAllOptionsFromData();

      expect(getCurrentMockMetaData().screenReaderNotifications).toHaveLength(0);
      changeHandler({ id: eventIds.tag, type: eventTypes.click, payload: { value: options[1] } }, dataHandlers);

      expect(getMetaDataOfLastMetaDataUpdate().screenReaderNotifications).toHaveLength(1);
    });
    */
  });
  describe('group label click events', () => {
    it('sets all options selected when not all are selected', () => {
      updateMockData({
        ...createDataWithSelectedOptions({ totalOptionsCount: 3, selectedOptionsCount: 0, label: 'Group 1' }),
      });
      // select a group label
      const { didUpdate } = selectOptionByIndex(0);
      const updatedOptions = getAllOptionsFromLastUpdate();
      expect(updatedOptions).toHaveLength(4);
      expect(didUpdate).toBeTruthy();
      expect(updatedOptions.filter((opt) => !opt.selected)).toHaveLength(0);
    });
    it('does nothing if payload does not have an option', () => {
      updateMockData({
        ...createDataWithSelectedOptions({ label: 'Group 1' }),
      });
      const updateCount = getDataUpdates().length;

      const didUpdate = changeHandler({ id: eventIds.listGroup, type: eventTypes.click, payload: {} }, dataHandlers);
      expect(didUpdate).toBeFalsy();
      expect(getDataUpdates()).toHaveLength(updateCount);
    });
  });
  describe('clear click events', () => {
    /* TODO: Clear functionality is handled at Select level, not ModularOptionList level
    it('unselects all options', () => {
      updateMockData({
        ...createDataWithSelectedOptions({ selectedOptionsCount: 10 }),
      });
      const options = getAllOptionsFromData();
      expect(getSelectedOptions(getCurrentGroupsFromData())).toHaveLength(10);

      const didUpdate = changeHandler({ id: eventIds.clearButton, type: eventTypes.click }, dataHandlers);
      const updatedOptions = getAllOptionsFromLastUpdate();
      expect(didUpdate).toBeTruthy();
      expect(getSelectedOptions(getCurrentGroupsFromData())).toHaveLength(0);
      const assumedResult = [...options].map((opt) => ({ ...opt, selected: false }));
      expect(assumedResult).toMatchObject(updatedOptions);
    });
    */
  });
  describe('onChange', () => {
    it('is called when selected options change.', () => {
      updateMockData({
        ...createDataWithSelectedOptions({ totalOptionsCount: 3, selectedOptionsCount: 0 }),
      });
      const dataBeforeChange = getCurrentMockData();
      expect(getOnChangeMock()).toHaveBeenCalledTimes(0);
      // select option #1
      const { selectedOption, updatedGroups, selectedOptions } = selectOptionByIndex(1);
      expect(getOnChangeMock()).toHaveBeenCalledTimes(1);
      expect(getOnChangeCallArgs()).toMatchObject([
        selectedOptions,
        selectedOption,
        { ...dataBeforeChange, groups: updatedGroups },
      ]);

      const dataBeforeSecondChange = getCurrentMockData();
      // select option #0
      const {
        selectedOption: selectedOption2,
        updatedGroups: updatedGroups2,
        selectedOptions: selectedOptions2,
      } = selectOptionByIndex(2);
      expect(getOnChangeMock()).toHaveBeenCalledTimes(2);
      expect(getOnChangeCallArgs()).toMatchObject([
        selectedOptions2,
        selectedOption2,
        { ...dataBeforeSecondChange, groups: updatedGroups2 },
      ]);

      const dataBeforeThirdChange = getCurrentMockData();
      // unselect the previous selection by clicking it again
      const {
        selectedOption: selectedOption3,
        updatedGroups: updatedGroups3,
        selectedOptions: selectedOptions3,
      } = selectOptionByIndex(2);
      expect(getOnChangeMock()).toHaveBeenCalledTimes(3);
      expect(getOnChangeCallArgs()).toMatchObject([
        selectedOptions3,
        selectedOption3,
        { ...dataBeforeThirdChange, groups: updatedGroups3 },
      ]);
    });
    /* TODO: Clear functionality is handled at Select level, not ModularOptionList level
    it('is called when selected options change via clear button.', () => {
      updateMockData({
        ...createDataWithSelectedOptions({ totalOptionsCount: 3, selectedOptionsCount: 1 }),
      });
      changeHandler({ id: eventIds.clearButton, type: eventTypes.click }, dataHandlers);
      expect(getCurrentMockData().onChange).toHaveBeenCalledTimes(1);
    });
    */
    it('is not called when selected options does not change.', () => {
      changeHandler({ id: eventIds.generic, type: eventTypes.outSideClick }, dataHandlers);
      changeHandler({ id: eventIds.selectedOptions, type: eventTypes.click }, dataHandlers);
      expect(getOnChangeMock()).toHaveBeenCalledTimes(0);
    });
    it('can return a new set of options', () => {
      updateMockData({
        ...createDataWithSelectedOptions({ totalOptionsCount: 10, selectedOptionsCount: 4 }),
      });
      const options: OptionInProps[] = [{ label: 'OptionX' }, { label: 'OptionZ', selected: true }];

      expect(getCurrentMockMetaData().selectedOptions).toHaveLength(4);
      const groupsBefore = getCurrentGroupsFromData();
      const groupLabel = groupsBefore[0].options[0];
      const expectedResult = [groupLabel, ...options];
      setOnChangeReturnValue({ options });
      selectOptionByIndex(1);
      const optionsInData = getAllOptions(getCurrentGroupsFromData(), false);
      expect(optionsInData).toMatchObject(expectedResult);
      expect(getCurrentMockMetaData().selectedOptions).toMatchObject([{ label: 'OptionZ', selected: true }]);
    });
    it('can return the invalid prop and store it', () => {
      updateMockData({
        ...createDataWithSelectedOptions({ totalOptionsCount: 3, selectedOptionsCount: 1 }),
      });

      expect(getCurrentMockData().invalid).toBeFalsy();
      setOnChangeReturnValue({ invalid: true });
      selectOptionByIndex(1);
      expect(getCurrentMockData().invalid).toBeTruthy();
      setOnChangeReturnValue({ invalid: false });
      selectOptionByIndex(2);
      expect(getCurrentMockData().invalid).toBeFalsy();
    });
    it('can return a new set of groups', () => {
      updateMockData({
        ...createDataWithSelectedOptions({ totalOptionsCount: 3, selectedOptionsCount: 1 }),
      });
      const optionsInGroupA: OptionInProps[] = [{ label: 'GroupA_Option0' }, { label: 'GroupA_Option1' }];
      const optionsInGroupB: OptionInProps[] = [{ label: 'GroupB_Option0' }, { label: 'GroupB_Option1' }];
      const groups: ModularOptionListProps['groups'] = [
        { label: 'GroupA', options: optionsInGroupA },
        { label: 'GroupB', options: optionsInGroupB },
      ];
      setOnChangeReturnValue({ groups });
      selectOptionByIndex(1);
      const optionsInData = getAllOptions(getCurrentGroupsFromData(), false);
      const expectedOptions = getAllOptions(propsToGroups({ groups }) as Group[], false);
      expect(optionsInData).toMatchObject(expectedOptions);
      expect(expectedOptions).toHaveLength(optionsInGroupA.length + optionsInGroupB.length + groups.length);
    });
    it('can return new texts', () => {
      updateMockData({
        ...createDataWithSelectedOptions({ totalOptionsCount: 3, selectedOptionsCount: 1 }),
      });
      const textKeys: Array<TextKey> = ['assistive', 'label', 'error'];
      const createTextObjectFromArray = (arr: Array<TextKey>, prefix = '') => {
        return arr.reduce((texts, key) => {
          return {
            ...texts,
            [key]: `${prefix}${getTextKey(key, getCurrentMockMetaData() as ModularOptionListMetaData)}`,
          };
        }, {});
      };
      const currentTexts: Partial<Texts> = createTextObjectFromArray(textKeys);
      const newTexts: Partial<Texts> = createTextObjectFromArray(textKeys.slice(2), 'New ');
      setOnChangeReturnValue({ texts: newTexts });
      selectOptionByIndex(1);
      const updatedTexts = createTextObjectFromArray(textKeys);
      expect(updatedTexts).toMatchObject({ ...currentTexts, ...newTexts });
    });
  });
  describe('disabled', () => {
    it('when disabled, data or metadata is not updated', () => {
      updateMockData({
        ...createDataWithSelectedOptions({ totalOptionsCount: 3, selectedOptionsCount: 0 }),
        disabled: true,
      });
      const dataBeforeChange = getCurrentMockData();
      const metadataBeforeChange = getCurrentMockMetaData();
      expect(getOnChangeMock()).toHaveBeenCalledTimes(0);
      // select option #1
      selectOptionByIndex(1);
      changeHandler({ id: eventIds.selectedOptions, type: eventTypes.click }, dataHandlers);
      changeHandler({ id: eventIds.clearButton, type: eventTypes.click }, dataHandlers);
      changeHandler({ id: eventIds.generic, type: eventTypes.close }, dataHandlers);
      changeHandler({ id: eventIds.generic, type: eventTypes.outSideClick }, dataHandlers);
      expect(getCurrentMockData() === dataBeforeChange).toBeTruthy();
      expect(getCurrentMockMetaData() === metadataBeforeChange).toBeTruthy();
    });
  });
  describe('metaData.selectedOptions', () => {
    it('is updated when selected option changes', () => {
      updateMockData({
        ...createDataWithSelectedOptions({ totalOptionsCount: 3, selectedOptionsCount: 0 }),
      });
      const getSelectedOptionsInMetaData = () => {
        return getCurrentMockMetaData().selectedOptions || [];
      };
      expect(getSelectedOptionsInMetaData()).toHaveLength(0);
      const { selectedOption } = selectOptionByIndex(1);
      expect(getSelectedOptionsInMetaData()[0]).toMatchObject({ ...selectedOption, selected: true });
      const { selectedOption: selectedOption2 } = selectOptionByIndex(3);
      expect(getSelectedOptionsInMetaData()[0]).toMatchObject({ ...selectedOption2, selected: true });
      // unselect by clicking the selected item
      selectOptionByIndex(3);
      expect(getSelectedOptionsInMetaData()).toHaveLength(0);
    });
  });
});

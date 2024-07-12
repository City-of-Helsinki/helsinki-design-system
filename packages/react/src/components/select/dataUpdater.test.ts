import { getLastMockCallArgs } from '../../utils/testHelpers';
import { changeChandler } from './dataUpdater';
import { eventIds, eventTypes } from './events';
// eslint-disable-next-line jest/no-mocks-import
import {
  mockUseSelectDataHandlersContents,
  resetAllMocks,
  getDataUpdates,
  getMetaDataUpdates,
  createDataWithSelectedOptions,
  updateMockData,
  getCurrentMockData,
  getCurrentMockMetaData,
} from './hooks/__mocks__/useSelectDataHandlers';
import { getTextKey } from './texts';
import {
  Group,
  OptionInProps,
  SelectData,
  SelectDataHandlers,
  SelectMetaData,
  SelectProps,
  TextKey,
  Texts,
} from './types';
import { getAllOptions, getSelectedOptions, propsToGroups, updateSelectedOptionInGroups } from './utils';

describe('dataUpdater', () => {
  const getDataHandlers = () => {
    return mockUseSelectDataHandlersContents as SelectDataHandlers;
  };

  const getDataOfDataUpdateByIndex = (indexShift = -1) => {
    const list = getDataUpdates();
    return list[list.length + indexShift][0] as SelectData;
  };
  const getDataOfLastDataUpdate = () => {
    return getDataOfDataUpdateByIndex(-1);
  };
  const getMetaDataOfLastMetaDataUpdate = () => {
    const list = getMetaDataUpdates();
    return list[list.length - 1][0] as SelectMetaData;
  };
  const getCurrentGroupsFromData = () => {
    return getCurrentMockData().groups as Group[];
  };
  const getAllOptionsFromData = () => {
    return getAllOptions(getCurrentGroupsFromData(), false);
  };
  const filterLastDataUpdateFromEvents = (filter: (args: SelectData) => boolean) => {
    const filteredData = getDataUpdates()
      .filter((args) => args[0] && filter(args[0]))
      .map((args) => args[0]);
    return filteredData.length ? filteredData[filteredData.length - 1] : [];
  };
  const getLastGroupUpdateFromEvents = () => {
    const lastUpdateWithGroups = filterLastDataUpdateFromEvents((args) => !!args.groups);
    return lastUpdateWithGroups ? (lastUpdateWithGroups.groups as Group[]) : [];
  };

  const getAllOptionsFromLastUpdate = () => {
    return getAllOptions(getLastGroupUpdateFromEvents(), false);
  };

  const getLastOpenUpdateFromEvents = () => {
    return filterLastDataUpdateFromEvents((args) => args.open !== undefined);
  };

  const getOnChangeMock = () => {
    return getCurrentMockData().onChange as jest.Mock;
  };

  const setOnChangeReturnValue = (value: Partial<SelectProps>) => {
    getOnChangeMock().mockReturnValue(value);
  };

  const getOnChangeCallArgs = () => {
    return getLastMockCallArgs(getOnChangeMock());
  };

  let dateNowSpy: jest.SpyInstance | null = null;
  let dateNowTime = 0;

  const mockDateNow = (time = 0) => {
    dateNowTime = time;
    jest.spyOn(global.Date, 'now').mockImplementation(() => dateNowTime);
  };

  let dataHandlers: SelectDataHandlers;

  const selectOptionByIndex = (index: number) => {
    const options = getAllOptionsFromData();
    const targetOption = options[index];
    const updatedOption = { ...targetOption, selected: !targetOption.selected };
    const updatedGroups = updateSelectedOptionInGroups(getCurrentGroupsFromData(), updatedOption);
    const didUpdate = changeChandler(
      { id: eventIds.listItem, type: eventTypes.click, payload: { value: targetOption } },
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

  describe('open/close events', () => {
    it('updates the "open" prop in data and the "lastToggleCommand" in metaData.', () => {
      const didUpdate = changeChandler({ id: eventIds.selectedOptions, type: eventTypes.click }, dataHandlers);
      expect(didUpdate).toBeTruthy();
      expect(getDataOfLastDataUpdate()).toMatchObject({ open: true });
      expect(getMetaDataOfLastMetaDataUpdate().lastToggleCommand).toBeDefined();
    });
    it('concurrent events do not make changes until certain time has passed. This prevents button click and immediate outside click events to cancel each other', () => {
      changeChandler({ id: eventIds.selectedOptions, type: eventTypes.click }, dataHandlers);
      const updateTime = getMetaDataOfLastMetaDataUpdate().lastToggleCommand;
      const didUpdateAgain = changeChandler({ id: eventIds.selectedOptions, type: eventTypes.click }, dataHandlers);
      expect(didUpdateAgain).toBeFalsy();
      expect(getDataUpdates()).toHaveLength(1);
      mockDateNow(updateTime + 201);
      const didUpdateNow = changeChandler({ id: eventIds.selectedOptions, type: eventTypes.click }, dataHandlers);
      expect(didUpdateNow).toBeTruthy();
      expect(getDataUpdates()).toHaveLength(2);
      expect(getDataOfLastDataUpdate()).toMatchObject({ open: false });
      expect(getMetaDataOfLastMetaDataUpdate().lastToggleCommand).not.toBe(updateTime);
    });
  });
  describe('option click events', () => {
    it('sets an option selected/unselected in data and closes the menu', () => {
      updateMockData({
        ...createDataWithSelectedOptions({ totalOptionsCount: 3, selectedOptionsCount: 0 }),
        open: true,
      });
      const options = getAllOptionsFromData();

      // select an option
      const { didUpdate } = selectOptionByIndex(3);
      const updatedOptions = getAllOptionsFromLastUpdate();
      expect(didUpdate).toBeTruthy();
      const assumedResult = [...options];
      assumedResult[3].selected = true;
      expect(assumedResult).toMatchObject(updatedOptions);
      expect(getMetaDataOfLastMetaDataUpdate().lastToggleCommand).toBeDefined();
      expect(getLastOpenUpdateFromEvents()).toMatchObject({ open: false });
    });
    it('does nothing if payload does not have an option', () => {
      updateMockData({
        ...createDataWithSelectedOptions(),
        open: true,
      });
      const updateCount = getDataUpdates().length;

      const didUpdate = changeChandler({ id: eventIds.listItem, type: eventTypes.click, payload: {} }, dataHandlers);
      expect(didUpdate).toBeFalsy();
      expect(getDataUpdates()).toHaveLength(updateCount);
    });
  });
  describe('clear click events', () => {
    it('unselects all options', () => {
      updateMockData({
        ...createDataWithSelectedOptions({ selectedOptionsCount: 10 }),
        open: true,
      });
      const options = getAllOptionsFromData();
      expect(getSelectedOptions(getCurrentGroupsFromData())).toHaveLength(10);

      const didUpdate = changeChandler({ id: eventIds.clearButton, type: eventTypes.click }, dataHandlers);
      const updatedOptions = getAllOptionsFromLastUpdate();
      expect(didUpdate).toBeTruthy();
      expect(getSelectedOptions(getCurrentGroupsFromData())).toHaveLength(0);
      const assumedResult = [...options].map((opt) => ({ ...opt, selected: false }));
      expect(assumedResult).toMatchObject(updatedOptions);
    });
  });
  describe('outside click and close events', () => {
    it('if "open" is true, "open" prop is set to false and the "lastToggleCommand" in metaData is updated.', () => {
      updateMockData({
        open: true,
      });
      const didUpdate = changeChandler({ id: eventIds.generic, type: eventTypes.outSideClick }, dataHandlers);
      expect(didUpdate).toBeTruthy();
      expect(getDataOfLastDataUpdate()).toMatchObject({ open: false });
      expect(getMetaDataOfLastMetaDataUpdate().lastToggleCommand).toBeDefined();

      mockDateNow(getMetaDataOfLastMetaDataUpdate().lastToggleCommand + 201);

      updateMockData({
        open: true,
      });
      const didUpdateAgain = changeChandler({ id: eventIds.generic, type: eventTypes.close }, dataHandlers);
      expect(didUpdateAgain).toBeTruthy();
      expect(getDataOfLastDataUpdate()).toMatchObject({ open: false });
    });
    it('if "open" is already false, nothing is updated.', () => {
      const didUpdate = changeChandler({ id: eventIds.generic, type: eventTypes.outSideClick }, dataHandlers);
      expect(didUpdate).toBeFalsy();
      expect(getDataUpdates()).toHaveLength(0);
      expect(getMetaDataUpdates()).toHaveLength(0);

      const didUpdateAgain = changeChandler({ id: eventIds.generic, type: eventTypes.close }, dataHandlers);
      expect(didUpdateAgain).toBeFalsy();
      expect(getDataUpdates()).toHaveLength(0);
      expect(getMetaDataUpdates()).toHaveLength(0);
    });
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
      } = selectOptionByIndex(0);
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
      } = selectOptionByIndex(0);
      expect(getOnChangeMock()).toHaveBeenCalledTimes(3);
      expect(getOnChangeCallArgs()).toMatchObject([
        selectedOptions3,
        selectedOption3,
        { ...dataBeforeThirdChange, groups: updatedGroups3 },
      ]);
    });
    it('is called when selected options change via clear button.', () => {
      updateMockData({
        ...createDataWithSelectedOptions({ totalOptionsCount: 3, selectedOptionsCount: 1 }),
      });
      changeChandler({ id: eventIds.clearButton, type: eventTypes.click }, dataHandlers);
      expect(getCurrentMockData().onChange).toHaveBeenCalledTimes(1);
    });
    it('is not called when selected options does not change.', () => {
      changeChandler({ id: eventIds.generic, type: eventTypes.outSideClick }, dataHandlers);
      changeChandler({ id: eventIds.arrowButton, type: eventTypes.click }, dataHandlers);
      expect(getOnChangeMock()).toHaveBeenCalledTimes(0);
    });
    it('can return a new set of options', () => {
      updateMockData({
        ...createDataWithSelectedOptions({ totalOptionsCount: 3, selectedOptionsCount: 1 }),
      });
      const options: OptionInProps[] = [{ label: 'OptionX' }, { label: 'OptionZ', selected: true }];

      const groupsBefore = getCurrentGroupsFromData();
      const groupLabel = groupsBefore[0].options[0];
      const expectedResult = [groupLabel, ...options];
      setOnChangeReturnValue({ options });
      selectOptionByIndex(1);
      const optionsInData = getAllOptions(getCurrentGroupsFromData(), false);
      expect(optionsInData).toMatchObject(expectedResult);
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
      const groups: SelectProps['groups'] = [
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
      const textKeys: Array<TextKey> = ['assistive', 'label', 'error', 'placeholder'];
      const createTextObjectFromArray = (arr: Array<TextKey>, prefix = '') => {
        return arr.reduce((texts, key) => {
          return {
            ...texts,
            [key]: `${prefix}${getTextKey(key, getCurrentMockMetaData() as SelectMetaData)}`,
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
      changeChandler({ id: eventIds.selectedOptions, type: eventTypes.click }, dataHandlers);
      changeChandler({ id: eventIds.clearButton, type: eventTypes.click }, dataHandlers);
      changeChandler({ id: eventIds.generic, type: eventTypes.close }, dataHandlers);
      changeChandler({ id: eventIds.generic, type: eventTypes.outSideClick }, dataHandlers);
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

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
} from './hooks/__mocks__/useSelectDataHandlers';
import { Group, SelectData, SelectDataHandlers, SelectMetaData } from './types';
import { getAllOptions, getSelectedOptions } from './utils';

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
  let dateNowSpy: jest.SpyInstance | null = null;
  let dateNowTime = 0;

  const mockDateNow = (time = 0) => {
    dateNowTime = time;
    jest.spyOn(global.Date, 'now').mockImplementation(() => dateNowTime);
  };

  let dataHandlers: SelectDataHandlers;

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
      const optionToSelect = options[3];

      // select an option
      const didUpdate = changeChandler(
        { id: eventIds.listItem, type: eventTypes.click, payload: { value: optionToSelect } },
        dataHandlers,
      );
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
});

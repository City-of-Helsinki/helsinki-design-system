import { uniqueId } from 'lodash';

import { getMockCalls } from '../../../../utils/testHelpers';
import { ChangeEvent } from '../../../dataProvider/DataContext';
import { EventId, EventType } from '../../events';
import { Group, OptionInProps, SelectData, SelectMetaData } from '../../types';
import { getSelectedOptions, propsToGroups } from '../../utils';

export type OptionalSelectData = Partial<SelectData>;
export type OptionalSelectMetaData = Omit<Partial<SelectMetaData>, 'elementIds' | 'refs'> & {
  elementIds: Partial<SelectMetaData['elementIds']>;
  refs: Partial<SelectMetaData['refs']>;
};

const mockData: { current: OptionalSelectData; default: OptionalSelectData } = {
  current: {},
  default: {
    groups: propsToGroups({ options: ['Option 1'] }),
    open: false,
    multiSelect: false,
    onChange: jest.fn(),
    visibleOptions: 5.5,
  },
};

const mockDataUpdateTracker = jest.fn();

export function updateMockData(data: OptionalSelectData) {
  mockData.current = {
    ...mockData.current,
    ...data,
  };
  // metadata has selectedOptions, which is synced with selections in dataUpdater.
  const selectedOptions = data && data.groups ? getSelectedOptions(data.groups) : [];
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  updateMockMetaData({ selectedOptions });
}

export function resetMockData() {
  mockData.current = {
    ...mockData.default,
  };
  if (mockData.current.onChange) {
    (mockData.current.onChange as jest.Mock).mockReset();
  }
  mockDataUpdateTracker.mockReset();
}

export function getCurrentMockData() {
  return mockData.current;
}

const mockMetaData: { current: OptionalSelectMetaData; default: OptionalSelectMetaData } = {
  current: { elementIds: {}, refs: {} },
  default: {
    elementIds: {
      label: 'label-id',
      list: 'list-id',
      button: 'button-id',
      arrowButton: 'arrow-id',
      clearButton: 'clear-id',
    },
    selectedOptions: [],
    refs: {
      selectionButton: { current: null },
    },
    textContent: { selectionCount: 0, optionLabel: '' },
    textProvider: (key) => key,
    getOptionId: () => uniqueId('item'),
  },
};

export function updateMockMetaData(data: Partial<OptionalSelectMetaData>) {
  mockMetaData.current = {
    ...mockMetaData.current,
    ...data,
  };
}

const mockMetaDataUpdateTracker = jest.fn();

export function resetMockMetaData() {
  mockMetaData.current = {
    ...mockMetaData.default,
  };
  mockMetaDataUpdateTracker.mockReset();
}

export function getCurrentMockMetaData() {
  return mockMetaData.current;
}

const triggerTracker = jest.fn();

export function getTriggeredEvents() {
  return getMockCalls(triggerTracker).map((args) => args[0]) as ChangeEvent<EventId, EventType>[];
}

export function restTriggerTracking() {
  triggerTracker.mockReset();
}

export function resetAllMocks() {
  restTriggerTracking();
  resetMockMetaData();
  resetMockData();
}

export function getDataUpdates() {
  return getMockCalls(mockDataUpdateTracker);
}

export function getMetaDataUpdates() {
  return getMockCalls(mockMetaDataUpdateTracker);
}

export function createDataWithSelectedOptions({
  totalOptionsCount = 20,
  selectedOptionsCount = 1,
  label,
}: {
  totalOptionsCount?: number;
  selectedOptionsCount?: number;
  label?: string;
} = {}) {
  const options: OptionInProps[] = [];
  let selectCount = selectedOptionsCount;
  for (let y = 0; y < totalOptionsCount; y += 1) {
    options.push({ label: `Option ${y}`, selected: selectCount > 0, visible: true });

    selectCount -= 1;
  }
  if (label) {
    return { groups: propsToGroups({ groups: [{ options, label }] }) as Group[] };
  }
  return { groups: propsToGroups({ options }) as Group[] };
}

// name must start with "mock"
export const mockUseSelectDataHandlersContents = {
  getData: (): OptionalSelectData => {
    return mockData.current;
  },
  updateData: (newData: Partial<SelectData>) => {
    mockDataUpdateTracker(newData);
    updateMockData(newData);
  },
  getMetaData: (): OptionalSelectMetaData => {
    return mockMetaData.current;
  },
  updateMetaData: (newMetaData: Partial<SelectMetaData>) => {
    mockMetaDataUpdateTracker(newMetaData);
    updateMockMetaData(newMetaData as OptionalSelectMetaData);
  },
  trigger: (event: ChangeEvent) => {
    triggerTracker(event);
  },
};

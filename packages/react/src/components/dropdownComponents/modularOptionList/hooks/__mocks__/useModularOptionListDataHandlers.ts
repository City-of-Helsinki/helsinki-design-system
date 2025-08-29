import { uniqueId } from 'lodash';
import { createRef } from 'react';

import { getMockCalls } from '../../../../../utils/testHelpers';
import { ChangeEvent } from '../../../../dataProvider/DataContext';
import { changeHandler } from '../../dataUpdater';
import { EventId, EventType } from '../../events';
import {
  Group,
  OptionInProps,
  ModularOptionListData,
  ModularOptionListMetaData,
  Option,
  ModularOptionListDataHandlers,
} from '../../types';
import { getSelectedOptions, propsToGroups } from '../../utils';

export type OptionalModularOptionListData = Partial<ModularOptionListData>;
export type OptionalModularOptionListMetaData = Omit<Partial<ModularOptionListMetaData>, 'elementIds' | 'refs'> & {
  elementIds: Partial<ModularOptionListMetaData['elementIds']>;
  refs: Partial<ModularOptionListMetaData['refs']>;
};

const mockData: { current: OptionalModularOptionListData; default: OptionalModularOptionListData } = {
  current: {},
  default: {
    groups: propsToGroups({ options: ['Option 1'] }),
    multiSelect: false,
    onChange: jest.fn(),
    visibleOptions: 5.5,
  },
};

const mockDataUpdateTracker = jest.fn();

export function updateMockData(data: OptionalModularOptionListData) {
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

const mockMetaData: { current: OptionalModularOptionListMetaData; default: OptionalModularOptionListMetaData } = {
  current: { elementIds: {}, refs: {} },
  default: {
    elementIds: {
      list: 'list-id',
    },
    selectedOptions: [],
    refs: {
      list: createRef<HTMLUListElement>(),
    },
    textContent: { selectionCount: 0, label: '', numberIndicator: 0, value: '' },
    textProvider: (key) => key,
    getOptionId: () => uniqueId('item'),
    screenReaderNotifications: [],
  },
};

export function updateMockMetaData(data: Partial<OptionalModularOptionListMetaData>) {
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

export function createGroup({
  totalOptionsCount = 20,
  selectedOptionsCount = 0,
  label = 'group',
}: {
  totalOptionsCount?: number;
  selectedOptionsCount?: number;
  label?: string;
}) {
  const prefixOptionLabelsAndValues = (prefix: string, options: Option[]) => {
    return options.map((opt) => {
      if (opt.isGroupLabel) {
        return { ...opt, visible: true };
      }
      return {
        ...opt,
        label: `${prefix} ${opt.label}`,
        value: `${prefix} ${opt.value}`,
        visible: true,
      };
    });
  };
  const group = createDataWithSelectedOptions({ totalOptionsCount, selectedOptionsCount, label }).groups[0];
  group.options = prefixOptionLabelsAndValues(label, group.options);
  return group;
}

/*
Usage as mocked hook

const mockDataReset = jest.fn().mockImplementation(() => {
  resetMockData();
  resetMockMetaData();
});

jest.mock('../useModularOptionListDataHandlers', () => {
  return {
    __esModule: true,
    useModularOptionListDataHandlers: () => {
      mockDataReset();
      return {
        ...mockUseModularOptionListDataHandlersContents,
      };
    },
  };
});
*/

// name must start with "mock"
export const mockUseModularOptionListDataHandlersContents = {
  getData: (): OptionalModularOptionListData => {
    return mockData.current;
  },
  updateData: (newData: Partial<ModularOptionListData>) => {
    mockDataUpdateTracker(newData);
    updateMockData(newData);
  },
  getMetaData: (): OptionalModularOptionListMetaData => {
    return mockMetaData.current;
  },
  updateMetaData: (newMetaData: Partial<ModularOptionListMetaData>) => {
    mockMetaDataUpdateTracker(newMetaData);
    updateMockMetaData(newMetaData as OptionalModularOptionListMetaData);
  },
  trigger: (event: ChangeEvent) => {
    triggerTracker(event);
  },
  asyncRequestWithTrigger: (promise) => {
    promise.then((e: ChangeEvent) => {
      triggerTracker(e);
      changeHandler(e, mockUseModularOptionListDataHandlersContents as ModularOptionListDataHandlers);
    });
  },
};

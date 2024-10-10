import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import { List } from './List';
// eslint-disable-next-line jest/no-mocks-import
import {
  resetAllMocks,
  mockUseSelectDataHandlersContents,
  getCurrentMockMetaData,
  getCurrentMockData,
  OptionalSelectData,
  OptionalSelectMetaData,
  updateMockMetaData,
  updateMockData,
  createDataWithSelectedOptions,
  getTriggeredEvents,
} from '../../hooks/__mocks__/useSelectDataHandlers';
import { getAllOptions } from '../../utils';
import { Option } from '../../types';
import { isOptionClickEvent } from '../../events';

jest.mock('../../hooks/useSelectDataHandlers', () => ({
  useSelectDataHandlers: () => mockUseSelectDataHandlersContents,
}));

describe('<List />', () => {
  beforeEach(() => {
    resetAllMocks();
  });
  const getList = ({ getElementById, metaData }: Partial<ReturnType<typeof initTests>>) => {
    if (!getElementById || !metaData) {
      throw new Error('Pass getElementById and metaData');
    }
    return getElementById(metaData.elementIds.list) as HTMLUListElement;
  };

  const getOptionsFromData = ({ data }: Partial<ReturnType<typeof initTests>>, filterOutGroupLabels?: boolean) => {
    if (!data) {
      throw new Error('Pass data prop');
    }
    return data.groups ? getAllOptions(data.groups, filterOutGroupLabels) : [];
  };
  const isElementSelected = (el: HTMLLIElement) => {
    return el.getAttribute('aria-selected') === 'true';
  };
  const isOptionElement = (el: HTMLLIElement) => {
    return el.getAttribute('role') === 'option';
  };
  const getOptionElements = ({ getElementById, metaData }: Partial<ReturnType<typeof initTests>>) => {
    const list = getList({ getElementById, metaData });
    return list.querySelectorAll('li') as unknown as HTMLLIElement[];
  };
  const initTests = (data: OptionalSelectData = {}, metaData?: OptionalSelectMetaData) => {
    updateMockData({
      ...createDataWithSelectedOptions({ selectedOptionsCount: 10 }),
      open: true,
      ...data,
    });

    if (metaData) {
      updateMockMetaData(metaData);
    }
    const result = render(<List />);
    const getElementsBySelector = (selector: string) => {
      return result.container.querySelectorAll(selector);
    };
    const getElementById = (id?: string) => {
      return id ? getElementsBySelector(`#${id}`)[0] || null : null;
    };
    return {
      ...result,
      getElementById,
      getElementsBySelector,
      metaData: getCurrentMockMetaData(),
      data: getCurrentMockData(),
    };
  };
  describe('List element is always present in the DOM.', () => {
    it('When data.open is true and options are found', () => {
      const { getElementById, metaData, data } = initTests();
      const optionElements = getOptionElements({ getElementById, metaData });
      const options = getOptionsFromData({ data });
      expect(options).toHaveLength(20);
      expect(optionElements.length).toBe(options.length);
      optionElements.forEach((optionEl, index) => {
        const option = options[index] as Option;
        expect(optionEl.innerHTML.includes(option.label)).toBeTruthy();
      });
    });
    it('When there are no options', () => {
      const { getElementById, metaData } = initTests({ groups: [], open: true });
      expect(getList({ getElementById, metaData })).not.toBeNull();
    });
    it('When data.open is false', () => {
      const { getElementById, metaData } = initTests({ open: false });
      expect(getList({ getElementById, metaData })).not.toBeNull();
    });
  });
  describe('Element indicates selection', () => {
    it('Element aria-selected is true/false', () => {
      const { getElementById, metaData, data } = initTests();
      const optionElements = getOptionElements({ getElementById, metaData });
      const options = getOptionsFromData({ data });
      optionElements.forEach((optionEl, index) => {
        const option = options[index] as Option;
        expect(isElementSelected(optionEl)).toBe(option.selected);
        expect(isOptionElement(optionEl)).toBeTruthy();
      });
    });
  });
  describe('Group labels are rendered when label is set', () => {
    it('First element is group label', () => {
      const initData = createDataWithSelectedOptions({ label: 'Group label' });
      const { getElementById, metaData, data } = initTests(initData);
      const optionElements = getOptionElements({ getElementById, metaData });
      const options = getOptionsFromData({ data }, false);
      optionElements.forEach((optionEl, index) => {
        const option = options[index] as Option;
        expect(isElementSelected(optionEl)).toBe(option.selected);
        expect(isOptionElement(optionEl)).toBe(!option.isGroupLabel);
      });
    });
  });

  describe('Click events', () => {
    it('Clicking an list item triggers an event that matches isOptionClickEvent() and payload includes the option', () => {
      const { getElementById, metaData, data } = initTests();
      const optionElements = getOptionElements({ getElementById, metaData });
      const options = getOptionsFromData({ data });
      optionElements.forEach((optionEl, index) => {
        fireEvent.click(optionEl);
        const events = getTriggeredEvents();
        expect(events).toHaveLength(index + 1);
        const triggeredEvent = events[index];
        expect(isOptionClickEvent(triggeredEvent.id, triggeredEvent.type)).toBeTruthy();
        expect(triggeredEvent.payload?.value).toMatchObject(options[index]);
      });
    });
    it('Clicking a group label does not trigger anything.', () => {
      const initData = createDataWithSelectedOptions({ label: 'Group label' });
      const { getElementById, metaData } = initTests(initData);
      const groupLabelEl = getOptionElements({ getElementById, metaData })[0] as HTMLLIElement;
      expect(isOptionElement(groupLabelEl)).toBe(false);
      fireEvent.click(groupLabelEl);
      expect(getTriggeredEvents()).toHaveLength(0);
    });
  });
});

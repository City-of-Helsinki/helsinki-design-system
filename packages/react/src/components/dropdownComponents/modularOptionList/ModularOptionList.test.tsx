import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import { ModularOptionList } from './ModularOptionList';
// eslint-disable-next-line jest/no-mocks-import
import {
  resetAllMocks,
  mockUseModularOptionListDataHandlersContents,
  getCurrentMockMetaData,
  getCurrentMockData,
  OptionalModularOptionListData,
  OptionalModularOptionListMetaData,
  updateMockMetaData,
  updateMockData,
  createDataWithSelectedOptions,
  getTriggeredEvents,
} from './hooks/__mocks__/useModularOptionListDataHandlers';
import { getAllOptions } from './utils';
import { Option } from './types';
import { isOptionClickEvent } from './events';
import { IconHome } from '../../../icons';

jest.mock('./hooks/useModularOptionListDataHandlers', () => ({
  useModularOptionListDataHandlers: () => mockUseModularOptionListDataHandlersContents,
}));

describe('<ModularOptionList />', () => {
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
  const getMultiSelectOptionElements = ({ getElementById, metaData }: Partial<ReturnType<typeof initTests>>) => {
    // Multiselect options can be either div (in groups) or li (not in groups)
    const list = getList({ getElementById, metaData });
    const groups = list.querySelectorAll('div[role="group"]');
    const optionElements: HTMLElement[] = [];

    // Get options from groups (div[role="checkbox"])
    groups.forEach((group) => {
      const groupOptions = group.querySelectorAll('div[role="checkbox"]');
      optionElements.push(...(Array.from(groupOptions) as HTMLElement[]));
    });

    // Get options not in groups (li[role="option"])
    const listOptions = list.querySelectorAll('li[role="option"]');
    optionElements.push(...(Array.from(listOptions) as HTMLElement[]));

    return optionElements;
  };
  const initTests = (data: OptionalModularOptionListData = {}, metaData?: OptionalModularOptionListMetaData) => {
    updateMockData({
      ...createDataWithSelectedOptions({ selectedOptionsCount: 10 }),
      ...data,
    });

    if (metaData) {
      updateMockMetaData(metaData);
    }
    const result = render(<ModularOptionList />);
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
    it('All options are found', () => {
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
      const { getElementById, metaData } = initTests({ groups: [] });
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
      const { getElementById, metaData, data } = initTests({ multiSelect: true });
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
    it('Clicking a selected single select option does not trigger anything.', () => {
      const initData = createDataWithSelectedOptions({
        label: 'Group label',
        totalOptionsCount: 10,
        selectedOptionsCount: 10,
      });
      const { getElementById, metaData } = initTests(initData);
      const optionElements = getOptionElements({ getElementById, metaData });
      optionElements.forEach((optionEl) => {
        fireEvent.click(optionEl);
        expect(getTriggeredEvents()).toHaveLength(0);
      });
    });
  });

  describe('IconStart support', () => {
    it('Renders iconStart in single select options', () => {
      const initData = createDataWithSelectedOptions({ totalOptionsCount: 3 });
      const options = getAllOptions(initData.groups);
      options[0].iconStart = <IconHome aria-label="home icon" />;
      initData.groups[0].options = [initData.groups[0].options[0], ...options];
      const { getElementById, metaData } = initTests(initData);
      const optionElements = getOptionElements({ getElementById, metaData });
      const firstOption = optionElements[0];
      expect(firstOption.querySelector('[aria-label="home icon"]')).toBeTruthy();
    });
    it('Does not render iconStart in multiselect options', () => {
      const initData = createDataWithSelectedOptions({ totalOptionsCount: 3 });
      const options = getAllOptions(initData.groups);
      // Add iconStart to all options (create new objects to avoid mutation)
      const optionsWithIcons = options.map((option) => ({
        ...option,
        iconStart: <IconHome aria-label="home icon" />,
      }));
      initData.groups[0].options = optionsWithIcons;
      const { getElementById, metaData } = initTests({ ...initData, multiSelect: true });
      const optionElements = getMultiSelectOptionElements({ getElementById, metaData });

      // Verify that no icons are present in multiselect options
      expect(optionElements.length).toBeGreaterThan(0);
      optionElements.forEach((optionEl) => {
        // Check that the option doesn't contain any SVG elements (icons are typically SVG)
        const svgElements = optionEl.querySelectorAll('svg');
        expect(svgElements.length).toBe(0);

        // Check that the option doesn't contain elements with aria-label="home icon"
        const iconElements = optionEl.querySelectorAll('[aria-label="home icon"]');
        expect(iconElements.length).toBe(0);
      });
    });
  });
});

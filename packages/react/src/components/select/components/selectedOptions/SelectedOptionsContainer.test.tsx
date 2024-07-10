import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import { SelectedOptionsContainer } from './SelectedOptionsContainer';
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
import { getSelectedOptions } from '../../utils';
import { Option } from '../../types';
import { isClearOptionsClickEvent, isOpenOrCloseEvent } from '../../events';

let mockIndexOfFirstVisibleChild = 1;

jest.mock('../../hooks/useSelectDataHandlers', () => ({
  useSelectDataHandlers: () => mockUseSelectDataHandlersContents,
}));
jest.mock('../../../../utils/getIndexOfFirstVisibleChild', () => ({
  getIndexOfFirstVisibleChild: () => mockIndexOfFirstVisibleChild,
}));

describe('<SelectedOptionsContainer />', () => {
  beforeEach(() => {
    resetAllMocks();
    mockIndexOfFirstVisibleChild = 1;
  });
  const getButton = ({ getElementById, metaData }: Partial<ReturnType<typeof initTests>>) => {
    if (!getElementById || !metaData) {
      throw new Error('Pass getElementById and metaData');
    }
    return getElementById(metaData.elementIds.button) as HTMLButtonElement;
  };
  const getSelectedOptionsFromData = ({ data }: Partial<ReturnType<typeof initTests>>) => {
    if (!data) {
      throw new Error('Pass data prop');
    }
    return data.groups ? getSelectedOptions(data.groups) : [];
  };
  const checkSelectedOptions = (
    options: Option[],
    { getElementById, metaData }: Partial<ReturnType<typeof initTests>>,
  ) => {
    const button = getButton({ getElementById, metaData });
    const { innerHTML } = button;
    options.forEach((opt) => {
      expect(innerHTML.includes(opt.label)).toBeTruthy();
    });
  };
  const getSelectedOptionsElements = ({ getElementById, metaData }: Partial<ReturnType<typeof initTests>>) => {
    const button = getButton({ getElementById, metaData });
    return button.querySelectorAll('div > *') as unknown as HTMLElement[];
  };
  const initTests = (data?: OptionalSelectData, metaData?: OptionalSelectMetaData) => {
    if (data) {
      updateMockData(data);
    }
    if (metaData) {
      updateMockMetaData(metaData);
    }
    const result = render(<SelectedOptionsContainer />);
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
  describe('Without selected options', () => {
    it('Main button and arrow button are always rendered', () => {
      const { getElementById, metaData } = initTests();
      expect(getButton({ getElementById, metaData })).not.toBeNull();
      expect(getElementById(metaData.elementIds.arrowButton)).not.toBeNull();
    });
    it('Clear button is not found', () => {
      const { getElementById, metaData } = initTests();
      expect(getElementById(metaData.elementIds.clearButton)).toBeNull();
    });
    it('Placeholder is rendered', () => {
      const { getElementById, data, metaData } = initTests();
      const { placeholder } = data;
      const button = getButton({ getElementById, metaData });
      expect(button.innerHTML.includes(String(placeholder))).toBeTruthy();
    });
  });
  describe('With selected options', () => {
    const dummyData = createDataWithSelectedOptions();
    it('Clear button is rendered', () => {
      const { getElementById, metaData } = initTests(dummyData);
      expect(getElementById(metaData.elementIds.clearButton)).not.toBeNull();
    });
    it('Option label is rendered, not the placeholder', () => {
      const { getElementById, data, metaData } = initTests(dummyData);
      const { placeholder } = data;
      const button = getButton({ getElementById, metaData });
      expect(button.innerHTML.includes(String(placeholder))).toBeFalsy();
      const selectedOptions = getSelectedOptions(dummyData.groups);
      expect(selectedOptions).toHaveLength(1);
      selectedOptions.forEach((opt) => {
        expect(button.innerHTML.includes(opt.label)).toBeTruthy();
      });
    });
  });
  describe('With hidden selected options', () => {
    const dummyData = createDataWithSelectedOptions({ selectedOptionsCount: 5 });
    const getCountSelector = 'span.count';
    const getHiddenCount = (numberOfSelections: number, indexOfFirstVisibleChild: number) => {
      return numberOfSelections - (indexOfFirstVisibleChild + 1);
    };
    it('Count element indicating number of hidden elements is seen', () => {
      const { getElementsBySelector, data } = initTests(dummyData);
      const countElement = getElementsBySelector(getCountSelector)[0] as HTMLSpanElement;
      const selectedOptions = getSelectedOptionsFromData({ data });
      expect(countElement.innerHTML).toBe(`+${getHiddenCount(selectedOptions.length, mockIndexOfFirstVisibleChild)}`);
    });
    it('All options are in the dom', () => {
      const { getElementById, metaData, data } = initTests(dummyData);
      const selectedOptions = getSelectedOptionsFromData({ data });
      expect(selectedOptions).toHaveLength(5);
      checkSelectedOptions(selectedOptions, { getElementById, metaData });
    });
    it('Last visible option does not have succeeding "," so it has different classNames', () => {
      const { getElementById, metaData } = initTests(dummyData);
      const selectedOptions = getSelectedOptionsElements({ getElementById, metaData });
      const normalOptionClassNames = selectedOptions[0].getAttribute('class');
      const lastVisibleOptionClassNames = selectedOptions[mockIndexOfFirstVisibleChild].getAttribute('class');
      expect(normalOptionClassNames).not.toBe(lastVisibleOptionClassNames);
      selectedOptions.forEach((element, index) => {
        if (index !== mockIndexOfFirstVisibleChild) {
          // eslint-disable-next-line jest/no-conditional-expect
          expect(element.getAttribute('class')).toBe(normalOptionClassNames);
        } else {
          // eslint-disable-next-line jest/no-conditional-expect
          expect(element.getAttribute('class')).toBe(lastVisibleOptionClassNames);
        }
      });
    });
  });

  describe('Click events', () => {
    it('The main and arrow buttons click triggers an event that matches isOpenOrCloseEvent()', () => {
      const { getElementById, metaData } = initTests();
      const button = getButton({ getElementById, metaData });
      fireEvent.click(button);
      const events = getTriggeredEvents();
      expect(events).toHaveLength(1);
      const triggeredEvent = events[0];
      expect(isOpenOrCloseEvent(triggeredEvent.id, triggeredEvent.type)).toBeTruthy();

      const arrowButton = getElementById(metaData.elementIds.arrowButton) as HTMLButtonElement;
      fireEvent.click(arrowButton);
      const eventsAfterArrowBUtton = getTriggeredEvents();
      expect(eventsAfterArrowBUtton).toHaveLength(2);
      const triggeredArrowButtonEvent = eventsAfterArrowBUtton[1];
      expect(isOpenOrCloseEvent(triggeredArrowButtonEvent.id, triggeredArrowButtonEvent.type)).toBeTruthy();
    });
    it('The clear button click triggers an event that matches isClearOptionsClickEvent()', () => {
      const { getElementById, metaData } = initTests(createDataWithSelectedOptions());
      const button = getElementById(metaData.elementIds.clearButton) as HTMLButtonElement;
      fireEvent.click(button);
      const events = getTriggeredEvents();
      expect(events).toHaveLength(1);
      const triggeredEvent = events[0];
      expect(isClearOptionsClickEvent(triggeredEvent.id, triggeredEvent.type)).toBeTruthy();
    });
  });
  describe('When Select is disabled', () => {
    it('the buttons are also disabled with attributes', () => {
      const { getElementById, metaData } = initTests({ ...createDataWithSelectedOptions(), disabled: true });
      const button = getButton({ getElementById, metaData });
      const clearButton = getElementById(metaData.elementIds.clearButton) as HTMLButtonElement;
      const arrowButton = getElementById(metaData.elementIds.arrowButton) as HTMLButtonElement;
      // the main button does not have "disabled"-attribute or it cannot get focus and is invisible to screen readers
      expect(button.getAttribute('aria-disabled')).toBe('true');
      expect(clearButton.getAttribute('disabled')).not.toBeNull();
      expect(arrowButton.getAttribute('disabled')).not.toBeNull();
    });
  });
});

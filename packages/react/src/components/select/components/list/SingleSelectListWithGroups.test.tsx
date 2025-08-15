/* eslint-disable jest/no-conditional-expect */
import { axe } from 'jest-axe';

import {
  initTests,
  mockedContainer,
  skipAxeRulesExpectedToFail,
  testUtilAfterAll,
  testUtilBeforeAll,
} from '../../testUtil';
import { getAllOptions } from '../../utils';
import { SingleSelectListWithGroups } from './SingleSelectListWithGroups';

jest.mock('../Container', () => {
  return {
    __esModule: true,
    Container: () => mockedContainer(),
  };
});

describe('<SingleSelectListWithGroups />', () => {
  beforeAll(() => {
    testUtilBeforeAll(SingleSelectListWithGroups);
  });
  afterAll(() => {
    testUtilAfterAll();
  });
  it('Component is rendered', async () => {
    const { asFragment } = initTests({
      renderComponentOnly: true,
      selectProps: { open: true },
      testProps: { groups: true },
    });
    expect(asFragment()).toMatchSnapshot();
  });
  it('should not have basic accessibility issues', async () => {
    const { container } = initTests({ renderComponentOnly: true, selectProps: { open: true } });
    const results = await axe(container, skipAxeRulesExpectedToFail);
    expect(results).toHaveNoViolations();
  });
  it('all options are rendered and have correct attributes', async () => {
    const { getGroups, getOptionElement } = initTests({
      renderComponentOnly: true,
      selectProps: { open: true },
    });
    const allOptions = getAllOptions(getGroups());
    const uniqueIds = new Set<string>();
    // eslint-disable-next-line no-restricted-syntax
    for (const option of allOptions) {
      const el = getOptionElement(option);
      const id = el.getAttribute('id') as string;
      expect(!!id).toBeTruthy();
      expect(uniqueIds.has(id)).toBeFalsy();
      expect(el.getAttribute('tabindex')).toBe('-1');
      uniqueIds.add(id);
      if (option.isGroupLabel) {
        expect(el.getAttribute('role')).toBe('presentation');
        //
      } else {
        expect(el.getAttribute('aria-disabled')).toBe('false');
        expect(el.getAttribute('aria-selected')).toBe('false');
        expect(el.getAttribute('role')).toBe('option');
      }
    }
  });
  it('Clicking an option triggers an event', async () => {
    const { getGroups, clickOptionElement, getOnChangeCallArgsAsProps, triggerDataChange, getOnChangeMockCalls } =
      initTests({
        renderComponentOnly: false,
        selectProps: { open: true },
      });
    const allOptions = getAllOptions(getGroups());
    // eslint-disable-next-line no-restricted-syntax
    for (const option of allOptions) {
      const callCount = getOnChangeMockCalls().length;
      if (option.isGroupLabel) {
        // clicking group label does nothing
        clickOptionElement(option);
        expect(getOnChangeMockCalls().length).toBe(callCount);
      } else {
        clickOptionElement(option);
        expect(getOnChangeMockCalls().length).toBe(callCount + 1);
        const onChangeProps = getOnChangeCallArgsAsProps();
        expect(onChangeProps.clickedOption).toMatchObject(option);
        // the option sent to the onChange has .selected === false
        expect(onChangeProps.clickedOption.selected).toBeFalsy();
        expect(onChangeProps.selectedOptions).toHaveLength(1);
        // the option in the array of selected items has .selected === true
        expect(onChangeProps.selectedOptions[0].selected).toBeTruthy();
        // gotta open the list again
        // eslint-disable-next-line no-await-in-loop
        await triggerDataChange({ open: true });
      }
    }
  });
  it('should have aria-live="polite" attribute when listInputType is present', () => {
    const { container } = initTests({
      renderComponentOnly: true,
      selectProps: { open: true, filter: () => true },
      testProps: { groups: true, input: 'filter' },
    });
    
    // Find the list element by ID pattern or class
    const listElement = container.querySelector('[id$="-list"]') || container.querySelector('.list');
    expect(listElement).toHaveAttribute('aria-live', 'polite');
  });
  it('should not have aria-live attribute when listInputType is not present', () => {
    const { container } = initTests({
      renderComponentOnly: true,
      selectProps: { open: true },
      testProps: { groups: true },
    });
    
    // Find the list element by ID pattern or class
    const listElement = container.querySelector('[id$="-list"]') || container.querySelector('.list');
    expect(listElement).not.toHaveAttribute('aria-live');
  });
});

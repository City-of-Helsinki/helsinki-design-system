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
import { MultiSelectListWithGroups } from './MultiSelectListWithGroups';

jest.mock('../Container', () => {
  return {
    __esModule: true,
    Container: () => mockedContainer(),
  };
});

describe('<MultiSelectListWithGroups />', () => {
  beforeAll(() => {
    testUtilBeforeAll(MultiSelectListWithGroups);
  });
  afterAll(() => {
    testUtilAfterAll();
  });
  const selectProps = { open: true, multiSelect: true };
  const initProps = {
    renderComponentOnly: true,
    selectProps,
    testProps: { groups: true },
  };
  it('Component is rendered', async () => {
    const { asFragment } = initTests(initProps);
    expect(asFragment()).toMatchSnapshot();
  });
  it('should not have basic accessibility issues', async () => {
    const { container } = initTests(initProps);
    const results = await axe(container, skipAxeRulesExpectedToFail);
    expect(results).toHaveNoViolations();
  });
  it('all options are rendered and have correct attributes', async () => {
    const { getGroups, getOptionElement } = initTests(initProps);
    const allOptions = getAllOptions(getGroups(), false);
    const uniqueIds = new Set<string>();
    // eslint-disable-next-line no-restricted-syntax
    for (const option of allOptions) {
      const el = getOptionElement(option);
      expect(el.getAttribute('role')).toBe('checkbox');
      const id = el.getAttribute('id') as string;
      expect(!!id).toBeTruthy();
      expect(uniqueIds.has(id)).toBeFalsy();
      expect(el.getAttribute('tabindex')).toBe('-1');
      uniqueIds.add(id);
      expect(el.getAttribute('aria-disabled')).toBe('false');
      expect(el.getAttribute('aria-checked')).toBe('false');
    }
  });
  it('Clicking a non-group label option triggers an event and selects it. Group label changes too.', async () => {
    const {
      getGroups,
      clickOptionElement,
      getOnChangeCallArgsAsProps,
      getOnChangeMockCalls,
      createRenderUpdatePromise,
      getOptionElement,
    } = initTests({
      ...initProps,
      renderComponentOnly: false,
    });
    const groups = getGroups();
    let selectCount = 0;
    let clickedGroupOptionsCount = 0;
    // eslint-disable-next-line no-restricted-syntax
    for (const group of groups) {
      const { options } = group;
      clickedGroupOptionsCount = 0;
      const groupLabel = options[0];
      // eslint-disable-next-line no-restricted-syntax
      for (const option of options) {
        if (!option.isGroupLabel) {
          const renderUpdatePromise = createRenderUpdatePromise();
          const callCount = getOnChangeMockCalls().length;
          clickOptionElement(option);
          selectCount += 1;
          clickedGroupOptionsCount += 1;
          expect(getOnChangeMockCalls().length).toBe(callCount + 1);
          const onChangeProps = getOnChangeCallArgsAsProps();
          expect(onChangeProps.clickedOption).toMatchObject(option);
          // the option sent to the onChange has .selected === false
          expect(onChangeProps.clickedOption.selected).toBeFalsy();
          expect(onChangeProps.selectedOptions).toHaveLength(selectCount);
          // the option in the array of selected items has .selected === true
          expect(onChangeProps.selectedOptions[0].selected).toBeTruthy();
          // eslint-disable-next-line no-await-in-loop
          await renderUpdatePromise;
        }
        if (clickedGroupOptionsCount > 0) {
          const el = getOptionElement(groupLabel);
          const allSelected = clickedGroupOptionsCount === options.length - 1;
          expect(el.getAttribute('aria-checked')).toBe(allSelected ? 'true' : 'mixed');
          expect((el.querySelector('input') as HTMLInputElement).indeterminate).toBe(!allSelected);
        }
      }
    }
  });
  it('Clicking a group label option triggers an event and selects all options in that group.', async () => {
    const {
      getGroups,
      clickOptionElement,
      getOnChangeCallArgsAsProps,
      getOnChangeMockCalls,
      createRenderUpdatePromise,
    } = initTests({
      ...initProps,
      renderComponentOnly: false,
    });
    const groups = getGroups();
    let selectCount = 0;
    // eslint-disable-next-line no-restricted-syntax
    for (const group of groups) {
      const callCount = getOnChangeMockCalls().length;
      const { options } = group;
      const groupLabel = options[0];
      const renderUpdatePromise = createRenderUpdatePromise();
      clickOptionElement(groupLabel);
      // -1 because group labels are not in the list of selected options
      selectCount += options.length - 1;
      expect(getOnChangeMockCalls().length).toBe(callCount + 1);
      const onChangeProps = getOnChangeCallArgsAsProps();
      expect(onChangeProps.clickedOption).toMatchObject(groupLabel);
      // the option sent to the onChange has .selected === false
      expect(onChangeProps.clickedOption.selected).toBeFalsy();
      expect(onChangeProps.selectedOptions).toHaveLength(selectCount);
      // the option in the array of selected items has .selected === true
      expect(onChangeProps.selectedOptions[0].selected).toBeTruthy();
      // eslint-disable-next-line no-await-in-loop
      await renderUpdatePromise;
    }
  });
});

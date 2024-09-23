import { axe } from 'jest-axe';

import {
  initTests,
  mockedContainer,
  skipAxeRulesExpectedToFail,
  testUtilAfterAll,
  testUtilBeforeAll,
} from '../../testUtil';
import { getAllOptions } from '../../utils';
import { SingleSelectAndGrouplessList } from './SingleSelectAndGrouplessList';

jest.mock('../Container', () => {
  return {
    __esModule: true,
    Container: () => mockedContainer(),
  };
});

describe('<SingleSelectAndGrouplessList />', () => {
  beforeAll(() => {
    testUtilBeforeAll(SingleSelectAndGrouplessList);
  });
  afterAll(() => {
    testUtilAfterAll();
  });
  it('Component is rendered', async () => {
    const { asFragment } = initTests({ renderComponentOnly: true, selectProps: { open: true } });
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
      expect(el.getAttribute('aria-disabled')).toBe('false');
      expect(el.getAttribute('aria-selected')).toBe('false');
      expect(el.getAttribute('role')).toBe('option');
      expect(el.getAttribute('tabindex')).toBe('-1');
      const id = el.getAttribute('id') as string;
      expect(!!id).toBeTruthy();
      expect(uniqueIds.has(id)).toBeFalsy();
      uniqueIds.add(id);
    }
  });
  it('Clicking an option triggers an event', async () => {
    const { getGroups, clickOptionElement, getOnChangeCallArgsAsProps, triggerDataChange } = initTests({
      renderComponentOnly: false,
      selectProps: { open: true },
    });
    const allOptions = getAllOptions(getGroups());
    // eslint-disable-next-line no-restricted-syntax
    for (const option of allOptions) {
      clickOptionElement(option);
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
  });
  it('Renders also multiselect items', async () => {
    const { getGroups, clickOptionElement, getOnChangeCallArgsAsProps, createRenderUpdatePromise, getOptionElement } =
      initTests({
        renderComponentOnly: false,
        selectProps: { open: true, multiSelect: true },
      });
    const allOptions = getAllOptions(getGroups());
    let clickCount = 0;
    // eslint-disable-next-line no-restricted-syntax
    for (const option of allOptions) {
      const renderUpdatePromise = createRenderUpdatePromise();
      clickOptionElement(option);
      clickCount += 1;
      const onChangeProps = getOnChangeCallArgsAsProps();
      expect(onChangeProps.clickedOption).toMatchObject(option);
      // the option sent to the onChange has .selected === false
      expect(onChangeProps.clickedOption.selected).toBeFalsy();
      expect(onChangeProps.selectedOptions).toHaveLength(clickCount);
      // the option in the array of selected items has .selected === true
      expect(onChangeProps.selectedOptions[0].selected).toBeTruthy();
      // gotta open the list again
      // eslint-disable-next-line no-await-in-loop
      await renderUpdatePromise;
      const el = getOptionElement(option);
      expect(el.getAttribute('aria-selected')).toBe('true');
      expect(el.getAttribute('role')).toBe('option');
    }
  });
});

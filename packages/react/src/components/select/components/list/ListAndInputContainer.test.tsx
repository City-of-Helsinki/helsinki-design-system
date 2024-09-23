/* eslint-disable jest/no-conditional-expect */
import { axe } from 'jest-axe';

import { initTests, mockedContainer, testUtilAfterAll, testUtilBeforeAll } from '../../testUtil';
import { defaultFilter } from '../../utils';
import { ListAndInputContainer } from './ListAndInputContainer';

jest.mock('../Container', () => {
  return {
    __esModule: true,
    Container: () => mockedContainer(),
  };
});

describe('<ListAndInputContainer />', () => {
  beforeAll(() => {
    testUtilBeforeAll(ListAndInputContainer);
  });
  afterAll(() => {
    testUtilAfterAll();
  });
  const selectProps = { open: true, multiSelect: true };
  const initProps = {
    renderComponentOnly: true,
    selectProps,
    testProps: { groups: true, open: true, filter: defaultFilter },
  };
  it('Component is rendered', async () => {
    const { asFragment } = initTests(initProps);
    expect(asFragment()).toMatchSnapshot();
  });
  it('should not have basic accessibility issues', async () => {
    const { container } = initTests(initProps);
    // axe complains that dialog needs to have an aria-labelledby set
    const disabledAriaError = { rules: { 'aria-dialog-name': { enabled: false } } };
    const results = await axe(container, disabledAriaError);
    expect(results).toHaveNoViolations();
  });
  it('With input, multiSelect and group labels, role and aria-label are set', async () => {
    const { getElementById, getElementIds, optionCountInAllGroups, getText, getProps } = initTests(initProps);
    const listElement = getElementById(getElementIds().selectionsAndListsContainer);
    expect(listElement.getAttribute('role')).toBe('dialog');
    const ariaLabel = listElement.getAttribute('aria-label');
    expect(ariaLabel?.includes(`${optionCountInAllGroups} choices`)).toBeTruthy();
    expect(ariaLabel?.includes(getText(getProps(), 'label'))).toBeTruthy();
  });
  it('Without input, multiSelect and group labels, role and aria-label are not set', async () => {
    const { getElementById, getElementIds } = initTests({
      ...initProps,
      selectProps: { ...initProps.selectProps, multiSelect: false },
      testProps: { ...initProps.testProps, input: undefined },
    });
    const listElement = getElementById(getElementIds().selectionsAndListsContainer);
    expect(listElement.getAttribute('role')).toBeNull();
    expect(listElement.getAttribute('aria-label')).toBeNull();
  });
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { HTMLAttributes } from 'react';
import { fireEvent, render, waitFor, act } from '@testing-library/react';
import { axe } from 'jest-axe';

import {
  defaultId,
  defaultLabel,
  getSelectProps,
  renderWithHelpers,
  skipAxeRulesExpectedToFail,
  groupsAndOptions as presetGroups,
} from './testUtil';
import { defaultFilter, getElementIds, OptionIterator } from './utils';
import { Texts, SearchResult, SelectProps } from './types';
import { Option, AcceptedNativeDivProps, GroupInProps, OptionInProps } from '../modularOptionList/types';
import { createTimedPromise } from '../../login/testUtils/timerTestUtil';
import { getCommonElementTestProps, getElementAttributesMisMatches } from '../../../utils/testHelpers';
import { Select } from './Select';
import { getActiveElement } from '../../../utils/test-utils';

// Suppress console.error for React act warnings during tests
// eslint-disable-next-line no-console
const originalError = console.error;
beforeAll(() => {
  // eslint-disable-next-line no-console
  console.error = jest.fn().mockImplementation((...args: unknown[]) => {
    const message = args[0];
    if (typeof message === 'string' && message.includes('Warning: An update to')) {
      return; // Suppress all React update warnings
    }
    // eslint-disable-next-line no-console
    originalError.call(console, ...args);
  });
});

afterAll(() => {
  // eslint-disable-next-line no-console
  console.error = originalError;
});

type ButtonAttributes = HTMLAttributes<HTMLButtonElement>;
type DivAttributes = HTMLAttributes<HTMLDivElement>;
type ListAttributes = HTMLAttributes<HTMLUListElement>;
type LiAttributes = HTMLAttributes<HTMLLIElement>;
type InputAttributes = HTMLAttributes<HTMLInputElement>;

type ElementAttributes = {
  button: ButtonAttributes;
  listAndInputContainer: DivAttributes;
  list: DivAttributes | ListAttributes;
  options: LiAttributes | DivAttributes;
  selectedOptions: LiAttributes | DivAttributes;
  listElementNodeName: string | undefined;
  group: DivAttributes | undefined;
  groupElementNodeName: string | undefined;
  groupLabel: LiAttributes | DivAttributes | undefined;
  input: InputAttributes | undefined;
};

type TestScenario = {
  description: string;
  selectOptions: Parameters<typeof getSelectProps>[0];
  expectedAttributes: ElementAttributes;
  groupCount: number;
  hasInput: boolean;
};

describe('<Select />', () => {
  const defaultTexts: Partial<Texts> = {
    label: 'Label',
    assistive: 'Assistive text',
    error: 'Error text',
    language: 'en',
  };
  describe('spec', () => {
    it('renders single select component with groups and filter input', () => {
      const { asFragment } = renderWithHelpers({
        texts: defaultTexts,
        invalid: true,
        required: true,
      });
      expect(asFragment()).toMatchSnapshot();
    });
    it('renders multiSelect component with groups and filter input', () => {
      const { asFragment } = renderWithHelpers({
        texts: defaultTexts,
        invalid: true,
        required: true,
        multiSelect: true,
      });
      expect(asFragment()).toMatchSnapshot();
    });
    it('single select component with groups and filter input should not have basic accessibility issues', async () => {
      const { container } = renderWithHelpers({
        texts: defaultTexts,
        invalid: true,
        required: true,
        multiSelect: false,
        filter: defaultFilter,
        groups: true,
        open: true,
      });
      const results = await axe(container, skipAxeRulesExpectedToFail);
      expect(results).toHaveNoViolations();
    });
    it('multi select component with groups and filter input should not have basic accessibility issues', async () => {
      const { container } = renderWithHelpers({
        texts: defaultTexts,
        invalid: true,
        required: true,
        multiSelect: true,
        filter: defaultFilter,
        groups: true,
        open: true,
      });
      const results = await axe(container, skipAxeRulesExpectedToFail);
      expect(results).toHaveNoViolations();
    });
    it('native html props are passed to the element', async () => {
      const divProps = getCommonElementTestProps<'div'>('div') as AcceptedNativeDivProps;
      const { getByTestId } = render(
        <Select {...divProps} onChange={jest.fn()} onFocus={jest.fn()} onBlur={jest.fn()} />,
      );
      const element = getByTestId(divProps['data-testid']);
      expect(
        getElementAttributesMisMatches(element, {
          ...divProps,
          // tabIndex is set in the component
          tabIndex: -1,
        } as unknown as HTMLAttributes<HTMLSpanElement>),
      ).toHaveLength(0);
    });
  });

  describe('List is opened and closed', () => {
    it('list opens via button click', async () => {
      const { openList, getListItemLabels, options } = renderWithHelpers();
      await openList();
      const listItems = getListItemLabels();
      expect(options).toHaveLength(3);
      options.forEach((option, i) => {
        expect(listItems[i]).toBe(option.label);
      });
    });
    it('list closes via outside click', async () => {
      const { openList, container, isListOpen } = renderWithHelpers();
      await openList();
      expect(isListOpen()).toBeTruthy();
      fireEvent.click(container);
      await waitFor(() => {
        if (isListOpen()) {
          throw new Error('Not closed');
        }
      });
    });
    it('Clicking an option selects it and closes the menu when multiSelect is false', async () => {
      const { openList, isListOpen, clickOptionAndWaitForRerender, getSelectionsInButton, options } =
        renderWithHelpers();
      const selectionIndex = 2;
      await openList();
      await clickOptionAndWaitForRerender(2);
      expect(isListOpen()).toBeFalsy();
      expect(getSelectionsInButton()).toHaveLength(1);
      expect(getSelectionsInButton()[0]).toBe(options[selectionIndex].label);
    });
    it('Clicking a selected option again does nothing when multiSelect is false', async () => {
      const { openList, isListOpen, clickOptionAndWaitForRerender, getSelectionsInButton, getOptionElements } =
        renderWithHelpers();
      const selectionIndex = 2;
      await openList();
      await clickOptionAndWaitForRerender(selectionIndex);
      await openList();
      // cannot use clickOptionAndWaitForRerender, because it wont re-render
      fireEvent.click(getOptionElements()[selectionIndex]);
      await createTimedPromise(undefined);
      expect(isListOpen()).toBeTruthy();
      expect(getSelectionsInButton()).toHaveLength(1);
      await clickOptionAndWaitForRerender(selectionIndex - 1);
      expect(isListOpen()).toBeFalsy();
    });
    it('Clicking the clear button removes all selections', async () => {
      const { openList, getClearButton, clickOptionAndWaitForRerender, getSelectionsInButton } = renderWithHelpers({
        clearable: true,
      });
      await openList();
      await clickOptionAndWaitForRerender(2);
      expect(getSelectionsInButton()).toHaveLength(1);
      fireEvent.click(getClearButton());
      await waitFor(() => {
        expect(getSelectionsInButton()).toHaveLength(0);
      });
    });
    it('Clicking the clear button removes all selections expect disabled', async () => {
      let disabledItemsCount = 0;
      let selectedItemsCount = 0;
      const optionIterator: OptionIterator = (option, group, optionIndex) => {
        const newVersion = {
          ...option,
          selected: true,
        };
        selectedItemsCount += 1;
        if (optionIndex < 2) {
          disabledItemsCount += 1;
          return {
            ...newVersion,
            disabled: true,
          };
        }
        return newVersion;
      };
      const { openList, getClearButton, getSelectionsInButton } = renderWithHelpers({
        optionIterator,
        clearable: true,
      });
      await openList();
      expect(getSelectionsInButton()).toHaveLength(selectedItemsCount);
      fireEvent.click(getClearButton());
      await waitFor(() => {
        expect(getSelectionsInButton()).toHaveLength(disabledItemsCount);
      });
    });
  });
  describe('Multiselect list', () => {
    it('stays open after selections', async () => {
      const {
        openList,
        isListOpen,
        clickGroupAndWaitForRerender,
        getSelectionsInButton,
        groupsAndOptions,
        optionCountInGroups,
        optionCountInAllGroups,
      } = renderWithHelpers({
        multiSelect: true,
        groups: true,
        clearable: true,
      });
      await openList();
      await clickGroupAndWaitForRerender(0);
      expect(isListOpen()).toBeTruthy();
      expect(getSelectionsInButton()).toHaveLength(optionCountInGroups[0]);
      expect(getSelectionsInButton()[0]).toBe((groupsAndOptions[0].options[0] as Option).label);

      await clickGroupAndWaitForRerender(2);
      expect(isListOpen()).toBeTruthy();
      expect(getSelectionsInButton()).toHaveLength(optionCountInGroups[0] + optionCountInGroups[2]);

      await clickGroupAndWaitForRerender(1);
      expect(isListOpen()).toBeTruthy();
      expect(getSelectionsInButton()).toHaveLength(optionCountInAllGroups);
    });
    it('Clicking the clear button removes all selections', async () => {
      const { openList, getClearButton, clickGroupAndWaitForRerender, getSelectionsInButton, optionCountInGroups } =
        renderWithHelpers({
          multiSelect: true,
          groups: true,
          clearable: true,
        });
      await openList();
      await clickGroupAndWaitForRerender(2);
      expect(getSelectionsInButton()).toHaveLength(optionCountInGroups[2]);
      fireEvent.click(getClearButton());
      await waitFor(() => {
        expect(getSelectionsInButton()).toHaveLength(0);
      });
    });
  });
  describe('Filter', () => {
    it('Filter hides options and clearing filtering restores options', async () => {
      const { openList, getOptionElements, setInputValue } = renderWithHelpers({
        groups: false,
        multiSelect: false,
        input: 'filter',
      });
      await openList();
      expect(getOptionElements()).toHaveLength(3);
      await setInputValue('Option 1');
      await waitFor(() => {
        expect(getOptionElements()).toHaveLength(1);
      });
      await setInputValue('');
      await waitFor(() => {
        expect(getOptionElements()).toHaveLength(3);
      });
    });
    it('Clicking a filtered multi-select group selects only visible items', async () => {
      const {
        openList,
        closeList,
        getAllListElements,
        getSelectionsInButton,
        setInputValue,
        clickGroupAndWaitForRerender,
      } = renderWithHelpers({
        groups: true,
        multiSelect: true,
        input: 'filter',
      });
      await openList();
      expect(getAllListElements()).toHaveLength(15);
      await setInputValue('Group2_Option0');
      await waitFor(() => {
        expect(getAllListElements()).toHaveLength(2); /// label + option
      });
      await clickGroupAndWaitForRerender(0);
      await setInputValue('');
      await closeList();
      await waitFor(() => {
        expect(getSelectionsInButton()).toHaveLength(1);
      });

      await openList();
      await waitFor(() => {
        expect(getAllListElements()).toHaveLength(15);
      });

      await setInputValue('Group0_Option0');
      await waitFor(() => {
        expect(getAllListElements()).toHaveLength(2); /// label + option
      });
      await clickGroupAndWaitForRerender(0);
      await closeList();
      await waitFor(() => {
        expect(getSelectionsInButton()).toHaveLength(2);
      });
    });
    it('Screen reader notifications are rendered', async () => {
      const { openList, setInputValue, getScreenReaderNotifications } = renderWithHelpers({
        groups: false,
        multiSelect: false,
        input: 'filter',
      });
      await openList();
      await setInputValue('Option 1');
      await waitFor(
        () => {
          expect(getScreenReaderNotifications()).toHaveLength(1);
        },
        { interval: 500 },
      );
      const notification = getScreenReaderNotifications()[0] as string;
      expect(notification.includes('Option 1')).toBeTruthy();
      expect(notification.includes('Löytyi 1 vaihtoehto.')).toBeTruthy();
    });
  });
  describe('Search', () => {
    it('Search updates all data', async () => {
      const resultArray = ['Result 1', 'Result 2'];
      const onSearch: SelectProps['onSearch'] = () => {
        return createTimedPromise({ options: resultArray }, 300) as Promise<SearchResult>;
      };
      const { openList, getOptionElements, setInputValue, getListItemLabels } = renderWithHelpers({
        texts: defaultTexts,
        required: true,
        groups: false,
        multiSelect: false,
        input: undefined,
        onSearch,
      });
      await openList();
      expect(getOptionElements()).toHaveLength(3);
      await setInputValue('Option 1');
      await waitFor(() => {
        expect(getListItemLabels()).toEqual(resultArray);
      });
      await setInputValue('');
      await waitFor(() => {
        expect(getOptionElements()).toHaveLength(0);
      });
    });
    it('User is notified if there are no results', async () => {
      const { openList, setInputValue, getSearchAndFilterInfoTexts } = renderWithHelpers({
        texts: defaultTexts,
        required: true,
        groups: false,
        multiSelect: false,
        input: undefined,
        onSearch: () => createTimedPromise({ options: [] }, 500) as Promise<SearchResult>,
      });
      await openList();
      await setInputValue('Option 1');
      await waitFor(
        () => {
          expect(getSearchAndFilterInfoTexts()).toHaveLength(2);
        },
        { interval: 500 },
      );
      const notification = getSearchAndFilterInfoTexts()[0] as string;
      expect(notification.includes(`No options found for "Option 1"`)).toBeTruthy();
    });
    it('User is notified if search fails', async () => {
      const { openList, setInputValue, getSearchAndFilterInfoTexts } = renderWithHelpers({
        texts: defaultTexts,
        required: true,
        groups: false,
        multiSelect: false,
        input: undefined,
        onSearch: () => createTimedPromise(new Error('UPS'), 500) as Promise<SearchResult>,
      });
      await openList();
      await setInputValue('Option 1');
      await waitFor(
        () => {
          expect(getSearchAndFilterInfoTexts()).toHaveLength(2);
        },
        { interval: 500 },
      );
      const notification = getSearchAndFilterInfoTexts()[0] as string;
      expect(notification.includes("We couldn't load the options")).toBeTruthy();
    });
  });

  describe('Accessibility attributes are set correctly', () => {
    const singleSelectNoGroupsNoInput: TestScenario = {
      description: 'Single select no groups no inputs',
      selectOptions: { groups: false, multiSelect: false, input: undefined },
      expectedAttributes: {
        button: {
          role: 'combobox',
          'aria-expanded': false,
          'aria-controls': getElementIds(defaultId).list,
          'aria-haspopup': 'listbox',
          'aria-activedescendant': undefined,
        },
        listAndInputContainer: {
          'aria-hidden': true,
          role: undefined,
          'aria-label': undefined,
        },
        list: {
          'aria-multiselectable': 'false',
          role: 'listbox',
        },
        options: {
          'aria-selected': 'false',
          role: 'option',
        },
        selectedOptions: {
          'aria-selected': 'true',
          role: 'option',
        },
        listElementNodeName: 'ul',
        groupElementNodeName: '',
        group: undefined,
        groupLabel: undefined,
        input: undefined,
      },
      groupCount: 0,
      hasInput: false,
    };

    const singleSelectWithGroupsNoInput: TestScenario = {
      description: 'Single select with groups no inputs',
      selectOptions: { groups: true, multiSelect: false, input: undefined },
      expectedAttributes: {
        button: {
          ...singleSelectNoGroupsNoInput.expectedAttributes.button,
        },
        listAndInputContainer: {
          ...singleSelectNoGroupsNoInput.expectedAttributes.listAndInputContainer,
          role: undefined,
          'aria-label': undefined,
        },
        list: {
          ...singleSelectNoGroupsNoInput.expectedAttributes.list,
        },
        options: {
          ...singleSelectNoGroupsNoInput.expectedAttributes.options,
        },
        selectedOptions: {
          ...singleSelectNoGroupsNoInput.expectedAttributes.selectedOptions,
        },
        listElementNodeName: 'div',
        group: {
          role: 'group',
          'aria-label': 'SET_IN_CODE',
        },
        groupElementNodeName: 'ul',
        groupLabel: {
          role: 'presentation',
        },
        input: undefined,
      },
      groupCount: 3,
      hasInput: false,
    };

    const singleSelectNoGroupsWithInput: TestScenario = {
      description: 'Single select no groups with filter input',
      selectOptions: { groups: false, multiSelect: false, input: 'filter' },
      expectedAttributes: {
        button: {
          role: undefined,
          'aria-expanded': false,
          'aria-controls': getElementIds(defaultId).searchOrFilterInput,
          'aria-haspopup': 'dialog',
          'aria-activedescendant': undefined,
        },
        listAndInputContainer: {
          ...singleSelectNoGroupsNoInput.expectedAttributes.listAndInputContainer,
          role: 'dialog',
          'aria-label': defaultLabel,
        },
        list: {
          ...singleSelectNoGroupsNoInput.expectedAttributes.list,
        },
        options: {
          ...singleSelectNoGroupsNoInput.expectedAttributes.options,
        },
        selectedOptions: {
          ...singleSelectNoGroupsNoInput.expectedAttributes.selectedOptions,
        },
        listElementNodeName: 'ul',
        groupElementNodeName: '',
        group: undefined,
        groupLabel: undefined,
        input: {
          role: 'combobox',
          'aria-controls': getElementIds(defaultId).list,
          'aria-activedescendant': '',
          'aria-haspopup': 'listbox',
        },
      },
      groupCount: 0,
      hasInput: true,
    };

    const multiSelectNoGroupsNoInput: TestScenario = {
      description: 'Multiselect no groups no inputs',
      selectOptions: { groups: false, multiSelect: true, input: undefined },
      expectedAttributes: {
        button: {
          ...singleSelectNoGroupsNoInput.expectedAttributes.button,
        },
        listAndInputContainer: {
          ...singleSelectNoGroupsNoInput.expectedAttributes.listAndInputContainer,
        },
        list: {
          'aria-multiselectable': 'true',
          role: 'listbox',
          'aria-label': undefined,
        },
        options: {
          'aria-selected': 'false',
          role: 'option',
        },
        selectedOptions: {
          'aria-selected': 'true',
          role: 'option',
        },
        listElementNodeName: 'ul',
        groupElementNodeName: '',
        group: undefined,
        groupLabel: undefined,
        input: undefined,
      },
      groupCount: 0,
      hasInput: false,
    };

    const multiSelectWithGroupsNoInput: TestScenario = {
      description: 'Multiselect with groups no inputs',
      selectOptions: { groups: true, multiSelect: true, input: undefined },
      expectedAttributes: {
        button: {
          ...singleSelectNoGroupsNoInput.expectedAttributes.button,
          'aria-haspopup': 'dialog',
        },
        listAndInputContainer: {
          'aria-hidden': true,
          role: 'dialog',
          'aria-label': `${defaultLabel}. 12 vaihtoehtoa.`,
        },
        list: {
          // these undefined values indicate that the element should not have special attributes
          'aria-multiselectable': undefined,
          'aria-label': undefined,
          role: undefined,
        },
        options: {
          'aria-checked': 'false',
          role: 'checkbox',
        },
        selectedOptions: {
          'aria-checked': 'true',
          role: 'checkbox',
        },
        listElementNodeName: 'div',
        group: {
          role: 'group',
          'aria-label': undefined,
        },
        groupElementNodeName: 'div',
        groupLabel: {
          role: 'checkbox',
          'aria-checked': false,
        },
        input: undefined,
      },
      groupCount: 3,
      hasInput: false,
    };

    const singleSelectWithGroupsFilterInput: TestScenario = {
      description: 'Single select with groups with filter input',
      selectOptions: { groups: true, multiSelect: false, input: 'filter' },
      expectedAttributes: {
        button: {
          role: undefined,
          'aria-expanded': false,
          'aria-controls': getElementIds(defaultId).searchOrFilterInput,
          'aria-haspopup': 'dialog',
          'aria-activedescendant': undefined,
        },
        listAndInputContainer: {
          ...singleSelectNoGroupsNoInput.expectedAttributes.listAndInputContainer,
          role: 'dialog',
          'aria-label': defaultLabel,
        },
        list: {
          ...singleSelectNoGroupsNoInput.expectedAttributes.list,
        },
        options: {
          ...singleSelectNoGroupsNoInput.expectedAttributes.options,
        },
        selectedOptions: {
          ...singleSelectNoGroupsNoInput.expectedAttributes.selectedOptions,
        },
        listElementNodeName: singleSelectWithGroupsNoInput.expectedAttributes.listElementNodeName,
        groupElementNodeName: singleSelectWithGroupsNoInput.expectedAttributes.groupElementNodeName,
        group: singleSelectWithGroupsNoInput.expectedAttributes.group,
        groupLabel: singleSelectWithGroupsNoInput.expectedAttributes.groupLabel,
        input: {
          role: 'combobox',
          'aria-controls': getElementIds(defaultId).list,
          'aria-activedescendant': '',
          'aria-haspopup': 'listbox',
        },
      },
      groupCount: 3,
      hasInput: true,
    };

    const multiSelectWithGroupsFilterInput: TestScenario = {
      description: 'MultiSelect with groups with filter input',
      selectOptions: { groups: true, multiSelect: true, input: 'filter' },
      expectedAttributes: {
        button: {
          role: undefined,
          'aria-expanded': false,
          'aria-controls': getElementIds(defaultId).searchOrFilterInput,
          'aria-haspopup': 'dialog',
          'aria-activedescendant': undefined,
        },
        listAndInputContainer: {
          ...singleSelectNoGroupsNoInput.expectedAttributes.listAndInputContainer,
          role: 'dialog',
          'aria-label': defaultLabel,
        },
        list: {
          'aria-multiselectable': undefined,
          'aria-label': `12 vaihtoehtoa.`,
          role: 'dialog',
        },
        options: {
          ...multiSelectWithGroupsNoInput.expectedAttributes.options,
        },
        selectedOptions: {
          ...multiSelectWithGroupsNoInput.expectedAttributes.selectedOptions,
        },
        listElementNodeName: 'div',
        groupElementNodeName: 'div',
        group: {
          role: 'group',
          'aria-label': undefined,
        },
        groupLabel: {
          role: 'checkbox',
          'aria-checked': false,
        },
        input: {
          role: 'combobox',
          'aria-controls': getElementIds(defaultId).list,
          'aria-activedescendant': '',
          'aria-haspopup': 'dialog',
        },
      },
      groupCount: 3,
      hasInput: true,
    };
    const multiSelectNoGroupsFilterInput: TestScenario = {
      description: 'MultiSelect no groups with filter input',
      selectOptions: { groups: false, multiSelect: true, input: 'filter' },
      expectedAttributes: {
        button: {
          role: undefined,
          'aria-expanded': false,
          'aria-controls': getElementIds(defaultId).searchOrFilterInput,
          'aria-haspopup': 'dialog',
          'aria-activedescendant': undefined,
        },
        listAndInputContainer: {
          ...multiSelectWithGroupsFilterInput.expectedAttributes.listAndInputContainer,
        },
        list: {
          ...multiSelectNoGroupsNoInput.expectedAttributes.list,
        },
        options: {
          ...multiSelectNoGroupsNoInput.expectedAttributes.options,
        },
        selectedOptions: {
          ...multiSelectNoGroupsNoInput.expectedAttributes.selectedOptions,
        },
        listElementNodeName: 'ul',
        groupElementNodeName: undefined,
        group: undefined,
        groupLabel: undefined,
        input: {
          ...singleSelectNoGroupsWithInput.expectedAttributes.input,
        },
      },
      groupCount: 0,
      hasInput: true,
    };
    [
      singleSelectNoGroupsNoInput,
      singleSelectWithGroupsNoInput,
      singleSelectNoGroupsWithInput,
      singleSelectWithGroupsFilterInput,
      multiSelectNoGroupsNoInput,
      multiSelectWithGroupsNoInput,
      multiSelectNoGroupsFilterInput,
      multiSelectWithGroupsFilterInput,
    ].forEach(({ selectOptions, description, expectedAttributes, groupCount, hasInput }) => {
      describe(`${description}`, () => {
        it('Button has correct attributes before and after opened', async () => {
          const { openList, getButtonElement, getAllSelectableListElements } = renderWithHelpers(selectOptions);
          expect(getElementAttributesMisMatches(getButtonElement(), expectedAttributes.button)).toHaveLength(0);
          await openList();
          expect(
            getElementAttributesMisMatches(getButtonElement(), {
              ...expectedAttributes.button,
              'aria-expanded': true,
              'aria-activedescendant': hasInput
                ? undefined
                : String(getAllSelectableListElements()[0].getAttribute('id')),
            }),
          ).toHaveLength(0);
        });
        it('List and input container has correct attributes', async () => {
          const { openList, getListAndInputContainer } = renderWithHelpers(selectOptions);
          expect(
            getElementAttributesMisMatches(getListAndInputContainer(), expectedAttributes.listAndInputContainer),
          ).toHaveLength(0);
          await openList();
          expect(
            getElementAttributesMisMatches(getListAndInputContainer(), {
              ...expectedAttributes.listAndInputContainer,
              'aria-hidden': false,
            }),
          ).toHaveLength(0);
        });
        /*
        it('List element has correct attributes and node', async () => {
          const { getListElement } = renderWithHelpers(selectOptions);
          const listElement = getListElement();
          // no need to open it.
          expect(
            getElementAttributesMisMatches<HTMLUListElement | HTMLDivElement>(listElement, expectedAttributes.list),
          ).toHaveLength(0);
          expect(listElement.nodeName.toLowerCase()).toBe(expectedAttributes.listElementNodeName);
        });
        */
        it('Groups are created inside the list and have correct attributes', async () => {
          const { getGroupElements, openList, groupsAndOptions } = renderWithHelpers(selectOptions);
          expect(getGroupElements()).toHaveLength(0);
          if (!groupCount) {
            return;
          }
          await openList();
          const groupElements = getGroupElements();
          expect(groupElements).toHaveLength(groupCount);
          groupElements.forEach((groupElement, index) => {
            const { label } = groupsAndOptions[index];
            expect(getElementAttributesMisMatches(groupElement, { 'aria-label': label })).toHaveLength(0);
            expect(groupElement.nodeName.toLowerCase()).toBe(expectedAttributes.groupElementNodeName);
          });
        });
        it('Group labels have correct attributes', async () => {
          const { getGroupLabelElements, openList } = renderWithHelpers(selectOptions);
          expect(getGroupLabelElements()).toHaveLength(0);
          if (!groupCount) {
            return;
          }
          await openList();
          const groupLabelElements = getGroupLabelElements();
          expect(groupLabelElements).toHaveLength(groupCount);
          groupLabelElements.forEach((groupElement) => {
            expect(
              getElementAttributesMisMatches<HTMLLIElement>(
                groupElement,
                expectedAttributes.groupLabel as unknown as LiAttributes,
              ),
            ).toHaveLength(0);
          });
        });
        it('Input element has correct attributes', async () => {
          const { getInputElement, openList, getAllListElements } = renderWithHelpers(selectOptions);
          if (!hasInput) {
            return;
          }
          const firstSelectableIndex = selectOptions.multiSelect || !selectOptions.groups ? 0 : 1;
          await openList();
          expect(
            getElementAttributesMisMatches<HTMLInputElement>(
              getInputElement(),
              expectedAttributes.input as InputAttributes,
            ),
          ).toHaveLength(0);

          await waitFor(() => {
            expect(getActiveElement(getInputElement()) === getInputElement()).toBeTruthy();
          });

          fireEvent.keyUp(getInputElement(), { key: 'ArrowDown', code: 'ArrowDown' });
          await waitFor(() => {
            expect(getActiveElement(getInputElement()) === getAllListElements()[firstSelectableIndex]).toBeTruthy();
          });
          expect(
            getElementAttributesMisMatches<HTMLInputElement>(getInputElement(), {
              ...(expectedAttributes.input as InputAttributes),
              'aria-expanded': true,
              'aria-activedescendant': getAllListElements()[firstSelectableIndex].getAttribute('id') as string,
            }),
          ).toHaveLength(0);
        });
        it('Options have correct attributes before and after selections', async () => {
          const {
            openList,
            getOptionElements,
            isListOpen,
            clickOptionAndWaitForRerender,
            getGroupLabelElements,
            filterSelectedOptions,
            isElementSelected,
          } = renderWithHelpers(selectOptions);
          await openList();

          getOptionElements().forEach((optionElement) => {
            expect(
              getElementAttributesMisMatches(optionElement, expectedAttributes.options as LiAttributes),
            ).toHaveLength(0);
            expect(isElementSelected(optionElement)).toBeFalsy();
          });
          // do not click #0 option or multiselect group is selected
          const indexOfClickedOption = 1;
          expect(filterSelectedOptions(getOptionElements())).toHaveLength(0);
          await clickOptionAndWaitForRerender(indexOfClickedOption);
          expect(isListOpen()).toBe(!!selectOptions.multiSelect);
          await openList();
          const groupLabels = getGroupLabelElements();
          getOptionElements().forEach((optionElement, index) => {
            const expectedOptionAttributes =
              index === indexOfClickedOption
                ? { ...expectedAttributes.selectedOptions }
                : { ...expectedAttributes.options };
            const isMultiSelectGroupLabel =
              selectOptions.multiSelect && groupCount > 0 && groupLabels.includes(optionElement);
            const isGroupLabelOfSelectedOption = isMultiSelectGroupLabel && index < indexOfClickedOption;
            if (isGroupLabelOfSelectedOption) {
              expectedOptionAttributes['aria-checked'] = 'mixed';
            }
            expect(
              getElementAttributesMisMatches(optionElement, expectedOptionAttributes as LiAttributes),
            ).toHaveLength(0);
            expect(isElementSelected(optionElement)).toBe(index === indexOfClickedOption);
          });
        });
      });
    });
  });

  describe('Preset values are selected', () => {
    const getPresetOption = (groupIndex: number, optionIndex: number) => {
      return (presetGroups as GroupInProps[])[groupIndex].options[optionIndex] as OptionInProps;
    };
    it('value can be a string', async () => {
      const { openList, getSelectionsInButton } = renderWithHelpers({
        multiSelect: false,
        groups: true,
        value: getPresetOption(0, 2).value,
      });
      await openList();
      expect(getSelectionsInButton()).toEqual([getPresetOption(0, 2).label]);
    });
    it('value array of strings', async () => {
      const { openList, getSelectionsInButton } = renderWithHelpers({
        multiSelect: true,
        groups: true,
        value: [getPresetOption(0, 1).value as string, getPresetOption(1, 1).value as string],
      });
      await openList();
      expect(getSelectionsInButton()).toEqual([getPresetOption(0, 1).label, getPresetOption(1, 1).label]);
    });
    it('option objects', async () => {
      const { openList, getSelectionsInButton } = renderWithHelpers({
        multiSelect: true,
        groups: true,
        value: [getPresetOption(1, 1), getPresetOption(2, 2)],
      });
      await openList();
      expect(getSelectionsInButton()).toEqual([getPresetOption(1, 1).label, getPresetOption(2, 2).label]);
    });
  });
  describe('Search functionality with multiselect preserves selections', () => {
    it('preserves selected items during search mode when some selections are missing from options', async () => {
      const initialOptions = ['Initial Option 1', 'Initial Option 2'];
      const onSearch = jest.fn();

      const { rerender, openList, getSelectionsInButton, getOptionElements } = renderWithHelpers({
        multiSelect: true,
        options: initialOptions,
        onSearch,
      });

      // Helper function to extract text content from multiselect options
      const getOptionLabels = () => {
        return Array.from(getOptionElements()).map((node) => {
          return node.textContent || node.innerText || '';
        });
      };

      // Simulate component re-render with value prop containing both initial and search result selections
      const selectedValues = [
        { label: 'Initial Option 1', value: 'Initial Option 1' },
        { label: 'Search Result 1', value: 'Search Result 1' },
      ];

      await act(async () => {
        rerender(
          <Select
            multiSelect
            options={initialOptions}
            onSearch={onSearch}
            texts={defaultTexts}
            id={defaultId}
            value={selectedValues}
            onChange={jest.fn()}
          />,
        );
      });

      // Wait a bit for React to process the update
      await act(async () => {
        await new Promise((resolve) => {
          setTimeout(resolve, 200);
        });
      });

      // Check if component has rendered with the values
      let selectionsAfterRerender = getSelectionsInButton();

      // If the initial check doesn't have both selections, wait a bit more
      if (selectionsAfterRerender.length < 2) {
        await act(async () => {
          await new Promise((resolve) => {
            setTimeout(resolve, 300);
          });
        });
        selectionsAfterRerender = getSelectionsInButton();
      }

      // Verify both selections are preserved even though "Search Result 1" is not in initial options
      expect(selectionsAfterRerender).toContain('Initial Option 1');
      expect(selectionsAfterRerender).toContain('Search Result 1');

      // Open list and verify the hidden option is still selected but not visible
      await openList();
      const visibleLabels = getOptionLabels();
      expect(visibleLabels).toEqual(initialOptions); // Only initial options are visible
      expect(visibleLabels).not.toContain('Search Result 1'); // Search result is not visible
    });
    it('handles missing selected options when no search is involved', async () => {
      const initialOptions = ['Option A', 'Option B'];
      const selectedValues = [
        { label: 'Option A', value: 'Option A' },
        { label: 'External Option', value: 'External Option' }, // Not in initial options
      ];
      const { openList, getSelectionsInButton, getOptionElements } = renderWithHelpers({
        multiSelect: true,
        options: initialOptions,
        value: selectedValues,
      });
      // Helper function to extract text content from multiselect options
      const getOptionLabels = () => {
        return Array.from(getOptionElements()).map((node) => {
          return node.textContent || node.innerText || '';
        });
      };
      // Wait for component to initialize
      await act(async () => {
        await new Promise((resolve) => {
          setTimeout(resolve, 200);
        });
      });
      // Check the selections
      let selections = getSelectionsInButton();
      // If we don't have both selections, wait a bit more
      if (selections.length < 2) {
        await act(async () => {
          await new Promise((resolve) => {
            setTimeout(resolve, 300);
          });
        });
        selections = getSelectionsInButton();
      }

      // Verify both selections are present
      expect(selections).toContain('Option A');
      expect(selections).toContain('External Option');

      // Open list and verify only initial options are visible
      await openList();
      const visibleLabels = getOptionLabels();
      expect(visibleLabels).toEqual(initialOptions);
      expect(visibleLabels).not.toContain('External Option');
    });
  });
});

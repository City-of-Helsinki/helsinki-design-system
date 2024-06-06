import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { axe } from 'jest-axe';
import { isNull, isUndefined } from 'lodash';

import { Select } from './Select';
import { SearchResult, SelectProps } from './types';
import { getElementIds } from './utils';
import { createTimedPromise } from '../login/testUtils/timerTestUtil';
import { defaultId, defaultLabel, getSelectProps, renderWithHelpers } from './testUtil';

type ElementAttributes = {
  button: React.HTMLAttributes<HTMLButtonElement>;
  listAndInputContainer: React.HTMLAttributes<HTMLDivElement>;
  list: React.HTMLAttributes<HTMLDivElement> | React.HTMLAttributes<HTMLUListElement>;
  options: React.HTMLAttributes<HTMLLIElement> | React.HTMLAttributes<HTMLDivElement>;
  selectedOptions: React.HTMLAttributes<HTMLLIElement> | React.HTMLAttributes<HTMLDivElement>;
  listElementNodeName: string | undefined;
  group: React.HTMLAttributes<HTMLDivElement> | undefined;
  groupElementNodeName: string | undefined;
  groupLabel: React.HTMLAttributes<HTMLLIElement> | React.HTMLAttributes<HTMLDivElement> | undefined;
  input: React.HTMLAttributes<HTMLInputElement> | undefined;
};

type TestScenario = {
  description: string;
  selectOptions: SelectProps;
  expectedAttributes: ElementAttributes;
  groupCount: number;
  hasInput: boolean;
};
// type AxeViolation = Awaited<ReturnType<typeof axe>>['violations'][number];

describe('<Select />', () => {
  const convertToSameAttributeType = (target: unknown, comparedValue: unknown) => {
    const targetType = typeof target;
    if (targetType === 'boolean') {
      return comparedValue === 'true' || comparedValue === 'false' ? comparedValue === 'true' : comparedValue;
    }
    if (targetType === 'undefined') {
      return isNull(comparedValue) || isUndefined(comparedValue) ? undefined : comparedValue;
    }
    return String(comparedValue);
  };

  const getMismatchingElementAttributes = (
    el: HTMLElement,
    attributes: React.HTMLAttributes<HTMLElement> | undefined,
  ) => {
    const mismatches: string[] = [];
    if (!attributes) {
      return ['No attributes'];
    }
    Object.entries(attributes).forEach(([key, value]) => {
      // console.log('key', key, value, '---', el.getAttribute(key));
      const elementValue = convertToSameAttributeType(value, el.getAttribute(key));
      if (value !== elementValue) {
        mismatches.push(`${key} mismatch. Expected '${value}' but element has '${elementValue}'`);
      }
    });
    return mismatches;
  };

  describe('spec', () => {
    it('renders single select component with groups and filter input', () => {
      const { asFragment } = render(
        <Select {...getSelectProps({ groups: true, multiSelect: false, input: 'filter' })} />,
      );
      expect(asFragment()).toMatchSnapshot();
    });
    it('renders multi select component with groups and filter input', () => {
      const { asFragment } = render(
        <Select {...getSelectProps({ groups: true, multiSelect: true, input: 'filter' })} />,
      );
      expect(asFragment()).toMatchSnapshot();
    });
    it('single select component with groups and filter input should not have basic accessibility issues', async () => {
      const { container } = render(
        <Select {...getSelectProps({ groups: true, multiSelect: false, input: 'filter' })} />,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
    it('multi select component with groups and filter input should not have basic accessibility issues', async () => {
      const { container } = render(
        <Select {...getSelectProps({ groups: true, multiSelect: true, input: 'filter' })} />,
      );
      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });
  });
  describe('List is opened', () => {
    it('list opens via button click', async () => {
      const { openList, getListItemLabels, options } = renderWithHelpers();
      await openList();
      const listItems = getListItemLabels();
      options.forEach((label, i) => {
        expect(listItems[i]).toBe(label);
      });
    });
  });

  describe('Accessibility attributes are set correctly', () => {
    const singleSelectNoGroupsNoInput: TestScenario = {
      description: 'Single select no groups no inputs',
      selectOptions: getSelectProps({ groups: false, multiSelect: false, input: undefined }),
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
      selectOptions: getSelectProps({ groups: true, multiSelect: false, input: undefined }),
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
      selectOptions: getSelectProps({ groups: false, multiSelect: false, input: 'filter' }),
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
          'aria-activedescendant': '', // this should change!
          'aria-haspopup': 'listbox',
        },
      },
      groupCount: 0,
      hasInput: true,
    };

    const multiSelectNoGroupsNoInput: TestScenario = {
      description: 'Multiselect no groups no inputs',
      selectOptions: getSelectProps({ groups: false, multiSelect: true, input: undefined }),
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
      selectOptions: getSelectProps({ groups: true, multiSelect: true, input: undefined }),
      expectedAttributes: {
        button: {
          ...singleSelectNoGroupsNoInput.expectedAttributes.button,
          'aria-haspopup': 'dialog',
        },
        listAndInputContainer: {
          'aria-hidden': true,
          role: 'dialog',
          'aria-label': `${defaultLabel}. 12 choices.`,
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
      selectOptions: getSelectProps({ groups: true, multiSelect: false, input: 'filter' }),
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
          'aria-activedescendant': '', // this should change!
          'aria-haspopup': 'listbox',
        },
      },
      groupCount: 3,
      hasInput: true,
    };

    const multiSelectWithGroupsFilterInput: TestScenario = {
      description: 'MultiSelect with groups with filter input',
      selectOptions: getSelectProps({ groups: true, multiSelect: true, input: 'filter' }),
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
          'aria-label': `12 choices.`,
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
          'aria-activedescendant': '', // this should change!
          'aria-haspopup': 'dialog',
        },
      },
      groupCount: 3,
      hasInput: true,
    };
    const multiSelectNoGroupsFilterInput: TestScenario = {
      description: 'MultiSelect no groups with filter input',
      selectOptions: getSelectProps({ groups: false, multiSelect: true, input: 'filter' }),
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
          const { openList, getButtonElement, getAllListElements } = renderWithHelpers(selectOptions);
          expect(getMismatchingElementAttributes(getButtonElement(), expectedAttributes.button)).toHaveLength(0);
          await openList();
          expect(
            getMismatchingElementAttributes(getButtonElement(), {
              ...expectedAttributes.button,
              'aria-expanded': true,
              'aria-activedescendant': hasInput ? undefined : String(getAllListElements()[0].getAttribute('id')),
            }),
          ).toHaveLength(0);
        });
        it('List and input container has correct attributes', async () => {
          const { openList, getListAndInputContainer } = renderWithHelpers(selectOptions);
          expect(
            getMismatchingElementAttributes(getListAndInputContainer(), expectedAttributes.listAndInputContainer),
          ).toHaveLength(0);
          await openList();
          expect(
            getMismatchingElementAttributes(getListAndInputContainer(), {
              ...expectedAttributes.listAndInputContainer,
              'aria-hidden': false,
            }),
          ).toHaveLength(0);
        });
        it('List element has correct attributes and node', async () => {
          const { getListElement } = renderWithHelpers(selectOptions);
          const listElement = getListElement();
          // no need to open it.
          expect(getMismatchingElementAttributes(listElement, expectedAttributes.list)).toHaveLength(0);
          expect(listElement.nodeName.toLowerCase()).toBe(expectedAttributes.listElementNodeName);
        });
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
            expect(getMismatchingElementAttributes(groupElement, { 'aria-label': label })).toHaveLength(0);
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
            expect(getMismatchingElementAttributes(groupElement, expectedAttributes.groupLabel)).toHaveLength(0);
          });
        });
        it('Input element has correct attributes', async () => {
          const { getInputElement, openList } = renderWithHelpers(selectOptions);
          if (!hasInput) {
            return;
          }
          await openList();
          expect(getMismatchingElementAttributes(getInputElement(), expectedAttributes.input)).toHaveLength(0);
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
            expect(getMismatchingElementAttributes(optionElement, expectedAttributes.options)).toHaveLength(0);
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
            expect(getMismatchingElementAttributes(optionElement, expectedOptionAttributes)).toHaveLength(0);
            expect(isElementSelected(optionElement)).toBe(index === indexOfClickedOption);
          });
        });
      });
    });
  });
  describe('Filter', () => {
    it('Filter hides options and clearing filtering restores options', async () => {
      const { openList, getOptionElements, setInputValue } = renderWithHelpers(
        getSelectProps({ groups: false, multiSelect: false, input: 'filter' }),
      );
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
    it('Screen reader notifications are rendered', async () => {
      const { openList, setInputValue, getScreenReaderNotifications } = renderWithHelpers(
        getSelectProps({ groups: false, multiSelect: false, input: 'filter' }),
      );
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
      expect(notification.includes('Found 1 option')).toBeTruthy();
    });
  });
  describe('Search', () => {
    it('Search updates all data', async () => {
      const resultArray = ['Result 1', 'Result 2'];
      const onSearch: SelectProps['onSearch'] = () => {
        return createTimedPromise({ options: resultArray }, 300) as Promise<SearchResult>;
      };
      const { openList, getOptionElements, setInputValue, getListItemLabels } = renderWithHelpers({
        ...getSelectProps({ groups: false, multiSelect: false, input: undefined }),
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
        ...getSelectProps({ groups: false, multiSelect: false, input: undefined }),
        onSearch: () => createTimedPromise({ options: [] }, 300) as Promise<SearchResult>,
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
  });
});

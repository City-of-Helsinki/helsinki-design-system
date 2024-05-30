import React from 'react';
import { act, fireEvent, render, waitFor } from '@testing-library/react';
import { axe } from 'jest-axe';
import { isNull, isUndefined } from 'lodash';

import { Select } from './Select';
import { IconLocation } from '../../icons';
import { SearchResult, SelectProps } from './types';
import { defaultFilter, getElementIds } from './utils';
import { isMultiSelectElement } from './components/list/common';
import { createTimedPromise } from '../login/testUtils/timerTestUtil';

type ElementAttributes = {
  button: React.HTMLAttributes<HTMLButtonElement>;
  listAndInputContainer: React.HTMLAttributes<HTMLDivElement>;
  list: React.HTMLAttributes<HTMLDivElement> | React.HTMLAttributes<HTMLUListElement>;
  options: React.HTMLAttributes<HTMLLIElement> | React.HTMLAttributes<HTMLDivElement>;
  selectedOptions: React.HTMLAttributes<HTMLLIElement> | React.HTMLAttributes<HTMLDivElement>;
  listElementNodeName: string | undefined;
  group: React.HTMLAttributes<HTMLDivElement> | undefined;
  extraGroupElement: React.HTMLAttributes<HTMLDivElement> | undefined;
  groupElementNodeName: string | undefined;
  groupLabel: React.HTMLAttributes<HTMLLIElement> | React.HTMLAttributes<HTMLDivElement> | undefined;
  input: React.HTMLAttributes<HTMLInputElement> | undefined;
};

type TestScenario = {
  description: string;
  selectOptions: Partial<SelectProps>;
  expectedAttributes: ElementAttributes;
  groupCount: number;
  hasInput: boolean;
};
// type AxeViolation = Awaited<ReturnType<typeof axe>>['violations'][number];

describe('<Select />', () => {
  const onChangeTracker = jest.fn();
  const options = ['Option 1', 'Option 2', 'Option 3'];
  const groupsAndOptions: SelectProps['groups'] = [
    {
      label: 'Group0',
      options: [
        { label: 'Group0_Option0_Label', value: 'Group0_Option0_Value' },
        { label: 'Group0_Option1_Label', value: 'Group0_Option1_Value' },
        { label: 'Group0_Option2_Label', value: 'Group0_Option2_Value' },
      ],
    },
    {
      label: 'Group1',
      options: [
        { label: 'Group1_Option0_Label', value: 'Group1_Option0_Value' },
        { label: 'Group1_Option1_Label', value: 'Group1_Option1_Value' },
      ],
    },
    {
      label: 'Group2',
      options: [
        { label: 'Group2_Option0_Label', value: 'Group2_Option0_Value' },
        { label: 'Group2_Option1_Label', value: 'Group2_Option1_Value' },
        { label: 'Group2_Option2_Label', value: 'Group2_Option2_Value' },
        { label: 'Group2_Option3_Label', value: 'Group2_Option3_Value' },
        { label: 'Group2_Option4_Label', value: 'Group2_Option4_Value' },
        { label: 'Group2_Option5_Label', value: 'Group2_Option5_Value' },
        { label: 'Group2_Option6_Label', value: 'Group2_Option6_Value' },
      ],
    },
  ];
  const optionCountInGroups = groupsAndOptions.reduce((count, group) => {
    return count + group.options.length;
  }, 0);
  const selectId = 'select-component';
  const elementIds = getElementIds(selectId);
  const selectors = {
    listAndInputContainer: `#${selectId} > div:nth-child(2) > div:nth-child(2)`,
    extraGroup: `#${elementIds.list} > xx`,
    screenReaderNotifications: `#${selectId} div[data-testid="screen-reader-notifications"]`,
    searchAndFilterInfo: `#${selectId} div[data-testid="search-and-filter-info"]`,
    groups: `#${elementIds.list} > ul, #${elementIds.list} > div[role="group"] > div[role="group"]`,
    groupLabels: `#${elementIds.list} > ul > li[role="presentation"], #${elementIds.list} > div[role="group"] > div[role="group"] > div[role="checkbox"]:first-child`,
    options: `#${elementIds.list} > li[role="option"], #${elementIds.list} > ul > li[role="option"], #${elementIds.list} div[role="checkbox"]`,
    allListItems: `created below`,
  };
  selectors.allListItems = `${selectors.groupLabels}, ${selectors.options}`;
  const getMainButtonElementId = () => elementIds.dropdownButton;
  const getListElementId = () => elementIds.list;
  const isElementSelected = (optionElement: HTMLElement) => {
    if (isMultiSelectElement(optionElement)) {
      return optionElement.getAttribute('aria-checked') === 'true';
    }
    return optionElement.getAttribute('aria-selected') === 'true';
  };

  const filterSelectedOptions = (optionElements: HTMLElement[]) => {
    return Array.from(optionElements).filter(isElementSelected);
  };

  const defaultTestProps: SelectProps = {
    options,
    onChange: onChangeTracker,
    placeholder: 'Choose one',
    icon: <IconLocation />,
    required: false,
    id: selectId,
    texts: {
      label: 'Label',
    },
  };

  const getText = (props: SelectProps, key: string) => {
    if (!props || !props.texts) {
      throw new Error('No texts found');
    }
    if (typeof props.texts === 'object') {
      return props.texts[key];
    }
    return 'none';
  };

  const propsForSingleSelectNoGroupsNoInput: Partial<SelectProps> = {
    options,
  };

  const propsForMultiSelectNoGroupsNoInput: Partial<SelectProps> = {
    ...propsForSingleSelectNoGroupsNoInput,
    multiSelect: true,
  };

  const propsForSingleSelectNoGroupsFilterInput: Partial<SelectProps> = {
    options,
    filter: defaultFilter,
  };

  const propsForMultiSelectNoGroupsFilterInput: Partial<SelectProps> = {
    ...propsForSingleSelectNoGroupsFilterInput,
    multiSelect: true,
  };

  const propsForSingleSelectWithGroupsNoInput: Partial<SelectProps> = {
    groups: groupsAndOptions,
  };

  const propsForSingleSelectWithGroupsFilterInput: Partial<SelectProps> = {
    groups: groupsAndOptions,
    filter: defaultFilter,
  };

  const propsForMultiSelectWithGroupsFilterInput: Partial<SelectProps> = {
    ...propsForSingleSelectWithGroupsFilterInput,
    multiSelect: true,
  };

  const propsForMultiSelectWithGroupsNoInput: Partial<SelectProps> = {
    ...propsForSingleSelectWithGroupsNoInput,
    multiSelect: true,
  };

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

  const renderWithHelpers = (selectProps: SelectProps = defaultTestProps) => {
    const result = render(<Select {...selectProps} />);

    const getElementById = (id: string) => {
      return result.container.querySelector(`#${id}`) as HTMLElement;
    };

    const getRootContainer = () => {
      return getElementById(elementIds.container) as HTMLDivElement;
    };

    const getButtonElement = () => {
      return getElementById(elementIds.dropdownButton) as HTMLButtonElement;
    };

    const getInputElement = () => {
      return getElementById(elementIds.searchOrFilterInput) as HTMLInputElement;
    };

    const getListElement = () => {
      return getElementById(elementIds.list) as HTMLButtonElement;
    };

    const getGroupElements = () => {
      return Array.from(result.container.querySelectorAll(selectors.groups)) as HTMLElement[];
    };

    const getGroupLabelElements = () => {
      return Array.from(result.container.querySelectorAll(selectors.groupLabels)) as HTMLElement[];
    };

    const getOptionElements = () => {
      return Array.from(result.container.querySelectorAll(selectors.options)) as HTMLElement[];
    };

    const getAllListElements = () => {
      return Array.from(result.container.querySelectorAll(selectors.allListItems)) as HTMLElement[];
    };

    const getListAndInputContainer = () => {
      return result.container.querySelector(selectors.listAndInputContainer) as HTMLDivElement;
    };

    const getScreenReaderNotificationContainer = () => {
      return result.container.querySelector(selectors.screenReaderNotifications) as HTMLDivElement;
    };

    const getSearchAndFilterInfoContainer = () => {
      return result.container.querySelector(selectors.searchAndFilterInfo) as HTMLDivElement;
    };

    const clickButton = (id: string) => {
      const el = getElementById(id);
      fireEvent.click(el);
    };

    const getListItemLabels = () => {
      return Array.from(getOptionElements()).map((node) =>
        node.children.length ? node.children[0].innerHTML : node.innerHTML,
      );
    };

    const getScreenReaderNotifications = () => {
      return Array.from(getScreenReaderNotificationContainer().children).map((node) => node.innerHTML);
    };

    const getSearchAndFilterInfoTexts = () => {
      // span filtering removes the spinner
      return Array.from(getSearchAndFilterInfoContainer().children)
        .filter((node) => node.nodeName === 'SPAN')
        .map((node) => node.innerHTML);
    };

    const isListOpen = (): boolean => {
      const toggler = getElementById(getMainButtonElementId()) as HTMLElement;
      const list = getElementById(getListElementId());
      return toggler.getAttribute('aria-expanded') === 'true' && !!list;
    };

    const clickOptionAndWaitForRerender = async (index: number) => {
      const option = getOptionElements()[index];
      const menuWillCloseOnClick = !selectProps.multiSelect;
      const getInitialState = () => {
        if (menuWillCloseOnClick) {
          return isListOpen();
        }
        const targetOption = getOptionElements()[index];
        return isElementSelected(targetOption);
      };
      const currentState = getInitialState();
      fireEvent.click(option);
      await waitFor(() => {
        expect(getInitialState() === currentState).toBeFalsy();
      });
    };

    const sleepUntilMinInteractionTimePassed = async () => {
      return new Promise((res) => {
        setTimeout(res, 250);
      });
    };

    const openList = async () => {
      if (isListOpen()) {
        return;
      }
      await sleepUntilMinInteractionTimePassed();
      clickButton(getMainButtonElementId());
      await waitFor(() => {
        expect(isListOpen()).toBeTruthy();
      });
      // wait here so menu can be closed right after this
      await sleepUntilMinInteractionTimePassed();
    };

    const setInputValue = async (value: string) => {
      act(() => {
        fireEvent.change(getInputElement(), { target: { value } });
      });
      await waitFor(() => {
        expect(getInputElement().getAttribute('value')).toBe(value);
      });
    };

    return {
      ...result,
      openList,
      isListOpen,
      getListItemLabels,
      getButtonElement,
      getRootContainer,
      getListAndInputContainer,
      getInputElement,
      getListElement,
      getGroupLabelElements,
      getGroupElements,
      getOptionElements,
      getAllListElements,
      clickOptionAndWaitForRerender,
      setInputValue,
      getScreenReaderNotifications,
      getSearchAndFilterInfoTexts,
    };
  };
  describe('spec', () => {
    it('renders single select component with groups and filter input', () => {
      const { asFragment } = render(
        <Select {...{ ...defaultTestProps, ...propsForSingleSelectWithGroupsFilterInput }} />,
      );
      expect(asFragment()).toMatchSnapshot();
    });
    it('renders multi select component with groups and filter input', () => {
      const { asFragment } = render(
        <Select {...{ ...defaultTestProps, ...propsForMultiSelectWithGroupsFilterInput }} />,
      );
      expect(asFragment()).toMatchSnapshot();
    });
    it('single select component with groups and filter input should not have basic accessibility issues', async () => {
      const { container } = render(<Select {...{ ...defaultTestProps, ...propsForSingleSelectNoGroupsFilterInput }} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
    it('multi select component with groups and filter input should not have basic accessibility issues', async () => {
      const { container } = render(
        <Select {...{ ...defaultTestProps, ...propsForMultiSelectWithGroupsFilterInput }} />,
      );
      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });
  });
  describe('List is opened', () => {
    it('list opens via button click', async () => {
      const { openList, getListItemLabels } = renderWithHelpers();
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
      selectOptions: propsForSingleSelectNoGroupsNoInput,
      expectedAttributes: {
        button: {
          role: 'combobox',
          'aria-expanded': false,
          'aria-controls': elementIds.list,
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
        extraGroupElement: undefined,
      },
      groupCount: 0,
      hasInput: false,
    };

    const singleSelectWithGroupsNoInput: TestScenario = {
      description: 'Single select with groups no inputs',
      selectOptions: propsForSingleSelectWithGroupsNoInput,
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
        extraGroupElement: undefined,
      },
      groupCount: groupsAndOptions.length,
      hasInput: false,
    };

    const singleSelectNoGroupsWithInput: TestScenario = {
      description: 'Single select no groups with filter input',
      selectOptions: propsForSingleSelectNoGroupsFilterInput,
      expectedAttributes: {
        button: {
          role: undefined,
          'aria-expanded': false,
          'aria-controls': elementIds.searchOrFilterInput,
          'aria-haspopup': 'dialog',
          'aria-activedescendant': undefined,
        },
        listAndInputContainer: {
          ...singleSelectNoGroupsNoInput.expectedAttributes.listAndInputContainer,
          role: 'dialog',
          'aria-label': getText(defaultTestProps, 'label'),
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
        extraGroupElement: undefined,
        input: {
          role: 'combobox',
          'aria-controls': elementIds.list,
          'aria-activedescendant': '', // this should change!
          'aria-haspopup': 'listbox',
        },
      },
      groupCount: 0,
      hasInput: true,
    };

    const multiSelectNoGroupsNoInput: TestScenario = {
      description: 'Multiselect no groups no inputs',
      selectOptions: propsForMultiSelectNoGroupsNoInput,
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
        extraGroupElement: undefined,
      },
      groupCount: 0,
      hasInput: false,
    };

    const multiSelectWithGroupsNoInput: TestScenario = {
      description: 'Multiselect with groups no inputs',
      selectOptions: propsForMultiSelectWithGroupsNoInput,
      expectedAttributes: {
        button: {
          ...singleSelectNoGroupsNoInput.expectedAttributes.button,
          'aria-haspopup': 'dialog',
        },
        listAndInputContainer: {
          'aria-hidden': true,
          role: 'dialog',
          'aria-label': `${getText(defaultTestProps, 'label')}. ${optionCountInGroups} choices.`,
        },
        list: {
          // these undefined values indicate that the element should not have special attributes
          'aria-multiselectable': undefined,
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
        extraGroupElement: {
          role: 'group',
        },
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
      groupCount: groupsAndOptions.length,
      hasInput: false,
    };

    const singleSelectWithGroupsFilterInput: TestScenario = {
      description: 'Single select with groups with filter input',
      selectOptions: propsForSingleSelectWithGroupsFilterInput,
      expectedAttributes: {
        button: {
          role: undefined,
          'aria-expanded': false,
          'aria-controls': elementIds.searchOrFilterInput,
          'aria-haspopup': 'dialog',
          'aria-activedescendant': undefined,
        },
        listAndInputContainer: {
          ...singleSelectNoGroupsNoInput.expectedAttributes.listAndInputContainer,
          role: 'dialog',
          'aria-label': getText(defaultTestProps, 'label'),
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
          'aria-controls': elementIds.list,
          'aria-activedescendant': '', // this should change!
          'aria-haspopup': 'listbox',
        },
        extraGroupElement: undefined,
      },
      groupCount: groupsAndOptions.length,
      hasInput: true,
    };

    const multiSelectWithGroupsFilterInput: TestScenario = {
      description: 'MultiSelect with groups with filter input',
      selectOptions: propsForMultiSelectWithGroupsFilterInput,
      expectedAttributes: {
        button: {
          role: undefined,
          'aria-expanded': false,
          'aria-controls': elementIds.searchOrFilterInput,
          'aria-haspopup': 'dialog',
          'aria-activedescendant': undefined,
        },
        listAndInputContainer: {
          ...singleSelectNoGroupsNoInput.expectedAttributes.listAndInputContainer,
          role: 'dialog',
          'aria-label': getText(defaultTestProps, 'label'),
        },
        list: {
          'aria-multiselectable': undefined,
          'aria-labelledby': elementIds.choicesCount,
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
          'aria-controls': elementIds.list,
          'aria-activedescendant': '', // this should change!
          'aria-haspopup': 'dialog',
        },
        extraGroupElement: {
          role: 'group',
        },
      },
      groupCount: groupsAndOptions.length,
      hasInput: true,
    };
    const multiSelectNoGroupsFilterInput: TestScenario = {
      description: 'MultiSelect no groups with filter input',
      selectOptions: propsForMultiSelectNoGroupsFilterInput,
      expectedAttributes: {
        button: {
          role: undefined,
          'aria-expanded': false,
          'aria-controls': elementIds.searchOrFilterInput,
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
        extraGroupElement: undefined,
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
      const mergedProps = {
        ...defaultTestProps,
        ...selectOptions,
      };
      describe(`${description}`, () => {
        it('Button has correct attributes before and after opened', async () => {
          const { openList, getButtonElement, getAllListElements } = renderWithHelpers(mergedProps);
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
          const { openList, getListAndInputContainer } = renderWithHelpers(mergedProps);
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
          const { getListElement } = renderWithHelpers(mergedProps);
          const listElement = getListElement();
          // no need to open it.
          expect(getMismatchingElementAttributes(listElement, expectedAttributes.list)).toHaveLength(0);
          expect(listElement.nodeName.toLowerCase()).toBe(expectedAttributes.listElementNodeName);
        });
        it('Groups are created inside the list and have correct attributes', async () => {
          const { getGroupElements, openList } = renderWithHelpers(mergedProps);
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
          const { getGroupLabelElements, openList } = renderWithHelpers(mergedProps);
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
          const { getInputElement, openList } = renderWithHelpers(mergedProps);
          if (!hasInput) {
            return;
          }
          await openList();
          expect(getMismatchingElementAttributes(getInputElement(), expectedAttributes.input)).toHaveLength(0);
        });
        it('Options have correct attributes before and after selections', async () => {
          const { openList, getOptionElements, isListOpen, clickOptionAndWaitForRerender, getGroupLabelElements } =
            renderWithHelpers(mergedProps);
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
              mergedProps.multiSelect && groupCount > 0 && groupLabels.includes(optionElement);
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
      const { openList, getOptionElements, setInputValue } = renderWithHelpers({
        ...defaultTestProps,
        ...propsForSingleSelectNoGroupsFilterInput,
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
    it('Screen reader notifications are rendered', async () => {
      const { openList, setInputValue, getScreenReaderNotifications } = renderWithHelpers({
        ...defaultTestProps,
        ...propsForSingleSelectNoGroupsFilterInput,
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
        ...defaultTestProps,
        ...propsForSingleSelectNoGroupsNoInput,
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
        ...defaultTestProps,
        ...propsForSingleSelectNoGroupsNoInput,
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

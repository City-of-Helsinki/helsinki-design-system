import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { axe } from 'jest-axe';
import { cloneDeep, isNull, isUndefined } from 'lodash';

import { Select } from './Select';
import { IconLocation } from '../../icons';
import { SelectProps } from './types';
import { defaultFilter, getElementIds } from './utils';
import { isMultiSelectElement, isSingleSelectElement } from './components/list/common';

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
  selectOptions: Partial<SelectProps>;
  expectedAttributes: ElementAttributes;
  groupCount: number;
  hasInput: boolean;
};

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
  const selectId = 'select-component';
  const elementIds = getElementIds(selectId);
  const selectors = {
    listAndInputContainer: `#${selectId} > div:nth-child(2) > div:nth-child(2)`,
    extraGroup: `#${elementIds.list} > xx`,
    groups: `#${elementIds.list} > ul, #${elementIds.list} > div`,
    groupLabels: `#${elementIds.list} > ul > li[role="presentation"]`,
    options: `#${elementIds.list} > li[role="option"], #${elementIds.list} > ul > li[role="option"]`,
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

  const propsForSingleSelectNoGroupsNoInput: Partial<SelectProps> = {
    options,
  };

  const propsForSingleSelectNoGroupsFilterInput: Partial<SelectProps> = {
    options,
    filter: defaultFilter,
  };

  const propsForSingleSelectWithGroupsNoInput: Partial<SelectProps> = {
    groups: groupsAndOptions,
  };

  const propsForSingleSelectWithGroupsFilterInput: Partial<SelectProps> = {
    groups: groupsAndOptions,
    filter: defaultFilter,
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

  const renderWithHelpers = (selectProps: Partial<SelectProps> = {}) => {
    const result = render(<Select {...{ ...defaultTestProps, ...selectProps }} />);

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
      return getElementById(elementIds.searchOrFilterInput) as HTMLButtonElement;
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

    const gatAllListElements = () => {
      return Array.from(result.container.querySelectorAll(selectors.allListItems)) as HTMLElement[];
    };

    const getListAndInputContainer = () => {
      return result.container.querySelector(selectors.listAndInputContainer) as HTMLDivElement;
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

    const isListOpen = (): boolean => {
      const toggler = getElementById(getMainButtonElementId()) as HTMLElement;
      const list = getElementById(getListElementId());
      return toggler.getAttribute('aria-expanded') === 'true' && !!list;
    };

    const clickOptionAndWaitForRerender = async (index: number) => {
      const option = getOptionElements()[index];
      const menuWillCloseOnClick = isSingleSelectElement(option);
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
      await sleepUntilMinInteractionTimePassed();
      clickButton(getMainButtonElementId());
      await waitFor(() => {
        expect(isListOpen()).toBeTruthy();
      });
      // wait here so menu can be closed right after this
      await sleepUntilMinInteractionTimePassed();
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
      gatAllListElements,
      clickOptionAndWaitForRerender,
    };
  };
  describe.skip('spec', () => {
    const Wrapped = () => {
      return (
        <Select
          options={options}
          label="Label"
          onChange={onChangeTracker}
          placeholder="Choose one"
          icon={<IconLocation />}
          required
        />
      );
    };
    it('renders the component', () => {
      const { asFragment } = render(<Wrapped />);
      expect(asFragment()).toMatchSnapshot();
    });
    it('should not have basic accessibility issues', async () => {
      const { container } = render(<Wrapped />);
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
          // @ts-ignore-next-line
          'aria-label': defaultTestProps.texts.label,
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
          'aria-controls': elementIds.list,
          'aria-activedescendant': '', // this should change!
          'aria-haspopup': 'listbox',
        },
      },
      groupCount: 0,
      hasInput: true,
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
          // @ts-ignore-next-line
          'aria-label': defaultTestProps.texts.label,
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
      },
      groupCount: 0,
      hasInput: true,
    };

    [
      singleSelectNoGroupsNoInput,
      singleSelectWithGroupsNoInput,
      singleSelectNoGroupsWithInput,
      singleSelectWithGroupsFilterInput,
    ].forEach(({ selectOptions, description, expectedAttributes, groupCount, hasInput }) => {
      describe(`${description}`, () => {
        it('Button has correct attributes before and after opened', async () => {
          const { openList, getButtonElement, gatAllListElements } = renderWithHelpers(selectOptions);
          expect(getMismatchingElementAttributes(getButtonElement(), expectedAttributes.button)).toHaveLength(0);
          await openList();
          expect(
            getMismatchingElementAttributes(getButtonElement(), {
              ...expectedAttributes.button,
              'aria-expanded': true,
              'aria-activedescendant': hasInput ? undefined : String(gatAllListElements()[0].getAttribute('id')),
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
          const { getGroupElements, openList } = renderWithHelpers(selectOptions);
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
          const { openList, getOptionElements, isListOpen, clickOptionAndWaitForRerender } =
            renderWithHelpers(selectOptions);
          await openList();

          getOptionElements().forEach((optionElement) => {
            expect(getMismatchingElementAttributes(optionElement, expectedAttributes.options)).toHaveLength(0);
            expect(isElementSelected(optionElement)).toBeFalsy();
          });
          expect(filterSelectedOptions(getOptionElements())).toHaveLength(0);
          await clickOptionAndWaitForRerender(0);
          expect(isListOpen()).toBeFalsy();
          await openList();
          getOptionElements().forEach((optionElement, index) => {
            expect(
              getMismatchingElementAttributes(optionElement, {
                ...expectedAttributes.options,
                'aria-selected': index === 0,
              }),
            ).toHaveLength(0);
            expect(isElementSelected(optionElement)).toBe(index === 0);
          });
        });
      });
    });
  });
});

import { waitFor, fireEvent, render, act } from '@testing-library/react';
import React from 'react';
import { axe } from 'jest-axe';

import { IconLocation } from '../../icons';
import { getAllMockCallArgs, getLastMockCallArgs } from '../../utils/testHelpers';
import { eventIds, eventTypes } from './events';
import { useSelectDataHandlers } from './hooks/useSelectDataHandlers';
import { Select } from './Select';
import { defaultTexts } from './texts';
import { SelectProps, SelectMetaData, SelectData, Group, Option, SearchResult } from './types';
import { getElementIds, defaultFilter, propsToGroups } from './utils';
import { createTimedPromise } from '../login/testUtils/timerTestUtil';

export type GetSelectProps = Parameters<typeof getSelectProps>[0];

// storage for the target component to test
const renderMockedComponent = jest.fn();
const renderOnlyTheComponent = jest.fn().mockReturnValue(false);

// tempStorages for data updates triggered from DOM clicks
// These are cleared after each update.
const tempDataStorage = jest.fn();
const tempMetaDataStorage = jest.fn();

export const testUtilBeforeAll = (TargetComponent: React.FC) => {
  renderMockedComponent.mockImplementation(() => <TargetComponent />);
};
export const testUtilAfterAll = () => {
  renderMockedComponent.mockClear();
};

// aria-input-field-name requires a role="listbox" to have a aria-label || aria-labelledby.
// but this is not a requirement from accessibility audit.
export const skipAxeRulesExpectedToFail: Parameters<typeof axe>[1] = {
  rules: {
    'aria-input-field-name': { enabled: false },
    'aria-required-parent': { enabled: false },
    'aria-required-children': { enabled: false },
    'nested-interactive': { enabled: false },
    'presentation-role-conflict': { enabled: false },
  },
};

const ButtonsForDataUpdates = () => {
  const dataHandlers = useSelectDataHandlers();

  const onDataClick = () => {
    dataHandlers.updateData(getLastMockCallArgs(tempDataStorage)[0]);
    dataHandlers.updateMetaData({ lastToggleCommand: -1 });
    tempDataStorage.mockReset();
    // trigger an event that re-renders
    dataHandlers.trigger({ id: eventIds.arrowButton, type: eventTypes.click });
    dataHandlers.updateMetaData({ lastToggleCommand: -1 });
    dataHandlers.trigger({ id: eventIds.arrowButton, type: eventTypes.click });
  };

  const onMetaDataClick = () => {
    dataHandlers.updateMetaData(getLastMockCallArgs(tempMetaDataStorage)[0]);
    tempMetaDataStorage.mockReset();
  };

  return (
    <>
      <button type="button" onClick={onDataClick} id="data-updater">
        Update data
      </button>
      <button type="button" onClick={onMetaDataClick} id="meta-data-updater">
        Update metaData
      </button>
    </>
  );
};

const UpdateChecker = () => {
  // hook usage will cause update when context re-renders
  useSelectDataHandlers();
  return <span id="render-time">{Date.now()}</span>;
};

const ExportedData = () => {
  const { getData } = useSelectDataHandlers();
  const jsonData = JSON.stringify(getData());
  return <span id="exported-data">{jsonData}</span>;
};

const ExportedMetaData = () => {
  const { getMetaData } = useSelectDataHandlers();
  const jsonData = JSON.stringify(getMetaData(), (key, value) => {
    if (typeof value === 'function') {
      return undefined;
    }
    if (key === 'refs' || key === 'icon') {
      return undefined;
    }
    return value;
  });
  return <span id="exported-meta-data">{jsonData}</span>;
};

export const mockedContainer = () => {
  if (renderOnlyTheComponent()) {
    return renderMockedComponent();
  }
  return (
    <>
      {renderMockedComponent()}
      <ButtonsForDataUpdates />
      <UpdateChecker />
      <ExportedData />
      <ExportedMetaData />
    </>
  );
};

const onChangeTracker = jest.fn();
const options: Partial<Option>[] = [
  {
    value: 'Option1Value',
    label: 'Option 1',
  },
  {
    value: 'Option2Value',
    label: 'Option 2',
  },
  {
    value: 'Option3Value',
    label: 'Option 3',
  },
];
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

export const defaultLabel = 'Select label';
export const defaultId = 'test-select-component';

export const getSelectProps = ({
  groups,
  open,
  hasSelections,
  multiSelect,
  input,
  searchResults,
}: {
  groups: boolean;
  open?: boolean;
  multiSelect?: boolean;
  hasSelections?: boolean;
  input?: SelectMetaData['listInputType'];
  searchResults?: SearchResult[];
}) => {
  const selectProps: SelectProps = {
    options,
    onChange: onChangeTracker,
    icon: <IconLocation />,
    required: false,
    texts: {
      label: defaultLabel,
      placeholder: 'Choose one',
    },
    open,
    multiSelect,
  };

  if (input === 'filter') {
    selectProps.filter = defaultFilter;
  } else if (input === 'search' || searchResults) {
    selectProps.onSearch = () => {
      const results = searchResults && searchResults.length > 0 ? searchResults.shift() : {};
      return createTimedPromise(results, 300) as Promise<SearchResult>;
    };
  }

  if (groups) {
    selectProps.options = undefined;
    selectProps.groups = groupsAndOptions;
  }
  if (hasSelections) {
    if (selectProps.options) {
      (selectProps.options as Option[]).forEach((opt) => {
        // eslint-disable-next-line no-param-reassign
        opt.selected = true;
      });
    }
    if (selectProps.groups) {
      (selectProps.groups as Group[]).forEach((group) => {
        (group.options as Option[]).forEach((opt) => {
          // eslint-disable-next-line no-param-reassign
          opt.selected = true;
        });
      });
    }
  }
  return selectProps;
};

export const initTests = ({
  renderComponentOnly,
  selectProps = {},
  testProps = { groups: false },
}: {
  renderComponentOnly?: boolean;
  selectProps?: Partial<SelectProps>;
  testProps?: Parameters<typeof getSelectProps>[0];
} = {}) => {
  renderOnlyTheComponent.mockReturnValue(!!renderComponentOnly);
  const props = { ...getSelectProps({ input: undefined, ...testProps }), ...selectProps };
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const result = renderWithHelpers({ ...props, groups: testProps.groups });

  const getElementById = <T = HTMLElement,>(id: string) => {
    return result.container.querySelector(`#${id}`) as unknown as T;
  };

  const getRenderTime = () => {
    const el = getElementById('render-time');
    return parseInt(el.innerHTML, 10);
  };

  const createRenderUpdatePromise = () => {
    const lastUpdate = getRenderTime();
    return waitFor(() => {
      if (getRenderTime() <= lastUpdate) {
        throw new Error('Time not updated');
      }
    });
  };

  const getDataFromElement = () => {
    const el = getElementById('exported-data');
    return JSON.parse(el && el.innerHTML);
  };

  const createDataUpdatePromise = () => {
    const lastUpdate = getDataFromElement();
    return waitFor(() => {
      if (getDataFromElement() === lastUpdate) {
        throw new Error('Data not updated');
      }
    });
  };

  const getMetaDataFromElement = () => {
    const el = getElementById('exported-meta-data');
    return JSON.parse(el && el.innerHTML);
  };

  // metadata update does not trigger render!
  const triggerMetaDataChange = async (metaData: Partial<SelectMetaData>) => {
    tempMetaDataStorage(metaData);
    fireEvent.click(getElementById('meta-data-updater'));
  };

  const triggerDataChange = async (data: Partial<SelectData>) => {
    const promise = createRenderUpdatePromise();
    const promise2 = createDataUpdatePromise();
    tempDataStorage(data);
    fireEvent.click(getElementById('data-updater'));
    return Promise.all([promise, promise2]);
  };

  const getOptionElement = (option: Option) => {
    const labelEl = result.getByText(option.label) as HTMLElement;
    if (props.multiSelect) {
      if (option.isGroupLabel) {
        // return ((labelEl.parentElement as HTMLElement).parentElement as HTMLElement).parentElement as HTMLElement;
      }
      // get parent of parent of <label>, which is <div>
      return (labelEl.parentElement as HTMLElement).parentElement as HTMLElement;
    }
    // get parent of <span>, which is <li>
    return labelEl.parentElement as HTMLElement;
  };

  const clickOptionElement = (option: Option) => {
    const el = getOptionElement(option);
    fireEvent.click(el);
  };

  const getOnChangeMock = () => {
    return onChangeTracker;
  };

  const getOnChangeMockCalls = () => {
    return getAllMockCallArgs(getOnChangeMock());
  };

  const getOnChangeCallArgsAsProps = () => {
    const args = getLastMockCallArgs(getOnChangeMock());
    return {
      selectedOptions: args[0],
      clickedOption: args[1],
      data: args[2],
    };
  };

  return {
    ...result,
    triggerDataChange,
    triggerMetaDataChange,
    getMetaDataFromElement,
    getDataFromElement,
    getProps: () => {
      return props;
    },
    getGroups: () => {
      return propsToGroups(props) as Group[];
    },
    getOptionElement,
    clickOptionElement,
    getElementById,
    getOnChangeCallArgsAsProps,
    getOnChangeMockCalls,
    createRenderUpdatePromise,
  };
};

export const renderWithHelpers = (
  selectProps: Partial<Omit<SelectProps, 'groups'>> & {
    groups?: boolean;
    input?: SelectMetaData['listInputType'];
  } = {},
) => {
  // eslint-disable-next-line no-param-reassign
  selectProps.id = selectProps.id || defaultId;
  const placeholderText = defaultTexts.en.placeholder;
  const { groups, input, ...restSelectProps } = selectProps;
  const props: SelectProps = {
    ...getSelectProps({ groups: !!groups, input }),
    ...restSelectProps,
  };
  const result = render(<Select {...props} />);

  const elementIds = getElementIds(selectProps.id);
  const selectors = {
    listAndInputContainer: `#${selectProps.id} > div:nth-child(2) > div:nth-child(2)`,
    searchAndFilterInfo: `#${selectProps.id} div[data-testid="search-and-filter-info"]`,
    groups: `#${elementIds.list} > ul, #${elementIds.list} > div[role="group"]`,
    groupLabels: `#${elementIds.list} > ul > li[role="presentation"], #${elementIds.list} > div[role="group"] > div[role="checkbox"]:first-child`,
    options: `#${elementIds.list} > li[role="option"], #${elementIds.list} > ul > li[role="option"], #${elementIds.list} div[role="checkbox"]`,
    allListItems: `created below`,
    selectionsInButton: `#${elementIds.button} > div > span`,
    overflowCounter: `#${elementIds.button} > span`,
  };
  selectors.allListItems = `${selectors.groupLabels}, ${selectors.options}`;

  const getText = (componentProps: SelectProps, key: string) => {
    if (!componentProps || !componentProps.texts) {
      throw new Error('No texts found');
    }
    if (typeof componentProps.texts === 'object') {
      return componentProps.texts[key];
    }
    return 'none';
  };

  const optionCountInAllGroups = props.groups
    ? (props.groups as Group[]).reduce((count, group) => {
        return count + group.options.length;
      }, 0)
    : 0;

  const optionCountInGroups = props.groups
    ? (props.groups as Group[]).map((group) => {
        return group.options.length;
      })
    : [0];

  const isElementSelected = (optionElement: HTMLElement) => {
    return (
      optionElement.getAttribute('aria-selected') === 'true' ||
      optionElement.getAttribute('aria-checked') === 'true' ||
      optionElement.getAttribute('aria-checked') === 'mixed'
    );
  };

  const getElementById = (id: string) => {
    return result.container.querySelector(`#${id}`) as HTMLElement;
  };

  const getRootContainer = () => {
    return getElementById(elementIds.container) as HTMLDivElement;
  };

  const getButtonElement = () => {
    return getElementById(elementIds.button) as HTMLButtonElement;
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
    const groupLabelElements = getGroupLabelElements();
    const optionElements = Array.from(result.container.querySelectorAll(selectors.options)) as HTMLElement[];
    return optionElements.filter((e) => !groupLabelElements.includes(e));
  };

  const getAllListElements = () => {
    return Array.from(result.container.querySelectorAll(selectors.allListItems)) as HTMLElement[];
  };

  const getListAndInputContainer = () => {
    return result.container.querySelector(selectors.listAndInputContainer) as HTMLDivElement;
  };

  const getSearchAndFilterInfoContainer = () => {
    return result.container.querySelector(selectors.searchAndFilterInfo) as HTMLDivElement;
  };

  const getSelectionsInButton = () => {
    return Array.from(result.container.querySelectorAll(selectors.selectionsInButton))
      .map((node) => node.innerHTML)
      .filter((t) => t !== placeholderText);
  };

  const getOverflowCount = () => {
    const element = result.container.querySelector(selectors.overflowCounter);
    const num = element ? parseInt(element.innerHTML, 10) : NaN;
    return Number.isNaN(num) ? -1 : num;
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

  const getSearchAndFilterInfoTexts = () => {
    // span filtering removes the spinner
    return Array.from(getSearchAndFilterInfoContainer().children)
      .filter((node) => node.nodeName === 'SPAN')
      .map((node) => node.innerHTML);
  };

  const isListOpen = (): boolean => {
    const toggler = getElementById(elementIds.button) as HTMLElement;
    const list = getElementById(elementIds.list);
    return toggler.getAttribute('aria-expanded') === 'true' && !!list;
  };

  const clickOptionAndWaitForRerender = async (index: number) => {
    const option = getOptionElements()[index];
    const menuWillCloseOnClick = !props.multiSelect;
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

  const clickGroupAndWaitForRerender = async (index: number) => {
    const group = getGroupLabelElements()[index];
    const menuWillCloseOnClick = !props.multiSelect;
    const getInitialState = () => {
      if (menuWillCloseOnClick) {
        return isListOpen();
      }
      const targetOption = getGroupLabelElements()[index];
      return isElementSelected(targetOption);
    };
    const currentState = getInitialState();
    fireEvent.click(group);
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
    clickButton(elementIds.button);
    await waitFor(() => {
      expect(isListOpen()).toBeTruthy();
    });
    // wait here so menu can be closed right after this
    await sleepUntilMinInteractionTimePassed();
  };

  const closeList = async () => {
    if (!isListOpen()) {
      return;
    }
    await sleepUntilMinInteractionTimePassed();
    clickButton(elementIds.button);
    await waitFor(() => {
      expect(isListOpen()).toBeFalsy();
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

  const filterSelectedOptions = (optionElements: HTMLElement[]) => {
    return Array.from(optionElements).filter(isElementSelected);
  };

  return {
    ...result,
    getElementIds: () => {
      return elementIds;
    },
    openList,
    closeList,
    isListOpen,
    getListItemLabels,
    getButtonElement,
    getRootContainer,
    getListAndInputContainer,
    getInputElement,
    getListElement,
    getClearButton: () => {
      return getElementById(elementIds.clearButton);
    },
    getArrowButton: () => {
      return getElementById(elementIds.arrowButton);
    },
    getLabel: () => {
      return getElementById(elementIds.label);
    },
    getSearchOrFilterInputLabel: () => {
      return getElementById(elementIds.searchOrFilterInputLabel);
    },
    getGroupLabelElements,
    getGroupElements,
    getOptionElements,
    getAllListElements,
    clickOptionAndWaitForRerender,
    setInputValue,
    getSearchAndFilterInfoTexts,
    getOverflowCount,
    getSelectionsInButton,
    optionCountInGroups,
    optionCountInAllGroups,
    options,
    groupsAndOptions,
    getText,
    filterSelectedOptions,
    isElementSelected,
    clickGroupAndWaitForRerender,
  };
};

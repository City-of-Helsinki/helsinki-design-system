import { waitFor, fireEvent, render, act } from '@testing-library/react';
import React from 'react';

import { IconLocation } from '../../icons';
import { getLastMockCallArgs } from '../../utils/testHelpers';
import { createTimedPromise } from '../login/testUtils/timerTestUtil';
import { isMultiSelectElement } from './components/list/common';
import { eventIds, eventTypes } from './events';
import { useSelectDataHandlers } from './hooks/useSelectDataHandlers';
import { Select } from './Select';
import { SelectProps, SelectMetaData, SelectData, SearchResult, Group, Option } from './types';
import { defaultFilter, getElementIds } from './utils';

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

const ButtonsForDataUpdates = () => {
  const dataHandlers = useSelectDataHandlers();

  const onDataClick = () => {
    dataHandlers.updateData(getLastMockCallArgs(tempDataStorage)[0]);
    tempDataStorage.mockReset();
    dataHandlers.trigger({ id: eventIds.showAllButton, type: eventTypes.click });
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
  const jsonData = JSON.stringify(getMetaData());
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
  multiSelect,
  input,
  searchResults,
  open,
  hasSelections,
}: {
  groups: boolean;
  multiSelect: boolean;
  input: SelectMetaData['listInputType'];
  searchResults?: SearchResult[];
  open?: boolean;
  hasSelections?: boolean;
}) => {
  const selectProps: SelectProps = {
    options,
    onChange: onChangeTracker,
    placeholder: 'Choose one',
    icon: <IconLocation />,
    required: false,
    multiSelect,
    texts: {
      label: defaultLabel,
    },
    open,
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
}: { renderComponentOnly?: boolean; selectProps?: Partial<SelectProps> } = {}) => {
  renderOnlyTheComponent.mockReturnValue(!!renderComponentOnly);
  const props = render(
    <Select {...{ ...getSelectProps({ multiSelect: false, groups: false, input: undefined }), ...selectProps }} />,
  );

  const getElementById = <T = HTMLElement,>(id: string) => {
    return props.container.querySelector(`#${id}`) as unknown as T;
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

  return {
    ...props,
    triggerDataChange,
    triggerMetaDataChange,
    getMetaDataFromElement,
    getDataFromElement,
  };
};

export const renderWithHelpers = (
  selectProps: SelectProps = getSelectProps({ multiSelect: false, groups: false, input: undefined }),
) => {
  // eslint-disable-next-line no-param-reassign
  selectProps.id = selectProps.id || defaultId;
  const result = render(<Select {...selectProps} />);

  const elementIds = getElementIds(selectProps.id);
  const selectors = {
    listAndInputContainer: `#${selectProps.id} > div:nth-child(2) > div:nth-child(2)`,
    extraGroup: `#${elementIds.list} > xx`,
    screenReaderNotifications: `#${selectProps.id} div[data-testid="screen-reader-notifications"]`,
    searchAndFilterInfo: `#${selectProps.id} div[data-testid="search-and-filter-info"]`,
    groups: `#${elementIds.list} > ul, #${elementIds.list} > div[role="group"]`,
    groupLabels: `#${elementIds.list} > ul > li[role="presentation"], #${elementIds.list} > div[role="group"] > div[role="checkbox"]:first-child`,
    options: `#${elementIds.list} > li[role="option"], #${elementIds.list} > ul > li[role="option"], #${elementIds.list} div[role="checkbox"]`,
    tags: `#${elementIds.tagList} > div`,
    allListItems: `created below`,
    selectionsInButton: `${elementIds.dropdownButton} > div > span`,
    overflowCounter: `${elementIds.dropdownButton} > span`,
  };
  selectors.allListItems = `${selectors.groupLabels}, ${selectors.options}`;

  const getText = (props: SelectProps, key: string) => {
    if (!props || !props.texts) {
      throw new Error('No texts found');
    }
    if (typeof props.texts === 'object') {
      return props.texts[key];
    }
    return 'none';
  };

  const optionCountInGroups = selectProps.groups
    ? (selectProps.groups as Group[]).reduce((count, group) => {
        return count + group.options.length;
      }, 0)
    : 0;

  const isElementSelected = (optionElement: HTMLElement) => {
    if (isMultiSelectElement(optionElement)) {
      return optionElement.getAttribute('aria-checked') === 'true';
    }
    return optionElement.getAttribute('aria-selected') === 'true';
  };

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

  const getScreenReaderNotificationContainer = () => {
    return result.container.querySelector(selectors.screenReaderNotifications) as HTMLDivElement;
  };

  const getSearchAndFilterInfoContainer = () => {
    return result.container.querySelector(selectors.searchAndFilterInfo) as HTMLDivElement;
  };

  const getTagElements = () => {
    return Array.from(result.container.querySelectorAll(selectors.tags)) as HTMLElement[];
  };

  const getTags = () => {
    return getTagElements().map((node) => node.innerHTML);
  };

  const getSelectionsInButton = () => {
    return Array.from(result.container.querySelectorAll(selectors.selectionsInButton)).map((node) => node.innerHTML);
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
    const toggler = getElementById(elementIds.dropdownButton) as HTMLElement;
    const list = getElementById(elementIds.list);
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
    clickButton(elementIds.dropdownButton);
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

  const filterSelectedOptions = (optionElements: HTMLElement[]) => {
    return Array.from(optionElements).filter(isElementSelected);
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
    getShowAllButton: () => {
      return getElementById(elementIds.showAllButton);
    },
    getClearAllButton: () => {
      return getElementById(elementIds.clearAllButton);
    },
    getClearButton: () => {
      return getElementById(elementIds.clearButton);
    },
    getArrowButton: () => {
      return getElementById(elementIds.arrowButton);
    },
    getLabel: () => {
      return getElementById(elementIds.label);
    },
    getTagList: () => {
      return getElementById(elementIds.tagList);
    },
    getSearchOrFilterInputLabel: () => {
      return getElementById(elementIds.searchOrFilterInputLabel);
    },
    getGroupLabelElements,
    getTagElements,
    getGroupElements,
    getOptionElements,
    getAllListElements,
    clickOptionAndWaitForRerender,
    setInputValue,
    getScreenReaderNotifications,
    getSearchAndFilterInfoTexts,
    getTags,
    getOverflowCount,
    getSelectionsInButton,
    optionCountInGroups,
    options,
    groupsAndOptions,
    getText,
    filterSelectedOptions,
    isElementSelected,
  };
};

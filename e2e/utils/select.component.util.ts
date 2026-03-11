import { getElementIds } from '../../packages/react/src/components/dropdownComponents/select/utils';
import { SelectMetaData, TextKey } from '../../packages/react/src/components/dropdownComponents/select/types';
import { defaultTexts } from '../../packages/react/src/components/dropdownComponents/select/texts';
import { Locator, Page } from '@playwright/test';
import {
  isElementVisible,
  isLocatorSelectedOrChecked,
  getDiffYBetweenElementCenters,
  waitForElementToBeHidden,
  waitForElementToBeVisible,
  combineBoundingBoxes,
  getScrollTop,
  scrollLocatorTo,
  waitForStablePosition,
} from './element.util';
import { filterLocators, waitFor } from './playwright.util';
import { tagSelectorForTagList } from '../../packages/react/src/components/dropdownComponents/select/components/tagList/TagListItem';

type OptionFiltering = {
  includeOptions?: boolean;
  includeSingleSelectGroupLabels?: boolean;
  includeMultiSelectGroupLabels?: boolean;
  all?: boolean;
  skipOpenCheck?: boolean;
};

// sadly selectors defined in the Select's React files are not usable here as React's "styles" objects do not exist.
// all are not tested
// do not use ":not" selectors! It will break locators.all() and locators.count() when selector before ":not" returns nothing.
const singleSelectOptionSelector = 'li[role="option"][aria-selected]';
const singleSelectGroupLabelSelector = 'li[role="presentation"]';
// multiselect is a div if in group.
// otherwise singleSelect selector matches
// multiselect group labels are include in option selector. getOptionElements() filters them out.
const multiSelectOptionSelector = `div[role="checkbox"][aria-checked],${singleSelectOptionSelector}`;
const multiSelectGroupLabelSelector = 'div[role="group"] > div[role="checkbox"]:first-child';

const dataTestIds = {
  placeholder: 'placeholder',
  searchingText: 'hds-select-searching-text',
  searchAndFilterInfo: 'hds-select-search-and-filter-info',
  searchNoResults: 'hds-select-no-results',
  searchError: 'hds-select-searching-error',
  screenReaderNotifications: 'hds-select-screen-reader-notifications',
};

export const createSelectHelpers = (page: Page, componentId: string) => {
  const getElementId = (componentId: string, elementName: keyof SelectMetaData['elementIds']) => {
    return getElementIds(componentId)[elementName];
  };

  const waitForMinInterActionTimeToPass = async () => {
    // if lists are opened/closed too quickly (<MIN_USER_INTERACTION_TIME_IN_MS)
    // next action will not close it, so lets wait
    await page.waitForTimeout(300);
  };

  const getElementByName = (elementName: keyof SelectMetaData['elementIds']) => {
    const id = getElementId(componentId, elementName);
    if (!id) {
      throw new Error(`Unknown select element ${elementName}. Id not found.`);
    }
    return page.locator(`#${id}`) as Locator;
  };

  const getScrollableListContainer = () => {
    const parentContainer = getElementByName('selectionsAndListsContainer');
    return parentContainer.locator('> div').first();
  };

  const isOptionListOpen = async (): Promise<boolean> => {
    const listElement = getElementByName('list');
    return isElementVisible(listElement);
  };

  const isOptionListClosed = async (): Promise<boolean> => {
    const listElement = getElementByName('list');
    const visibility = await isElementVisible(listElement);
    return visibility === false;
  };

  const openList = async (): Promise<Locator> => {
    const listElement = getElementByName('list');
    if (await isElementVisible(listElement)) {
      return Promise.resolve(listElement);
    }
    const button = getElementByName('button');
    await button.click({ timeout: 2000 });
    await waitForElementToBeVisible(listElement);
    await waitForMinInterActionTimeToPass();
    return Promise.resolve(listElement);
  };

  const closeList = async (): Promise<Locator> => {
    const listElement = getElementByName('list');
    if (!(await isElementVisible(listElement))) {
      return Promise.resolve(listElement);
    }
    const button = getElementByName('button');
    await button.click({ timeout: 2000 });
    await waitForElementToBeHidden(listElement);
    await waitForMinInterActionTimeToPass();
    return Promise.resolve(listElement);
  };

  const getOptionElements = async ({
    includeOptions = true,
    includeSingleSelectGroupLabels = false,
    includeMultiSelectGroupLabels = true,
    all = false,
    skipOpenCheck = false,
  }: OptionFiltering = {}) => {
    const listElement = skipOpenCheck ? getElementByName('list') : await openList();

    const selectorList = includeOptions || all ? [singleSelectOptionSelector, multiSelectOptionSelector] : [];
    if (includeMultiSelectGroupLabels || all) {
      selectorList.push(multiSelectGroupLabelSelector);
    }
    if (includeSingleSelectGroupLabels || all) {
      selectorList.push(singleSelectGroupLabelSelector);
    }
    const res = listElement.locator(selectorList.join(','));
    // have to manually remove multiselect group labels from other options, because selectors include other
    if (!all && includeOptions && !includeMultiSelectGroupLabels) {
      const groupLabels = listElement.locator(multiSelectGroupLabelSelector);
      const groupLabelIds = await groupLabels.evaluateAll((el) => el.map((e) => e.getAttribute('id')));
      const locators = await res.all();
      return filterLocators(locators, async (e) => {
        const id = await e.getAttribute('id');
        return groupLabelIds.includes(id) === false;
      });
    }
    return res.all();
  };

  // adds given amount to the current scrollTop
  const scrollList = async (amount: number) => {
    const scrollableList = getScrollableListContainer();
    const current = await getScrollTop(scrollableList);
    return scrollLocatorTo(scrollableList, Math.round(current + amount));
  };

  const getGroups = async () => {
    const listElement = await openList();
    return listElement.locator('div[role="group"]').all();
  };

  const getGroupLabels = async () => {
    return getOptionElements({
      includeOptions: false,
      includeSingleSelectGroupLabels: true,
      includeMultiSelectGroupLabels: true,
      all: false,
    });
  };

  // this only works with multiselect where options are inside a [role="group"]
  const getItemsInGroup = async (index: number) => {
    const groups = await getGroups();
    const group = groups[index];
    if (!group) {
      throw new Error(`No group found in index "${index}"`);
    }
    return group.locator('> *').all();
  };

  const getOptionsInGroup = async (index: number) => {
    const items = await getItemsInGroup(index);
    return items.slice(1);
  };

  const getGroupLabel = async (index: number) => {
    const items = await getGroupLabels();
    return items[index] as Locator;
  };

  const countOptionsInGroup = async (index: number) => {
    const items = await getOptionsInGroup(index);
    return items.length;
  };

  // this seems overcomplicated (and it is);
  // Encountered problems:
  // 1. using > div span:not[data-testid="placeholder"] will result failure when testing results with count() or all():
  // "not" engine expects non-empty selector list
  // 2. placeHolder.textContent hangs if count is not checked first
  // 3.locator().filter() never worked with any combinations
  const getSelectedOptionsInButton = async () => {
    const buttonElement = getElementByName('button');
    const placeHolder = buttonElement.locator(`> div span[data-testid="${dataTestIds.placeholder}"]`);
    const hasPlaceholder = await placeHolder.count();
    const text = hasPlaceholder ? (await placeHolder.textContent()) || '' : '';
    return buttonElement.locator('> div span').filter({ hasNotText: text });
  };

  const getTags = (): Locator => {
    const tagList = getElementByName('tagList');
    return tagList.locator(tagSelectorForTagList);
  };

  const getTag = async (index: number) => {
    const tags = await getTags().all();
    return tags[index];
  };

  const getSelectedOptionsCount = async () => {
    const currentOptions = await getSelectedOptionsInButton();
    return currentOptions.count();
  };

  const getTagsCount = async () => {
    const tags = getTags();
    return tags.count();
  };

  const getSelectedOptionsLabels = async () => {
    const currentOptions = await getSelectedOptionsInButton();
    return currentOptions.evaluateAll((el) => el.map((e) => e.textContent || ''));
  };

  const getSelectedGroupLabels = async () => {
    const groupLabels = await getOptionElements({ includeMultiSelectGroupLabels: true, includeOptions: false });
    return filterLocators(groupLabels, (elem) => {
      return isLocatorSelectedOrChecked(elem);
    });
  };

  const isOptionSelected = async (option: Locator) => {
    const isSelected = await isLocatorSelectedOrChecked(option);
    if (isSelected) {
      return Promise.resolve(option);
    }
    const currentOptions = await getSelectedOptionsInButton();
    const optionLabel = await option.innerText();
    const matchingOption = currentOptions.getByText(optionLabel);
    const matchingOptionCount = await matchingOption.count();
    if (matchingOptionCount > 0) {
      return Promise.resolve(option);
    }
    return Promise.resolve(null);
  };

  const waitUntilSelectedOptionCountMatches = async (expectedCount: number) => {
    await waitFor(async () => {
      const selectionCount = await getSelectedOptionsCount();
      if (selectionCount != expectedCount) {
        return Promise.resolve(false);
      }
      return Promise.resolve(true);
    });
  };

  const waitUntilSelectedOptionCountChanges = async (currentCount: number) => {
    await waitFor(async () => {
      const selectionCount = await getSelectedOptionsCount();
      if (selectionCount == currentCount) {
        return Promise.resolve(false);
      }
      return Promise.resolve(true);
    });
  };

  const getOptionByIndex = async (props: OptionFiltering & { index: number }) => {
    await openList();
    const { index, ...rest } = props;
    const option = (await getOptionElements(rest))[index];
    if (!option) {
      throw new Error(`No option found in index "${index}"`);
    }
    return Promise.resolve(option);
  };

  const getOptionLabel = async (option: Locator) => {
    // group label has extra helper text in the label so cannot use that
    return option.textContent() as Promise<string>;
  };

  const selectOptionByIndex = async (props: OptionFiltering & { index: number; multiSelect: boolean }) => {
    const option = await getOptionByIndex(props);
    const isSelected = await isOptionSelected(option);
    if (isSelected) {
      return Promise.resolve(option);
    }
    const currentCount = await getSelectedOptionsCount();

    if (props.multiSelect) {
      await option.click();
      // if single select, the menu is closed, so cannot check the option element itself
      await waitUntilSelectedOptionCountMatches(currentCount + 1);
    } else if (!props.multiSelect) {
      const label = await getOptionLabel(option);
      await option.click();
      await waitFor(async () => {
        const selectedOptionLabels = await getSelectedOptionsLabels();
        return selectedOptionLabels.includes(label);
      });
    }
    if (!props.multiSelect) {
      // waiting for list to close makes tests more stable
      await waitForElementToBeHidden(getElementByName('list'));
      await waitForMinInterActionTimeToPass();
    }
    return Promise.resolve(option);
  };

  const scrollOptionInToView = async (option: Locator) => {
    const listContainer = getElementByName('selectionsAndListsContainer');
    const scrollTo = await getDiffYBetweenElementCenters(option, listContainer);
    await scrollList(scrollTo);
  };

  const scrollGroupInToView = async ({ index }: { index: number }) => {
    const options = await getOptionsInGroup(index);
    const label = options[0];
    const lastOption = options[options.length - 1];
    const box = await combineBoundingBoxes([label, lastOption]);
    const listContainer = getElementByName('selectionsAndListsContainer');
    const scrollTo = await getDiffYBetweenElementCenters(box, listContainer);
    await scrollList(scrollTo);
    await waitForStablePosition(lastOption);
    return getScrollTop(listContainer);
  };

  const selectGroupByIndex = async ({ index, ignoreIfSelected }: { index: number; ignoreIfSelected?: boolean }) => {
    const currentCount = await getSelectedOptionsCount();
    const groupLabel = await getGroupLabel(index);
    if (!ignoreIfSelected) {
      const isSelected = await isOptionSelected(groupLabel);
      if (isSelected) {
        return Promise.resolve(groupLabel);
      }
    }
    await groupLabel.click();
    // if single select, the menu is closed, so cannot check the option element itself
    await waitUntilSelectedOptionCountChanges(currentCount);
  };

  const getInputText = async () => {
    const inputElement = getElementByName('searchOrFilterInput');
    return inputElement.inputValue();
  };

  const getInput = () => {
    return getElementByName('searchOrFilterInput');
  };

  const getSearchAndFilterInfo = () => {
    return page.getByTestId(dataTestIds.searchAndFilterInfo);
  };
  const getScreenReaderNotifications = () => {
    return page.getByTestId(dataTestIds.screenReaderNotifications);
  };

  const getBoundingBox = async (spacing = 8) => {
    const container = getElementByName('container');
    const selectionsAndListsContainer = getElementByName('selectionsAndListsContainer');
    const box = await combineBoundingBoxes([container, selectionsAndListsContainer]);
    box.x -= spacing;
    box.y -= spacing;
    box.height += 2 * spacing;
    box.width += 2 * spacing;
    return box;
  };

  const checkAllTagsAreShown = async () => {
    const tagListContainer = getElementByName('tagList');
    const lastTag = getTags().last();
    const containerBox = await tagListContainer.boundingBox();
    const lastTagBox = await lastTag.boundingBox();
    if (!lastTagBox || !lastTagBox.height) {
      return true;
    }
    if (!containerBox) {
      return false;
    }
    return containerBox.y + containerBox.height >= lastTagBox.y + lastTagBox.height;
  };

  const showAllTags = async () => {
    const allTagsShown = await checkAllTagsAreShown();
    if (allTagsShown) {
      return Promise.resolve(true);
    }
    const button = getElementByName('showAllButton');
    await button.click();
    await waitFor(async () => {
      return checkAllTagsAreShown();
    });
  };

  const hideAllTags = async () => {
    const allTagsShown = await checkAllTagsAreShown();
    if (!allTagsShown) {
      return Promise.resolve(true);
    }
    const button = getElementByName('showAllButton');
    await button.click();
    await waitFor(async () => {
      const isShown = await checkAllTagsAreShown();
      return isShown === false;
    });
  };

  const isSearchingSpinnerVisible = () => {
    return page.getByTestId(dataTestIds.searchingText).isVisible();
  };

  const isSearchingErrorVisible = () => {
    return page.getByTestId(dataTestIds.searchError).isVisible();
  };

  const isSearchAndFilterInfoVisible = () => {
    return page.getByTestId(dataTestIds.searchAndFilterInfo).isVisible();
  };

  const isNoSearchResultsVisible = () => {
    return page.getByTestId(dataTestIds.searchNoResults).isVisible();
  };

  const hasSearchResults = async (): Promise<boolean> => {
    const elements = await getOptionElements({ all: true, skipOpenCheck: true });
    return elements.length > 0;
  };

  const getDefaultText = (key: TextKey): string | undefined => {
    return defaultTexts['en'][key];
  };

  return {
    checkAllTagsAreShown,
    closeList,
    countOptionsInGroup,
    getBoundingBox,
    getGroupLabel,
    getGroupLabels,
    getGroups,
    getElementByName,
    getInput,
    getInputText,
    getItemsInGroup,
    getOptionByIndex,
    getOptionElements,
    getOptionLabel,
    getOptionsInGroup,
    getScrollableListContainer,
    getSearchAndFilterInfo,
    getSelectedGroupLabels,
    getSelectedOptionsInButton,
    getTag,
    getTags,
    getTagsCount,
    hasSearchResults,
    hideAllTags,
    isOptionListOpen,
    isOptionListClosed,
    isNoSearchResultsVisible,
    isSearchAndFilterInfoVisible,
    isSearchingErrorVisible,
    isSearchingSpinnerVisible,
    openList,
    scrollGroupInToView,
    scrollOptionInToView,
    selectGroupByIndex,
    selectOptionByIndex,
    showAllTags,
    waitUntilSelectedOptionCountMatches,
    getScreenReaderNotifications,
    getDefaultText,
  };
};

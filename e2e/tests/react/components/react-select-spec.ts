import { test, expect, Page } from '@playwright/test';
import {
  scanAccessibility,
  getComponentStorybookUrls,
  waitFor,
  createScreenshotFileName,
  listenToConsole,
  takeStateScreenshots,
  gotoStorybookUrlByName,
} from '../../../utils/playwright.util';
import { createSelectHelpers } from '../../../utils/select.component.util';
import {
  focusLocator,
  isLocatorFocused,
  isLocatorSelectedOrChecked,
  waitForStablePosition,
} from '../../../utils/element.util';
import { createKeyboardHelpers } from '../../../utils/keyboard.util';

const componentName = 'select';
const storybook = 'react';

const storyWithPlainSingleSelect = 'Singleselect';
const storyWithSingleSelectAndGroups = 'Singleselect With Groups';
const storyWithControls = 'With Controls';
const storyWithMultiSelectAndGroupsWithoutInput = 'Multiselect With Groups';
const storyWithMultiSelectAndGroupsWithFilter = 'Multiselect With Groups And Filter';
const storyWithMultiSelectAndGroupsWithSearch = 'Multiselect With Groups And Search';
const storyWithValidation = 'With Validation And Forced Selection';
const storyWithCustomTheme = 'With Custom Theme';
const storyWithTooltip = 'Singleselect With Tooltip';
const storyWithMultiSelectEvents = 'Multiselect';

const selectId = 'hds-select-component';

test.describe(`Testing ${storybook} component "${componentName}"`, () => {
  test('Take snapshots of all Selects stories', async ({ page, hasTouch }) => {
    const componentUrls = await getComponentStorybookUrls(page, componentName, storybook);
    if (componentUrls.length === 0) {
      throw new Error('No componentUrls found for');
    }
    for (const componentUrl of componentUrls) {
      await page.goto(componentUrl);
      const selectUtil = createSelectHelpers(page, selectId);
      const containerCount = await selectUtil.getElementByName('container').count();
      if (containerCount < 1) {
        // container is not found if the story has custom id for the Select.
        // for example the "With External Label"
        return;
      }
      // many select stories have extra buttons etc. so skipping them with clip
      const clip = await selectUtil.getBoundingBox();

      const screenshotName = `${storybook}-${componentUrl.split('/').pop()}-${hasTouch ? 'mobile' : 'desktop'}`;
      await scanAccessibility(page);
      await expect(page).toHaveScreenshot(`${screenshotName}.png`, { clip, fullPage: true });
    }
  });
});

test.describe(`Selecting options and groups`, () => {
  test('Multiselect select an option and one group', async ({ page, hasTouch }, testInfo) => {
    await gotoStorybookUrlByName(page, storyWithMultiSelectAndGroupsWithoutInput, componentName, storybook);

    const selectUtil = createSelectHelpers(page, selectId);
    const isOpen = await selectUtil.isOptionListOpen();
    expect(isOpen).toBeFalsy();

    await selectUtil.selectOptionByIndex({ index: 1, multiSelect: true });
    await selectUtil.selectGroupByIndex({ index: 1 });

    const screenshotName = createScreenshotFileName(testInfo, hasTouch);
    const clip = await selectUtil.getBoundingBox();
    await scanAccessibility(page);
    await expect(page).toHaveScreenshot(screenshotName, { clip, fullPage: true });
  });
  test('Singleselect options one by one', async ({ page, hasTouch }, testInfo) => {
    await gotoStorybookUrlByName(page, storyWithPlainSingleSelect, componentName, storybook);
    const selectUtil = createSelectHelpers(page, selectId);

    await selectUtil.selectOptionByIndex({ index: 0, multiSelect: false });
    await selectUtil.selectOptionByIndex({ index: 5, multiSelect: false });
    await selectUtil.selectOptionByIndex({ index: 10, multiSelect: false });
    await selectUtil.selectOptionByIndex({ index: 19, multiSelect: false });

    const screenshotName = createScreenshotFileName(testInfo, hasTouch);
    const clip = await selectUtil.getBoundingBox();
    await scanAccessibility(page);
    await expect(page).toHaveScreenshot(screenshotName, { clip, fullPage: true });
  });
});

test.describe(`Keyboard navigation`, () => {
  test('Spacebar opens menu, arrow keys move focus, esc closes, home and end move to start and end', async ({
    page,
    hasTouch,
  }, testInfo) => {
    await gotoStorybookUrlByName(page, storyWithMultiSelectAndGroupsWithoutInput, componentName, storybook);
    const selectUtil = createSelectHelpers(page, selectId);
    const keyboard = createKeyboardHelpers(page);
    expect(await selectUtil.isOptionListOpen()).toBeFalsy();

    await focusLocator(selectUtil.getElementByName('button'));

    await keyboard.space(); // opens menu and moves focus to #0 (label)
    await waitFor(() => {
      return selectUtil.isOptionListOpen();
    });

    await keyboard.down(); // moves focus to #1
    await keyboard.down(); // moves focus to #2
    await keyboard.down(); // moves focus to #3

    const options = await selectUtil.getOptionElements({ all: true });
    await waitFor(() => {
      return isLocatorFocused(options[3]);
    });

    await waitForStablePosition(options[3]);

    await selectUtil.scrollGroupInToView({ index: 0 });
    const screenshotName = createScreenshotFileName(testInfo, hasTouch);

    const clip = await selectUtil.getBoundingBox();
    await scanAccessibility(page);
    await expect(page).toHaveScreenshot(screenshotName, { clip, fullPage: true });

    await keyboard.home(); // moves focus to #0
    await waitFor(() => {
      return isLocatorFocused(options[0]);
    });

    await keyboard.end(); // moves focus to the last
    await waitFor(() => {
      return isLocatorFocused(options[options.length - 1]);
    });

    await keyboard.esc(); // closes menu
    await waitFor(() => {
      return selectUtil.isOptionListClosed();
    });
  });
  test('Group labels are ignored with single select', async ({ page, hasTouch }, testInfo) => {
    await gotoStorybookUrlByName(page, storyWithSingleSelectAndGroups, componentName, storybook);
    const selectUtil = createSelectHelpers(page, selectId);
    const keyboard = createKeyboardHelpers(page);

    await focusLocator(selectUtil.getElementByName('button'));

    await keyboard.space(); // opens menu and moves focus to #1 (label is ignored)
    await waitFor(() => {
      return selectUtil.isOptionListOpen();
    });
    const options = await selectUtil.getOptionElements({ all: true });
    const lastOption = options[options.length - 1];
    await waitFor(() => {
      return isLocatorFocused(options[1]);
    });

    const screenshotName = createScreenshotFileName(testInfo, hasTouch, 'first non-label is focused');
    const clip = await selectUtil.getBoundingBox();
    await scanAccessibility(page);
    await expect(page).toHaveScreenshot(screenshotName, { clip, fullPage: true });

    await keyboard.up(); // moves focus to the last

    await waitFor(() => {
      return isLocatorFocused(lastOption);
    });

    await selectUtil.scrollOptionInToView(lastOption);
    await waitForStablePosition(lastOption);

    const screenshotName2 = createScreenshotFileName(testInfo, hasTouch, 'last non-label is focused');
    const clip2 = await selectUtil.getBoundingBox();
    await scanAccessibility(page);
    await expect(page).toHaveScreenshot(screenshotName2, { clip: clip2, fullPage: true });

    await keyboard.home(); // moves focus to #1 (label is ignored)
    await selectUtil.scrollOptionInToView(options[1]);
    await waitFor(() => {
      return isLocatorFocused(options[1]);
    });
    await keyboard.down(); // moves focus to #2
    await selectUtil.scrollOptionInToView(options[2]);
    await waitFor(() => {
      return isLocatorFocused(options[2]);
    });
  });
});
test.describe(`Typing when focused and there is no input`, () => {
  test('user input focuses options with filtering.', async ({ page, hasTouch }, testInfo) => {
    // this test assumes that top three options do NOT start with same 3 letters
    // keyCache in the components resets in 300ms
    const assumedCacheResetInMs = 300;
    await gotoStorybookUrlByName(page, storyWithMultiSelectAndGroupsWithoutInput, componentName, storybook);
    const selectUtil = createSelectHelpers(page, selectId);
    const keyboard = createKeyboardHelpers(page);
    expect(await selectUtil.isOptionListOpen()).toBeFalsy();
    const button = selectUtil.getElementByName('button');
    const options = await selectUtil.getOptionElements({ all: true });
    await focusLocator(button);

    const option2Label = await selectUtil.getOptionLabel(options[2]);
    await keyboard.typeOneByOne(button, option2Label.substring(0, 3));
    await waitFor(() => {
      return selectUtil.isOptionListOpen();
    });

    await waitFor(async () => {
      return isLocatorFocused(options[2]);
    });
    await waitForStablePosition(options[2]);

    const clip = await selectUtil.getBoundingBox();
    await scanAccessibility(page);
    await expect(page).toHaveScreenshot(createScreenshotFileName(testInfo, hasTouch, 'Option #2 is focused'), {
      clip,
      fullPage: true,
    });
    // wait over keyCache reset time to start new filtering
    await page.waitForTimeout(assumedCacheResetInMs * 1.5);

    const option0Label = await selectUtil.getOptionLabel(options[0]);
    await keyboard.typeOneByOne(button, option0Label.substring(0, 3));

    await waitFor(async () => {
      return isLocatorFocused(options[0]);
    });
    await waitForStablePosition(options[0]);

    const clip2 = await selectUtil.getBoundingBox();
    await scanAccessibility(page);
    await expect(page).toHaveScreenshot(createScreenshotFileName(testInfo, hasTouch, 'Option #0 is focused'), {
      clip: clip2,
      fullPage: true,
    });
  });
});
test.describe(`Typing when focused and there is an input`, () => {
  test('user input is copied to the input. Even if focus is in options.', async ({ page, hasTouch }, testInfo) => {
    await gotoStorybookUrlByName(page, storyWithMultiSelectAndGroupsWithFilter, componentName, storybook);
    const filterText = 'satisfying';
    const filterTextWithoutResults = 'none';
    const selectUtil = createSelectHelpers(page, selectId);
    const keyboard = createKeyboardHelpers(page);
    expect(await selectUtil.isOptionListOpen()).toBeFalsy();
    const button = selectUtil.getElementByName('button');
    await focusLocator(button);

    await keyboard.typeOneByOne(button, filterText);
    await waitFor(() => {
      return selectUtil.isOptionListOpen();
    });

    const input = selectUtil.getInput();
    await waitFor(async () => {
      return isLocatorFocused(input);
    });

    const inputText = await selectUtil.getInputText();
    expect(inputText).toBe(filterText);

    const clip = await selectUtil.getBoundingBox();
    await scanAccessibility(page);
    await expect(page).toHaveScreenshot(createScreenshotFileName(testInfo, hasTouch, 'Filter text is seen'), {
      clip,
      fullPage: true,
    });
    const options = await selectUtil.getOptionElements({ all: true });
    expect(options).toHaveLength(4);
    const optionsOnly = await selectUtil.getOptionElements({ all: false, includeMultiSelectGroupLabels: false });
    expect(optionsOnly).toHaveLength(2);

    await keyboard.down(); // moves focus to #0
    await waitFor(async () => {
      return isLocatorFocused(options[0]);
    });
    await keyboard.space();

    // group label was clicked, but group labels do not show in selected options
    await selectUtil.waitUntilSelectedOptionCountMatches(1);
    expect(await selectUtil.getSelectedGroupLabels()).toHaveLength(1);
    const clip2 = await selectUtil.getBoundingBox();
    await scanAccessibility(page);
    await expect(page).toHaveScreenshot(createScreenshotFileName(testInfo, hasTouch, 'Filtered option selected'), {
      clip: clip2,
      fullPage: true,
    });
    await keyboard.typeOneByOne(options[0], filterTextWithoutResults);
    await waitFor(async () => {
      const text = await selectUtil.getInputText();
      return Promise.resolve(text === filterTextWithoutResults);
    });
    expect(selectUtil.getSearchAndFilterInfo()).toBeVisible();
    const clip3 = await selectUtil.getBoundingBox();
    await scanAccessibility(page);
    await expect(page).toHaveScreenshot(createScreenshotFileName(testInfo, hasTouch, 'No results'), {
      clip: clip3,
      fullPage: true,
    });
    await selectUtil.waitUntilSelectedOptionCountMatches(1);
  });
});
test.describe(`Tags`, () => {
  test('Are rendered with multiselect. Only two rows are shown.', async ({ page, hasTouch }, testInfo) => {
    await gotoStorybookUrlByName(page, storyWithMultiSelectAndGroupsWithFilter, componentName, storybook);
    const selectUtil = createSelectHelpers(page, selectId);
    expect(await selectUtil.getTagsCount()).toBe(0);
    await selectUtil.selectOptionByIndex({ index: 1, multiSelect: true });
    expect(await selectUtil.getTagsCount()).toBe(1);
    await selectUtil.selectGroupByIndex({ index: 1 });
    await selectUtil.closeList();
    expect(await selectUtil.getTagsCount()).toBe(11);
    // getting with label, because getByText check value-prop with buttons.
    expect(page.getByLabel('Show all 11 options.').isVisible()).toBeTruthy();

    const screenshotName = createScreenshotFileName(testInfo, hasTouch, 'tags rendered');
    const clip = await selectUtil.getBoundingBox();
    await scanAccessibility(page);
    await expect(page).toHaveScreenshot(screenshotName, { clip, fullPage: true });

    // click show all and take screenshot.
    await selectUtil.showAllTags();
    expect(page.getByLabel('Show less options.').isVisible()).toBeTruthy();
    const screenshotName2 = createScreenshotFileName(testInfo, hasTouch, 'all tags shown');
    const clip2 = await selectUtil.getBoundingBox();
    await scanAccessibility(page);
    await expect(page).toHaveScreenshot(screenshotName2, { clip: clip2, fullPage: true });
  });
  test('When "show All" is clicked, focus is set to the first tag. When "show less" is clicked, focus stays and screen reader is notified.', async ({
    page,
  }) => {
    await gotoStorybookUrlByName(page, storyWithMultiSelectAndGroupsWithFilter, componentName, storybook);
    const selectUtil = createSelectHelpers(page, selectId);
    expect(await selectUtil.getTagsCount()).toBe(0);
    await selectUtil.selectGroupByIndex({ index: 0 });
    await selectUtil.selectGroupByIndex({ index: 1 });
    await selectUtil.closeList();

    await selectUtil.showAllTags();
    const tag0 = selectUtil.getTags().first();
    await expect(tag0).toBeFocused();
    await selectUtil.hideAllTags();
    await expect(selectUtil.getElementByName('showAllButton')).toBeFocused();

    const lastNotification = selectUtil.getScreenReaderNotifications().last();
    expect(lastNotification).toHaveText(selectUtil.getDefaultText('tagsPartiallyHidden') as string);
  });
  test('Selection can be deleted from tags. Focus is moved when tag is removed.', async ({
    page,
    hasTouch,
  }, testInfo) => {
    await gotoStorybookUrlByName(page, storyWithMultiSelectAndGroupsWithFilter, componentName, storybook);
    const selectUtil = createSelectHelpers(page, selectId);
    await selectUtil.selectOptionByIndex({ index: 1, multiSelect: true });
    await selectUtil.selectOptionByIndex({ index: 2, multiSelect: true });
    await selectUtil.selectOptionByIndex({ index: 3, multiSelect: true });
    await selectUtil.selectOptionByIndex({ index: 4, multiSelect: true });
    await selectUtil.closeList();
    expect(await selectUtil.getTagsCount()).toBe(4);
    // getting with label, because getByText check value-prop with buttons.
    expect(page.getByLabel('Show all 11 options.').isVisible()).toBeTruthy();

    // focus is moved to tag#0 when a tag is clicked
    const tag0 = await selectUtil.getTag(0);
    const tag1 = await selectUtil.getTag(1);
    await tag1.click();
    await selectUtil.waitUntilSelectedOptionCountMatches(3);
    expect(await selectUtil.getTagsCount()).toBe(3);
    await waitFor(() => {
      return isLocatorFocused(tag0);
    });

    const screenshotName = createScreenshotFileName(testInfo, hasTouch);
    const clip = await selectUtil.getBoundingBox();
    await scanAccessibility(page);
    await expect(page).toHaveScreenshot(screenshotName, { clip, fullPage: true });

    const newTag1 = await selectUtil.getTag(1);
    await newTag1.click();
    await selectUtil.waitUntilSelectedOptionCountMatches(2);
    await waitFor(() => {
      return isLocatorFocused(tag0);
    });

    const anotherTag1 = await selectUtil.getTag(1);
    await anotherTag1.click();
    await selectUtil.waitUntilSelectedOptionCountMatches(1);
    await waitFor(() => {
      return isLocatorFocused(tag0);
    });

    await tag0.click();
    await selectUtil.waitUntilSelectedOptionCountMatches(0);
    await waitFor(() => {
      return isLocatorFocused(selectUtil.getElementByName('button'));
    });

    const screenshotName2 = createScreenshotFileName(testInfo, hasTouch, 'Focus is in the button');
    const clip2 = await selectUtil.getBoundingBox();
    await scanAccessibility(page);
    await expect(page).toHaveScreenshot(screenshotName2, { clip: clip2, fullPage: true });
  });
});
test.describe(`Search`, () => {
  test('Is also triggerable via button and shows loading info and results', async ({ page, hasTouch }, testInfo) => {
    await gotoStorybookUrlByName(page, storyWithMultiSelectAndGroupsWithSearch, componentName, storybook);
    const selectUtil = createSelectHelpers(page, selectId);
    const keyboard = createKeyboardHelpers(page);
    await keyboard.typeOneByOne(selectUtil.getElementByName('button'), 'banana');
    listenToConsole(page);
    const input = selectUtil.getInput();
    await waitFor(async () => {
      return isLocatorFocused(input);
    });

    const inputText = await selectUtil.getInputText();
    expect(inputText).toBe('banana');

    await waitFor(async () => {
      return selectUtil.isSearchingSpinnerVisible();
    });

    const spinnerScreenShotName = createScreenshotFileName(testInfo, hasTouch, 'search spinner visible');
    const clip2 = await selectUtil.getBoundingBox();
    await scanAccessibility(page);
    await expect(page).toHaveScreenshot(spinnerScreenShotName, { clip: clip2, fullPage: true });

    await waitFor(async () => {
      return selectUtil.hasSearchResults();
    });

    const options = await selectUtil.getOptionElements();
    // the final count is 7 different bananas + 2 group labels
    expect(options).toHaveLength(9);
  });
  test('No results info is shown', async ({ page, hasTouch }, testInfo) => {
    await gotoStorybookUrlByName(page, storyWithMultiSelectAndGroupsWithSearch, componentName, storybook);
    const selectUtil = createSelectHelpers(page, selectId);
    const keyboard = createKeyboardHelpers(page);
    await selectUtil.getElementByName('button').click();
    await selectUtil.getInput().isVisible();
    await keyboard.setInputValue(selectUtil.getElementByName('searchOrFilterInput'), 'none');
    await waitFor(async () => {
      return selectUtil.isSearchingSpinnerVisible();
    });
    await waitFor(async () => {
      return selectUtil.isNoSearchResultsVisible();
    });

    const noResultsScreenShotName = createScreenshotFileName(testInfo, hasTouch, 'no results');
    const clip3 = await selectUtil.getBoundingBox();
    await scanAccessibility(page);
    await expect(page).toHaveScreenshot(noResultsScreenShotName, { clip: clip3, fullPage: true });
  });
  test('Error is shown', async ({ page, hasTouch }, testInfo) => {
    await gotoStorybookUrlByName(page, storyWithMultiSelectAndGroupsWithSearch, componentName, storybook);
    const selectUtil = createSelectHelpers(page, selectId);
    const keyboard = createKeyboardHelpers(page);
    await selectUtil.getElementByName('button').click();
    await selectUtil.getInput().isVisible();
    await keyboard.setInputValue(selectUtil.getElementByName('searchOrFilterInput'), 'error');
    await waitFor(async () => {
      return selectUtil.isSearchingSpinnerVisible();
    });
    await waitFor(async () => {
      return selectUtil.isSearchingErrorVisible();
    });

    const noResultsScreenShotName = createScreenshotFileName(testInfo, hasTouch, 'error');
    const clip3 = await selectUtil.getBoundingBox();
    await scanAccessibility(page);
    await expect(page).toHaveScreenshot(noResultsScreenShotName, { clip: clip3, fullPage: true });
  });
  test('Search results are selectable', async ({ page, hasTouch }, testInfo) => {
    await gotoStorybookUrlByName(page, storyWithMultiSelectAndGroupsWithSearch, componentName, storybook);
    const selectUtil = createSelectHelpers(page, selectId);
    const keyboard = createKeyboardHelpers(page);
    // typing when button is focused, copies user input to the input
    await keyboard.typeOneByOne(selectUtil.getElementByName('button'), 'banana');
    const inputText = await selectUtil.getInputText();
    expect(inputText).toBe('banana');

    await waitFor(async () => {
      return selectUtil.isSearchingSpinnerVisible();
    });

    await waitFor(async () => {
      return selectUtil.hasSearchResults();
    });

    const options = await selectUtil.getOptionElements();
    // the final count is 7 different bananas + 2 group labels
    expect(options).toHaveLength(9);

    // select last option, which is always the same
    await selectUtil.selectOptionByIndex({ index: 8, multiSelect: true });

    await keyboard.type('pineapple');
    // for some reason this middle check is needed of PW clicks outside input and list is closed

    await waitFor(async () => {
      return selectUtil.hasSearchResults();
    });

    const optionsNow = await selectUtil.getOptionElements();
    expect(optionsNow).toHaveLength(15);

    // last option in search results is always same and should still be selected
    expect(isLocatorSelectedOrChecked(optionsNow[14])).toBeTruthy();
  });
});
test.describe(`Element state snapshots`, () => {
  test('Dropdown button and its children', async ({ page, hasTouch }, testInfo) => {
    await gotoStorybookUrlByName(page, storyWithMultiSelectAndGroupsWithFilter, componentName, storybook);
    const selectUtil = createSelectHelpers(page, selectId);
    const button = selectUtil.getElementByName('button');

    await takeStateScreenshots(page, button, createScreenshotFileName(testInfo, hasTouch, 'dropdownbutton'));
  });
  test('Multiselect items', async ({ page, hasTouch }, testInfo) => {
    await gotoStorybookUrlByName(page, storyWithMultiSelectAndGroupsWithFilter, componentName, storybook);
    const selectUtil = createSelectHelpers(page, selectId);
    await selectUtil.openList();
    // takeStateScreenshots has noOutsideClicks=true,
    // so must manually move focus outside
    const input = selectUtil.getElementByName('searchOrFilterInput');
    await input.focus();
    const groupLabel = await selectUtil.getGroupLabel(0);
    await takeStateScreenshots(
      page,
      groupLabel,
      createScreenshotFileName(testInfo, hasTouch, 'multiselect-unselected-groupLabel'),
      true,
    );

    await selectUtil.selectGroupByIndex({ index: 0 });
    await input.focus();
    await takeStateScreenshots(
      page,
      groupLabel,
      createScreenshotFileName(testInfo, hasTouch, 'multiselect-selected-groupLabel'),
      true,
    );

    const option = await selectUtil.getOptionByIndex({ index: 3 });
    await input.focus();
    await takeStateScreenshots(
      page,
      option,
      createScreenshotFileName(testInfo, hasTouch, 'multiselect-unselected-option'),
      true,
    );
    await selectUtil.selectOptionByIndex({ index: 3, multiSelect: true });
    await input.focus();
    await takeStateScreenshots(
      page,
      option,
      createScreenshotFileName(testInfo, hasTouch, 'multiselect-selected-option'),
      true,
    );
  });
  test('Singleselect items', async ({ page, hasTouch }, testInfo) => {
    await gotoStorybookUrlByName(page, storyWithSingleSelectAndGroups, componentName, storybook);
    const selectUtil = createSelectHelpers(page, selectId);
    await selectUtil.openList();

    const groupLabel = await selectUtil.getGroupLabel(0);
    await takeStateScreenshots(
      page,
      groupLabel,
      createScreenshotFileName(testInfo, hasTouch, 'singleselect-unselected-groupLabel'),
      true,
    );

    const option = await selectUtil.getOptionByIndex({ index: 3 });
    await takeStateScreenshots(
      page,
      option,
      createScreenshotFileName(testInfo, hasTouch, 'singleselect-unselected-option'),
      true,
    );

    await selectUtil.selectOptionByIndex({ index: 3, multiSelect: false });
    // selecting with single select closes the list
    await selectUtil.openList();
    await takeStateScreenshots(
      page,
      option,
      createScreenshotFileName(testInfo, hasTouch, 'singleselect-selected-option'),
      true,
    );
  });
  test('Tag buttons', async ({ page, hasTouch }, testInfo) => {
    await gotoStorybookUrlByName(page, storyWithMultiSelectAndGroupsWithFilter, componentName, storybook);
    const selectUtil = createSelectHelpers(page, selectId);
    await selectUtil.openList();
    await selectUtil.selectGroupByIndex({ index: 0 });
    await selectUtil.closeList();
    const showAllButton = selectUtil.getElementByName('showAllButton');
    await takeStateScreenshots(
      page,
      showAllButton,
      createScreenshotFileName(testInfo, hasTouch, 'taglist-showAllButton'),
      true,
    );
    const clearAllButton = selectUtil.getElementByName('clearAllButton');
    await takeStateScreenshots(
      page,
      clearAllButton,
      createScreenshotFileName(testInfo, hasTouch, 'taglist-clearAllButton'),
      true,
    );
  });
  test('Custom dropdown items', async ({ page, hasTouch }, testInfo) => {
    await gotoStorybookUrlByName(page, storyWithCustomTheme, componentName, storybook);
    const selectUtil = createSelectHelpers(page, selectId);
    await selectUtil.openList();
    const menuOpenFilename = createScreenshotFileName(testInfo, hasTouch, 'menu open');
    const clip = await selectUtil.getBoundingBox();
    await scanAccessibility(page);
    await expect(page).toHaveScreenshot(menuOpenFilename, { clip, fullPage: true });
    // takeStateScreenshots has noOutsideClicks=true,
    // so must manually move focus outside
    const input = selectUtil.getElementByName('searchOrFilterInput');
    await input.focus();
    const groupLabel = await selectUtil.getGroupLabel(0);

    await takeStateScreenshots(
      page,
      groupLabel,
      createScreenshotFileName(testInfo, hasTouch, 'multiselect-selected-groupLabel'),
      true,
    );

    // the group label is initially in "mixed" state. Double click to unselect.
    await selectUtil.selectGroupByIndex({ index: 0, ignoreIfSelected: true });
    await selectUtil.selectGroupByIndex({ index: 0, ignoreIfSelected: true });
    await input.focus();
    await takeStateScreenshots(
      page,
      groupLabel,
      createScreenshotFileName(testInfo, hasTouch, 'multiselect-unselected-groupLabel'),
      true,
    );

    const option = await selectUtil.getOptionByIndex({ index: 1 });
    await input.focus();
    await takeStateScreenshots(
      page,
      option,
      createScreenshotFileName(testInfo, hasTouch, 'multiselect-unselected-option'),
      true,
    );

    await selectUtil.selectOptionByIndex({ index: 1, multiSelect: true });
    await input.focus();
    await takeStateScreenshots(
      page,
      option,
      createScreenshotFileName(testInfo, hasTouch, 'multiselect-selected-option'),
      true,
    );

    const disabledoption = await selectUtil.getOptionByIndex({ index: 2 });
    await input.focus();
    await takeStateScreenshots(
      page,
      disabledoption,
      createScreenshotFileName(testInfo, hasTouch, 'multiselect-disabled-option'),
      true,
    );

    const disabledGroupLabel = await selectUtil.getGroupLabel(2);
    await selectUtil.scrollOptionInToView(disabledGroupLabel);
    await waitForStablePosition(disabledGroupLabel);
    await takeStateScreenshots(
      page,
      disabledGroupLabel,
      createScreenshotFileName(testInfo, hasTouch, 'multiselect-disabled-group-label'),
      true,
    );
  });
});
test.describe(`Error and assistive text snapshots`, () => {
  test('Assistive text is rendered', async ({ page, hasTouch }, testInfo) => {
    await gotoStorybookUrlByName(page, storyWithValidation, componentName, storybook);
    const selectUtil = createSelectHelpers(page, selectId);
    await selectUtil.selectOptionByIndex({ index: 2, multiSelect: false });
    const screenShotName = createScreenshotFileName(testInfo, hasTouch);
    const clip = await selectUtil.getBoundingBox();
    await scanAccessibility(page);
    await expect(page).toHaveScreenshot(screenShotName, { clip, fullPage: true });
  });
  test('Error text is rendered', async ({ page, hasTouch }, testInfo) => {
    await gotoStorybookUrlByName(page, storyWithValidation, componentName, storybook);
    const selectUtil = createSelectHelpers(page, selectId);
    await selectUtil.selectOptionByIndex({ index: 5, multiSelect: false });
    const screenShotName = createScreenshotFileName(testInfo, hasTouch);
    const clip = await selectUtil.getBoundingBox();
    await scanAccessibility(page);
    await expect(page).toHaveScreenshot(screenShotName, { clip, fullPage: true });
  });
});

test.describe(`Changing language changes all related props`, () => {
  test('Texts change also in selections', async ({ page, hasTouch }, testInfo) => {
    const buttonTexts = ['Finnish', 'English', 'Swedish'];
    await gotoStorybookUrlByName(page, storyWithControls, componentName, storybook);
    const selectUtil = createSelectHelpers(page, selectId);
    await selectUtil.selectGroupByIndex({ index: 0 });
    await selectUtil.closeList();

    const screenShotName = createScreenshotFileName(testInfo, hasTouch, 'Finnish texts');
    const clip = await selectUtil.getBoundingBox();
    await scanAccessibility(page);
    await expect(page).toHaveScreenshot(screenShotName, { clip, fullPage: true });

    const changeToEnglishButton = page.getByText('English');
    await changeToEnglishButton.click();
    expect(page.getByText('Label (en)')).toBeVisible();
    await selectUtil.getElementByName('button').scrollIntoViewIfNeeded();

    const screenShotNameEn = createScreenshotFileName(testInfo, hasTouch, 'English texts');
    const clipEn = await selectUtil.getBoundingBox();
    await scanAccessibility(page);
    await expect(page).toHaveScreenshot(screenShotNameEn, { clip: clipEn, fullPage: true });

    const changeToSwedishhButton = page.getByText('Swedish');
    await changeToSwedishhButton.click();
    expect(page.getByText('Label (sv)')).toBeVisible();
    await selectUtil.getElementByName('button').scrollIntoViewIfNeeded();

    const screenShotNameSv = createScreenshotFileName(testInfo, hasTouch, 'Swedish texts');
    const clipSv = await selectUtil.getBoundingBox();
    await scanAccessibility(page);
    await expect(page).toHaveScreenshot(screenShotNameSv, { clip: clipSv, fullPage: true });
  });
});

test.describe(`Focus works with given reference`, () => {
  test('Button is focused by calling the Button executing focus()', async ({ page, hasTouch }, testInfo) => {
    await gotoStorybookUrlByName(page, storyWithControls, componentName, storybook);
    const selectUtil = createSelectHelpers(page, selectId);

    // get button with text "Focus"
    const focusButton = page.getByText('Focus');
    await focusButton.click();

    const screenShotName = createScreenshotFileName(testInfo, hasTouch, 'Reference focus');
    const clip = await selectUtil.getBoundingBox();
    await scanAccessibility(page);
    await expect(page).toHaveScreenshot(screenShotName, { clip, fullPage: true });
  });
});

test.describe(`Multiselect onChange and onBlur selections`, () => {
  test('onChange selections take effect immediately, onClose when closed', async ({ page, hasTouch }, testInfo) => {
    if (hasTouch) {
      return;
    }

    await gotoStorybookUrlByName(page, storyWithMultiSelectEvents, componentName, storybook);
    const selectUtil = createSelectHelpers(page, selectId);
    await selectUtil.openList();
    await selectUtil.selectOptionByIndex({ index: 1, multiSelect: true });

    // check that text content of #onchange has content and #onclose is empty
    const onChange = page.locator('#onchange');
    const onClose = page.locator('#onclose');
    await expect(onChange).not.toHaveValue('');
    await expect(onClose).toHaveValue('');
    // check that after closing, the contents are equal (multiselect has changed the onclose value)
    await selectUtil.closeList();
    await expect(onClose).toHaveValue(await onChange.inputValue());
  });
});

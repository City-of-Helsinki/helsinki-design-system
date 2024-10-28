import { test, expect, Page } from '@playwright/test';
import {
  getComponentStorybookUrls,
  waitFor,
  createScreenshotFileName,
  listenToConsole,
  takeStateScreenshots,
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

const selectId = 'hds-select-component';

const gotoStorybookUrlByName = async (page: Page, name: string) => {
  const filteredUrls = await getComponentStorybookUrls(page, componentName, storybook, [name]);
  const targetUrl = filteredUrls[0];
  await page.goto(`file://${targetUrl}`);
  return targetUrl;
};

test.describe(`Testing ${storybook} component "${componentName}"`, () => {
  test('Take snapshots of all Selects stories', async ({ page, isMobile }) => {
    // many select stories have extra buttons etc. so skipping them with clip
    const componentUrls = await getComponentStorybookUrls(page, componentName, storybook);
    if (componentUrls.length === 0) {
      throw new Error('No componentUrls found for');
    }
    for (const componentUrl of componentUrls) {
      await page.goto(`file://${componentUrl}`);
      const selectUtil = createSelectHelpers(page, selectId);
      const clip = await selectUtil.getBoundingBox();
      const screenshotName = `${storybook}-${componentUrl.split('/').pop()}-${isMobile ? 'mobile' : 'desktop'}`;
      await expect(page).toHaveScreenshot(`${screenshotName}.png`, { clip, fullPage: true });
    }
  });
});

test.describe(`Selecting options and groups`, () => {
  test('Multiselect select an option and one group', async ({ page, isMobile }, testInfo) => {
    await gotoStorybookUrlByName(page, storyWithMultiSelectAndGroupsWithoutInput);

    const selectUtil = createSelectHelpers(page, selectId);
    const isOpen = await selectUtil.isOptionListOpen();
    expect(isOpen).toBeFalsy();

    await selectUtil.selectOptionByIndex({ index: 1, multiSelect: true });
    await selectUtil.selectGroupByIndex({ index: 1 });

    const screenshotName = createScreenshotFileName(testInfo, isMobile);
    const clip = await selectUtil.getBoundingBox();
    await expect(page).toHaveScreenshot(screenshotName, { clip, fullPage: true });
  });
  test('Singleselect options one by one', async ({ page, isMobile }, testInfo) => {
    await gotoStorybookUrlByName(page, storyWithPlainSingleSelect);
    const selectUtil = createSelectHelpers(page, selectId);

    await selectUtil.selectOptionByIndex({ index: 0, multiSelect: false });
    await selectUtil.selectOptionByIndex({ index: 5, multiSelect: false });
    await selectUtil.selectOptionByIndex({ index: 10, multiSelect: false });
    await selectUtil.selectOptionByIndex({ index: 19, multiSelect: false });

    const screenshotName = createScreenshotFileName(testInfo, isMobile);
    const clip = await selectUtil.getBoundingBox();
    await expect(page).toHaveScreenshot(screenshotName, { clip, fullPage: true });
  });
});

test.describe(`Keyboard navigation`, () => {
  test('Spacebar opens menu, arrow keys move focus, esc closes, home and end move to start and end', async ({
    page,
    isMobile,
  }, testInfo) => {
    await gotoStorybookUrlByName(page, storyWithMultiSelectAndGroupsWithoutInput);
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
    const screenshotName = createScreenshotFileName(testInfo, isMobile);

    const clip = await selectUtil.getBoundingBox();
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
});
test.describe(`Typing when focused and there is no input`, () => {
  test('user input focuses options with filtering.', async ({ page, isMobile }, testInfo) => {
    // this test assumes that top three options do NOT start with same 3 letters
    // keyCache in the components resets in 300ms
    const assumedCacheResetInMs = 300;
    await gotoStorybookUrlByName(page, storyWithMultiSelectAndGroupsWithoutInput);
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
    await expect(page).toHaveScreenshot(createScreenshotFileName(testInfo, isMobile, 'Option #2 is focused'), {
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
    await expect(page).toHaveScreenshot(createScreenshotFileName(testInfo, isMobile, 'Option #0 is focused'), {
      clip: clip2,
      fullPage: true,
    });
  });
});
test.describe(`Typing when focused and there is an input`, () => {
  test('user input is copied to the input. Even if focus is in options.', async ({ page, isMobile }, testInfo) => {
    await gotoStorybookUrlByName(page, storyWithMultiSelectAndGroupsWithFilter);
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
    await expect(page).toHaveScreenshot(createScreenshotFileName(testInfo, isMobile, 'Filter text is seen'), {
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
    await expect(page).toHaveScreenshot(createScreenshotFileName(testInfo, isMobile, 'Filtered option selected'), {
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
    await expect(page).toHaveScreenshot(createScreenshotFileName(testInfo, isMobile, 'No results'), {
      clip: clip3,
      fullPage: true,
    });
    await selectUtil.waitUntilSelectedOptionCountMatches(1);
  });
});
test.describe(`Tags`, () => {
  test('Are rendered with multiselect. Only two rows are shown.', async ({ page, isMobile }, testInfo) => {
    await gotoStorybookUrlByName(page, storyWithMultiSelectAndGroupsWithFilter);
    const selectUtil = createSelectHelpers(page, selectId);
    expect(await selectUtil.getTagsCount()).toBe(0);
    await selectUtil.selectOptionByIndex({ index: 1, multiSelect: true });
    expect(await selectUtil.getTagsCount()).toBe(1);
    await selectUtil.selectGroupByIndex({ index: 1 });
    await selectUtil.closeList();
    expect(await selectUtil.getTagsCount()).toBe(11);
    // getting with label, because getByText check value-prop with buttons.
    expect(page.getByLabel('Show all 11 options.').isVisible()).toBeTruthy();

    const screenshotName = createScreenshotFileName(testInfo, isMobile, 'tags rendered');
    const clip = await selectUtil.getBoundingBox();
    await expect(page).toHaveScreenshot(screenshotName, { clip, fullPage: true });

    // click show all and take screenshot.
    await selectUtil.showAllTags();
    expect(page.getByLabel('Show less options.').isVisible()).toBeTruthy();
    const screenshotName2 = createScreenshotFileName(testInfo, isMobile, 'all tags shown');
    const clip2 = await selectUtil.getBoundingBox();
    await expect(page).toHaveScreenshot(screenshotName2, { clip: clip2, fullPage: true });
  });
  test('When "show All" is clicked, focus is set to the first tag. When "show less" is clicked, focus stays and screen reader is notified.', async ({
    page,
  }) => {
    await gotoStorybookUrlByName(page, storyWithMultiSelectAndGroupsWithFilter);
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
    isMobile,
  }, testInfo) => {
    await gotoStorybookUrlByName(page, storyWithMultiSelectAndGroupsWithFilter);
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

    const screenshotName = createScreenshotFileName(testInfo, isMobile);
    const clip = await selectUtil.getBoundingBox();
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

    const screenshotName2 = createScreenshotFileName(testInfo, isMobile, 'Focus is in the button');
    const clip2 = await selectUtil.getBoundingBox();
    await expect(page).toHaveScreenshot(screenshotName2, { clip: clip2, fullPage: true });
  });
});
test.describe(`Search`, () => {
  test('Is also triggerable via button and shows loading info and results', async ({ page, isMobile }, testInfo) => {
    await gotoStorybookUrlByName(page, storyWithMultiSelectAndGroupsWithSearch);
    const selectUtil = createSelectHelpers(page, selectId);
    const keyboard = createKeyboardHelpers(page);
    await keyboard.typeOneByOne(selectUtil.getElementByName('button'), 'Test search');
    listenToConsole(page);
    const input = selectUtil.getInput();
    await waitFor(async () => {
      return isLocatorFocused(input);
    });

    const inputText = await selectUtil.getInputText();
    expect(inputText).toBe('Test search');

    await waitFor(async () => {
      return selectUtil.isSearchingSpinnerVisible();
    });

    const spinnerScreenShotName = createScreenshotFileName(testInfo, isMobile, 'search spinner visible');
    const clip2 = await selectUtil.getBoundingBox();
    await expect(page).toHaveScreenshot(spinnerScreenShotName, { clip: clip2, fullPage: true });

    await waitFor(async () => {
      return selectUtil.hasSearchResults();
    });

    const options = await selectUtil.getOptionElements();
    // the final count is 20 random options + 2 group labels + 2 common results.
    expect(options).toHaveLength(24);
  });
  test('No results info is shown', async ({ page, isMobile }, testInfo) => {
    await gotoStorybookUrlByName(page, storyWithMultiSelectAndGroupsWithSearch);
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

    const noResultsScreenShotName = createScreenshotFileName(testInfo, isMobile, 'no results');
    const clip3 = await selectUtil.getBoundingBox();
    await expect(page).toHaveScreenshot(noResultsScreenShotName, { clip: clip3, fullPage: true });
  });
  test('Error is shown', async ({ page, isMobile }, testInfo) => {
    await gotoStorybookUrlByName(page, storyWithMultiSelectAndGroupsWithSearch);
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

    const noResultsScreenShotName = createScreenshotFileName(testInfo, isMobile, 'error');
    const clip3 = await selectUtil.getBoundingBox();
    await expect(page).toHaveScreenshot(noResultsScreenShotName, { clip: clip3, fullPage: true });
  });
  test('Search results are selectable', async ({ page, isMobile }, testInfo) => {
    await gotoStorybookUrlByName(page, storyWithMultiSelectAndGroupsWithSearch);
    const selectUtil = createSelectHelpers(page, selectId);
    const keyboard = createKeyboardHelpers(page);
    // typing when button is focused, copies user input to the input
    await keyboard.typeOneByOne(selectUtil.getElementByName('button'), 'Test search');
    const inputText = await selectUtil.getInputText();
    expect(inputText).toBe('Test search');

    await waitFor(async () => {
      return selectUtil.isSearchingSpinnerVisible();
    });

    await waitFor(async () => {
      return selectUtil.hasSearchResults();
    });

    const options = await selectUtil.getOptionElements();
    // the final count is 20 random options + 2 group labels + 2 common results.
    expect(options).toHaveLength(24);

    // select last option, which is always the same
    await selectUtil.selectOptionByIndex({ index: 23, multiSelect: true });

    await keyboard.type('another test');
    // for some reason this middle check is needed of PW clicks outside input and list is closed

    await waitFor(async () => {
      return selectUtil.hasSearchResults();
    });

    const optionsNow = await selectUtil.getOptionElements();
    expect(optionsNow).toHaveLength(24);

    // last option in search results is always same and should still be selected
    expect(isLocatorSelectedOrChecked(optionsNow[23])).toBeTruthy();
  });
});
test.describe(`Element state snapshots`, () => {
  test('Dropdown button and its children', async ({ page, isMobile }, testInfo) => {
    await gotoStorybookUrlByName(page, storyWithMultiSelectAndGroupsWithFilter);
    const selectUtil = createSelectHelpers(page, selectId);
    const button = selectUtil.getElementByName('button');

    await takeStateScreenshots(page, button, createScreenshotFileName(testInfo, isMobile, 'dropdownbutton'));
  });
  test('Multiselect items', async ({ page, isMobile }, testInfo) => {
    await gotoStorybookUrlByName(page, storyWithMultiSelectAndGroupsWithFilter);
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
      createScreenshotFileName(testInfo, isMobile, 'multiselect-unselected-groupLabel'),
      true,
    );

    await selectUtil.selectGroupByIndex({ index: 0 });
    await input.focus();
    await takeStateScreenshots(
      page,
      groupLabel,
      createScreenshotFileName(testInfo, isMobile, 'multiselect-selected-groupLabel'),
      true,
    );

    const option = await selectUtil.getOptionByIndex({ index: 3 });
    await input.focus();
    await takeStateScreenshots(
      page,
      option,
      createScreenshotFileName(testInfo, isMobile, 'multiselect-unselected-option'),
      true,
    );
    await selectUtil.selectOptionByIndex({ index: 3, multiSelect: true });
    await input.focus();
    await takeStateScreenshots(
      page,
      option,
      createScreenshotFileName(testInfo, isMobile, 'multiselect-selected-option'),
      true,
    );
  });
  test('Singleselect items', async ({ page, isMobile }, testInfo) => {
    await gotoStorybookUrlByName(page, storyWithSingleSelectAndGroups);
    const selectUtil = createSelectHelpers(page, selectId);
    await selectUtil.openList();

    const groupLabel = await selectUtil.getGroupLabel(0);
    await takeStateScreenshots(
      page,
      groupLabel,
      createScreenshotFileName(testInfo, isMobile, 'singleselect-unselected-groupLabel'),
      true,
    );

    const option = await selectUtil.getOptionByIndex({ index: 3 });
    await takeStateScreenshots(
      page,
      option,
      createScreenshotFileName(testInfo, isMobile, 'singleselect-unselected-option'),
      true,
    );

    await selectUtil.selectOptionByIndex({ index: 3, multiSelect: false });
    // selecting with single select closes the list
    await selectUtil.openList();
    await takeStateScreenshots(
      page,
      option,
      createScreenshotFileName(testInfo, isMobile, 'singleselect-selected-option'),
      true,
    );
  });
  test('Tag buttons', async ({ page, isMobile }, testInfo) => {
    await gotoStorybookUrlByName(page, storyWithMultiSelectAndGroupsWithFilter);
    const selectUtil = createSelectHelpers(page, selectId);
    await selectUtil.openList();
    await selectUtil.selectGroupByIndex({ index: 0 });
    await selectUtil.closeList();
    const showAllButton = selectUtil.getElementByName('showAllButton');
    await takeStateScreenshots(
      page,
      showAllButton,
      createScreenshotFileName(testInfo, isMobile, 'taglist-showAllButton'),
      true,
    );
    const clearAllButton = selectUtil.getElementByName('clearAllButton');
    await takeStateScreenshots(
      page,
      clearAllButton,
      createScreenshotFileName(testInfo, isMobile, 'taglist-clearAllButton'),
      true,
    );
  });
});
test.describe(`Error and assistive text snapshots`, () => {
  test('Assistive text is rendered', async ({ page, isMobile }, testInfo) => {
    await gotoStorybookUrlByName(page, storyWithValidation);
    const selectUtil = createSelectHelpers(page, selectId);
    await selectUtil.selectOptionByIndex({ index: 2, multiSelect: false });
    const screenShotName = createScreenshotFileName(testInfo, isMobile);
    const clip = await selectUtil.getBoundingBox();
    await expect(page).toHaveScreenshot(screenShotName, { clip, fullPage: true });
  });
  test('Error text is rendered', async ({ page, isMobile }, testInfo) => {
    await gotoStorybookUrlByName(page, storyWithValidation);
    const selectUtil = createSelectHelpers(page, selectId);
    await selectUtil.selectOptionByIndex({ index: 5, multiSelect: false });
    const screenShotName = createScreenshotFileName(testInfo, isMobile);
    const clip = await selectUtil.getBoundingBox();
    await expect(page).toHaveScreenshot(screenShotName, { clip, fullPage: true });
  });
});

test.describe(`Changing language changes all related props`, () => {
  test('Texts change also in selections', async ({ page, isMobile }, testInfo) => {
    const buttonTexts = ['Finnish', 'English', 'Swedish'];
    await gotoStorybookUrlByName(page, storyWithControls);
    const selectUtil = createSelectHelpers(page, selectId);
    await selectUtil.selectGroupByIndex({ index: 0 });
    await selectUtil.closeList();

    const screenShotName = createScreenshotFileName(testInfo, isMobile, 'Finnish texts');
    const clip = await selectUtil.getBoundingBox();
    await expect(page).toHaveScreenshot(screenShotName, { clip, fullPage: true });

    const changeToEnglishButton = page.getByText('English');
    await changeToEnglishButton.click();
    expect(page.getByText('Label (en)')).toBeVisible();
    await selectUtil.getElementByName('button').scrollIntoViewIfNeeded();

    const screenShotNameEn = createScreenshotFileName(testInfo, isMobile, 'English texts');
    const clipEn = await selectUtil.getBoundingBox();
    await expect(page).toHaveScreenshot(screenShotNameEn, { clip: clipEn, fullPage: true });

    const changeToSwedishhButton = page.getByText('Swedish');
    await changeToSwedishhButton.click();
    expect(page.getByText('Label (sv)')).toBeVisible();
    await selectUtil.getElementByName('button').scrollIntoViewIfNeeded();

    const screenShotNameSv = createScreenshotFileName(testInfo, isMobile, 'Swedish texts');
    const clipSv = await selectUtil.getBoundingBox();
    await expect(page).toHaveScreenshot(screenShotNameSv, { clip: clipSv, fullPage: true });
  });
});

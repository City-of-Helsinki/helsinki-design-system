import { test, expect, Page } from '@playwright/test';
import { getComponentStorybookUrls, waitFor, createScreenshotFileName } from '../../../utils/playwright.util';
import { createSelectHelpers } from '../../../utils/select.component.util';
import { focusLocator, isLocatorFocused, waitForStablePosition } from '../../../utils/element.util';
import { createKeyboardHelpers } from '../../../utils/keyboard.util';

const componentName = 'select';
const storybook = 'react';

const storyWithPlainSingleSelect = 'Singleselect';
const storyWithSingleSelectAndGroups = 'Singleselect With Groups';
const storyWithSingleSelectWithValidation = 'With Validation';
const storyWithPlainMultiSelect = 'Multiselect';
const storyWithMultiSelectAndGroupsWithoutInput = 'Multiselect With Groups';
const storyWithMultiSelectAndGroupsWithFilter = 'Multiselect With Groups And Filter';
const storyWithMultiSelectAndGroupsWithSearch = 'Multiselect With Groups And Search';

const selectId = 'hds-select-component';

const gotoStorybookUrlByName = async (page: Page, name: string) => {
  const filteredUrls = await getComponentStorybookUrls(page, componentName, storybook, [name]);
  const targetUrl = filteredUrls[0];
  await page.goto(`file://${targetUrl}`);
  return targetUrl;
};

test.describe(`Testing ${storybook} component "${componentName}"`, () => {
  test('Take snapshots of all stories', async ({ page, isMobile }) => {
    //await takeAllStorySnapshots({ page, isMobile, takeStateSnapshots, storybook, componentName });
  });
});

test.describe(`Selecting options and groups`, () => {
  test('Multiselect select an option and one group', async ({ page, isMobile }, testInfo) => {
    if (!isMobile) {
      await gotoStorybookUrlByName(page, storyWithMultiSelectAndGroupsWithoutInput);

      const selectUtil = createSelectHelpers(page, selectId);
      const isOpen = await selectUtil.isOptionListOpen();
      expect(isOpen).toBeFalsy();

      await selectUtil.selectOptionByIndex({ index: 1, multiSelect: true });
      await selectUtil.selectGroupByIndex({ index: 1 });

      const screenshotName = createScreenshotFileName(testInfo, isMobile);
      const clip = await selectUtil.getBoundingBox();
      await expect(page).toHaveScreenshot(screenshotName, { clip, fullPage: true });
    }
  });
  test('Singleselect options one by one', async ({ page, isMobile }, testInfo) => {
    if (!isMobile) {
      await gotoStorybookUrlByName(page, storyWithPlainSingleSelect);
      const selectUtil = createSelectHelpers(page, selectId);

      await selectUtil.selectOptionByIndex({ index: 0, multiSelect: false });
      await selectUtil.selectOptionByIndex({ index: 5, multiSelect: false });
      await selectUtil.selectOptionByIndex({ index: 10, multiSelect: false });
      await selectUtil.selectOptionByIndex({ index: 19, multiSelect: false });

      const screenshotName = createScreenshotFileName(testInfo, isMobile);
      const clip = await selectUtil.getBoundingBox();
      await expect(page).toHaveScreenshot(screenshotName, { clip, fullPage: true });
    }
  });
});

test.describe(`Keyboard navigation`, () => {
  test('Spacebar opens menu, arrow keys move focus, esc closes, home and end move to start and end', async ({
    page,
    isMobile,
  }, testInfo) => {
    if (!isMobile) {
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
    }
  });
});
test.describe(`Typing when focused and there is no input`, () => {
  test('user input focuses options with filtering.', async ({ page, isMobile }, testInfo) => {
    // this test assumes that top three options do NOT start with same 3 letters
    // keyCache in the components resets in 300ms
    const assumedCacheResetInMs = 300;
    if (!isMobile) {
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
    }
  });
});
test.describe(`Typing when focused and there is an input`, () => {
  test('input is copied to the input. Even if focus is in options.', async ({ page, isMobile }, testInfo) => {
    if (!isMobile) {
      await gotoStorybookUrlByName(page, storyWithMultiSelectAndGroupsWithFilter);
      const filterText = 'lettuce';
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
    }
  });
});

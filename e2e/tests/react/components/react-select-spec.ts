import { test, expect, Page } from '@playwright/test';
import {
  takeAllStorySnapshots,
  getComponentStorybookUrls,
  takeScreenshotWithSpacing,
  waitFor,
  createScreenshotFileName,
} from '../../../helpers';
import { createSelectHelpers } from '../../component-helpers';
import {
  focusLocator,
  getFocusedElement,
  getScrollTop,
  isLocatorFocused,
  waitForStablePosition,
} from '../../element-helpers';
import { createKeyboardHelpers } from '../../keyboard-helpers';

const componentName = 'select';
const storybook = 'react';
const takeStateSnapshots = true;

test.describe(`Testing ${storybook} component "${componentName}"`, () => {
  test('Take snapshots of all stories', async ({ page, isMobile }) => {
    //await takeAllStorySnapshots({ page, isMobile, takeStateSnapshots, storybook, componentName });
  });
});

test.describe(`Testing selecting options and groups in Select"`, () => {
  const gotoStorybookUrlByName = async (page: Page, name: string) => {
    const filteredUrls = await getComponentStorybookUrls(page, componentName, storybook, [name]);
    const targetUrl = filteredUrls[0];
    await page.goto(`file://${targetUrl}`);
    return targetUrl;
  };

  test('Select an option and one group', async ({ page, isMobile }, testInfo) => {
    if (!isMobile) {
      await gotoStorybookUrlByName(page, 'Multiselect With Groups');
      const selectId = 'hds-select-component';

      const selectComponent = createSelectHelpers(page, selectId);
      const isOpen = await selectComponent.isOptionListOpen();
      expect(isOpen).toBeFalsy();

      await selectComponent.selectOptionByIndex({ index: 1 });
      await selectComponent.selectGroupByIndex({ index: 1 });

      const screenshotName = createScreenshotFileName(testInfo, isMobile);
      const clip = await selectComponent.getBoundingBox();
      await expect(page).toHaveScreenshot(screenshotName, { clip, fullPage: true });
    }
  });
  test('Keyboard navigation', async ({ page, isMobile }, testInfo) => {
    if (!isMobile) {
      await gotoStorybookUrlByName(page, 'Multiselect With Groups');
      const selectId = 'hds-select-component';
      const selectComponent = createSelectHelpers(page, selectId);
      const keyboard = createKeyboardHelpers(page);
      expect(await selectComponent.isOptionListOpen()).toBeFalsy();

      await focusLocator(selectComponent.getElementByName('button'));

      await keyboard.space(); // opens menu and moves focus to #0 (label)
      await waitFor(() => {
        return selectComponent.isOptionListOpen();
      });

      await keyboard.down(); // moves focus to #1
      await keyboard.down(); // moves focus to #2
      await keyboard.down(); // moves focus to #3

      const options = await selectComponent.getOptionElements({ all: true });
      await waitFor(() => {
        return isLocatorFocused(options[3]);
      });

      await waitForStablePosition(options[3]);
      await selectComponent.scrollGroupInToView({ index: 0 });
      const screenshotName = createScreenshotFileName(testInfo, isMobile);

      const clip = await selectComponent.getBoundingBox();
      await expect(page).toHaveScreenshot(screenshotName, { clip, fullPage: true });
    }
  });
});

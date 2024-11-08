import { test, expect, Page, Locator } from '@playwright/test';
import {
  gotoStorybookUrlByName,
  createScreenshotFileName,
  takeScreenshotWithSpacing,
  waitFor,
} from '../../../utils/playwright.util';
const componentName = 'cookieconsent';
const storybook = 'react';

test.describe(`Banner`, () => {
  const tabs = {
    page: 'page',
    banner: 'banner',
    consents: 'consents',
    actions: 'actions',
  };

  const changeTab = async (page: Page, tabName: keyof typeof tabs) => {
    const button = page.getByTestId(`${tabName}-tab-button`);
    const tab = page.getByTestId(`${tabName}-tab`);
    button.click();
    return waitFor(async () => {
      // cannot use visible because the element has not dimensions and it is under the banner
      const count = await tab.count();
      return count === 1;
    });
  };

  const changeLanguage = async (page: Page, language: 'fi' | 'sv' | 'en') => {
    const button = page.locator(`header button[lang=${language}]`);
    const languageIndicator = page.getByTestId(`current-language`);
    button.click();
    return waitFor(async () => {
      // cannot use visible because the element has not dimensions and it is under the banner
      const lang = await languageIndicator.getAttribute('lang');
      return lang === language;
    });
  };

  const getBannerOrPageLocator = (page: Page): Locator => {
    // root has height:0, so targeting first child
    return page.locator(`#hds-cc > div:first-child`);
  };

  const getApproveAllButton = (page: Page): Locator => {
    return page.locator(`button[data-approved="all"]`);
  };

  const getApprovedConsents = async (page: Page): Promise<string[]> => {
    const list = page.getByTestId(`consents-list`);
    const consents = await list.evaluate((element) => {
      return Array.from(element.querySelectorAll('li'))
        .map((listElement) => {
          const group = listElement.getAttribute('data-consent-group');
          const value = listElement.getAttribute('data-consent-group-value');
          if (value === 'true') {
            return group || '';
          }
          return '';
        })
        .filter((group) => !!group);
    });
    return consents;
  };

  /**
   * Playwright is ran from filesystem. Cookies cannot be saved.
   */

  test('Banner is shown. Changing language changes the contents', async ({ page, isMobile }, testInfo) => {
    if (isMobile) {
      // viewport is too small to test with mobile view. Banner blocks the ui.
      return;
    }
    await gotoStorybookUrlByName(page, 'Example', componentName, storybook);
    await changeTab(page, 'banner');
    const banner = getBannerOrPageLocator(page);
    // isVisible does not seem to work with shadow dom
    expect(banner).toHaveCount(1);
    const screenshotName = createScreenshotFileName(testInfo, isMobile);
    await takeScreenshotWithSpacing(page, banner, screenshotName);
    await changeLanguage(page, 'sv');
    const screenshotNameSV = createScreenshotFileName(testInfo, isMobile, 'sv language');
    await takeScreenshotWithSpacing(page, banner, screenshotNameSV);
  });
  test('Banner is closed after approval.', async ({ page, isMobile }, testInfo) => {
    if (isMobile) {
      // viewport is too small to test with mobile view. Banner blocks the ui.
      return;
    }
    await gotoStorybookUrlByName(page, 'Example', componentName, storybook);
    await changeTab(page, 'banner');
    const banner = getBannerOrPageLocator(page);
    expect(banner).toHaveCount(1);
    getApproveAllButton(page).click();
    expect(banner).toHaveCount(0);
    const screenshotName = createScreenshotFileName(testInfo, isMobile);
    await takeScreenshotWithSpacing(page, page.locator('body'), screenshotName);
  });
  test('Page is shown. Changing language changes the contents', async ({ page, isMobile }, testInfo) => {
    if (isMobile) {
      // viewport is too small to test with mobile view. Banner blocks the ui.
      return;
    }
    await gotoStorybookUrlByName(page, 'Example', componentName, storybook);
    const banner = getBannerOrPageLocator(page);
    // isVisible does not seem to work with shadow dom
    expect(banner).toHaveCount(1);
    const screenshotName = createScreenshotFileName(testInfo, isMobile);
    await takeScreenshotWithSpacing(page, banner, screenshotName);
    await changeLanguage(page, 'sv');
    const screenshotNameSV = createScreenshotFileName(testInfo, isMobile, 'sv language');
    await takeScreenshotWithSpacing(page, banner, screenshotNameSV);
  });
});

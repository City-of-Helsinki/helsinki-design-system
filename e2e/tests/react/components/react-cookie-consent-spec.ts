import { test, expect, Page, Locator } from '@playwright/test';
import { isLocatorSelectedOrChecked } from '../../../utils/element.util';
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
    const target = tabs[tabName];
    const buttonDiv = page.getByTestId(`${target}-tab-button`);
    // ".." is Xpath to get parent
    const button = buttonDiv.locator('..').locator('..');
    const tab = page.getByTestId(`${target}-tab`);
    expect(button).toBeVisible();
    await button.click();
    return waitFor(async () => {
      // cannot use visible because the element has no dimensions
      const count = await tab.count();
      return count === 1;
    });
  };

  const changeLanguage = async (page: Page, language: 'fi' | 'sv' | 'en') => {
    const button = page.locator(`header button[lang=${language}]`);
    const languageIndicator = page.getByTestId(`current-language`);
    await button.click();
    return waitFor(async () => {
      // cannot use visible because the element has no dimensions
      const lang = await languageIndicator.getAttribute('lang');
      return lang === language;
    });
  };

  const getBannerOrPageLocator = (page: Page): Locator => {
    // root has height:0, so targeting first child
    return page.locator(`#hds-cc > div:first-child`);
  };

  const getSaveButton = (page: Page, buttonType: 'all' | 'required' | 'selected'): Locator => {
    return page.locator(`button[data-approved="${buttonType}"]`);
  };

  const waitForBannerToChange = async (banner: Locator, finalState: 'show' | 'hide') => {
    const expectedCount = finalState === 'show' ? 1 : 0;
    await waitFor(async () => {
      const count = await banner.count();
      return count === expectedCount;
    });
  };

  const storeConsentsAndWaitForBannerClose = async (
    page: Page,
    approveType: 'all' | 'required',
    bannerLocator: Locator,
  ) => {
    const banner = bannerLocator || getBannerOrPageLocator(page);
    await waitForBannerToChange(banner, 'show');
    const button = getSaveButton(page, approveType);
    await button.click();
    await waitForBannerToChange(banner, 'hide');
  };

  const storeConsentsAndWaitForNotification = async (
    page: Page,
    approveType: 'all' | 'selected',
    bannerLocator: Locator,
  ) => {
    const notificationElement = page.locator('#hds-cc-aria-live');
    const button = getSaveButton(page, approveType);
    await button.click();
    await waitFor(async () => {
      const count = await notificationElement.count();
      return count === 1;
    });
  };

  const getApprovedConsents = async (page: Page): Promise<string[]> => {
    const list = page.getByTestId(`consents-list`);
    expect(list).toBeVisible();
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

  const gotoConsentsAndReturnCurrent = async (page: Page): Promise<string[]> => {
    await changeTab(page, 'consents');
    return await getApprovedConsents(page);
  };

  const toggleSettingsPageConsent = async (
    page: Page,
    optionalConsent: 'statistics' | 'preferences' | 'chat' | 'test_optional',
  ): Promise<string[]> => {
    const currentConsents = await gotoConsentsAndReturnCurrent(page);
    await changeTab(page, 'page');
    const checkbox = page.locator(`#${optionalConsent}-cookies`);
    expect(checkbox).toBeVisible();
    await checkbox.scrollIntoViewIfNeeded();
    const wasChecked = await isLocatorSelectedOrChecked(checkbox);
    expect(currentConsents.includes(optionalConsent)).toBe(wasChecked);
    await checkbox.click();
    await waitFor(async () => {
      return (await isLocatorSelectedOrChecked(checkbox)) !== wasChecked;
    });
    await getSaveButton(page, 'selected').click();
    const updatedConsents = await gotoConsentsAndReturnCurrent(page);
    expect(updatedConsents.includes(optionalConsent)).toBe(!wasChecked);
    await changeTab(page, 'page');
    return updatedConsents;
  };

  const approveRequiredAndCheckStoredConsents = async (page: Page): Promise<string[]> => {
    await changeTab(page, 'banner');
    const banner = getBannerOrPageLocator(page);
    await storeConsentsAndWaitForBannerClose(page, 'required', banner);
    return await gotoConsentsAndReturnCurrent(page);
  };

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
  test('Banner is closed after approval and not shown again.', async ({ page, isMobile }, testInfo) => {
    if (isMobile) {
      // viewport is too small to test with mobile view. Banner blocks the ui.
      return;
    }
    await gotoStorybookUrlByName(page, 'Example', componentName, storybook);
    await changeTab(page, 'banner');
    const banner = getBannerOrPageLocator(page);
    await storeConsentsAndWaitForBannerClose(page, 'all', banner);
    const screenshotName = createScreenshotFileName(testInfo, isMobile);
    await takeScreenshotWithSpacing(page, page.locator('body'), screenshotName);

    await page.reload();
    await changeTab(page, 'banner');
    // give the banner possibility to appear
    await page.waitForTimeout(200);
    expect(banner).toHaveCount(0);
  });
  test('Consents are stored properly.', async ({ page, isMobile }, testInfo) => {
    if (isMobile) {
      // viewport is too small to test with mobile view. Banner blocks the ui.
      return;
    }
    await gotoStorybookUrlByName(page, 'Example', componentName, storybook);
    await changeTab(page, 'banner');
    const consents = await approveRequiredAndCheckStoredConsents(page);
    expect(consents).toEqual(['essential', 'test_essential']);
  });
  test('Stored consents are changed via settings page', async ({ page, isMobile }, testInfo) => {
    if (isMobile) {
      // viewport is too small to test with mobile view. Banner blocks the ui.
      return;
    }
    await gotoStorybookUrlByName(page, 'Example', componentName, storybook);
    await approveRequiredAndCheckStoredConsents(page);
    await toggleSettingsPageConsent(page, 'preferences');
    await toggleSettingsPageConsent(page, 'statistics');
    await toggleSettingsPageConsent(page, 'chat');
    await toggleSettingsPageConsent(page, 'test_optional');
    const consents = await gotoConsentsAndReturnCurrent(page);
    expect(consents).toEqual(['essential', 'test_essential', 'preferences', 'statistics', 'chat', 'test_optional']);
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

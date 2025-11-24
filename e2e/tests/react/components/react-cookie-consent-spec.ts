import { test, expect, Page, Locator } from '@playwright/test';
import { getFocusedElement, isLocatorSelectedOrChecked, waitForStablePosition } from '../../../utils/element.util';
import {
  gotoStorybookUrlByName,
  createScreenshotFileName,
  takeScreenshotWithSpacing,
  waitFor,
  getLocatorElement,
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

  const getAriaLiveLocator = (page: Page) => {
    return page.locator('#hds-cc-aria-live');
  };

  const getAriaLiveLocatorWhenRendered = async (page: Page) => {
    const locator = getAriaLiveLocator(page);
    await waitFor(async () => {
      const count = await locator.count();
      return count === 1;
    });
    await locator.scrollIntoViewIfNeeded();
    await waitFor(async () => {
      const bb = await locator.boundingBox();
      return !!bb && bb.height > 0;
    });
    return locator;
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
    approveType: 'all' | 'required' | 'selected',
    bannerLocator: Locator,
  ) => {
    const banner = bannerLocator || getBannerOrPageLocator(page);
    await waitForBannerToChange(banner, 'show');
    const button = getSaveButton(page, approveType);
    await button.click();
    await waitForBannerToChange(banner, 'hide');
  };

  const storeConsentsAndWaitForNotification = async (page: Page, approveType: 'selected' | 'required') => {
    const button = getSaveButton(page, approveType);
    await button.scrollIntoViewIfNeeded();
    await button.click();
    return getAriaLiveLocatorWhenRendered(page);
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

  const hideAllTimestampsFromScreenshots = async (page: Page) => {
    const locator = page.locator(`div[data-timestamp] p.timestamp`);
    const count = await locator.count();
    expect(count > 0).toBeTruthy();
    await locator.evaluateAll((list) => {
      list.forEach((el) => {
        if (el && el.style) {
          el.style.setProperty('opacity', '0');
        }
      });
      return Promise.resolve();
    });
  };

  test('Banner is shown. Changing language changes the contents', async ({ page, hasTouch }, testInfo) => {
    if (hasTouch) {
      // viewport is too small to test with mobile view. Banner blocks the ui.
      return;
    }
    await gotoStorybookUrlByName(page, 'Example', componentName, storybook);
    await changeTab(page, 'banner');
    const banner = getBannerOrPageLocator(page);
    // isVisible does not seem to work with shadow dom
    expect(banner).toHaveCount(1);
    const screenshotName = createScreenshotFileName(testInfo, hasTouch);
    await takeScreenshotWithSpacing(page, banner, screenshotName);
    await changeLanguage(page, 'sv');
    const screenshotNameSV = createScreenshotFileName(testInfo, hasTouch, 'sv language');
    await takeScreenshotWithSpacing(page, banner, screenshotNameSV);
  });
  test('Banner is closed after approval and not shown again. Focus is moved.', async ({ page, hasTouch }, testInfo) => {
    if (hasTouch) {
      // viewport is too small to test with mobile view. Banner blocks the ui.
      return;
    }
    await gotoStorybookUrlByName(page, 'Example', componentName, storybook);
    await changeTab(page, 'banner');
    const banner = getBannerOrPageLocator(page);
    await storeConsentsAndWaitForBannerClose(page, 'all', banner);
    const focusTarget = await getLocatorElement(page.locator('#actionbar > a'));
    const focusedElement = await getFocusedElement(page.locator('body'));
    expect(focusTarget === focusedElement).toBeTruthy();
    const screenshotName = createScreenshotFileName(testInfo, hasTouch);
    await takeScreenshotWithSpacing(page, page.locator('body'), screenshotName);

    await page.reload();
    await changeTab(page, 'banner');
    // give the banner possibility to appear
    await page.waitForTimeout(200);
    expect(banner).toHaveCount(0);
  });
  test('Consents are stored properly.', async ({ page, hasTouch }, testInfo) => {
    if (hasTouch) {
      // viewport is too small to test with mobile view. Banner blocks the ui.
      return;
    }
    await gotoStorybookUrlByName(page, 'Example', componentName, storybook);
    await changeTab(page, 'banner');
    const consents = await approveRequiredAndCheckStoredConsents(page);
    expect(consents).toEqual(['essential', 'test_essential']);
  });
  test('Element given in openBanner is focused on banner close', async ({ page, hasTouch }, testInfo) => {
    if (hasTouch) {
      // viewport is too small to test with mobile view. Banner blocks the ui.
      return;
    }
    const openerSelector = '#banner-opener';
    await gotoStorybookUrlByName(page, 'Example', componentName, storybook);
    await changeTab(page, 'actions');
    const bannerOpener = page.locator(openerSelector);
    const banner = getBannerOrPageLocator(page);
    await bannerOpener.click();
    await storeConsentsAndWaitForBannerClose(page, 'selected', banner);
    const focusTarget = await getLocatorElement(page.locator(openerSelector));
    const focusedElement = await getFocusedElement(page.locator('body'));
    expect(focusTarget === focusedElement).toBeTruthy();
  });
  test('Stored consents are changed via settings page', async ({ page, hasTouch }, testInfo) => {
    if (hasTouch) {
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
  test('Page is shown. Changing language changes the contents', async ({ page, hasTouch }, testInfo) => {
    if (hasTouch) {
      // viewport is too small to test with mobile view. Banner blocks the ui.
      return;
    }
    await gotoStorybookUrlByName(page, 'Example', componentName, storybook);
    const banner = getBannerOrPageLocator(page);
    // isVisible does not seem to work with shadow dom
    expect(banner).toHaveCount(1);
    await waitForStablePosition(banner);
    const screenshotName = createScreenshotFileName(testInfo, hasTouch);
    await takeScreenshotWithSpacing(page, banner, screenshotName);
    await changeLanguage(page, 'sv');
    await waitForStablePosition(banner);
    const screenshotNameSV = createScreenshotFileName(testInfo, hasTouch, 'sv language');
    await takeScreenshotWithSpacing(page, banner, screenshotNameSV);
  });
  test('Aria live is visually shown when page is saved.', async ({ page, hasTouch }, testInfo) => {
    if (hasTouch) {
      // viewport is too small to test with mobile view. Banner blocks the ui.
      return;
    }
    await gotoStorybookUrlByName(page, 'Example', componentName, storybook);
    await storeConsentsAndWaitForNotification(page, 'selected');
    const notificationElementLocator = await getAriaLiveLocatorWhenRendered(page);
    await notificationElementLocator.isVisible();
    const screenshotName = createScreenshotFileName(testInfo, hasTouch, 'first save');
    await hideAllTimestampsFromScreenshots(page);
    await takeScreenshotWithSpacing(page, page.locator('body'), screenshotName);
    // it takes 5000ms for the element to hide, so not waiting for it.
    await changeTab(page, 'consents');
    await changeTab(page, 'page');
    await expect(notificationElementLocator).not.toBeVisible();

    const screenshotName2 = createScreenshotFileName(testInfo, hasTouch, 'no visible aria-live');
    await hideAllTimestampsFromScreenshots(page);
    await takeScreenshotWithSpacing(page, page.locator('body'), screenshotName2);

    await storeConsentsAndWaitForNotification(page, 'required');
    const newNotificationElementLocator = await getAriaLiveLocatorWhenRendered(page);
    await newNotificationElementLocator.isVisible();
    const screenshotName3 = createScreenshotFileName(testInfo, hasTouch, 'second save');
    await hideAllTimestampsFromScreenshots(page);
    await takeScreenshotWithSpacing(page, page.locator('body'), screenshotName3);
  });
  test('Aria live is shown to the screenreader when banner is closed.', async ({ page, hasTouch }, testInfo) => {
    if (hasTouch) {
      // viewport is too small to test with mobile view. Banner blocks the ui.
      return;
    }
    await gotoStorybookUrlByName(page, 'Banner', componentName, storybook);
    const banner = getBannerOrPageLocator(page);
    await storeConsentsAndWaitForBannerClose(page, 'all', banner);
    const newNotificationElementLocator = await getAriaLiveLocatorWhenRendered(page);
    const content = await newNotificationElementLocator.textContent();
    expect(content && content.length > 1).toBeTruthy();
    const bb = await newNotificationElementLocator.boundingBox();
    // width and height are 1, but margin is -1, so result is 0
    expect(bb && bb.width === 1 && bb.height === 1).toBeTruthy();
  });
});

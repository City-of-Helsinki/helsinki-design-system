import { test, expect } from '@playwright/test';
import {
  gotoStorybookUrlByName,
  createScreenshotFileName,
} from '../../../utils/playwright.util';
import { createKeyboardHelpers } from '../../../utils/keyboard.util';

const componentName = 'dropdowncomponents-search';
const storybook = 'react';
const storyExample = 'Example';

test.describe(`Testing ${storybook} component "${componentName}"`, () => {
  test('Default state', async ({ page, hasTouch }, testInfo) => {
    await gotoStorybookUrlByName(page, storyExample, componentName, storybook);
    const container = page.locator('#hds-search-component-container');
    await expect(container).toBeVisible();

    const screenshotName = createScreenshotFileName(testInfo, hasTouch);
    const clip = await container.boundingBox();
    await expect(page).toHaveScreenshot(screenshotName, { clip, fullPage: true });
  });

  test('Click opens dropdown with history', async ({ page, hasTouch }, testInfo) => {
    await gotoStorybookUrlByName(page, storyExample, componentName, storybook);

    // Add some history items first by submitting searches
    const input = page.locator('#hds-search-component-search-input');
    const keyboard = createKeyboardHelpers(page);

    await input.fill('react');
    await keyboard.enter();
    await page.waitForTimeout(300);

    await input.fill('angular');
    await keyboard.enter();
    await page.waitForTimeout(300);

    // Clear input and click to open history dropdown
    await input.fill('');
    await input.click();
    await page.waitForTimeout(300);

    const container = page.locator('#hds-search-component-container');
    const screenshotName = createScreenshotFileName(testInfo, hasTouch);
    const clip = await container.boundingBox();
    await expect(page).toHaveScreenshot(screenshotName, { clip, fullPage: true });
  });

  test('Type to search shows suggestions', async ({ page, hasTouch }, testInfo) => {
    await gotoStorybookUrlByName(page, storyExample, componentName, storybook);

    const input = page.locator('#hds-search-component-search-input');
    await input.click();
    await input.fill('Apple');
    await page.waitForTimeout(500);

    const container = page.locator('#hds-search-component-container');
    const screenshotName = createScreenshotFileName(testInfo, hasTouch);
    const clip = await container.boundingBox();
    await expect(page).toHaveScreenshot(screenshotName, { clip, fullPage: true });
  });

  test('ARIA attributes on input', async ({ page }) => {
    await gotoStorybookUrlByName(page, storyExample, componentName, storybook);

    const input = page.locator('#hds-search-component-search-input');
    await expect(input).toHaveAttribute('role', 'combobox');
    await expect(input).toHaveAttribute('aria-autocomplete', 'list');
    await expect(input).toHaveAttribute('aria-expanded', 'false');
    await expect(input).toHaveAttribute('aria-controls', 'hds-search-component-list');
  });

  test('Escape closes dropdown', async ({ page }) => {
    await gotoStorybookUrlByName(page, storyExample, componentName, storybook);

    const input = page.locator('#hds-search-component-search-input');
    const keyboard = createKeyboardHelpers(page);

    await input.click();
    await input.fill('Apple');
    await page.waitForTimeout(500);

    // Dropdown should be open
    await expect(input).toHaveAttribute('aria-expanded', 'true');

    await keyboard.esc();
    await expect(input).toHaveAttribute('aria-expanded', 'false');
  });
});

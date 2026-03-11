import { test, expect } from '@playwright/test';
import {
  gotoStorybookUrlByName,
  createScreenshotFileName,
} from '../../../utils/playwright.util';
import { createKeyboardHelpers } from '../../../utils/keyboard.util';

const componentName = 'header';
const storybook = 'react';
const storyWithSearch = 'With Search';

test.describe(`Testing ${storybook} Header Search`, () => {
  test('Header with search button visible', async ({ page, hasTouch }, testInfo) => {
    await gotoStorybookUrlByName(page, storyWithSearch, componentName, storybook);
    const header = page.locator('header').first();
    await expect(header).toBeVisible();

    const screenshotName = createScreenshotFileName(testInfo, hasTouch);
    const clip = await header.boundingBox();
    await expect(page).toHaveScreenshot(screenshotName, { clip, fullPage: true });
  });

  test('Open search dropdown', async ({ page, hasTouch }, testInfo) => {
    await gotoStorybookUrlByName(page, storyWithSearch, componentName, storybook);

    // Click the HeaderActionBarItem button to open search
    const searchButton = page.locator('#header-search button').first();
    await searchButton.click();
    await page.waitForTimeout(300);

    const screenshotName = createScreenshotFileName(testInfo, hasTouch);
    await expect(page).toHaveScreenshot(screenshotName, { fullPage: true, maxDiffPixelRatio: 0.05 });
  });

  test('Search landmark has aria-labelledby', async ({ page }) => {
    await gotoStorybookUrlByName(page, storyWithSearch, componentName, storybook);

    // Open the search dropdown first
    const searchButton = page.locator('#header-search button').first();
    await searchButton.click();
    await page.waitForTimeout(300);

    const searchLandmark = page.locator('[role="search"]');
    await expect(searchLandmark).toBeVisible();

    const labelledBy = await searchLandmark.getAttribute('aria-labelledby');
    expect(labelledBy).toBeTruthy();

    // The heading element referenced by aria-labelledby should exist
    const heading = page.locator(`#${labelledBy}`);
    await expect(heading).toBeVisible();
  });

  test('Search input has combobox ARIA attributes', async ({ page }) => {
    await gotoStorybookUrlByName(page, storyWithSearch, componentName, storybook);

    // Open panel
    const searchButton = page.locator('#header-search button').first();
    await searchButton.click();
    await page.waitForTimeout(300);

    const input = page.locator('[role="search"] input');
    await expect(input).toHaveAttribute('role', 'combobox');
    await expect(input).toHaveAttribute('aria-autocomplete', 'list');
    await expect(input).toHaveAttribute('aria-expanded', 'false');
  });

  test('Type and take screenshot with suggestions', async ({ page, hasTouch }, testInfo) => {
    await gotoStorybookUrlByName(page, storyWithSearch, componentName, storybook);

    // Open panel
    const searchButton = page.locator('#header-search button').first();
    await searchButton.click();
    await page.waitForTimeout(300);

    const input = page.locator('[role="search"] input');
    await input.click();
    await input.fill('Apple');
    await page.waitForTimeout(500);

    const screenshotName = createScreenshotFileName(testInfo, hasTouch);
    await expect(page).toHaveScreenshot(screenshotName, { fullPage: true, maxDiffPixelRatio: 0.05 });
  });

  test('Dropdown list has role="presentation"', async ({ page }) => {
    await gotoStorybookUrlByName(page, storyWithSearch, componentName, storybook);

    const ul = page.locator('#header-search ul').first();
    await expect(ul).toHaveAttribute('role', 'presentation');
  });
});

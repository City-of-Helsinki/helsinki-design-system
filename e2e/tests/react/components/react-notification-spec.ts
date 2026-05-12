import { test, expect } from '@playwright/test';
import {
  getComponentStorybookUrls,
  takeScreenshotWithSpacing,
  takeStateScreenshots,
} from '../../../utils/playwright.util';

const componentName = 'notification';
const storybook = 'react';
const takeStateSnapshots = true;

test.describe(`Testing ${storybook} component "${componentName}"`, () => {
  test('Take snapshots of all stories', async ({ page, hasTouch }) => {
    const componentUrls = await getComponentStorybookUrls(page, componentName, storybook);
    if (componentUrls.length === 0) {
      throw new Error(`No componentUrls found for "${componentName}" in ${storybook}`);
    }
    for (const componentUrl of componentUrls) {
      await page.goto(componentUrl);
      await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});

      if (componentUrl.includes('as-error-summary-with-form')) {
        await page.getByRole('button', { name: 'Submit' }).click();
        await expect(page.locator('[aria-label="Error summary"]')).toBeVisible();
      }

      const container = page.locator('body');
      const screenshotName = `${storybook}-${componentUrl.split('/').pop()}-${hasTouch ? 'mobile' : 'desktop'}`;
      await takeScreenshotWithSpacing(page, container, screenshotName, 0);

      if (takeStateSnapshots) {
        const elements = await container.locator('[data-playwright="true"]').all();
        for (const [index, element] of elements.entries()) {
          const screenshotPrefix = `${storybook}-${screenshotName}-components-${index}`;
          await takeStateScreenshots(page, element, screenshotPrefix);
        }
      }
    }
  });
});

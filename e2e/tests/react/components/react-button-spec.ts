import { test, expect } from '@playwright/test';
import { getComponentStorybookUrls, takeScreenshotWithSpacing, takeStateScreenshots } from '../../../helpers';

test.describe('Button', () => {

  const componentName = 'button';
  let componentUrls: string[] = [];

  test('button getStorybookUrls', async ({ page }) => {
    componentUrls = await getComponentStorybookUrls(page, componentName, 'react');
    expect(componentUrls.length).toBeGreaterThan(0);
  });

  test('button components', async ({ page, isMobile }) => {
    for (const componentUrl of componentUrls) {
      await page.goto(`file://${componentUrl}`);
      const container = page.locator('body');
      const screenshotName = `react-${componentUrl.split('/').pop()}-${isMobile ? 'mobile' : 'desktop'}`;
      await takeScreenshotWithSpacing(page, container, screenshotName, 0);

      const buttons = await container.locator('[data-playwright="true"]').all();

      for (const [index, button] of buttons.entries()) {
        const screenshotPrefix = `react-${screenshotName}-components-${index}`;
        await takeStateScreenshots(page, button, screenshotPrefix);
      }
    }
  });
});
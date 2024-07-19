import { test, expect } from '@playwright/test';
import { getComponentStorybookUrls, takeScreenshotWithSpacing, takeStateScreenshots } from '../../helpers';

test.describe('Tag', () => {

  const componentName = 'tag';
  let componentUrls: string[] = [];

  test('tag getStorybookUrls', async ({ page }) => {
    componentUrls = await getComponentStorybookUrls(page, componentName);
    expect(componentUrls.length).toBeGreaterThan(0);
  });

  test('tag components', async ({ page, isMobile }) => {
    for (const componentUrl of componentUrls) {
      await page.goto(`file://${componentUrl}`);
      const container = page.locator('body');
      const screenshotName = `${componentUrl.split('/').pop()}-${isMobile ? 'mobile' : 'desktop'}`;
      await takeScreenshotWithSpacing(page, container, screenshotName, 0);

      const tags = await container.locator('[data-playwright="true"]').all();

      for (const [index, tag] of tags.entries()) {
        const screenshotPrefix = `${screenshotName}-components-${index}`;
        await takeStateScreenshots(page, tag, screenshotPrefix);
      }
    }
  });
});
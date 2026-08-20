import { test, expect, Page } from '@playwright/test';

import { createScreenshotFileName, getComponentStorybookUrls } from '../../../utils/playwright.util';
import {
  TABLE_CONTAINER_SELECTOR,
  expectShadowsToSpanTheScrolledContent,
  expectToOverflow,
  getScrollShadowMetrics,
  scrollHorizontallyTo,
  waitForShadows,
} from '../../../utils/table.component.util';

/**
 * The Core version of the horizontal scroll shadows. There is no JavaScript: the shadows are the
 * pseudo elements of the table container and their opacity is driven by a scroll timeline, which
 * these tests can only verify in a browser that supports scroll-driven animations. Browsers without
 * support render the table without shadows, which is the accepted behaviour, so the tests are
 * skipped there instead of failing.
 */

const componentName = 'table';
const storybook = 'core';

const gotoStory = async (page: Page, storyId: string) => {
  const urls = await getComponentStorybookUrls(page, componentName, storybook);
  const url = urls.find((candidate: string) => candidate.endsWith(`${storyId}`));
  if (!url) {
    throw new Error(`Story "${storyId}" was not found. Found stories: ${urls.join(', ')}`);
  }
  await page.goto(url);
  // Waiting for the container instead of the network: the Storybook iframe keeps connections open,
  // so a networkidle wait would never resolve.
  const container = page.locator(TABLE_CONTAINER_SELECTOR).first();
  await container.waitFor({ state: 'visible' });
  await page.evaluate(() => document.fonts.ready);
  return container;
};

const supportsScrollDrivenAnimations = async (page: Page) =>
  page.evaluate(() => CSS.supports('animation-timeline', 'scroll()'));

test.describe(`Testing ${storybook} component "${componentName}" scroll shadows`, () => {
  // The stories set their own widths and the assertions compare them, so the cases are run once, in
  // a viewport that is wide enough for them. A 320px viewport would make every table overflow.
  test.skip(({ hasTouch }) => hasTouch, 'Scroll shadow measurements are run in the desktop viewport only');

  test('Shadows are shown with CSS only, without any markup for them', async ({ page }) => {
    const container = await gotoStory(page, 'components-table--scroll-shadows');
    test.skip(!(await supportsScrollDrivenAnimations(page)), 'No scroll-driven animation support');

    // The whole point of the Core version: the container holds nothing but the table.
    const childElements = await container.evaluate((element: HTMLElement) =>
      Array.from(element.children).map((child) => child.tagName),
    );
    expect(childElements).toEqual(['TABLE']);

    await expectToOverflow(container, true);
    await waitForShadows(container, { start: false, end: true }, 'At the start of the content');

    await scrollHorizontallyTo(container, 'middle');
    await waitForShadows(container, { start: true, end: true }, 'In the middle of the content');

    await scrollHorizontallyTo(container, 'end');
    await waitForShadows(container, { start: true, end: false }, 'At the end of the content');
  });

  test('Shadows stay at the edges of the container for the whole scroll range', async ({ page }) => {
    const container = await gotoStory(page, 'components-table--scroll-shadows');

    await expectShadowsToSpanTheScrolledContent(container);

    await scrollHorizontallyTo(container, 'middle');
    await expectShadowsToSpanTheScrolledContent(container);

    await scrollHorizontallyTo(container, 'end');
    await expectShadowsToSpanTheScrolledContent(container);
  });

  test('A table without overflow shows no shadows and is stretched to the full width', async ({ page }) => {
    const container = await gotoStory(page, 'components-table--scroll-shadows-without-overflow');

    await expectToOverflow(container, false);
    const metrics = await getScrollShadowMetrics(container);
    expect(Math.abs(metrics.tableWidth - metrics.clientWidth)).toBeLessThanOrEqual(1);

    // With no overflow the scroll timeline is inactive, which has to leave the shadows hidden.
    await waitForShadows(container, { start: false, end: false }, 'A table without overflow');
  });

  test('Shadows are painted and not only computed', async ({ page, hasTouch }, testInfo) => {
    const container = await gotoStory(page, 'components-table--scroll-shadows');
    test.skip(!(await supportsScrollDrivenAnimations(page)), 'No scroll-driven animation support');

    // Scrolled to the middle both shadows are visible, so one screenshot covers both.
    await scrollHorizontallyTo(container, 'middle');
    await waitForShadows(container, { start: true, end: true }, 'In the middle of the content');

    const box = (await container.boundingBox()) || { x: 0, y: 0, width: 0, height: 0 };
    // Only the top of the container. The story table is thousands of pixels tall and the shadows
    // look the same all the way down, so a taller clip would only make a heavier snapshot.
    const clip = { x: box.x, y: box.y, width: box.width, height: 200 };

    // `animations: 'allow'` is required. The opacity of the shadows comes from a scroll driven
    // animation, and the default 'disabled' cancels it, which would capture the table without any
    // shadows and make this test pass no matter what. Allowing animations is safe here, because the
    // animation is driven by the scroll position only and has nothing timing dependent in it.
    //
    // The comparison is stricter than the project default, because the shadow is a light gradient
    // that the default threshold of 0.2 would largely ignore, and a missing shadow has to fail.
    await expect(page).toHaveScreenshot(createScreenshotFileName(testInfo, hasTouch), {
      clip,
      animations: 'allow',
      threshold: 0.1,
      maxDiffPixelRatio: 0.002,
    });
  });
});

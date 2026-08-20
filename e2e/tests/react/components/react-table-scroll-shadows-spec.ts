import { test, expect, Page, Locator } from '@playwright/test';

import { createScreenshotFileName, getComponentStorybookUrls, waitFor } from '../../../utils/playwright.util';
import {
  TABLE_CONTAINER_SELECTOR,
  expectShadowsToSpanTheScrolledContent,
  expectToOverflow,
  getScrollShadowMetrics,
  scrollHorizontallyTo,
  waitForShadows,
} from '../../../utils/table.component.util';

/**
 * The horizontal scroll shadows of the Table. The assertions are deliberately numeric instead of
 * screenshots: the ways this feature has broken are a shadow drifting with the content and a table
 * changing its width, and both can be too small a difference to fail a screenshot comparison.
 *
 * All the cases live in a single "Scroll shadow checks" story, and each of them is a separate test
 * here, so that a failure names the case that broke. The `data-testid` values come from that story.
 *
 * In the React package the shadows are toggled with a scroll listener, so they work in every
 * browser. The CSS only version of the same shadows is covered by the Core tests.
 */

const componentName = 'table';
const storybook = 'react';
const storyId = 'components-table--scroll-shadow-checks';

const gotoChecksStory = async (page: Page) => {
  const urls = await getComponentStorybookUrls(page, componentName, storybook);
  const url = urls.find((candidate: string) => candidate.endsWith(storyId));
  if (!url) {
    throw new Error(`Story "${storyId}" was not found. Found stories: ${urls.join(', ')}`);
  }
  await page.goto(url);
  // Waiting for a container instead of the network: the Storybook iframe keeps connections open,
  // so a networkidle wait would never resolve.
  await page.locator(TABLE_CONTAINER_SELECTOR).first().waitFor({ state: 'visible' });
  await page.evaluate(() => document.fonts.ready);
};

const getCheckContainer = (page: Page, checkId: string): Locator =>
  page.locator(`[data-testid="${checkId}"] ${TABLE_CONTAINER_SELECTOR}`).first();

test.describe(`Testing ${storybook} component "table" scroll shadows`, () => {
  // The story sets its own widths and the assertions compare them, so the cases are run once, in a
  // viewport that is wide enough for them. A 320px viewport would make every table overflow.
  test.skip(({ hasTouch }) => hasTouch, 'Scroll shadow measurements are run in the desktop viewport only');

  test.beforeEach(async ({ page }) => {
    await gotoChecksStory(page);
  });

  test('Shadows are shown only when there is content to scroll to', async ({ page }) => {
    const container = getCheckContainer(page, 'check-shadows-at-edges');
    await expectToOverflow(container, true);

    await waitForShadows(container, { start: false, end: true }, 'At the start of the content');

    await scrollHorizontallyTo(container, 'middle');
    await waitForShadows(container, { start: true, end: true }, 'In the middle of the content');

    await scrollHorizontallyTo(container, 'end');
    await waitForShadows(container, { start: true, end: false }, 'At the end of the content');

    await scrollHorizontallyTo(container, 'start');
    await waitForShadows(container, { start: false, end: true }, 'Back at the start of the content');
  });

  test('Shadows stay at the edges of the container for the whole scroll range', async ({ page }) => {
    const container = getCheckContainer(page, 'check-shadows-at-edges');

    await expectShadowsToSpanTheScrolledContent(container);

    // The grid area has to keep spanning the content in every scroll position, not just the first.
    await scrollHorizontallyTo(container, 'middle');
    await expectShadowsToSpanTheScrolledContent(container);

    await scrollHorizontallyTo(container, 'end');
    await expectShadowsToSpanTheScrolledContent(container);
  });

  test('Long text keeps wrapping instead of turning into a scrolling table', async ({ page }) => {
    const container = getCheckContainer(page, 'check-text-wraps');

    await expectToOverflow(container, false);
    await waitForShadows(container, { start: false, end: false }, 'A table without overflow');
  });

  test('A table narrower than its container is stretched to the full width', async ({ page }) => {
    const container = getCheckContainer(page, 'check-narrow-table');

    await expectToOverflow(container, false);
    const metrics = await getScrollShadowMetrics(container);
    expect(Math.abs(metrics.tableWidth - metrics.clientWidth)).toBeLessThanOrEqual(1);
    await waitForShadows(container, { start: false, end: false }, 'A table without overflow');
  });

  test('Shadows follow the container size without scrolling', async ({ page }) => {
    const container = getCheckContainer(page, 'check-resizable');
    const resizable = page.locator('[data-testid="check-resizable"] div[style*="resize"]').first();

    const setWidth = async (width: string) => {
      await resizable.evaluate((element: HTMLElement, value) => {
        element.style.width = value;
      }, width);
    };

    await setWidth('300px');
    await waitForShadows(container, { start: false, end: true }, 'A container too narrow for the table');

    await setWidth('2000px');
    await waitForShadows(container, { start: false, end: false }, 'A container wide enough for the table');

    await setWidth('300px');
    await waitForShadows(container, { start: false, end: true }, 'A container narrowed down again');
  });

  test('Shadows are kept while the table is scrolled vertically', async ({ page }) => {
    const container = getCheckContainer(page, 'check-vertical-scrolling');

    await expectToOverflow(container, true);
    await scrollHorizontallyTo(container, 'middle');
    await waitForShadows(container, { start: true, end: true }, 'Scrolled horizontally');

    await container.evaluate((element: HTMLElement) => {
      element.scrollTop = element.scrollHeight - element.clientHeight;
    });
    await waitFor(
      async () => {
        const { scrollLeft, maxScroll } = await getScrollShadowMetrics(container);
        return scrollLeft > 0 && scrollLeft < maxScroll;
      },
      { message: 'Vertical scrolling should not change the horizontal scroll position' },
    );
    await waitForShadows(container, { start: true, end: true }, 'Scrolled vertically');
    await expectShadowsToSpanTheScrolledContent(container);
  });

  test('Shadows work with the variants and while the container is focused', async ({ page }) => {
    // Zebra, vertical lines and dense change the widths inside the table, and focusing the
    // container draws an outline on the element the shadows are pseudo elements of.
    const container = getCheckContainer(page, 'check-variants');

    await expectToOverflow(container, true);
    await expectShadowsToSpanTheScrolledContent(container);
    await waitForShadows(container, { start: false, end: true }, 'A variant table at the start');

    await container.focus();
    await expect(container).toBeFocused();
    await expectShadowsToSpanTheScrolledContent(container);
    await waitForShadows(container, { start: false, end: true }, 'A focused table at the start');

    await scrollHorizontallyTo(container, 'end');
    await waitForShadows(container, { start: true, end: false }, 'A focused table at the end');
  });

  test('Shadows are painted and not only computed', async ({ page, hasTouch }, testInfo) => {
    const container = getCheckContainer(page, 'check-shadows-at-edges');

    // Scrolled to the middle both shadows are visible, so one screenshot covers both.
    await scrollHorizontallyTo(container, 'middle');
    await waitForShadows(container, { start: true, end: true }, 'In the middle of the content');

    const box = (await container.boundingBox()) || { x: 0, y: 0, width: 0, height: 0 };
    const clip = { x: box.x, y: box.y, width: box.width, height: 200 };

    // Unlike the Core version, these shadows survive the default `animations: 'disabled'`, because
    // their opacity comes from a plain CSS rule and the disabled transition is snapped to its end
    // state. The comparison is stricter than the project default, because the shadow is a light
    // gradient that the default threshold of 0.2 would largely ignore, and a missing shadow has to
    // fail.
    await expect(page).toHaveScreenshot(createScreenshotFileName(testInfo, hasTouch), {
      clip,
      threshold: 0.1,
      maxDiffPixelRatio: 0.002,
    });
  });
});

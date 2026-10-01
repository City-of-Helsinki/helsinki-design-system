import { Locator, expect } from '@playwright/test';

import { waitFor } from './playwright.util';

/**
 * The scroll shadows are the pseudo elements of the table container, so they cannot be located or
 * measured like elements. These helpers read the values that describe their behaviour instead.
 */

// The class comes from hds-core, but in the React package it is hashed by CSS Modules.
export const TABLE_CONTAINER_SELECTOR = '[class*="hds-table-container"]';

export type ScrollShadowMetrics = {
  clientWidth: number;
  scrollWidth: number;
  scrollLeft: number;
  maxScroll: number;
  /** Used size of the single grid column of the container. */
  trackWidth: number;
  tableWidth: number;
  startShadowOpacity: number;
  endShadowOpacity: number;
};

export const getScrollShadowMetrics = async (container: Locator): Promise<ScrollShadowMetrics> =>
  container.evaluate((element: HTMLElement) => {
    const table = element.querySelector('table') as HTMLElement;
    return {
      clientWidth: element.clientWidth,
      scrollWidth: element.scrollWidth,
      // scrollLeft is negative in rtl.
      scrollLeft: Math.abs(element.scrollLeft),
      maxScroll: element.scrollWidth - element.clientWidth,
      trackWidth: parseFloat(getComputedStyle(element).gridTemplateColumns),
      tableWidth: table.getBoundingClientRect().width,
      startShadowOpacity: parseFloat(getComputedStyle(element, ':before').opacity),
      endShadowOpacity: parseFloat(getComputedStyle(element, ':after').opacity),
    };
  });

export const scrollHorizontallyTo = async (container: Locator, position: 'start' | 'middle' | 'end') => {
  await container.evaluate((element: HTMLElement, target) => {
    const maxScroll = element.scrollWidth - element.clientWidth;
    const positions = { start: 0, middle: Math.round(maxScroll / 2), end: maxScroll };
    element.scrollLeft = positions[target];
  }, position);
};

/**
 * A sticky box cannot leave its containing block, which for a grid item is its grid area. The
 * shadows can only stay at the edges of the container for the whole scroll range when the column
 * spans the scrolled content, and the table does not overflow the column it is placed in.
 */
export const expectShadowsToSpanTheScrolledContent = async (container: Locator) => {
  const metrics = await getScrollShadowMetrics(container);
  // scrollWidth is rounded to an integer, so the comparison allows one pixel.
  expect(Math.abs(metrics.trackWidth - metrics.scrollWidth)).toBeLessThanOrEqual(1);
  expect(Math.abs(metrics.tableWidth - metrics.trackWidth)).toBeLessThanOrEqual(1);
};

export const expectToOverflow = async (container: Locator, shouldOverflow: boolean) => {
  const metrics = await getScrollShadowMetrics(container);
  if (shouldOverflow) {
    expect(metrics.scrollWidth).toBeGreaterThan(metrics.clientWidth);
  } else {
    expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.clientWidth + 1);
  }
};

/**
 * Waits for the shadows to reach the given visibility. The React version fades them with a
 * transition and the Core version with a scroll timeline, so neither is applied synchronously.
 */
export const waitForShadows = async (
  container: Locator,
  expected: { start: boolean; end: boolean },
  message?: string,
) => {
  await waitFor(
    async () => {
      const { startShadowOpacity, endShadowOpacity } = await getScrollShadowMetrics(container);
      return startShadowOpacity > 0.5 === expected.start && endShadowOpacity > 0.5 === expected.end;
    },
    {
      message: `${message || 'Shadows'} should be start=${expected.start} end=${expected.end}`,
    },
  );
};

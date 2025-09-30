import { Locator, Page, expect, ElementHandle, TestInfo } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';
import { playWrightInitScript } from '../../packages/react/src/utils/playWrightHelpers';

enum PackageServerPort {
  Core = 6007,
  React = 6006,
}

export const getComponentStorybookUrls = async (
  page: Page,
  componentName: string,
  packageName: string,
  nameFilters?: string[],
) => {
  let componentUrls: string[] = [];
  const localServerPort = packageName === 'core' ? PackageServerPort.Core : PackageServerPort.React;
  const basePath = `http://localhost:${localServerPort}`;
  const localStorybookPath = `${basePath}/index.html?path=/story/`;

  await page.goto(`${localStorybookPath}components-${componentName}`);
  await expect(page.locator(`#components-${componentName}`)).toBeVisible();
  const componentLinks = await page.locator(`[data-parent-id="components-${componentName}"]`).all();

  for (const component of componentLinks) {
    await component.getAttribute('href').then(async (href) => {
      // don't add anything containing 'playground' to the list
      if (href && !href.includes('playground')) {
        // to use the inner iframe of the story instead
        const url = href.replace('index.html', 'iframe.html');
        if (nameFilters) {
          const storyName = await component.textContent();
          if (!storyName || !nameFilters.includes(storyName)) {
            return;
          }
        }
        componentUrls.push(`${basePath}${url}`);
      }
    });
  }
  return componentUrls;
};

export const unfocusElement = async (page: Page, element: Locator) => {
  const elementBoundingBox = (await element.boundingBox()) || { x: 0, y: 0, width: 0, height: 0 };
  const outside = { x: elementBoundingBox.x - 1, y: elementBoundingBox.y - 1 };

  await page.mouse.move(outside.x, outside.y);
  await page.mouse.down();
  await page.mouse.up();
};

export const takeStateScreenshots = async (
  page: Page,
  element: Locator,
  screenshotPrefix: string,
  noOutsideClicks = false,
) => {
  await element.scrollIntoViewIfNeeded();
  const elementBoundingBox = (await element.boundingBox()) || { x: 0, y: 0, width: 0, height: 0 };
  const outside = { x: elementBoundingBox.x - 1, y: elementBoundingBox.y - 1 };

  if (!noOutsideClicks) {
    // to make sure nothing is focused
    await page.mouse.move(outside.x, outside.y);
    await page.mouse.down();
    await page.mouse.up();
  }

  await element.hover();
  await takeScreenshotWithSpacing(page, element, `${screenshotPrefix}-hover`);
  await element.focus();
  await takeScreenshotWithSpacing(page, element, `${screenshotPrefix}-hover-focus`);
  // to make sure element loses hover
  await page.mouse.move(outside.x, outside.y);
  await takeScreenshotWithSpacing(page, element, `${screenshotPrefix}-focus`);

  // click the middle of the element
  await page.mouse.move(
    elementBoundingBox.x + elementBoundingBox.width / 2,
    elementBoundingBox.y + elementBoundingBox.height / 2,
  );
  await page.mouse.down();

  await takeScreenshotWithSpacing(page, element, `${screenshotPrefix}-active`);
  await page.mouse.move(outside.x, outside.y);
  await page.mouse.up();
};

export const takeScreenshotWithSpacing = async (
  page: Page,
  element: Locator,
  screenshotName: string,
  spacing: number = 8,
) => {
  await element.scrollIntoViewIfNeeded();
  const elementBoundingBox = (await element.boundingBox()) || { x: 0, y: 0, width: 0, height: 0 };

  const clip = {
    x: elementBoundingBox.x - spacing > 0 ? elementBoundingBox.x - spacing : 0,
    y: elementBoundingBox.y - spacing > 0 ? elementBoundingBox.y - spacing : 0,
    width: elementBoundingBox.width + 2 * spacing,
    height: elementBoundingBox.height + 2 * spacing,
  };

  await scanAccessibility(page, element);
  return expect(page).toHaveScreenshot(`${screenshotName}.png`, { clip, fullPage: true });
};

export const takeAllStorySnapshots = async (props: {
  page: Page;
  hasTouch: boolean;
  componentName: string;
  storybook: 'core' | 'react';
  takeStateSnapshots: boolean;
  bodySpacing?: number; // this spacing is used around the whole story's screenshot
}) => {
  const { page, componentName, storybook, takeStateSnapshots, hasTouch, bodySpacing = 0 } = props;
  const componentUrls = await getComponentStorybookUrls(page, componentName, storybook);
  if (componentUrls.length === 0) {
    throw new Error('No componentUrls found for');
  }
  for (const componentUrl of componentUrls) {
    await page.goto(componentUrl);
    const container = page.locator('body');
    const screenshotName = `${storybook}-${componentUrl.split('/').pop()}-${hasTouch ? 'mobile' : 'desktop'}`;
    await takeScreenshotWithSpacing(page, container, screenshotName, bodySpacing);

    if (takeStateSnapshots) {
      const elements = await container.locator('[data-playwright="true"]').all();

      for (const [index, element] of elements.entries()) {
        const screenshotPrefix = `${storybook}-${screenshotName}-components-${index}`;
        await takeStateScreenshots(page, element, screenshotPrefix);
      }
    }
  }
};

export const getLocatorOrHandlePage = async (source: Locator | ElementHandle) => {
  if ((source as Locator).page) {
    return Promise.resolve((source as Locator).page());
  }
  if ((source as ElementHandle).ownerFrame) {
    const frame = await (source as ElementHandle).ownerFrame();
    if (!frame) {
      return Promise.reject(new Error('ElementHandle frame not found in getLocatorOrHandlePage()'));
    }
    return Promise.resolve(frame.page());
  }
  return Promise.reject(new Error('Cannot resolve page from given source in getLocatorOrHandlePage()'));
};

export const waitFor = async (
  fn: () => Promise<boolean>,
  settings?: {
    message?: string;
    timeout?: number;
    intervals?: number[];
  },
) => {
  const defaults = {
    message: 'WaitFor() timed out',
    timeout: 5000,
  };
  return expect.poll(() => fn(), { ...defaults, ...settings }).toBe(true);
};

export async function waitForStable(tester: () => Promise<boolean>, requiredCount = 5) {
  let stableCounter = 0;
  const fn = async () => {
    const result = await tester();
    if (result) {
      stableCounter += 1;
    } else {
      stableCounter = 0;
    }
    return Promise.resolve(stableCounter >= requiredCount);
  };

  return waitFor(fn, { intervals: [30, 30, 60, 60, 120, 120, 200, 200, 200, 200, 200, 500, 1000, 1000, 1000, 1000] });
}

export const createScreenshotFileName = (info: TestInfo, hasTouch: boolean, suffix?: string, fileFormat = '.png') => {
  const testName = [info.title];
  if (suffix) {
    testName.push(suffix);
  }
  return testName.join(' ').replaceAll(' ', '_').toLowerCase() + (hasTouch ? '-mobile' : '-desktop') + fileFormat;
};

export const listenToConsole = (page: Page) => {
  page.on('console', (msg) => console.log(msg.text()));
};

export const filterLocators = async (list: Locator[], iterator: (loc: Locator) => Promise<boolean>) => {
  const results = await Promise.all(
    list.map(async (elem) => {
      return await iterator(elem);
    }),
  );
  return list.filter((elem, index) => results[index] === true);
};

export const gotoStorybookUrlByName = async (page: Page, name: string, componentName: string, packageName: string) => {
  const filteredUrls = await getComponentStorybookUrls(page, componentName, packageName, [name]);
  const targetUrl = filteredUrls[0];
  await page.goto(targetUrl);
  return targetUrl;
};

export const scanAccessibility = async (page: Page, locator?: Locator) => {
  const scanClass = `a11y-scan-${Date.now()}`;
  const wcagTags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'];

  // console.info(`Running accessibility scan for ${locator ? 'locator' : 'page'}`);

  try {
    if (locator) {
      await locator.first().evaluate((el, className) => {
        el.classList.add(className);
      }, scanClass);

      const accessibilityScanResults = await new AxeBuilder({ page }).include(`.${scanClass}`)
        .withTags(wcagTags)
        .analyze();
      await expect(accessibilityScanResults.violations).toEqual([]);
    } else {
      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(wcagTags)
        .analyze();
      await expect(accessibilityScanResults.violations).toEqual([]);
    }
  } catch (error) {
    console.error('Accessibility scan failed:', error);
    throw error;
  }
};

export const getLocatorElement = async (locator: Locator): Promise<HTMLElement | SVGElement | null> => {
  const first = locator.first();
  return first.evaluate((el) => el);
};

export const getLocatorParentLocator = (source: Locator): Locator => {
  return source.locator('..');
};

export const getDummyBoundingBox = () => {
  return {
    x: 0,
    y: 0,
    width: 1,
    height: 1,
  };
};

export const initCustomArgsIntegration = async (page: Page) => {
  await page.addInitScript(playWrightInitScript);
};

export const setComponentPropsAndRender = async (props: unknown, page: Page) => {
  await page.evaluateHandle(async (props) => {
    // @ts-ignore
    await window.executeStorybookComponentTest(props);
  }, props);
  return props;
};

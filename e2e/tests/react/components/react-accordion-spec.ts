import { test, expect } from '@playwright/test';
import {
  scanAccessibility,
  createScreenshotFileName,
  getComponentStorybookUrls,
  gotoStorybookUrlByName,
  waitFor,
  setComponentPropsAndRender,
  initCustomArgsIntegration,
} from '../../../utils/playwright.util';
import { createAccordionHelpers } from '../../../utils/accordion.component.util';
import { getAllElementAttributes, isLocatorFocused } from '../../../utils/element.util';
import { getCommonElementTestProps, getAttributeMisMatches } from '../../../../packages/react/src/utils/testHelpers';

const componentName = 'accordion';
const storybook = 'react';

const storyWithDefault = 'Default';
const storyWithInitiallyOpenAccordion = 'Initially open';
const storyForPlayWright = 'Play Wright Only';

const selector = '*[data-testId="hds-accordion"]';

test.describe(`Testing ${storybook} component "${componentName}"`, () => {
  test('Take snapshots of all Accordion stories', async ({ page, hasTouch }) => {
    const componentUrls = await getComponentStorybookUrls(page, componentName, storybook);
    if (componentUrls.length === 0) {
      throw new Error('No componentUrls found for');
    }
    for (const componentUrl of componentUrls) {
      await page.goto(componentUrl);
      const accordionUtil = createAccordionHelpers(page, selector);
      const element = accordionUtil.getElementLocator();

      const containerCount = await element.count();
      if (containerCount === 1) {
        const clip = await accordionUtil.getBoundingBox();
        const screenshotName = `${storybook}-${componentUrl.split('/').pop()}-${hasTouch ? 'mobile' : 'desktop'}`;
        await scanAccessibility(page, element);
        await expect(page).toHaveScreenshot(`${screenshotName}.png`, { clip, fullPage: false });

        //open the accordion
        await accordionUtil.open();
        const clipOpen = await accordionUtil.getBoundingBox();
        await scanAccessibility(page, element);
        await expect(page).toHaveScreenshot(`${screenshotName}-open.png`, { clip: clipOpen, fullPage: false });
      }
    }
  });
  test('Accordion is opened and closed. Focus stays in the button.', async ({ page, hasTouch }, testInfo) => {
    await gotoStorybookUrlByName(page, storyWithDefault, componentName, storybook);

    const accordionUtil = createAccordionHelpers(page, selector);
    const isOpen = await accordionUtil.isOpen();
    expect(isOpen).toBeFalsy();
    await accordionUtil.open();

    const screenshotName = createScreenshotFileName(testInfo, hasTouch, 'open');
    const clip = await accordionUtil.getBoundingBox();
    await scanAccessibility(page, accordionUtil.getElementLocator());
    await expect(page).toHaveScreenshot(screenshotName, { clip, fullPage: true });

    await waitFor(() => {
      return isLocatorFocused(accordionUtil.getButtonLocator());
    });
  });
  test('Initially open is open and can be closed', async ({ page, hasTouch }, testInfo) => {
    await gotoStorybookUrlByName(page, storyWithInitiallyOpenAccordion, componentName, storybook);

    const accordionUtil = createAccordionHelpers(page, selector);
    const isOpen = await accordionUtil.isOpen();
    expect(isOpen).toBeTruthy();
    await accordionUtil.close();

    await waitFor(async () => {
      return (await accordionUtil.isOpen()) === false;
    });
  });
  test('Closing the accordion from inner button, moves focus to main button', async ({ page, hasTouch }, testInfo) => {
    await gotoStorybookUrlByName(page, storyWithDefault, componentName, storybook);

    const accordionUtil = createAccordionHelpers(page, selector);
    await accordionUtil.open();
    await accordionUtil.getInnerButtonLocator().click();

    await waitFor(async () => {
      return (await accordionUtil.isOpen()) === false;
    });

    await waitFor(() => {
      return isLocatorFocused(accordionUtil.getButtonLocator());
    });
  });
  test('Native html props are passed to the element', async ({ page, hasTouch }, testInfo) => {
    if (hasTouch) {
      // no need to test in mobile
      return;
    }
    await initCustomArgsIntegration(page);
    await gotoStorybookUrlByName(page, storyForPlayWright, componentName, storybook);
    const divProps = { ...getCommonElementTestProps('div') };
    await setComponentPropsAndRender(divProps, page);
    const accordionUtil = createAccordionHelpers(page, `#${divProps.id}`);
    const attributes = await getAllElementAttributes(accordionUtil.getElementLocator());
    expect(getAttributeMisMatches((key) => attributes[key] || null, divProps)).toHaveLength(0);
  });
});

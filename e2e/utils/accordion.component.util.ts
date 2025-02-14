import { Locator, Page } from '@playwright/test';
import { doesLocatorHaveAttributeOrPropValue } from './element.util';
import { getDummyBoundingBox, waitFor } from './playwright.util';

export function createAccordionHelpers(page: Page, selector: string) {
  const contentElementSelector = '*[role="region"]';
  const buttonElementSelector = '*[role="heading"] button';
  const innerButtonElementSelector = `${contentElementSelector} >  button`;
  const getElementLocator = (): Locator => {
    return page.locator(selector);
  };

  const getContentLocator = (elementLocator?: Locator): Locator => {
    return (elementLocator || getElementLocator()).locator(contentElementSelector);
  };

  const getButtonLocator = (elementLocator?: Locator): Locator => {
    return (elementLocator || getElementLocator()).locator(buttonElementSelector);
  };

  const getInnerButtonLocator = (elementLocator?: Locator): Locator => {
    return (elementLocator || getElementLocator()).locator(innerButtonElementSelector);
  };

  const isContentVisible = async (): Promise<boolean> => {
    const content = getContentLocator();
    return content.isVisible();
  };

  const isExpanded = async (): Promise<boolean> => {
    return doesLocatorHaveAttributeOrPropValue(getButtonLocator(), 'aria-expanded', 'true');
  };

  const isOpen = async (): Promise<boolean> => {
    const isVisible = await isContentVisible();
    const isExp = await isExpanded();
    return isVisible && isExp;
  };

  const open = async () => {
    const isAlreadyOpen = await isOpen();
    if (isAlreadyOpen) {
      return;
    }
    const button = getButtonLocator();
    await button.click();
    await waitFor(() => {
      return isOpen();
    });
  };
  const close = async () => {
    const isAlreadyClosed = (await isOpen()) === false;
    if (isAlreadyClosed) {
      return;
    }
    const button = getButtonLocator();
    await button.click();
    await waitFor(async () => {
      return (await isOpen()) === false;
    });
  };

  const getBoundingBox = async (spacing = 8) => {
    const locator = getElementLocator();
    if ((await locator.count()) > 1) {
      return getDummyBoundingBox();
    }
    const box = (await locator.boundingBox()) || getDummyBoundingBox();

    box.x -= spacing;
    box.y -= spacing;
    box.height += 2 * spacing;
    box.width += 2 * spacing;

    return box;
  };

  return {
    getElementLocator,
    getContentLocator,
    isOpen,
    open,
    close,
    getBoundingBox,
    getButtonLocator,
    getInnerButtonLocator,
  };
}

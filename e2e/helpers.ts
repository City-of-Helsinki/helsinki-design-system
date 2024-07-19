import { Locator, Page, expect } from '@playwright/test';


export const getComponentStorybookUrls = async (page: Page, componentName: string) => {
    let componentUrls: string[] = [];
    const hds_root_dir = __dirname.split('/e2e')[0];
    const localStorybookPath = `file://${hds_root_dir}/packages/react/storybook-static/index.html?path=/story/`;

    await page.goto(`${localStorybookPath}components-${componentName}`);
    await expect(page.locator(`#components-${componentName}`)).toBeVisible();
    const componentLinks = await page.locator(`[data-parent-id="components-${componentName}"]`).all();

    for (const component of componentLinks) {
        await component.getAttribute('href').then((href) => {
            // don't add anything containing 'playground' to the list
            if (href && !href.includes('playground')) {
                // to use the inner iframe of the story instead
                const url = href.replace('index.html', 'iframe.html');
                componentUrls.push(url);
            }
        });
    }
    return componentUrls;
}

export const unfocusElement = async (page: Page, element: Locator) => {
    const elementBoundingBox = await element.boundingBox() || { x: 0, y: 0, width: 0, height: 0 };
    const outside = { x: elementBoundingBox.x - 1, y: elementBoundingBox.y - 1 };

    await page.mouse.move(outside.x, outside.y);
    await page.mouse.down();
    await page.mouse.up();
};

export const takeStateScreenshots = async (page: Page, element: Locator, screenshotPrefix: string) => {
    await element.scrollIntoViewIfNeeded();
    const elementBoundingBox = await element.boundingBox() || { x: 0, y: 0, width: 0, height: 0 };
    const outside = { x: elementBoundingBox.x - 1, y: elementBoundingBox.y - 1 };

    // to make sure nothing is focused
    await page.mouse.move(outside.x, outside.y);
    await page.mouse.down();
    await page.mouse.up();

    await element.hover();
    await takeScreenshotWithSpacing(page, element, `${screenshotPrefix}-hover`);
    await element.focus();
    await takeScreenshotWithSpacing(page, element, `${screenshotPrefix}-hover-focus`);
    // to make sure element loses hover
    await page.mouse.move(outside.x, outside.y);
    await takeScreenshotWithSpacing(page, element, `${screenshotPrefix}-focus`);

    // click the middle of the element
    await page.mouse.move(elementBoundingBox.x + elementBoundingBox.width / 2, elementBoundingBox.y + elementBoundingBox.height / 2);
    await page.mouse.down();

    await takeScreenshotWithSpacing(page, element, `${screenshotPrefix}-active`);
    await page.mouse.move(outside.x, outside.y);
    await page.mouse.up();
};

export const takeScreenshotWithSpacing = async (page: Page, element: Locator, screenshotName: string, spacing: number = 8) => {
    await element.scrollIntoViewIfNeeded();
    const elementBoundingBox = await element.boundingBox() || { x: 0, y: 0, width: 0, height: 0 };

    const clip = {
        x: elementBoundingBox.x - spacing > 0 ? elementBoundingBox.x - spacing : 0,
        y: elementBoundingBox.y - spacing > 0 ? elementBoundingBox.y - spacing : 0,
        width: elementBoundingBox.width + 2 * spacing,
        height: elementBoundingBox.height + 2 * spacing
    };

    return expect(page).toHaveScreenshot(
        `${screenshotName}.png`,
        { clip, fullPage: true }
    );
};
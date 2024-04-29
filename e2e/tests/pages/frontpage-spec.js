import { Page, expect, test } from '@playwright/test';


test.describe("Frontpage", () => {
    let page;

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        await page.goto('/');
    });


    test('title', async () => {
        const pageTitle = await page.title();
        expect(pageTitle).toContain("Helsinki Design System");
    });

})

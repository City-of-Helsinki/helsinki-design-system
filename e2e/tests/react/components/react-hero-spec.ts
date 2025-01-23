import { test } from '@playwright/test';
import { takeAllStorySnapshots } from '../../../utils/playwright.util';

const componentName = 'hero';
const storybook = 'react';
const takeStateSnapshots = false;
const bodySpacing = 30; // extra spacing around the body screenshots

test.describe(`Testing ${storybook} component "${componentName}"`, () => {
  test('Take snapshots of all stories', async ({ page, hasTouch }) => {
    await takeAllStorySnapshots({ page, hasTouch, takeStateSnapshots, storybook, componentName, bodySpacing });
  });
});

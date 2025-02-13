import { test } from '@playwright/test';
import { takeAllStorySnapshots } from '../../../utils/playwright.util';

const componentName = 'notification';
const storybook = 'core';
const takeStateSnapshots = true;

test.describe(`Testing ${storybook} component "${componentName}"`, () => {
  test('Take snapshots of all stories', async ({ page, hasTouch }) => {
    await takeAllStorySnapshots({ page, hasTouch, takeStateSnapshots, storybook, componentName });
  });
});

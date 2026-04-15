import { test } from '@playwright/test';
import { takeAllStorySnapshots } from '../../../utils/playwright.util';

const storybook = 'react';
const takeStateSnapshots = false;

const linkboxPrefixes = [
  'linkbox-empty-for-custom-content',
  'linkbox-with-image',
  'linkbox-with-text-and-heading',
] as const;

for (const componentName of linkboxPrefixes) {
  test.describe(`Testing ${storybook} component "${componentName}"`, () => {
    test('Take snapshots of all stories', async ({ page, hasTouch }) => {
      await takeAllStorySnapshots({ page, hasTouch, takeStateSnapshots, storybook, componentName });
    });
  });
}

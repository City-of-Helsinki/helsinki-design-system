import { test } from '@playwright/test';
import { takeAllStorySnapshots } from '../../../helpers';

const componentName = 'breadcrumb';
const storybook = 'react';
const takeStateSnapshots = true;

test.describe(`Testing ${storybook} component "${componentName}"`, () => {
  test('Take snapshots of all stories', async ({ page, isMobile }) => {
    await takeAllStorySnapshots({ page, isMobile, takeStateSnapshots, storybook, componentName });
  });
});

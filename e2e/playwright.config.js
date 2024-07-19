import { defineConfig, devices } from '@playwright/test';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  snapshotPathTemplate: '{testDir}/{testFilePath}-snapshots/{arg}{ext}',
  testDir: './tests',
  timeout: 60 * 1000,
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  workers: 2,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['junit', { outputFile: 'report/e2e-junit-results.xml' }],
    ['html', { open: 'never', outputFolder: 'report/html' }]
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    actionTimeout: 30 * 1000,
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.E2E_TESTS_ENV_URL ?? "https://hds.hel.fi",
    ignoreHTTPSErrors: true,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    // https://playwright.dev/docs/videos
    contextOptions: {recordVideo: { dir: "./report/videos/"}}
  },

  projects: [
    {
      name: 'Desktop',
      testMatch: [/tests/],
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 720 },
        isMobile: false,
      },
    },
    {
      name: 'Mobile',
      testMatch: [/tests/],
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 320, height: 576 },
        isMobile: true,
      },
    },
  ],
});

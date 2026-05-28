import { defineConfig, devices } from '@playwright/test';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  webServer: [
    !process.env.PACKAGE || process.env.PACKAGE === 'core' ?
    {
      command: 'pnpm serve-core',
      url: 'http://localhost:6007',
      stdout: 'ignore',
      stderr: 'pipe',
      reuseExistingServer: true,
    } : null,
    !process.env.PACKAGE || process.env.PACKAGE === 'react' ? 
    {
      command: 'pnpm serve-react',
      url: 'http://localhost:6006',
      stdout: 'ignore',
      stderr: 'pipe',
      reuseExistingServer: true,
    } : null,
  ].filter(Boolean),
  snapshotPathTemplate: '{testDir}/{testFilePath}-snapshots/{arg}{ext}',
  testDir: './tests/',
  timeout: 600 * 1000,
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  workers: 2,
  retries: 3,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['junit', { outputFile: 'report/e2e-junit-results.xml' }],
    ['html', { open: 'never', outputFolder: 'report/html' }],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    actionTimeout: 30 * 1000,
    ignoreHTTPSErrors: true,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    // https://playwright.dev/docs/videos
    // contextOptions: { recordVideo: { dir: './report/videos/' } },
    screenshot: 'only-on-failure',
    video: 'off',
    channel: 'chromium',
    launchOptions: {
      slowMo: 100,
    },
    expect: {
      timeout: 2000,
      toHaveScreenshot: {
        maxDiffPixelRatio: 0.01,
        threshold: 0.2,
      },
    },
  },
  projects: [
    {
      name: 'Desktop',
      testMatch: [/tests/],
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 720 },
        hasTouch: false,
      },
    },
    {
      name: 'Mobile',
      testMatch: [/tests/],
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 320, height: 720 },
        hasTouch: true,
      },
    },
  ],
});

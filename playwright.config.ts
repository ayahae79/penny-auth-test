import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  retries:  2,
  use: {
    baseURL: 'https://penny-auth.vercel.app',
    trace: 'on-first-retry',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});

import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  retries:  2,
  use: {
    baseURL: 'https://penny-auth.vercel.app',
    trace: 'on-first-retry',
  },
  projects: [
  {
    name: 'chromium',
    use: {
      ...devices['Desktop Chrome'],
      launchOptions: { slowMo: 700 }, 
      headless: true,
      video: 'on',            
      screenshot: 'only-on-failure', 
    }
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'iphone-16',
      use: { ...devices['iPhone 16'] },
    },
]

});

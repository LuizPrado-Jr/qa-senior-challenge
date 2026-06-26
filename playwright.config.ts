import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',
  timeout: 60000,
  retries: process.env.CI ? 2 : 0,

  expect: {
    timeout: 10000
  },

  reporter: [
    ['html'],
    ['list']
  ],

  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },

  projects: [
    {
      name: 'api',
      testMatch: /.*\/api\/.*\.spec\.ts/
    },
    {
      name: 'chromium',
      testMatch: /.*\/ui\/.*\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        baseURL: process.env.WEB_BASE_URL || 'https://www.saucedemo.com'
      }
    }
  ]
});
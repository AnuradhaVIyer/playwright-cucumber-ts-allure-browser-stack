import { defineConfig, devices } from '@playwright/test';
import { chromium } from 'playwright';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const isBrowserStack = process.env.RUN_ON_BROWSERSTACK === 'true';

export default defineConfig({
  testDir: './tests',
  timeout: 60000,
  use: isBrowserStack
    ? {
        baseURL: process.env.BROWSERSTACK_BASE_URL || 'http://localhost:3000',
        headless: true,
        video: 'off',
      }
    : {
        baseURL: process.env.LOCAL_BASE_URL || 'http://localhost:3000',
        headless: false,
        video: 'retain-on-failure',
        screenshot: 'only-on-failure', // or 'on' to capture screenshots for every test
      },
  projects: isBrowserStack
    ? [
        {
          name: 'Chrome@latest:Windows 11',
          use: {
            ...devices['Desktop Chrome'],
          },
        },
      ]
    : [
        {
          name: 'chromium',
          use: { ...devices['Desktop Chrome'] },
        },
      ],
});

// hooks/hooks.ts
import { BeforeAll, AfterAll, Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, Browser, BrowserContext, Page } from 'playwright';
import * as BrowserStackLocal from 'browserstack-local';
import dotenv from 'dotenv';

dotenv.config();

// Increase default timeout for long hooks (tunnel + browser connect)
setDefaultTimeout(6 * 60 * 1000); // 6 minutes

let browser: Browser;
let context: BrowserContext;
let local: BrowserStackLocal.Local | null = null;

// Helper function: start BrowserStack Local safely
async function startBrowserStackLocal(): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    if (!local) local = new BrowserStackLocal.Local();

    const caps = {
      'browserstack.local': 'true',
      'browserstack.username': process.env.BROWSERSTACK_USERNAME,
      'browserstack.accessKey': process.env.BROWSERSTACK_ACCESS_KEY,
    };

    const timeout = setTimeout(() => {
      reject(new Error('BrowserStack Local start timed out after 2 minutes'));
    }, 2 * 60 * 1000); // 2 minutes

    console.log('Initializing BrowserStack Local...');
    local.start(caps, (error) => {
      clearTimeout(timeout);
      if (error) {
        console.error('Failed to start BrowserStack Local:', error);
        reject(error);
      } else {
        console.log('BrowserStack Local is connected!');
        resolve();
      }
    });
  });
}

// BeforeAll hook: runs once before all scenarios
BeforeAll(async function () {
  const isBrowserStack = process.env.RUN_ON_BROWSERSTACK === 'true';

  if (isBrowserStack) {
    // Start BrowserStack Local
    await startBrowserStackLocal();

    // Connect to BrowserStack Playwright browser
    const caps = {
      browser: 'chrome',
      browser_version: 'latest',
      os: 'Windows',
      os_version: '10',
      name: 'Playwright Cucumber Test',
      build: 'Build 1',
      clientPlaywrightVersion: '1.53.0', // Explicitly specify client Playwright version
      'browserstack.username': process.env.BROWSERSTACK_USERNAME,
      'browserstack.accessKey': process.env.BROWSERSTACK_ACCESS_KEY,
      'browserstack.local': 'true',
       // **Enable BrowserStack Local here:**
       local: true, 
       // If you need to force traffic through the tunnel:
       forcelocal: true
    };

    console.log('Connecting to BrowserStack browser...');
    browser = await chromium.connect({
      wsEndpoint: `wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(JSON.stringify(caps))}`,
      timeout: 5 * 60 * 1000, // 5 minutes
    });
    console.log('Browser connected!');
  } else {
    // Local Playwright setup
    console.log('Launching local Chromium...');
    browser = await chromium.launch({ headless: false });
  }

  // Create a shared browser context
  context = await browser.newContext();
});

// Before each scenario: create scenario-scoped page
Before(async function () {
  this.page = await context.newPage();
});

// After each scenario: close the page
After(async function () {
  if (this.page) {
    await this.page.close();
  }
});

// AfterAll hook: clean up context, browser, and BrowserStack Local
AfterAll(async function () {
  if (context) {
    await context.close();
  }
  if (browser) {
    await browser.close();
  }

  if (local) {
    console.log('Stopping BrowserStack Local tunnel...');
    await new Promise<void>((resolve) => {
      local!.stop(() => {
        console.log('BrowserStack Local is stopped!');
        resolve();
      });
    });
  }
});

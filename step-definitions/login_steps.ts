import { Given, When, Then, After } from '@cucumber/cucumber';
import { chromium, Browser, Page } from 'playwright';
import { expect } from '@playwright/test';


Given('I am on the Sauce Demo login page', async function () {
  await this.page.goto('https://www.saucedemo.com/'); 
});

When('I enter {string} as username', async function (username: string) {
  await this.page.locator('[data-test="username"]').fill(username);
});

When('I enter {string} as password', async function (password: string) {
  await this.page.locator('[data-test="password"]').fill(password);
});

When('I click the {string} button', async function (buttonText: string) {
  await this.page.locator('[data-test="login-button"]').click();
});

Then('I should be logged in successfully and see the products page title', async function () {
  await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html');
  await expect(this.page.locator('.title')).toHaveText('Products'); 
  await this.page.close();
});

Then('I should see an error message {string}', async function (errorMessage: string) {
  await expect(this.page.locator('[data-test="error"]')).toContainText(errorMessage); 
  await this.page.close();
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

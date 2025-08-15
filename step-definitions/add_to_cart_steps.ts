import { Given, When, Then, After } from '@cucumber/cucumber';
import { chromium, Browser, Page } from 'playwright';
import { expect } from '@playwright/test';


Given('I am logged in as a {string} with {string}', async function (username: string, password: string) {
  
  await this.page.goto('https://www.saucedemo.com/');
  await this.page.locator('[data-test="username"]').fill(username);
  await this.page.locator('[data-test="password"]').fill(password);
  await this.page.locator('[data-test="login-button"]').click();
  await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html');
});

When('I add {string} to the cart', async function (productName: string) {
  console.log(`🔍 Looking for product: ${productName}`);

  // Locate the product title directly
  const productTitle = this.page.locator('.inventory_item_name', { hasText: productName });
  await productTitle.waitFor({ state: 'visible' });

  // From the title, find the correct add-to-cart button
  const addButton = productTitle.locator('xpath=ancestor::div[contains(@class, "inventory_item")]//button[contains(@id, "add-to-cart")]');
  await addButton.scrollIntoViewIfNeeded();
  await addButton.click();

  console.log(`✅ Clicked Add to Cart for: ${productName}`);
});

Then('the cart icon should show {string} item', async function (itemCount: string) {
  await expect(this.page.locator('.shopping_cart_link .shopping_cart_badge')).toHaveText(itemCount); 
});

Then('the cart icon should show {string} items', async function (itemCount: string) {
  await expect(this.page.locator('.shopping_cart_link .shopping_cart_badge')).toHaveText(itemCount); 
});


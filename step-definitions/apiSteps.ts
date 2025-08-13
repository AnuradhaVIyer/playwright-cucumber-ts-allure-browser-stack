// step-definitions/apiSteps.ts
import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { request, APIRequestContext } from 'playwright';

let apiContext: APIRequestContext;
let response: any;

// Step: Ensure API context is ready
Given('my local API is running', async function () {
  apiContext = await request.newContext({
    baseURL: process.env.BASE_URL,
  });
  console.log(`API context ready with base URL: ${process.env.BASE_URL}`);
});

// Step: Make the API request
When('I request {string} {string}', async function (method: string, endpoint: string) {
  console.log(`Making API request: ${method} ${endpoint}`);
  response = await apiContext.fetch(endpoint, { method });
});

// Step: Validate HTTP status code
Then('the response status should be {int}', async function (statusCode: number) {
  if (!response) throw new Error('No response found. Did you make the request?');
  expect(response.status()).toBe(statusCode);
});

// Step: Validate response contains a specific field
Then('the response should contain {string}', async function (field: string) {
  if (!response) throw new Error('No response found. Did you make the request?');
  const json = await response.json();
  const flatData = JSON.stringify(json);
  expect(flatData).toContain(field);
});

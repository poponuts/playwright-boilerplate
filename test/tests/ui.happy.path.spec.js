// @ts-check
const { test, expect } = require('@playwright/test');
const faker = require('faker');
// import { reactPageModel } from '../pages/react-page';
const { reactAppPage } = require('../pages/react-app');
const reactPageModel = require('../pages/react-page');

const name = faker.name.findName();
const image = faker.image.imageUrl();
const phone = faker.phone.phoneNumber();
const email = faker.internet.email();

let data = {
  'name': name,
  'avatar': image,
  'phone': phone,
  'email': email
};

test.describe('react app page', () => {
  test.beforeEach(async ({ page }) => {
    const reactPage = new reactAppPage(page);
    await reactPage.goto();
  });

  test('save successfully', async ({ page }) => {

    await expect(page).toHaveTitle(/React App/);
    // await expect(page.locator('[class="text-2xl leading-6 font-medium text-gray-900"]')).toHaveValue(/Profile/);
    const reactPage = new reactAppPage(page);
    await reactPage.enterdetails(data);
    await page.locator(reactPageModel.reactPageSelectors.saveButton).click();
    // await page.locator(reactPage.saveButton).click();
  });
});

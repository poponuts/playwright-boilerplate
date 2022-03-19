// @ts-check
const { test, expect } = require('@playwright/test');
const faker = require('faker');
// import { reactPageModel } from '../pages/react-page';
const { reactAppPage } = require('../pages/react-app');
const reactPageModel = require('../pages/react-page');

let data = 
  [{
    'name': 'Longnamethatismorethanthirtyfivecharacters',
    'avatar': '/user/evan/',
    'phone': 'abcd-efgh',
    'email': 'email.com'
  },{
    'name': 'speci@l_charact3rs!',
    'avatar': '#<>',
    'phone': ' 12345 6789',
    'email': 'evan@email'
  },{
    'name': 'e',
    'avatar': '...',
    'phone': '+61411011011',
    'email': 'Longnamethatismorethanthirtyfivecharacters@gmail.com'
  }];

test.describe('edge cases', () => {
  test.beforeEach(async ({ page }) => {
    const reactPage = new reactAppPage(page);
    await reactPage.goto();
  });

  for(const badData of data) {
  test(`save successfully with name ${badData.name}`, async ({ page }) => {
    const reactPage = new reactAppPage(page);
    await reactPage.enterdetails(badData);
    await page.locator(reactPageModel.reactPageSelectors.saveButton).click();
  });
  };
});

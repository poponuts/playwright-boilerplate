// @ts-check
const { test, expect } = require('@playwright/test');

const data = 'randomword';

test('api test on avatar url', async ({ request }) => {
  const response = await request.get(`/${data}`);
  expect(response.ok()).toBeTruthy();
});


// http://frontend.localhost/adsdasdas
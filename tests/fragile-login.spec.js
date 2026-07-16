const { test, expect } = require('@playwright/test');

test('Login thành công với selectors ổn định', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/login');

  // Selector tốt hơn: dùng id duy nhất cho từng input.
  await page.locator('#username').fill('tomsmith');
  await page.locator('#password').fill('SuperSecretPassword!');

  // Selector tốt hơn: dùng role button và type submit.
  await page.getByRole('button', { name: /login/i }).click();

  // Chờ chuyển hướng và kiểm tra thông báo thành công.
  await expect(page).toHaveURL(/\/secure/);
  await expect(page.locator('#flash')).toContainText('You logged into a secure area!');
});
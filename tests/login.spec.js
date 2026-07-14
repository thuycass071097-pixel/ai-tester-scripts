// Import các hàm cần thiết từ Playwright
const { test, expect } = require('@playwright/test');

// Nhóm các test liên quan đến chức năng Login
test.describe('Chức năng đăng nhập', () => {

  // Khai báo URL dùng chung cho các test
  const loginUrl = 'https://the-internet.herokuapp.com/login';

  // ==========================
  // Test case 1: Đăng nhập thành công
  // ==========================
  test('Đăng nhập thành công', async ({ page }) => {

    // Mở trang Login
    await page.goto(loginUrl);

    // Nhập username hợp lệ
    await page.locator('#username').fill('tomsmith');

    // Nhập password hợp lệ
    await page.locator('#password').fill('SuperSecretPassword!');

    // Click nút Login
    await page.locator('button[type="submit"]').click();

    // Kiểm tra URL đã chuyển sang /secure
    await expect(page).toHaveURL(/.*\/secure/);

    // Kiểm tra thông báo đăng nhập thành công
    await expect(page.locator('#flash')).toContainText(
      'You logged into a secure area!'
    );
  });

  // ==========================
  // Test case 2: Sai password
  // ==========================
  test('Đăng nhập thất bại - Sai password', async ({ page }) => {

    // Mở trang Login
    await page.goto(loginUrl);

    // Nhập username đúng
    await page.locator('#username').fill('tomsmith');

    // Nhập password sai
    await page.locator('#password').fill('wrongpassword');

    // Click Login
    await page.locator('button[type="submit"]').click();

    // Kiểm tra vẫn ở trang Login
    await expect(page).toHaveURL(/.*\/login/);

    // Kiểm tra hiển thị thông báo lỗi
    await expect(page.locator('#flash')).toContainText(
      'Your password is invalid!'
    );
  });

  // ==========================
  // Test case 3: Để trống form
  // ==========================
  test('Đăng nhập thất bại - Để trống form', async ({ page }) => {

    // Mở trang Login
    await page.goto(loginUrl);

    // Không nhập username và password

    // Click Login
    await page.locator('button[type="submit"]').click();

    // Kiểm tra vẫn ở trang Login
    await expect(page).toHaveURL(/.*\/login/);

    // Kiểm tra hiển thị thông báo lỗi
    await expect(page.locator('#flash')).toContainText(
      'Your username is invalid!'
    );
  });

});
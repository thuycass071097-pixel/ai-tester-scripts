// Import Playwright
const { test, expect } = require('@playwright/test');

// Import Page Objects
const LoginPage = require('../pages/LoginPage');
const SecurePage = require('../pages/SecurePage');

// Nhóm các test liên quan đến chức năng Login
test.describe('Chức năng đăng nhập', () => {

  // ==========================
  // Test case 1: Đăng nhập thành công
  // ==========================
  test('Đăng nhập thành công', async ({ page }) => {

    // Khởi tạo Page Objects
    const loginPage = new LoginPage(page);
    const securePage = new SecurePage(page);

    // Mở trang Login
    await loginPage.goto();

    // Đăng nhập với tài khoản hợp lệ
    await loginPage.login(
      'tomsmith',
      'SuperSecretPassword!'
    );

    // Kiểm tra đã chuyển sang trang Secure
    await securePage.verifySecurePage();

    // Kiểm tra thông báo thành công
    await securePage.verifyFlashMessage(
      'You logged into a secure area!'
    );

  });

  // ==========================
  // Test case 2: Sai password
  // ==========================
  test('Đăng nhập thất bại - Sai password', async ({ page }) => {

    // Khởi tạo Page Object
    const loginPage = new LoginPage(page);

    // Mở trang Login
    await loginPage.goto();

    // Đăng nhập với password sai
    await loginPage.login(
      'tomsmith',
      'wrongpassword'
    );

    // Kiểm tra vẫn ở trang Login
    await loginPage.verifyLoginPage();

    // Kiểm tra thông báo lỗi
    await loginPage.verifyFlashMessage(
      'Your password is invalid!'
    );

  });

  // ==========================
  // Test case 3: Để trống form
  // ==========================
  test('Đăng nhập thất bại - Để trống form', async ({ page }) => {

    // Khởi tạo Page Object
    const loginPage = new LoginPage(page);

    // Mở trang Login
    await loginPage.goto();

    // Không nhập Username và Password
    // Chỉ click Login
    await loginPage.clickLogin();

    // Kiểm tra vẫn ở trang Login
    await loginPage.verifyLoginPage();

    // Kiểm tra thông báo lỗi
    await loginPage.verifyFlashMessage(
      'Your username is invalid!'
    );

  });
  // ==========================
  // Test case 4: Kiểm tra trạng thái nút Login khi chưa nhập dữ liệu
  // ==========================
  test('Kiểm tra trạng thái nút Login khi chưa nhập gì', async ({ page }) => {

    // Khởi tạo Page Object
    const loginPage = new LoginPage(page);

    // Mở trang Login
    await loginPage.goto();

    // Kiểm tra nút Login vẫn hiển thị và có thể click
    await expect(loginPage.loginButton).toBeVisible();
    await expect(loginPage.loginButton).toBeEnabled();

  });


// ==========================
// Test case 5: Đăng nhập lại sau khi đăng xuất
// ==========================
test('Có thể đăng nhập lại ngay sau khi đăng xuất', async ({ page }) => {

  // Khởi tạo Page Objects
  const loginPage = new LoginPage(page);
  const securePage = new SecurePage(page);

  // Mở trang Login
  await loginPage.goto();

  // Đăng nhập lần đầu
  await loginPage.login(
    'tomsmith',
    'SuperSecretPassword!'
  );

  // Kiểm tra đăng nhập thành công
  await securePage.verifySecurePage();

  // Click Logout
  await securePage.logoutButton.click();

  // Kiểm tra quay về trang Login
  await loginPage.verifyLoginPage();

  // Đăng nhập lại ngay
  await loginPage.login(
    'tomsmith',
    'SuperSecretPassword!'
  );

  // Kiểm tra đăng nhập thành công lần thứ hai
  await securePage.verifySecurePage();

  // Kiểm tra thông báo thành công
  await securePage.verifyFlashMessage(
    'You logged into a secure area!'
  );

});

});
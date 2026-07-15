// Import Playwright
const { test, expect } = require('@playwright/test');

// Import Page Objects
const LoginPage = require('../pages/LoginPage');
const SecurePage = require('../pages/SecurePage');

/**
 * @typedef {Object} LoginTestData
 * @property {string} title
 * @property {string} username
 * @property {string} password
 * @property {string} expectedMessage
 * @property {boolean} shouldSucceed
 * @property {boolean} [useLoginButtonOnly]
 */

/** @type {LoginTestData[]} */
const loginScenarios = [
  {
    title: 'Đăng nhập thành công',
    username: 'tomsmith',
    password: 'SuperSecretPassword!',
    expectedMessage: 'You logged into a secure area!',
    shouldSucceed: true
  },
  {
    title: 'Đăng nhập thất bại - Sai password',
    username: 'tomsmith',
    password: 'wrongpassword',
    expectedMessage: 'Your password is invalid!',
    shouldSucceed: false
  },
  {
    title: 'Đăng nhập thất bại - Để trống form',
    username: '',
    password: '',
    expectedMessage: 'Your username is invalid!',
    shouldSucceed: false,
    useLoginButtonOnly: true
  }
];

// Nhóm các test liên quan đến chức năng Login
test.describe('Chức năng đăng nhập', () => {

  for (const data of loginScenarios) {
    test(data.title, async ({ page }) => {
      const loginPage = new LoginPage(page);
      const securePage = new SecurePage(page);

      await loginPage.goto();

      if (data.useLoginButtonOnly) {
        await loginPage.clickLogin();
      } else {
        await loginPage.login(data.username, data.password);
      }

      if (data.shouldSucceed) {
        await securePage.verifySecurePage();
        await securePage.verifyFlashMessage(data.expectedMessage);
      } else {
        await loginPage.verifyLoginPage();
        await loginPage.verifyFlashMessage(data.expectedMessage);
      }
    });
  }

  // ==========================
  // Test case 4: Kiểm tra các method mới của Page Object
  // ==========================
  test('Truy xuất nội dung flash message và trạng thái lỗi', async ({ page }) => {

    // Khởi tạo Page Object
    const loginPage = new LoginPage(page);

    // Mở trang Login
    await loginPage.goto();

    // Đăng nhập với password sai
    await loginPage.login('tomsmith', 'wrongpassword');

    // Kiểm tra nội dung flash message và trạng thái lỗi
    const flashText = await loginPage.getFlashText();
    expect(flashText).toContain('Your password is invalid!');
    expect(await loginPage.isErrorDisplayed()).toBeTruthy();

  });
  // ==========================
  // Test case 5: Kiểm tra trạng thái nút Login khi chưa nhập dữ liệu
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
// Page Object cho trang Login

const { expect } = require('@playwright/test');

class LoginPage {

  /**
   * Khởi tạo page
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // URL của trang Login
    this.url = 'https://the-internet.herokuapp.com/login';

    // ==========================
    // Khai báo các locator
    // ==========================

    // Ô nhập Username
    this.usernameTextbox = page.locator('#username');

    // Ô nhập Password
    this.passwordTextbox = page.locator('#password');

    // Nút Login
    this.loginButton = page.locator('button[type="submit"]');

    // Thông báo kết quả
    this.flashMessage = page.locator('#flash');
  }

  /**
   * Mở trang Login
   */
  async goto() {
    await this.page.goto(this.url);
  }

  /**
   * Nhập Username
   * @param {string} username
   */
  async enterUsername(username) {
    await this.usernameTextbox.fill(username);
  }

  /**
   * Nhập Password
   * @param {string} password
   */
  async enterPassword(password) {
    await this.passwordTextbox.fill(password);
  }

  /**
   * Click nút Login
   */
  async clickLogin() {
    await this.loginButton.click();
  }

  /**
   * Thực hiện đăng nhập
   * @param {string} username
   * @param {string} password
   */
  async login(username, password) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLogin();
  }

  /**
   * Kiểm tra đang ở trang Login
   */
  async verifyLoginPage() {
    await expect(this.page).toHaveURL(/.*\/login/);
  }

  /**
   * Kiểm tra nội dung thông báo
   * @param {string} message
   */
  async verifyFlashMessage(message) {
    await expect(this.flashMessage).toContainText(message);
  }

}

module.exports = LoginPage;
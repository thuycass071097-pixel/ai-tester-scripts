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
    this.errorMessage = page.locator('#flash.error');
  }

  /**
   * Mở trang Login
   * @returns {Promise<void>}
   */
  async goto() {
    await this.page.goto(this.url);
  }

  /**
   * Nhập Username
   * @param {string} username
   * @returns {Promise<void>}
   */
  async enterUsername(username) {
    await this.usernameTextbox.fill(username);
  }

  /**
   * Nhập Password
   * @param {string} password
   * @returns {Promise<void>}
   */
  async enterPassword(password) {
    await this.passwordTextbox.fill(password);
  }

  /**
   * Click nút Login
   * @returns {Promise<void>}
   */
  async clickLogin() {
    await this.loginButton.click();
  }

  /**
   * Thực hiện đăng nhập
   * @param {string} username
   * @param {string} password
   * @returns {Promise<void>}
   */
  async login(username, password) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLogin();
  }

  /**
   * Trả về nội dung flash message
   * @returns {Promise<string|null>}
   */
  async getFlashText() {
    return this.flashMessage.textContent();
  }

  /**
   * Kiểm tra có hiển thị thông báo lỗi hay không
   * @returns {Promise<boolean>}
   */
  async isErrorDisplayed() {
    return this.errorMessage.isVisible();
  }

  /**
   * Kiểm tra đang ở trang Login
   * @returns {Promise<void>}
   */
  async verifyLoginPage() {
    await expect(this.page).toHaveURL(/.*\/login/);
  }

  /**
   * Kiểm tra nội dung thông báo
   * @param {string} message
   * @returns {Promise<void>}
   */
  async verifyFlashMessage(message) {
    await expect(this.flashMessage).toContainText(message);
  }

}

module.exports = LoginPage;
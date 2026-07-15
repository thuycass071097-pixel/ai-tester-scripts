// Page Object cho trang Secure sau khi đăng nhập thành công

const { expect } = require('@playwright/test');

class SecurePage {

  /**
   * Khởi tạo page
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // ==========================
    // Khai báo locator
    // ==========================

    // Thông báo thành công
    this.flashMessage = page.locator('#flash');

    // Nút Logout
    this.logoutButton = page.locator('.icon-signout');
    this.welcomeMessage = page.locator('h2');
  }

  /**
   * Kiểm tra trang Secure đã load xong
   * @returns {Promise<boolean>}
   */
  async isLoaded() {
    await expect(this.page).toHaveURL(/.*\/secure/);
    return this.logoutButton.isVisible();
  }

  /**
   * Trả về nội dung welcome message
   * @returns {Promise<string|null>}
   */
  async getWelcomeMessage() {
    return this.welcomeMessage.textContent();
  }

  /**
   * Thực hiện logout
   * @returns {Promise<void>}
   */
  async logout() {
    await this.logoutButton.click();
  }

  /**
   * Kiểm tra đã chuyển sang trang Secure
   * @returns {Promise<void>}
   */
  async verifySecurePage() {
    await expect(this.page).toHaveURL(/.*\/secure/);
  }

  /**
   * Kiểm tra thông báo thành công
   * @param {string} message
   * @returns {Promise<void>}
   */
  async verifyFlashMessage(message) {
    await expect(this.flashMessage).toContainText(message);
  }

}

module.exports = SecurePage;
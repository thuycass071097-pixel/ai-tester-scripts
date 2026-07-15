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
  }

  /**
   * Kiểm tra đã chuyển sang trang Secure
   */
  async verifySecurePage() {
    await expect(this.page).toHaveURL(/.*\/secure/);
  }

  /**
   * Kiểm tra thông báo thành công
   * @param {string} message
   */
  async verifyFlashMessage(message) {
    await expect(this.flashMessage).toContainText(message);
  }

}

module.exports = SecurePage;
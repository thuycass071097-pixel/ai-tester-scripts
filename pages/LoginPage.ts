import { expect, type Page } from '@playwright/test';

export default class LoginPage {
  private readonly page: Page;
  private readonly url: string;
  private readonly usernameTextbox;
  private readonly passwordTextbox;
  private readonly loginButton;
  private readonly flashMessage;
  private readonly errorMessage;

  constructor(page: Page) {
    this.page = page;
    this.url = 'https://the-internet.herokuapp.com/login';

    this.usernameTextbox = page.locator('#username');
    this.passwordTextbox = page.locator('#password');
    this.loginButton = page.locator('button[type="submit"]');
    this.flashMessage = page.locator('#flash');
    this.errorMessage = page.locator('#flash.error');
  }

  async goto(): Promise<void> {
    await this.page.goto(this.url);
  }

  async enterUsername(username: string): Promise<void> {
    await this.usernameTextbox.fill(username);
  }

  async enterPassword(password: string): Promise<void> {
    await this.passwordTextbox.fill(password);
  }

  async clickLogin(): Promise<void> {
    await this.loginButton.click();
  }

  async login(username: string, password: string): Promise<void> {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLogin();
  }

  async getFlashText(): Promise<string | null> {
    return this.flashMessage.textContent();
  }

  async isErrorDisplayed(): Promise<boolean> {
    return this.errorMessage.isVisible();
  }

  async verifyLoginPage(): Promise<void> {
    await expect(this.page).toHaveURL(/.*\/login/);
  }

  async verifyFlashMessage(message: string): Promise<void> {
    await expect(this.flashMessage).toContainText(message);
  }
}

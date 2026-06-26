import { Page, expect } from '@playwright/test';
import { BasePage } from './base/BasePage';

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private usernameInput = '[data-test="username"]';
  private passwordInput = '[data-test="password"]';
  private loginButton = '[data-test="login-button"]';
  private errorMessage = '[data-test="error"]';

  async goto() {
    await this.navigateTo('/');
  }

  async login(username: string, password: string) {
    await this.fill(this.usernameInput, username);
    await this.fill(this.passwordInput, password);
    await this.click(this.loginButton);
  }

  async validateLoginError(expectedMessage: string) {
  const error = this.page.locator(this.errorMessage);

  await error.waitFor({ state: 'visible', timeout: 10000 });
  await expect(error).toContainText(expectedMessage, { timeout: 10000 });
}
}
import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
  constructor(protected page: Page) {}

  async navigateTo(path: string = '/') {
    await this.page.goto(path);
  }

  async click(locator: string | Locator) {
    const element = typeof locator === 'string'
      ? this.page.locator(locator)
      : locator;

    await element.click();
  }

  async fill(locator: string | Locator, value: string) {
    const element = typeof locator === 'string'
      ? this.page.locator(locator)
      : locator;

    await element.fill(value);
  }

  async validateText(locator: string | Locator, expectedText: string) {
    const element = typeof locator === 'string'
      ? this.page.locator(locator)
      : locator;

    await expect(element).toHaveText(expectedText);
  }

  async validateContainsText(locator: string | Locator, expectedText: string) {
    const element = typeof locator === 'string'
      ? this.page.locator(locator)
      : locator;

    await expect(element).toContainText(expectedText);
  }

  async validateVisible(locator: string | Locator) {
    const element = typeof locator === 'string'
      ? this.page.locator(locator)
      : locator;

    await expect(element).toBeVisible();
  }
}
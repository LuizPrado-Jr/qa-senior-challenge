import { Page, expect } from '@playwright/test';

export class CheckoutPage {
  constructor(private page: Page) {}

  private firstNameInput = '[data-test="firstName"]';
  private lastNameInput = '[data-test="lastName"]';
  private postalCodeInput = '[data-test="postalCode"]';
  private continueButton = '[data-test="continue"]';
  private finishButton = '[data-test="finish"]';
  private successMessage = '[data-test="complete-header"]';
  private summaryTotal = '[data-test="total-label"]';

  async fillCheckoutInformation(firstName: string, lastName: string, postalCode: string) {
    await this.page.fill(this.firstNameInput, firstName);
    await this.page.fill(this.lastNameInput, lastName);
    await this.page.fill(this.postalCodeInput, postalCode);
    await this.page.click(this.continueButton);
  }

  async validateCheckoutOverview() {
    await expect(this.page.locator(this.summaryTotal)).toBeVisible();
  }

  async finishPurchase() {
    await this.page.click(this.finishButton);
  }

  async validatePurchaseSuccess(expectedMessage: string) {
    await expect(this.page.locator(this.successMessage)).toHaveText(expectedMessage);
  }
}
import { Page, expect } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  private title = '[data-test="title"]';
  private checkoutButton = '[data-test="checkout"]';

  async validateCartPage() {
    await expect(this.page.locator(this.title)).toHaveText('Your Cart');
  }

  async validateProductInCart(productName: string) {
    await expect(this.page.locator('.cart_item')).toContainText(productName);
  }

  async goToCheckout() {
    await this.page.click(this.checkoutButton);
  }
}
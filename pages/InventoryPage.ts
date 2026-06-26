import { Page, expect } from '@playwright/test';

export class InventoryPage {
  constructor(private page: Page) {}

  private title = '[data-test="title"]';
  private cartBadge = '[data-test="shopping-cart-badge"]';
  private cartLink = '[data-test="shopping-cart-link"]';

  async validateInventoryPage() {
    await expect(this.page.locator(this.title)).toHaveText('Products');
  }

  async addProductToCart(productName: string) {
    const productCard = this.page.locator('.inventory_item').filter({
      hasText: productName
    });

    await productCard.getByRole('button', { name: 'Add to cart' }).click();
  }

  async validateCartQuantity(quantity: string) {
    await expect(this.page.locator(this.cartBadge)).toHaveText(quantity);
  }

  async goToCart() {
    await this.page.click(this.cartLink);
  }
}
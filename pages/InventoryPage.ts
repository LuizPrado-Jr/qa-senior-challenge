import { Page, expect } from '@playwright/test';
import { BasePage } from './base/BasePage';

export class InventoryPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private title = '[data-test="title"]';
  private cartBadge = '[data-test="shopping-cart-badge"]';
  private cartLink = '[data-test="shopping-cart-link"]';

  async validateInventoryPage() {
    await this.validateText(this.title, 'Products');
  }

  async addProductToCart(productName: string) {
    const productCard = this.page.locator('.inventory_item').filter({
      hasText: productName
    });

    await productCard.getByRole('button', { name: 'Add to cart' }).click();
  }

  async validateCartQuantity(quantity: string) {
    await this.validateText(this.cartBadge, quantity);
  }

  async goToCart() {
    await this.click(this.cartLink);
  }
}
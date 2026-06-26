import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';
import uiData from '../../data/uiData.json';

test.describe('UI - Purchase Flow', () => {
  test('Should complete purchase successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await loginPage.goto();

    await loginPage.login(
      process.env.STANDARD_USER as string,
      process.env.PASSWORD as string
    );

    await inventoryPage.validateInventoryPage();

    await inventoryPage.addProductToCart(uiData.products.backpack);
    await inventoryPage.validateCartQuantity('1');

    await inventoryPage.goToCart();

    await cartPage.validateCartPage();
    await cartPage.validateProductInCart(uiData.products.backpack);

    await cartPage.goToCheckout();

    await checkoutPage.fillCheckoutInformation(
      uiData.checkoutUser.firstName,
      uiData.checkoutUser.lastName,
      uiData.checkoutUser.postalCode
    );

    await checkoutPage.validateCheckoutOverview();

    await checkoutPage.finishPurchase();

    await checkoutPage.validatePurchaseSuccess(uiData.messages.checkoutSuccess);
  });
});
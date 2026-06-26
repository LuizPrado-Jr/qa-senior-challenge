import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import uiData from '../../data/uiData.json';

test.describe('UI - Login', () => {
  test('Should login successfully with valid user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.goto();

    await loginPage.login(
      process.env.STANDARD_USER as string,
      process.env.PASSWORD as string
    );

    await inventoryPage.validateInventoryPage();
  });

  test('Should show error message for locked user', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.login(
      process.env.LOCKED_USER as string,
      process.env.PASSWORD as string
    );

    await loginPage.validateLoginError(uiData.messages.lockedUserError);
  });
});
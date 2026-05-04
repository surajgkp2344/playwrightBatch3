import { test, expect } from '@playwright/test';

/**
 * Refactoring Exercise: Cart Tests
 * 
 * TODO:
 * 1. Identify the locators and actions within these tests.
 * 2. Create Locator variables and methods inside `pages/CartPage.ts`.
 * 3. Import and instantiate `CartPage` in this file.
 * 4. Replace the raw Playwright commands with the newly created methods!
 */
test.describe('Shopping Cart functionality', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://imaginary-store.com/cart');
    });

    test('should view added items in the cart', async ({ page }) => {
        await page.getByTestId('cart-items-container').waitFor();

        await expect(page.getByRole('list', { name: 'Cart items' })).toBeVisible();
    });

    test('should update item quantity and recalculate total', async ({ page }) => {
        const row = page.getByRole('row', { name: 'Pro Wireless Mouse' });
        await row.getByLabel('Quantity').fill('2');
        await row.getByRole('button', { name: 'Update' }).click();

        await expect(page.getByTestId('cart-total')).toHaveText('$99.98');
    });

    test('should remove item from the cart', async ({ page }) => {
        const row = page.getByRole('row', { name: 'Pro Wireless Mouse' });
        await row.getByRole('button', { name: 'Remove item' }).click();

        await expect(page.getByText('Pro Wireless Mouse')).toBeHidden();
    });

    test('should apply a valid discount code successfully', async ({ page }) => {
        await page.getByLabel('Discount Code').fill('SAVE20');
        await page.getByRole('button', { name: 'Apply' }).click();

        await expect(page.getByText('Promo code applied!')).toBeVisible();
    });

    test('should display error message for an expired promo code', async ({ page }) => {
        await page.getByLabel('Discount Code').fill('EXPIRED50');
        await page.getByRole('button', { name: 'Apply' }).click();

        await expect(page.getByRole('alert', { name: 'Promo error' })).toHaveText('This code has expired.');
    });
});

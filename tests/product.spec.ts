import { expect } from '@playwright/test';
import { test } from '../fixtures/loginFixtures';

/**
 * Refactoring Exercise: Product Tests
 * 
 * TODO:
 * 1. Identify the locators and actions within these tests.
 * 2. Create Locator variables and methods inside `pages/ProductPage.ts`.
 * 3. Import and instantiate `ProductPage` in this file.
 * 4. Replace the raw Playwright commands with the newly created methods!
 */
test.describe('Product Details functionality', () => {

    test.beforeEach(async ({ page }) => {
        // await page.goto('https://imaginary-store.com/product/12345');
    });

    test('should display accurate product title and price', async ({ loggedInPage }) => {
        await expect(loggedInPage.getByRole('heading', { level: 1 })).toHaveText('Pro Wireless Mouse');
        await expect(loggedInPage.getByTestId('product-price')).toHaveText('$49.99');
    });

    test('should allow selecting product size and color variants', async ({ loggedInPage }) => {
        await loggedInPage.getByRole('combobox', { name: 'Select Size' }).selectOption('Large');
        await loggedInPage.getByRole('combobox', { name: 'Select Color' }).selectOption('Red');

        await expect(loggedInPage.getByText('Selected: Large, Red')).toBeVisible();
    });

    test('should add product to cart successfully', async ({ loggedInPage }) => {
        await loggedInPage.getByRole('button', { name: 'Add to Cart' }).click();

        await expect(loggedInPage.getByRole('alert')).toHaveText('Product added to your cart.');
        await expect(loggedInPage.getByLabel('Cart count')).toHaveText('1');
    });

    test('should allow submitting a user review', async ({ loggedInPage }) => {
        await loggedInPage.getByRole('button', { name: 'Write a Review' }).click();
        await loggedInPage.getByRole('slider', { name: 'Rating' }).fill('5');
        await loggedInPage.getByLabel('Your comments').fill('Excellent product!');
        await loggedInPage.getByRole('button', { name: 'Submit Review' }).click();

        await expect(loggedInPage.getByText('Thanks for your review')).toBeVisible();
    });

    test('should show low stock warning banner if applicable', async ({ loggedInPage }) => {
        await loggedInPage.goto('https://imaginary-store.com/product/low-stock-item-id');

        await expect(loggedInPage.getByRole('alert', { name: 'Hurry, only 2 left in stock!' })).toBeVisible();
    });
});





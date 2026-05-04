import { test, expect } from '@playwright/test';
import { CheckoutPage } from '../pages/CheckoutPage';
import { LoginPage } from '../pages/LoginPage';
/**
 * Refactoring Exercise: Checkout Tests
 * 
 * TODO:
 * 1. Identify the locators and actions within these tests.
 * 2. Create Locator variables and methods inside `pages/CheckoutPage.ts`.
 * 3. Import and instantiate `CheckoutPage` in this file.
 * 4. Replace the raw Playwright commands with the newly created methods!
 */
test.describe('Checkout functionality', () => {
    let checkoutPage: CheckoutPage;
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        checkoutPage = new CheckoutPage(page);
        loginPage = new LoginPage(page);
        await checkoutPage.goto();
        await loginPage.login('sanjeev@gmail.com', 'Sanjeev123@');
    });

    test('should complete guest checkout workflow', async ({ page }) => {
        await checkoutPage.fillShippingInfo('Jane Doe', '123 Fake St', 'New York', '10001');

        await checkoutPage.fillPaymentInfo('1111222233334444', '12/25', '123');

        await checkoutPage.completePurchase();

        await expect(checkoutPage.orderConfirmationHeading).toBeVisible();
    });

    // test('should validate mandatory shipping information fields', async ({ page }) => {
    //     await checkoutPage.completePurchase();

    //     await expect(checkoutPage.shippingAddressError).toBeVisible();
    // });

    test('should display payment declined error for bad card', async ({ page }) => {
        await checkoutPage.fillShippingInfo('John Doe', '456 Test Ave', 'Boston', '02108');

        await checkoutPage.fillPaymentInfo('0000000000000000', '01/20', '000');
        0
        await checkoutPage.completePurchase();

        await expect(checkoutPage.paymentError).toHaveText('Payment declined by your bank.');
    });

    test('should apply calculated tax based on shipping state', async ({ page }) => {
        await checkoutPage.fillShippingInfo('Alice', '789 CA blvd', 'Los Angeles', '90001');

        await expect(checkoutPage.taxAmount).toHaveText('$5.50');
    });

    test('should return order summary correctly', async ({ page }) => {
        await expect(checkoutPage.orderSummaryBox).toContainText('Subtotal');
        await expect(checkoutPage.orderSummaryBox).toContainText('Shipping');
    });
});

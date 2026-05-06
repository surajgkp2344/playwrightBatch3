import { test, expect } from '@playwright/test';
import { PaymentPage } from '../pages/PaymentPage';

test.describe('Payment Functionality', () => {
    let paymentPage: PaymentPage;

    test.beforeEach(async ({ page }) => {
        paymentPage = new PaymentPage(page);
        await paymentPage.goto();
    });

    test('should process payment successfully with valid card details', async () => {
        await paymentPage.enterCardDetails('1234567890123456', '12/26', '123', 'John Doe');
        await paymentPage.submitPayment();
        await expect(paymentPage.successMessage).toBeVisible();
    });

    test('should show error when submitting empty payment form', async () => {
        await paymentPage.submitPayment();
        await expect(paymentPage.errorMessage).toBeVisible();
        await expect(paymentPage.errorMessage).toHaveText('Please fill in all required fields');
    });

    test('should be able to check save card for future payments', async () => {
        await paymentPage.saveCardCheckbox.check();
        await expect(paymentPage.saveCardCheckbox).toBeChecked();
    });

    test('should show error for invalid card number', async () => {
        await paymentPage.enterCardDetails('invalid_card', '12/26', '123', 'John Doe');
        await paymentPage.submitPayment();
        await expect(paymentPage.errorMessage).toBeVisible();
        await expect(paymentPage.errorMessage).toContainText('Invalid card number format');
    });

    test('should show error for expired card', async () => {
        await paymentPage.enterCardDetails('1234567890123456', '01/20', '123', 'John Doe');
        await paymentPage.submitPayment();
        await expect(paymentPage.errorMessage).toBeVisible();
        await expect(paymentPage.errorMessage).toContainText('Card has expired');
    });
});

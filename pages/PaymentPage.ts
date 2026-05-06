import { Locator, type Page } from '@playwright/test';

export class PaymentPage {
    public readonly page: Page;
    public readonly cardNumberInput: Locator;
    public readonly expiryDateInput: Locator;
    public readonly cvvInput: Locator;
    public readonly nameOnCardInput: Locator;
    public readonly payButton: Locator;
    public readonly successMessage: Locator;
    public readonly errorMessage: Locator;
    public readonly saveCardCheckbox: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cardNumberInput = page.getByLabel('Card Number');
        this.expiryDateInput = page.getByLabel('Expiry Date');
        this.cvvInput = page.getByLabel('CVV');
        this.nameOnCardInput = page.getByLabel('Name on Card');
        this.payButton = page.getByRole('button', { name: 'Pay Now' });
        this.successMessage = page.getByText('Payment Successful');
        this.errorMessage = page.getByRole('alert');
        this.saveCardCheckbox = page.getByLabel('Save this card for future payments');
    }

    async goto() {
        await this.page.goto('https://imaginary-store.com/payment');
    }

    async enterCardDetails(cardNumber: string, expiryDate: string, cvv: string, name: string) {
        await this.cardNumberInput.fill(cardNumber);
        await this.expiryDateInput.fill(expiryDate);
        await this.cvvInput.fill(cvv);
        await this.nameOnCardInput.fill(name);
    }

    async submitPayment() {
        await this.payButton.click();
    }
}

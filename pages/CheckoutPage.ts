import { Locator, type Page } from '@playwright/test';

export class CheckoutPage {
    public readonly page: Page;
    public readonly fullNameInput: Locator;
    public readonly streetAddressInput: Locator;
    public readonly cityInput: Locator;
    public readonly zipCodeInput: Locator;
    public readonly creditCardNumberInput: Locator;
    public readonly expirationDateInput: Locator;
    public readonly securityCodeInput: Locator;
    public readonly completePurchaseButton: Locator;
    public readonly orderConfirmationHeading: Locator;
    public readonly shippingAddressError: Locator;
    public readonly paymentError: Locator;
    public readonly taxAmount: Locator;
    public readonly orderSummaryBox: Locator;
    public readonly proceedToCheckout: Locator;

    constructor(page: Page) {
        this.page = page;
        this.fullNameInput = page.getByLabel('Full Name');
        this.streetAddressInput = page.getByLabel('Street Address');
        this.cityInput = page.getByLabel('City');
        this.zipCodeInput = page.getByLabel('Zip Code');
        this.creditCardNumberInput = page.getByLabel('Credit Card Number');
        this.expirationDateInput = page.getByLabel('Expiration Date (MM/YY)');
        this.securityCodeInput = page.getByLabel('Security Code (CVV)');
        this.completePurchaseButton = page.getByRole('button', { name: 'Complete Purchase' });
        this.orderConfirmationHeading = page.getByRole('heading', { name: 'Order Confirmation' });
        this.shippingAddressError = page.getByText('Shipping address is required');
        this.paymentError = page.getByRole('alert');
        this.taxAmount = page.getByTestId('tax-amount');
        this.orderSummaryBox = page.getByTestId('order-summary-box');
        this.proceedToCheckout = page.getByRole('button', { name: 'Proceed to Checkout' });
    }

    async fillShippingInfo(fullName: string, streetAddress: string, city: string, zipCode: string) {
        await this.fullNameInput.fill(fullName);
        await this.streetAddressInput.fill(streetAddress);
        await this.cityInput.fill(city);
        await this.zipCodeInput.fill(zipCode);
    }

    async fillPaymentInfo(creditCardNumber: string, expirationDate: string, securityCode: string) {
        await this.creditCardNumberInput.fill(creditCardNumber);
        await this.expirationDateInput.fill(expirationDate);
        await this.securityCodeInput.fill(securityCode);
    }

    async completePurchase() {
        await this.completePurchaseButton.click();
    }

    async goto() {
        await this.page.goto('https://imaginary-store.com/checkout');
    }

    async proceedToCheckoutMethod() {
        await this.proceedToCheckout.click();
    }
}

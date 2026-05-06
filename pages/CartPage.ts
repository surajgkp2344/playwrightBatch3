import { type Page, Locator} from '@playwright/test';

export class CartPage {
    public readonly page: Page;
    public readonly cartItemsContainer: Locator;
    public readonly cartTotal: Locator;
    public readonly discountCodeInput: Locator;
    public readonly applyButton: Locator;
    public readonly promoAppliedMessage: Locator;
    public readonly promoErrorMessage: Locator;
    public readonly removeItemButton: Locator;
    public readonly updateButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartItemsContainer = page.getByTestId('cart-items-container');
        this.cartTotal = page.getByTestId('cart-total');
        this.discountCodeInput = page.getByLabel('Discount Code');
        this.applyButton = page.getByRole('button', { name: 'Apply' });
        this.promoAppliedMessage = page.getByText('Promo code applied!');
        this.promoErrorMessage = page.getByRole('alert', { name: 'Promo error' });
        this.removeItemButton = page.getByRole('button', { name: 'Remove item' });
        this.updateButton = page.getByRole('button', { name: 'Update' });
    }

    // TODO: Implement the methods required by your tests
}

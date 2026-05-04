import { type Locator, type Page } from '@playwright/test';

export class SignUpPage {
    public readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // TODO: Define locators as readonly properties (e.g., readonly firstNameInput: Locator;)
    // TODO: Initialize locators in the constructor
    // TODO: Implement the methods required by your tests
}

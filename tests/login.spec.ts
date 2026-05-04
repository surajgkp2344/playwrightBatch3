import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { generateUserDetails } from '../utils/userGenerator';
import {users} from '../test-data/user';

/**
 * Refactoring Exercise: Login Tests
 * 
 * TODO:
 * 1. Identify the locators and actions within these tests.
 * 2. Create Locator variables and methods inside `pages/LoginPage.ts`.
 * 3. Import and instantiate `LoginPage` in this file.
 * 4. Replace the raw Playwright commands with the newly created methods!
 */
test.describe('Login functionality', () => {

    let loginPage: LoginPage;
    let user: any;
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.goto();
        user = generateUserDetails();
    });

    test('user should be able to enter email', async ({page}) =>{
        await loginPage.enterEmail(user.email);
        await expect(loginPage.emailInput).toHaveValue(user.email);
    })

    test('user should be able to enter password', async ({page}) =>{
        await loginPage.enterPassword(user.password);
        await expect(loginPage.passwordInput).toHaveValue(user.password);
    })

    test('should login successfully with valid credentials', async ({ page }) => {

        await loginPage.login(users.validUser.email, users.validUser.password);
        await expect(loginPage.welcomeMsg).toBeVisible();
    });

    test('should show error with invalid credentials', async ({ page }) => {
        await loginPage.login(users.invalidUser.email, users.invalidUser.password);
        await expect(loginPage.errorMessage).toHaveText('Invalid username or password.');
    });

    test('should navigate to registration page', async ({ page }) => {
        await loginPage.clickCreateAccountBtn();
        await expect(loginPage.createAccountHeading).toBeVisible();
    });

    test('should submit forgot password request', async ({ page }) => {
        await loginPage.forgotPassword(user.email);
        await expect(loginPage.forgotPasswordSuccessMsg).toBeVisible();
    });

    test('should show validation errors for empty fields', async ({ page }) => {
        await loginPage.clickSignInBtn();

        await expect(loginPage.emailRequireError).toBeVisible();
        await expect(loginPage.passwordRequireError).toBeVisible();
    });
});

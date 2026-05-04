import { test, expect } from '@playwright/test';
import {generateUserDetails} from '../utils/userGenerator';

/**
 * Refactoring Exercise: Sign Up Tests
 * 
 * TODO:
 * 1. Identify the locators and actions within these tests.
 * 2. Create Locator variables and methods inside `pages/SignUpPage.ts`.
 * 3. Import and instantiate `SignUpPage` in this file.
 * 4. Replace the raw Playwright commands with the newly created methods!
 */
test.describe('Sign Up functionality', () => {
    let user: any;
    test.beforeEach(async ({ page }) => {
        await page.goto('https://imaginary-store.com/signup');
        user = generateUserDetails();
    });

    test('should register a new user successfully', async ({ page }) => {
        await page.getByLabel('First Name').fill(user.firstName);
        await page.getByLabel('Last Name').fill(user.lastName);
        await page.getByLabel('Email Address').fill(user.email);
        await page.getByLabel('Username').fill(user.username);
        await page.getByLabel('Password', { exact: true }).fill(user.password);
        await page.getByLabel('Confirm Password').fill(user.confirmPassword);
        await page.getByLabel('I agree to the Terms of Service').check();
        await page.getByRole('button', { name: 'Create Account' }).click();

        await expect(page.getByRole('heading', { name: 'Welcome to your dashboard!' })).toBeVisible();
    });

    test('should show error when email is already registered', async ({ page }) => {
        await page.getByLabel('First Name').fill(user.firstName);
        await page.getByLabel('Last Name').fill(user.lastName);
        await page.getByLabel('Email Address').fill(user.email);
        await page.getByLabel('Username').fill(user.username);
        await page.getByLabel('Password', { exact: true }).fill(user.password);
        await page.getByLabel('Confirm Password').fill(user.confirmPassword);
        await page.getByLabel('I agree to the Terms of Service').check();
        await page.getByRole('button', { name: 'Create Account' }).click();

        await expect(page.getByRole('alert')).toHaveText('An account with this email already exists.');
    });

    test('should show validation errors for missing mandatory fields', async ({ page }) => {
        await page.getByRole('button', { name: 'Create Account' }).click();

        await expect(page.getByText('First Name is required')).toBeVisible();
        await expect(page.getByText('Email Address is required')).toBeVisible();
        await expect(page.getByText('Password is required')).toBeVisible();
        await expect(page.getByText('You must agree to the Terms of Service')).toBeVisible();
    });

    test('should show error when passwords do not match', async ({ page }) => {
        await page.getByLabel('First Name').fill(user.firstName);
        await page.getByLabel('Last Name').fill(user.lastName);
        await page.getByLabel('Email Address').fill(user.email);
        await page.getByLabel('Password', { exact: true }).fill(user.password);
        await page.getByLabel('Confirm Password').fill(user.confirmPassword);
        await page.getByRole('button', { name: 'Create Account' }).click();

        await expect(page.getByText('Passwords do not match')).toBeVisible();
    });

    test('should show warning for weak password strength', async ({ page }) => {
        await page.getByLabel('First Name').fill(user.firstName);
        await page.getByLabel('Last Name').fill(user.lastName);
        await page.getByLabel('Email Address').fill(user.email);
        await page.getByLabel('Password', { exact: true }).fill(user.password);
        await page.getByLabel('Confirm Password').fill(user.confirmPassword);
        
        await expect(page.getByTestId('password-strength-indicator')).toHaveText('Weak');
        await expect(page.getByText('Password must be at least 8 characters long and contain a number and special character')).toBeVisible();
    });
});

// import { test, expect } from '@playwright/test';
// import { HomePage } from '../pages/HomePage';
// import { LoginPage } from '../pages/LoginPage';

// /**
//  * Refactoring Exercise: Home Tests
//  * 
//  * TODO:
//  * 1. Identify the locators and actions within these tests.
//  * 2. Create Locator variables and methods inside `pages/HomePage.ts`.
//  * 3. Import and instantiate `HomePage` in this file.
//  * 4. Replace the raw Playwright commands with the newly created methods!
//  */
// test.describe('Home Page functionality', () => {

//     let homePage: HomePage;
//     let loginPage: LoginPage;
//     test.beforeEach(async ({ page }) => {
//         homePage = new HomePage(page);
//         loginPage = new LoginPage(page);
//     });

//     test('should display featured categories on load', async ({ loggedInPage }) => {
//         await homePage.featuredCategoriesSection.waitFor();
//         await expect(homePage.categoriesNavigation).toBeVisible();
//     });

//     test('should search for a product successfully', async ({ loggedInPage }) => {
//         await homePage.searchProduct('Wireless Headphones');
//         await expect(homePage.searchResultsFor).toBeVisible();
//     });

//     test('should filter search results by brand', async ({ loggedInPage }) => {
//         await homePage.searchProduct('Laptop');
//         await homePage.filterByBrand('TechBrand');
//         await expect(homePage.activeFilter).toHaveText('Brand: TechBrand');
//     });

//     test('should clear applied search filters', async ({ page }) => {
//         await homePage.searchProduct('Sneakers');
//         await homePage.filterByBrand('Runners');
//         await homePage.clearAllFilters();

//         await expect(homePage.activeFilter).toBeHidden();
//     });

//     test('should display empty state for no search results', async ({ page }) => {
//         await homePage.searchProduct('UnicornMeat');
//         await expect(homePage.noResultFoundError).toBeVisible();
//     });
// });

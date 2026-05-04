import { type Page, type Locator } from '@playwright/test';

export class HomePage {
    public readonly page: Page;
    public readonly featuredCategoriesSection: Locator;
    public readonly searchInput: Locator;
    public readonly searchButton: Locator;
    public readonly brandFilterButton: Locator;
    public readonly applyFiltersButton: Locator;
    public readonly clearFiltersButton: Locator;
    public readonly noResultFoundError: Locator;
    public readonly activeFilter: Locator;
    public readonly searchResultsFor: Locator;
    public readonly categoriesNavigation: Locator;
    public readonly homepageURL: string = 'https://imaginary-store.com/';

    constructor(page: Page) {
        this.page = page;
        this.featuredCategoriesSection = page.getByTestId('featured-categories-section');
        this.searchInput = page.getByRole('searchbox', { name: 'Search for products' });
        this.searchButton = page.getByRole('button', { name: 'Search' });
        this.brandFilterButton = page.getByRole('button', { name: 'Filter by Brand' });
        this.applyFiltersButton = page.getByRole('button', { name: 'Apply Filters' });
        this.clearFiltersButton = page.getByRole('button', { name: 'Clear All Filters' });
        this.noResultFoundError = page.getByText('No results found for your search');
        this.activeFilter = page.getByTestId('active-filter');
        this.searchResultsFor = page.getByRole('heading', { name: 'Search Results for: Wireless Headphones' });
        this.categoriesNavigation = page.getByRole('navigation', { name: 'Categories' });
    }

    // TODO: Implement the methods required by your tests

    async goto() {
        await this.page.goto(this.homepageURL);
    }

    async searchProduct(productName: string) {
        await this.searchInput.fill(productName);
        await this.searchButton.click();
    }

    async filterByBrand(brand: string) {
        await this.brandFilterButton.click();
        await this.page.getByLabel(`Filter by ${brand}`).check();
        await this.applyFiltersButton.click();
    }

    async clearAllFilters() {
        await this.clearFiltersButton.click();
    }

    async verifyEmptyState() {
        await this.noResultFoundError.waitFor();
    }
}

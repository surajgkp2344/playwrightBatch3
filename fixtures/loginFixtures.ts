import { test as base, type Page } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

type MyFixtures = {
    loggedInPage: Page;
}

export const test = base.extend<MyFixtures>({
    loggedInPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login('sanjeev@gmail.com', 'Sanjeev123@');
        await use(page);
    }
})


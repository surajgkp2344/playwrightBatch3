import { Locator, type Page } from '@playwright/test';

export class LoginPage {
    public readonly page: Page;
    public readonly emailInput: Locator;
    public readonly passwordInput: Locator;
    private readonly signInBtn: Locator;
    private readonly forgotPasswordLink: Locator;
    private readonly createAccountLink: Locator;
    private readonly resetEmailInput: Locator;
    private readonly resetBtn: Locator;
    private readonly signUpBtn: Locator;
    public readonly welcomeMsg: Locator;
    public readonly errorMessage: Locator;
    public readonly validationMessage: Locator;
    public readonly createAccountHeading: Locator;
    public readonly forgotPasswordSuccessMsg: Locator;
    public readonly emailRequireError: Locator;
    public readonly passwordRequireError: Locator;
    public readonly clickCaptcha: Locator;

    constructor(page: Page) {
        this.page = page;        
        this.emailInput = page.getByLabel('Email address');  
        this.passwordInput = page.getByLabel('Password'); 
        this.signInBtn = page.getByRole('button', { name: 'Login' }); 
        this.forgotPasswordLink = page.getByRole('link', { name: 'Forgot Password?' });
        this.createAccountLink = page.getByRole('link', { name: 'Create an account' });
        this.resetEmailInput = page.getByLabel('Reset Email');
        this.resetBtn = page.getByRole('button', { name: 'Send Reset Link' });
        this.signUpBtn = page.getByRole('button', { name: 'Sign Up' });
        this.welcomeMsg = page.getByRole('heading', { name: 'Welcome to your account' });
        this.errorMessage = page.getByTestId('error-message');
        this.validationMessage = page.getByText('Email is required');
        this.createAccountHeading = page.getByRole('heading', { name: 'Create an Account' });
        this.forgotPasswordSuccessMsg = page.getByText('Password reset email sent');
        this.emailRequireError = page.getByText('Email is required');
        this.passwordRequireError = page.getByText('Password is required');
        this.clickCaptcha = page.locator('captcha');
    }

    async goto() {
        await this.page.goto('https://imaginary-store.com/login');
    }

    async login(email: string, password: string) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.clickCaptcha.click();
        await this.signInBtn.click();
    }

    async enterEmail(email: string){
        await this.emailInput.fill(email);
    }

    async enterPassword(password: string){
        await this.passwordInput.fill(password);
    }

    async clickCreateAccountBtn(){
        await this.createAccountLink.click();
    }

    async forgotPassword(email: string) {
        await this.forgotPasswordLink.click();
        await this.resetEmailInput.fill(email);
        await this.resetBtn.click();
    }

    async clickSignInBtn(){
        await this.signInBtn.click();
    }

    async clickSignUpBtn(){
        await this.signUpBtn.click();
    }
}

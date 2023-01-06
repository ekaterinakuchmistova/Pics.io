import { expect, Locator, Page, test } from '@playwright/test';


export class LoginSteps {
    private readonly page: Page;
    private readonly login: Locator;
    private readonly loginWindow: Locator;
    private readonly email: Locator;
    private readonly password: Locator;
    private readonly loginButton: Locator;
    
    constructor(page: Page) {
        this.page = page;
        this.login = page.locator('[data-popup-opener="login"]').first();
        this.loginWindow = page.locator('[data-popup="login"]');
        this.email = page.locator('[id="login-email"]');
        this.password = page.locator('[id="login-password"]');
        this.loginButton = page.locator('//button[contains(text(),"Log in")]');
    }
    async openLoginWindow() {
        await test.step('Click to Log in and open modal window', async () => {
            await this.login.click()
            await expect(this.loginWindow).toBeVisible();
        });
    }

    async fillEmail(email: string) {
        await test.step('Fill out Email field', async () => {
            await this.email.click()
            await this.email.fill(email)
        });

    }
    async fillPassword(password: string) {
        await test.step('Fill oout Password field', async () => {
            await this.password.click()
            await this.password.fill(password)
        });
    }

    async logIn() {
        await test.step('Click to Log in button', async () => {
            await expect(this.loginButton).toBeVisible()
            await this.loginButton.click()
        });
    }
}
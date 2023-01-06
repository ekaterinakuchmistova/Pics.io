import { expect, Locator, Page, test } from '@playwright/test';


export class CheckVideoSteps {
    private readonly page: Page;
    private readonly fileName: Locator;
    private readonly generatingThumbnailsText: Locator;

    constructor(page: Page) {
        this.page = page;
        this.fileName = page.locator('//div[@class="fileName"]');
        this.generatingThumbnailsText = page.locator('//span[contains(text(), "generating")]')


    }
    async verifyVideoIsUploaded(filename: string) {
        await test.step('Checking uploaded video is exist during generating thumbnails', async () => {
            await expect(this.generatingThumbnailsText).toBeVisible({ timeout: 30000 })
            await expect(this.fileName).toHaveText(filename)
        });
    }
}


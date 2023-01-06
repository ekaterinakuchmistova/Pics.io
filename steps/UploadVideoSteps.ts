import { expect, Locator, Page, test } from '@playwright/test';

export class UploadVideoSteps {
    private readonly page: Page;
    private readonly uploadButton: Locator;
    private readonly continueButton: Locator;
    private readonly importButton: Locator;
    private readonly importItemCell: Locator;
    private readonly importFileItemProgress: Locator;
    private readonly assetAlreadyExistText: Locator;
    private readonly okButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.uploadButton = page.locator('button#button-add');
        this.continueButton = page.locator('//span[contains(text(),"Continue")]')
        this.okButton = page.locator('//span[contains(text(),"Ok")]')
        this.importButton = page.locator('div.btnCallToAction')
        this.importItemCell = page.locator('div.importItemCell')
        this.importFileItemProgress = page.locator('//div[@class="importFileItemProgress"]')
        this.assetAlreadyExistText = page.locator('//span[contains(text(), "Asset already exists")]')
    }

    async setVideo(fileName: string) {
        await test.step('Select Video from file system', async () => {
            const fileChooserPromise = this.page.waitForEvent('filechooser');
            await this.uploadButton.click();
            const fileChooser = await fileChooserPromise;
            await fileChooser.setFiles(fileName);
        });
    }

    async clickContinueOrOkButton() {
        await test.step('Click to \'Continue\' or \'Ok\' button', async () => {
            if (!await this.assetAlreadyExistText.isHidden()) {
                await this.okButton.click()
            } else {
                await this.continueButton.click()
            }
            await expect(this.importItemCell).toBeVisible()
        });
    }

    async clickImportButton() {
        await test.step('Click to \'Import\' button', async () => {
            await expect(this.importButton).toBeVisible()
            await this.importButton.click()
        });
    }

    async waitFileloading(timeoutSecond: number) {
        await test.step('Wait till file is loaded', async () => {
            await expect(this.importFileItemProgress).toBeVisible()
            await expect(this.importFileItemProgress).toBeHidden({ timeout: timeoutSecond * 1000 })
        });
    }
}

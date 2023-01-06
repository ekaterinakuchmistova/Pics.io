import { test, expect } from '@playwright/test';
import { CheckVideoSteps } from '../steps/CheckUploadedSteps';
import { LoginSteps } from '../steps/loginSteps';
import { UploadVideoSteps } from '../steps/UploadVideoSteps';

test.beforeEach(async ({ page }, testInfo) => {
  const loginSteps = new LoginSteps(page);
  console.log(`Running ${testInfo.title}`);
 
  await page.goto('https://pics.io');
  await loginSteps.openLoginWindow()
  await loginSteps.fillEmail('ekaterina.kuchmistova@gmail.com')
  await loginSteps.fillPassword('Sample1234')
  await loginSteps.logIn()
});

test('Check uploading video', async ({ page }) => {
  const uploadVideoSteps = new UploadVideoSteps(page);
  const checkingVideoSteps = new CheckVideoSteps(page);

  await uploadVideoSteps.setVideo('video.mp4')
  await uploadVideoSteps.clickContinueOrOkButton()
  await uploadVideoSteps.clickImportButton()
  await uploadVideoSteps.waitFileloading(60)

  await checkingVideoSteps.verifyVideoIsUploaded('video.mp4')
});

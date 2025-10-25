import { test, expect } from '@playwright/test';

test('site loads', async ({ page }) => {
  await page.goto('/sign-up');
  await expect(page).toHaveTitle(/React App/i); 
});

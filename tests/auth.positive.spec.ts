import { test, expect } from '@playwright/test';

test('positive flow', async ({ page }) => {
  const ts = Date.now();
  const email = `user@penny.com`;
  const password = '123456'; 

  await page.goto('/sign-up');

  await page.locator('input[name="name"]').fill(`user`);
  await page.locator('input[name="company"]').fill('Penny Software');
  await page.locator('input[name="email"]').fill(email);
  await page.locator('input[name="password"]').fill(password);

  await page.getByRole('button', { name: /create account/i }).click();

  await expect(page).not.toHaveURL(/\/sign-up$/);
  await expect(page).toHaveURL(/\/dashboard/i, { timeout: 15000 });


  await page.getByRole('link', { name: /sign out/i }).click();
  await expect(page).toHaveURL(/\/sign-in/i, { timeout: 10000 });


  await page.locator('input[name="email"]').fill(email);
  await page.locator('input[name="password"]').fill(password);
  await page.getByRole('button', { name: /sign in/i }).click();

  await expect(page).not.toHaveURL(/\/sign-in$/);
  await expect(page).toHaveURL(/\/dashboard/i, { timeout: 15000 });
});

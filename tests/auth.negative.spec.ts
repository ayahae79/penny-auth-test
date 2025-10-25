import { test, expect } from '@playwright/test';

// signing in with unregistered users
test('sign-in with UNREGISTERED email shows correct error', async ({ page }) => {
  await page.goto('/sign-in');
  await page.locator('input[name="email"]').fill(`notUser@penny.com`);
  await page.locator('input[name="password"]').fill('123456');
  await page.getByRole('button', { name: /sign in/i }).click();


  await expect(page.getByText(/no account found for this email/i)).toBeVisible();
});

// signing in with wrong credentials
test('sign-in with WRONG password shows correct error', async ({ page }) => {

  const email = `user@penny.com`;
  const rigthPassword = '123456';
  const wrongPassword = '654321';

  await page.goto('/sign-up');
  await page.locator('input[name="name"]').fill(`user`);
  await page.locator('input[name="company"]').fill('Penny Software');
  await page.locator('input[name="email"]').fill(email);
  await page.locator('input[name="password"]').fill(rigthPassword);
  await page.getByRole('button', { name: /create account/i }).click();
  await expect(page).toHaveURL(/\/dashboard/i, { timeout: 15000 });


  await page.getByRole('link', { name: /sign out/i }).click();
  await expect(page).toHaveURL(/\/sign-in/i);


  await page.locator('input[name="email"]').fill(email);
  await page.locator('input[name="password"]').fill(wrongPassword);
  await page.getByRole('button', { name: /sign in/i }).click();


  await expect(page.getByText(/incorrect password/i)).toBeVisible();
});

// signing in with empty input
test('validation errors are shown for empty/short fields', async ({ page }) => {
  await page.goto('/sign-up');

  await page.getByRole('button', { name: /create account/i }).click();

  const form = page.locator('form');
  await expect(form.getByText('This field is required')).toHaveCount(4);

  await page.locator('input[name="name"]').fill('user');
  await page.locator('input[name="company"]').fill('Penny Software');
  await page.locator('input[name="email"]').fill(`user@penny.com`);
  await page.locator('input[name="password"]').fill('12345');
  await page.getByRole('button', { name: /create account/i }).click();

  await expect(form.getByText(/at least 6 characters/i)).toBeVisible();
});

// signing up with invalid input
test('sign-up shows error for invalid email format', async ({ page }) => {
  await page.goto('/sign-up');

  await page.locator('input[name="name"]').fill('user');
  await page.locator('input[name="company"]').fill('Penny Software');
  await page.locator('input[name="email"]').fill('notAnEmail');
  await page.locator('input[name="password"]').fill('123456');

  await page.getByRole('button', { name: /create account/i }).click();

  await expect(page.getByText(/Enter a valid email/i)).toBeVisible();
});

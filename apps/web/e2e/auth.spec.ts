import { expect, test } from '@playwright/test';

test.describe('Auth middleware', () => {
  test('should redirect unauthenticated users to /login', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveURL(/\/login$/);
  });

  test('should render the login page with a sign-in button', async ({
    page,
  }) => {
    await page.goto('/login');

    await expect(page.getByRole('button', { name: /github/i })).toBeVisible();
  });

  test('should not redirect /login to itself', async ({ page }) => {
    await page.goto('/login');

    await expect(page).toHaveURL(/\/login$/);
  });
});

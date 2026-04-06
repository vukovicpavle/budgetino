import { expect, test } from '@playwright/test';

test.describe('Landing page', () => {
  test('should display the heading and description', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('h1')).toHaveText('Budgetino');
    await expect(
      page.getByText('Budget and subscription management app')
    ).toBeVisible();
  });

  test('should have the correct page title', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle('Budgetino');
  });
});

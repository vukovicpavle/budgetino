import { expect, test } from '@playwright/test';

test.describe('Landing page', () => {
  test('should display the heading and description', async ({ page }) => {
    await page.goto('/');

    await expect(
      page.getByRole('heading', { level: 1, name: 'Budgetino' })
    ).toBeVisible();
    await expect(
      page.getByText('Budget and subscription management app')
    ).toBeVisible();
  });

  test('should have the correct page title', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle('Budgetino');
  });
});

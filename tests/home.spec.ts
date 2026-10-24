import { test, expect } from '@playwright/test';

test('page loads with heading and items', async ({ page }) => {
  await page.goto('/');
  
  await expect(page.locator('h1')).toHaveText('Demo Shop');
  
  await expect(page.getByTestId('qty-notebook')).toBeVisible();
  await expect(page.getByTestId('qty-pen')).toBeVisible();
  await expect(page.getByTestId('qty-backpack')).toBeVisible();
});

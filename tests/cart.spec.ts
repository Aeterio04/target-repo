import { test, expect } from '@playwright/test';

test('default quantities show correct totals', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  
  await expect(page.getByTestId('subtotal')).toHaveText('$57.00');
  await expect(page.getByTestId('discount')).toHaveText('$0.00');
  await expect(page.getByTestId('tax')).toHaveText('$4.56');
  await expect(page.getByTestId('total')).toHaveText('$61.56');
});

test('SAVE10 coupon applies 10% discount', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  
  await page.getByTestId('coupon-input').fill('SAVE10');
  await page.getByTestId('apply-coupon').click();
  await page.waitForTimeout(100);
  
  await expect(page.getByTestId('subtotal')).toHaveText('$57.00');
  await expect(page.getByTestId('discount')).toHaveText('$5.70');
  await expect(page.getByTestId('tax')).toHaveText('$4.10');
  await expect(page.getByTestId('total')).toHaveText('$55.40');
  await expect(page.getByTestId('coupon-message')).toHaveText('Coupon applied');
});

test('changing quantities updates totals', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  
  const notebookInput = page.getByTestId('qty-notebook');
  await notebookInput.fill('2');
  await notebookInput.blur();
  await page.waitForResponse(response => response.url().includes('/api/quote'));
  
  await expect(page.getByTestId('subtotal')).toHaveText('$69.00');
  await expect(page.getByTestId('discount')).toHaveText('$0.00');
  await expect(page.getByTestId('tax')).toHaveText('$5.52');
  await expect(page.getByTestId('total')).toHaveText('$74.52');
  
  await page.getByTestId('coupon-input').fill('SAVE10');
  await page.getByTestId('apply-coupon').click();
  await page.waitForResponse(response => response.url().includes('/api/quote'));
  
  await expect(page.getByTestId('subtotal')).toHaveText('$69.00');
  await expect(page.getByTestId('discount')).toHaveText('$6.90');
  await expect(page.getByTestId('tax')).toHaveText('$4.97');
  await expect(page.getByTestId('total')).toHaveText('$67.07');
});

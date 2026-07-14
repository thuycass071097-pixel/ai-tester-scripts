import { test, expect } from '@playwright/test';

test.describe('Add Remove Elements', () => {

  // URL của trang cần test
  const url = 'https://the-internet.herokuapp.com/add_remove_elements/';

  test('Test case 1: Add 1 element', async ({ page }) => {
    // Mở trang Add Remove Elements
    await page.goto(url);

    // Click nút Add Element
    await page.getByRole('button', { name: 'Add Element' }).click();

    // Locator của các nút Delete
    const deleteButtons = page.getByRole('button', { name: 'Delete' });

    // Kiểm tra có đúng 1 nút Delete
    await expect(deleteButtons).toHaveCount(1);

    // Kiểm tra nút Delete hiển thị
    await expect(deleteButtons.first()).toBeVisible();
  });

  test('Test case 2: Add nhiều elements', async ({ page }) => {
    // Mở trang Add Remove Elements
    await page.goto(url);

    // Click Add Element lần thứ nhất
    await page.getByRole('button', { name: 'Add Element' }).click();

    // Click Add Element lần thứ hai
    await page.getByRole('button', { name: 'Add Element' }).click();

    // Locator của các nút Delete
    const deleteButtons = page.getByRole('button', { name: 'Delete' });

    // Kiểm tra có đúng 2 nút Delete
    await expect(deleteButtons).toHaveCount(2);

    // Kiểm tra cả 2 nút đều hiển thị
    await expect(deleteButtons.nth(0)).toBeVisible();
    await expect(deleteButtons.nth(1)).toBeVisible();
  });

});
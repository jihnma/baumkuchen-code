import { test, expect } from "@playwright/test";

test('should display "Hello, World!" text', async ({ page }) => {
  await page.goto("/");

  const helloText = page.getByText("Hello, World!");
  await expect(helloText).toBeVisible();
});

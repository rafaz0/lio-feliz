import { test, expect } from "@playwright/test";

test.describe("Proventos", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/carteira/proventos");
    await page.waitForLoadState("networkidle");
  });

  test("deve exibir página de proventos", async ({ page }) => {
    await expect(page.getByTestId("dividends-page")).toBeVisible({ timeout: 15000 });
  });

  test("deve exibir lista de dividendos", async ({ page }) => {
    const list = page.getByTestId("dividend-list");
    await expect(list).toBeVisible({ timeout: 10000 });
  });
});

import { test, expect } from "@playwright/test";

test.describe("Carteira", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/carteira");
    await page.waitForLoadState("networkidle");
  });

  test("deve exibir página da carteira", async ({ page }) => {
    await expect(page.getByTestId("carteira-page")).toBeVisible({ timeout: 15000 });
  });

  test("deve exibir visão geral do portfolio", async ({ page }) => {
    await expect(page.getByTestId("portfolio-summary")).toBeVisible({ timeout: 10000 });
  });

  test("deve exibir tabela de ativos", async ({ page }) => {
    const table = page.getByTestId("operations-table");
    await expect(table).toBeVisible({ timeout: 10000 });
  });
});

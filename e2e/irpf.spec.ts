import { test, expect } from "@playwright/test";

test.describe("IRPF", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/carteira/irpf");
    await page.waitForLoadState("networkidle");
  });

  test("deve exibir página de IRPF", async ({ page }) => {
    await expect(page.getByTestId("irpf-page")).toBeVisible({ timeout: 15000 });
  });

  test("deve exibir visão mensal", async ({ page }) => {
    await expect(page.getByTestId("monthly-table")).toBeVisible({ timeout: 10000 });
  });

  test("deve exibir consolidado anual", async ({ page }) => {
    await expect(page.getByTestId("annual-summary")).toBeVisible({ timeout: 10000 });
  });
});

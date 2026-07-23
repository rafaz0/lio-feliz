import { test, expect } from "@playwright/test";

test.describe("Autenticação", () => {
  test("deve exibir página de login", async ({ page }) => {
    await page.goto("/auth");
    await expect(page.getByTestId("login-form")).toBeVisible();
  });

  test("deve permitir navegar para registro", async ({ page }) => {
    await page.goto("/auth");
    await page.getByTestId("register-tab").click();
    await expect(page.getByTestId("register-form")).toBeVisible();
  });

  test("deve mostrar erro com credenciais inválidas", async ({ page }) => {
    await page.goto("/auth");
    await page.getByTestId("login-email").fill("invalido@teste.com");
    await page.getByTestId("login-password").fill("senha_errada");
    await page.getByTestId("login-submit").click();
    await expect(page.getByTestId("login-error")).toBeVisible({ timeout: 10000 });
  });
});

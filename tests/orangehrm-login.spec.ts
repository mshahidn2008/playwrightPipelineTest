import { expect, test } from "@playwright/test";

test("Admin can log in and view the dashboard", async ({ page }) => {
  await page.goto(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
  );

  await page.locator('input[name="username"]').fill("Admin");
  await page.locator('input[name="password"]').fill("admin123");
  await page.locator('button[type="submit"]').click();

  await expect(page).toHaveURL(/\/dashboard\/index$/);
  await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
});

test("Logged user is logged out and login page is displayed", async ({
  page,
}) => {
  await page.goto(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
  );

  await page.locator('input[name="username"]').fill("Admin");
  await page.locator('input[name="password"]').fill("admin123");
  await page.locator('button[type="submit"]').click();

  await expect(page).toHaveURL(/\/dashboard\/index$/);

  await page.locator(".oxd-userdropdown-tab").click();
  await page.getByRole("menuitem", { name: "Logout" }).click();

  await expect(page).toHaveURL(/\/auth\/login$/);
  await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
});

import { expect, test } from "@playwright/test";

test("Admin can log in and open the Add Employee page", async ({ page }) => {
  await page.goto(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
  );

  await page.getByRole("textbox", { name: "Username" }).fill("Admin");
  await page.getByRole("textbox", { name: "Password" }).fill("admin123");
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page).toHaveURL(/\/dashboard\/index$/);

  await page.getByRole("link", { name: "PIM" }).click();
  await expect(page).toHaveURL(/\/pim\/viewEmployeeList$/);

  await page.getByRole("button", { name: "Add" }).click();

  await expect(page).toHaveURL(/\/pim\/addEmployee$/);
  await expect(
    page.getByRole("heading", { name: "Add Employee" }),
  ).toBeVisible();
  await expect(page.getByRole("textbox", { name: "First Name" })).toBeVisible();
  await expect(page.getByRole("textbox", { name: "Last Name" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Save" })).toBeVisible();
});

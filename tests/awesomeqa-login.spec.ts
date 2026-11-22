import { test } from "@playwright/test";

test("User can submit the AwesomeQA login form", async ({ page }) => {
  await page.goto("https://awesomeqa.com/ui/index.php?route=common/home");

  await page.getByRole("link", { name: "My Account" }).first().click();
  await page.getByRole("link", { name: "Login", exact: true }).first().click();

  await page.getByRole("textbox", { name: "E-Mail Address" }).fill("Jbrown@yahoo.com");
  await page.getByLabel("Password").fill("Qatest@1010");
  await page.getByRole("button", { name: "Login" }).click();

  const Desktopbtn = page.getByText("Desktop", { exact: true });
  await Desktopbtn.isVisible();


});

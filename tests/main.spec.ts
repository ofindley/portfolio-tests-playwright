import { test, expect } from "@playwright/test";
import { MainPage } from "../pages/main.page";
import { urls } from "../data/urls.data";

test.describe("Main Page", () => {
  let mainPage: MainPage;

  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page);

    await page.goto(urls.baseUrl);
  });

  test("Verify page title is correct", async ({ page }) => {
    await expect(page).toHaveTitle("Orane Findley - Portfolio");
  });

  test("Verify favicon is loaded", async ({ page }) => {
    expect(mainPage.favicon).not.toBeNull();
    expect(await mainPage.favicon?.first().getAttribute("href")).toContain(
      "/images/favicon/favicon"
    );
  });
});

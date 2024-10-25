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

  test("Verify hero section is displayed by default", async ({ page }) => {
    await expect(mainPage.heroSection).toBeInViewport();
  });

  test("Verify scroll to top functionality", async ({ page }) => {
    // Scroll to the bottom of the page
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });

    await mainPage.scrollToTopBtn.click();
    await expect(mainPage.heroSection).toBeInViewport();
  });
});

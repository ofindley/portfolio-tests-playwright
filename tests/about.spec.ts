import { test, expect } from "@playwright/test";
import { NavBar } from "../pages/nav.page";
import { MainPage } from "../pages/main.page";
import { urls } from "../data/urls.data";

test.describe("About Section", () => {
  let navBar: NavBar;
  let mainPage: MainPage;

  test.beforeEach(async ({ page }) => {
    navBar = new NavBar(page);
    mainPage = new MainPage(page);

    await page.goto(urls.baseUrl);
  });

  test("Verify about section is displayed", async ({ page }) => {
    await navBar.aboutBtn.click();

    await expect(page.url()).toContain(urls.aboutUrl);
    await expect(mainPage.aboutSection).toBeInViewport();
  });

  test("Verify all headers and paragraphs in about section have text", async ({
    page,
  }) => {
    await navBar.aboutBtn.click();
    await expect(page.url()).toContain(urls.aboutUrl);

    await expect(mainPage.aboutSection).toBeVisible();
    await mainPage.verifySectionElementsHaveText("about");
  });

  test("Verify all h3 tags in about section are semibold", async ({ page }) => {
    await navBar.aboutBtn.click();
    await expect(page.url()).toContain(urls.aboutUrl);

    await expect(mainPage.aboutSection).toBeVisible();
    await mainPage.verifyTagHasClass("about", "h3", "font-semibold");
  });
});

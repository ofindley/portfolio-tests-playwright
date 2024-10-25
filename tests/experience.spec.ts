import { test, expect } from "@playwright/test";
import { NavBar } from "../pages/nav.page";
import { MainPage } from "../pages/main.page";
import { urls } from "../data/urls.data";
import { experienceSection } from "../data/sections.data";

test.describe("Experience Section", () => {
  let navBar: NavBar;
  let mainPage: MainPage;

  test.beforeEach(async ({ page }) => {
    navBar = new NavBar(page);
    mainPage = new MainPage(page);

    await page.goto(urls.baseUrl);
  });

  test("Verify experience section is displayed", async ({ page }) => {
    await navBar.experienceBtn.click();

    await expect(page.url()).toContain(urls.experienceUrl);
    await expect(mainPage.experienceSection).toBeInViewport();
  });

  test("Verify all headers and paragraphs in experience section have text", async ({
    page,
  }) => {
    await navBar.experienceBtn.click();
    await expect(page.url()).toContain(urls.experienceUrl);

    await expect(mainPage.experienceSection).toBeVisible();
    await mainPage.verifySectionElementsHaveText("experience");
  });
});

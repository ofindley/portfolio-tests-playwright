import { test, expect } from "@playwright/test";
import { NavBar } from "../pages/nav.page";
import { MainPage } from "../pages/main.page";
import { urls } from "../data/urls.data";
import { skillsSection } from "../data/sections.data";

test.describe("Skills Section", () => {
  let navBar: NavBar;
  let mainPage: MainPage;

  test.beforeEach(async ({ page }) => {
    navBar = new NavBar(page);
    mainPage = new MainPage(page);

    await page.goto(urls.baseUrl);
  });

  test("Verify skills section is displayed", async ({ page }) => {
    await navBar.skillsBtn.click();

    await expect(page.url()).toContain(urls.skillsUrl);
    await expect(mainPage.skillsSection).toBeInViewport();
  });

  test("Verify all headers and paragraphs in skills section have text", async ({
    page,
  }) => {
    await navBar.skillsBtn.click();
    await expect(page.url()).toContain(urls.skillsUrl);

    await expect(mainPage.skillsSection).toBeVisible();
    await mainPage.verifySectionElementsHaveText("skills");
  });
});

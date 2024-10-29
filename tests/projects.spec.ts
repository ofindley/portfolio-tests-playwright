import { test, expect } from "@playwright/test";
import { NavBar } from "../pages/nav.page";
import { MainPage } from "../pages/main.page";
import { urls } from "../data/urls.data";
import { projectsSection } from "../data/sections.data";

test.describe("Projects Section", () => {
  let navBar: NavBar;
  let mainPage: MainPage;

  test.beforeEach(async ({ page }) => {
    navBar = new NavBar(page);
    mainPage = new MainPage(page);

    await page.goto(urls.baseUrl);
  });

  test("Verify projects section is displayed", async ({ page }) => {
    await navBar.projectsBtn.click();

    await expect(page.url()).toContain(urls.projectsUrl);
    await expect(mainPage.projectsSection).toBeInViewport();
  });

  test("Verify all headers and paragraphs in projects section have text", async ({
    page,
  }) => {
    await navBar.projectsBtn.click();
    await expect(page.url()).toContain(urls.projectsUrl);

    await expect(mainPage.projectsSection).toBeVisible();
    await mainPage.verifySectionElementsHaveText("projects");
  });

  test("Verify navigation between projects works correctly", async ({
    page,
  }) => {
    await navBar.projectsBtn.click();
    await mainPage.projectCards.first().waitFor({ state: "visible" });
    await expect(mainPage.projectCards.first()).toBeInViewport();

    await mainPage.nextProjectsBtn.click();
    await mainPage.projectCards.waitFor({ state: "visible" });
    await expect(mainPage.projectCards).toBeInViewport();

    await mainPage.previousProjectsBtn.click();
    await mainPage.projectCards.first().waitFor({ state: "visible" });
    await expect(mainPage.projectCards.first()).toBeInViewport();
  });

  test("Verify project card headers are semibold", async ({ page }) => {
    await navBar.projectsBtn.click();
    await mainPage.verifyTagHasClass("projects", "h3", "font-semibold");
  });
});

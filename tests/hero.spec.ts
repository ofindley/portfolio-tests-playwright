import { test, expect } from "@playwright/test";
import { NavBar } from "../pages/nav.page";
import { MainPage } from "../pages/main.page";
import { urls } from "../data/urls.data";
import { heroSection } from "../data/sections.data";

test.describe("Hero Section", () => {
  let navBar: NavBar;
  let mainPage: MainPage;

  test.beforeEach(async ({ page }) => {
    navBar = new NavBar(page);
    mainPage = new MainPage(page);

    await page.goto(urls.baseUrl);
  });

  test("Verify hero section is displayed", async ({ page }) => {
    await expect(page.url()).toContain(urls.baseUrl);
    await expect(mainPage.heroSection).toBeInViewport();
  });

  test("Verify all headers and paragraphs in hero section have text", async ({
    page,
  }) => {
    await expect(page.url()).toContain(urls.baseUrl);

    await expect(mainPage.heroSection).toBeVisible();
    await mainPage.verifySectionElementsHaveText("hero");
  });

  test("Verify profile picture is displayed in hero section", async ({
    page,
  }) => {
    await expect(page.url()).toContain(urls.baseUrl);
    await expect(mainPage.profilePic).toBeInViewport();

    const imageSrc = await mainPage.profilePic.getAttribute("src");
    await expect(imageSrc).toContain(heroSection.profilePicSrc);

    const imageAlt = await mainPage.profilePic.getAttribute("alt");
    await expect(imageAlt).toBe(heroSection.profilePicAlt);
  });
});

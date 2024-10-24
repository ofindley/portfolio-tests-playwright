import { test, expect } from "@playwright/test";
import { NavBar } from "../pages/nav.page";
import { MainPage } from "../pages/main.page";
import { urls } from "../data/urls.data";
import * as sections from "../data/sections.data";

test.describe("Navigation", () => {
  let navBar: NavBar;
  let mainPage: MainPage;

  test.beforeEach(async ({ page }) => {
    navBar = new NavBar(page);
    mainPage = new MainPage(page);

    await page.goto(urls.baseUrl);
  });

  test("Verify page title", async ({ page }) => {
    await expect(page).toHaveTitle("Orane Findley - Portfolio");
  });

  test("Verify navigation to About section", async ({ page }) => {
    await navBar.aboutBtn.click();

    expect(page.url()).toContain(urls.aboutUrl);

    await expect(mainPage.aboutSection).toBeInViewport();
    await expect(mainPage.sectionTitle("about")).toContainText(
      sections.aboutSection.title
    );
  });

  test("Verify navigation to Experience section", async ({ page }) => {
    await navBar.experienceBtn.click();

    expect(page.url()).toContain(urls.experienceUrl);

    await expect(mainPage.experienceSection).toBeInViewport();
    await expect(mainPage.sectionTitle("experience")).toContainText(
      sections.experienceSection.title
    );
  });

  test("Verify navigation to Skills section", async ({ page }) => {
    await navBar.skillsBtn.click();

    expect(page.url()).toContain(urls.skillsUrl);

    await expect(mainPage.skillsSection).toBeInViewport();
    await expect(mainPage.sectionTitle("skills")).toContainText(
      sections.skillsSection.title
    );
  });

  test("Verify navigation to Projects section", async ({ page }) => {
    await navBar.projectsBtn.click();

    expect(page.url()).toContain(urls.projectsUrl);

    await expect(mainPage.projectsSection).toBeInViewport();
    await expect(mainPage.sectionTitle("projects")).toContainText(
      sections.projectsSection.title
    );
  });

  test("Verify navigation to Contact section", async ({ page }) => {
    await navBar.contactBtn.click();

    expect(page.url()).toContain(urls.contactUrl);

    await expect(mainPage.contactSection).toBeInViewport();
    await expect(mainPage.sectionTitle("contact")).toContainText(
      sections.contactSection.title
    );
  });

  test("Verify navigation to multiple sections [About, Experience, Skills, Projects, Contact]", async ({
    page,
  }) => {
    // Navigate to about section
    await navBar.aboutBtn.click();
    expect(page.url()).toContain(urls.aboutUrl);
    await expect(mainPage.aboutSection).toBeInViewport();

    // Navigate to experience section
    await navBar.experienceBtn.click();
    expect(page.url()).toContain(urls.experienceUrl);
    await expect(mainPage.experienceSection).toBeInViewport();

    // Navigate to skills section
    await navBar.skillsBtn.click();
    expect(page.url()).toContain(urls.skillsUrl);
    await expect(mainPage.skillsSection).toBeInViewport();

    // Navigate to projects section
    await navBar.projectsBtn.click();
    expect(page.url()).toContain(urls.projectsUrl);
    await expect(mainPage.projectsSection).toBeInViewport();

    // Navigate to contact section
    await navBar.contactBtn.click();
    expect(page.url()).toContain(urls.contactUrl);
    await expect(mainPage.contactSection).toBeInViewport();
  });
});

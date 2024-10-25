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

  test("Verify navigation to About section", async ({ page }) => {
    await navBar.aboutBtn.click();
    await expect(page.url()).toContain(urls.aboutUrl);

    await mainPage.aboutSection.waitFor({ state: "visible" });
    await expect(mainPage.aboutSection).toBeInViewport();
    await expect(mainPage.sectionTitle("about")).toContainText(
      sections.aboutSection.title
    );
  });

  test("Verify navigation to Experience section", async ({ page }) => {
    await navBar.experienceBtn.click();
    await expect(page.url()).toContain(urls.experienceUrl);

    await mainPage.experienceSection.waitFor({ state: "visible" });
    await expect(mainPage.experienceSection).toBeInViewport();
    await expect(mainPage.sectionTitle("experience")).toContainText(
      sections.experienceSection.title
    );
  });

  test("Verify navigation to Skills section", async ({ page }) => {
    await navBar.skillsBtn.click();
    await expect(page.url()).toContain(urls.skillsUrl);

    await mainPage.skillsSection.waitFor({ state: "visible" });
    await expect(mainPage.skillsSection).toBeInViewport();
    await expect(mainPage.sectionTitle("skills")).toContainText(
      sections.skillsSection.title
    );
  });

  test("Verify navigation to Projects section", async ({ page }) => {
    await navBar.projectsBtn.click();
    await expect(page.url()).toContain(urls.projectsUrl);

    await mainPage.projectsSection.waitFor({ state: "visible" });
    await expect(mainPage.projectsSection).toBeInViewport();
    await expect(mainPage.sectionTitle("projects")).toContainText(
      sections.projectsSection.title
    );
  });

  test("Verify navigation to Contact section", async ({ page }) => {
    await navBar.contactBtn.click();
    await expect(page.url()).toContain(urls.contactUrl);

    await mainPage.contactSection.waitFor({ state: "visible" });
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
    await expect(page.url()).toContain(urls.aboutUrl);
    await mainPage.aboutSection.waitFor({ state: "visible" });
    await expect(mainPage.aboutSection).toBeInViewport();

    // Navigate to experience section
    await navBar.experienceBtn.click();
    await expect(page.url()).toContain(urls.experienceUrl);
    await mainPage.experienceSection.waitFor({ state: "visible" });
    await expect(mainPage.experienceSection).toBeInViewport();

    // Navigate to skills section
    await navBar.skillsBtn.click();
    await expect(page.url()).toContain(urls.skillsUrl);
    await mainPage.skillsSection.waitFor({ state: "visible" });
    await expect(mainPage.skillsSection).toBeInViewport();

    // Navigate to projects section
    await navBar.projectsBtn.click();
    await expect(page.url()).toContain(urls.projectsUrl);
    await mainPage.projectsSection.waitFor({ state: "visible" });
    await expect(mainPage.projectsSection).toBeInViewport();

    // Navigate to contact section
    await navBar.contactBtn.click();
    await expect(page.url()).toContain(urls.contactUrl);
    await mainPage.contactSection.waitFor({ state: "visible" });
    await expect(mainPage.contactSection).toBeInViewport();

    // Navigate to hero section
    await navBar.homeBtn.click();
    await mainPage.heroSection.waitFor({ state: "visible" });
    await expect(mainPage.heroSection).toBeInViewport();
  });
});

import { test, expect } from "@playwright/test";
import { NavBar } from "../pages/nav.page";
import { MainPage } from "../pages/main.page";
import { socials, urls } from "../data/urls.data";

test.describe("Contact Section", () => {
  let navBar: NavBar;
  let mainPage: MainPage;

  test.beforeEach(async ({ page }) => {
    navBar = new NavBar(page);
    mainPage = new MainPage(page);

    await page.goto(urls.baseUrl);
  });

  test("Verify contact section is displayed", async ({ page }) => {
    await navBar.contactBtn.click();

    await expect(page.url()).toContain(urls.contactUrl);
    await expect(mainPage.contactSection).toBeInViewport();
  });

  test("Verify social links", async ({ page }) => {
    await navBar.contactBtn.click();

    await expect(mainPage.linkedinBtn).toHaveAttribute(
      "href",
      socials.linkedinUrl
    );
    await expect(mainPage.githubBtn).toHaveAttribute("href", socials.githubUrl);
    await expect(mainPage.twitterBtn).toHaveAttribute(
      "href",
      socials.twitterUrl
    );
    await expect(mainPage.emailBtn).toHaveAttribute("href", socials.email);
  });

  test("Verify all headers and paragraphs in contact section have text", async ({
    page,
  }) => {
    await navBar.contactBtn.click();
    await expect(page.url()).toContain(urls.contactUrl);

    await expect(mainPage.contactSection).toBeVisible();
    await mainPage.verifySectionElementsHaveText("contact");
  });
});

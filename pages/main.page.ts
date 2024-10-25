import { Page, Locator, expect } from "@playwright/test";
import { urls } from "../data/urls.data";

export class MainPage {
  readonly page: Page;

  readonly favicon: Locator;
  readonly html: Locator;

  // Hero section
  readonly heroSection: Locator;
  readonly profilePic: Locator;

  readonly aboutSection: Locator;
  readonly experienceSection: Locator;
  readonly skillsSection: Locator;
  readonly projectsSection: Locator;
  readonly contactSection: Locator;

  readonly linkedinBtn: Locator;
  readonly githubBtn: Locator;
  readonly twitterBtn: Locator;
  readonly emailBtn: Locator;

  readonly scrollToTopBtn: Locator;
  readonly themeToggleBtn: Locator;

  constructor(page: Page) {
    this.page = page;

    this.favicon = page.locator('link[rel="icon"]');
    this.html = page.locator("html");

    // Hero section
    this.heroSection = page.locator(".hero");
    this.profilePic = this.heroSection.locator("img");

    // About sections
    this.aboutSection = page.locator("#about");

    // Experience section
    this.experienceSection = page.locator("#experience");

    // Skills section
    this.skillsSection = page.locator("#skills");

    // Projects section
    this.projectsSection = page.locator("#projects");

    // Contact section
    this.contactSection = page.locator("#contact");
    this.linkedinBtn = this.contactSection.locator("a[aria-label='LinkedIn']");
    this.githubBtn = this.contactSection.locator("a[aria-label='GitHub']");
    this.twitterBtn = this.contactSection.locator("a[aria-label='Twitter']");
    this.emailBtn = this.contactSection.locator("#contact-me");

    this.scrollToTopBtn = page.locator("#scroll-to-top");
    this.themeToggleBtn = page.locator("#theme-toggle");
  }

  async navigateToSection(section: string) {
    await this.page.goto(urls[section]);
    await this[section + "Btn"].waitFor({ state: "visible" });
  }

  sectionTitle(section: string): Locator {
    const titleLocator = this.page.locator(`#${section} h2`);
    if (!titleLocator) {
      throw new Error(`Invalid section: ${section}`);
    }
    return titleLocator;
  }

  async getAllHeadersInSection(section: string): Promise<Locator[]> {
    return this[`${section}Section`].locator("h1, h2, h3, h4, h5, h6").all();
  }

  async getAllParagraphsInSection(section: string): Promise<Locator[]> {
    return this[`${section}Section`].locator("p").all();
  }

  async verifyElementsHaveText(
    elements: Locator[],
    elementType: string
  ): Promise<void> {
    for (let i = 0; i < elements.length; i++) {
      const text = await elements[i].innerText();
      expect(text.trim(), `${elementType} at index ${i} has text`).not.toBe("");
    }
  }

  async verifySectionElementsHaveText(section: string): Promise<void> {
    const headers = await this.getAllHeadersInSection(section);
    const paragraphs = await this.getAllParagraphsInSection(section);

    await this.verifyElementsHaveText(headers, "Header");
    await this.verifyElementsHaveText(paragraphs, "Paragraph");
  }

  async verifyTagHasClass(
    section: string,
    tag: string,
    className: string
  ): Promise<void> {
    const elements = await this[`${section}Section`].locator(tag).all();
    expect(
      elements.length,
      `No ${tag} elements found in the ${section} section`
    ).toBeGreaterThan(0);

    for (let i = 0; i < elements.length; i++) {
      const hasClass = await elements[i].evaluate(
        (el, className) => el.classList.contains(className),
        className
      );
      expect(
        hasClass,
        `${tag} element at index ${i} in the ${section} section has '${className}' class`
      ).toBeTruthy();
    }
  }

  async setLightTheme() {
    const isDark = await this.html.evaluate((el) =>
      el.classList.contains("dark")
    );
    if (isDark) {
      await this.themeToggleBtn.click();
      await expect(this.html).not.toHaveClass(/dark/);
    }
  }
}

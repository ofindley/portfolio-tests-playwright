import { Page, Locator, expect } from "@playwright/test";
import { urls } from "../data/urls.data";

export class MainPage {
  readonly page: Page;

  readonly favicon: Locator;

  readonly heroSection: Locator;
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

  constructor(page: Page) {
    this.page = page;

    this.favicon = page.locator('link[rel="icon"]');

    this.heroSection = page.locator(".hero");
    this.aboutSection = page.locator("#about");
    this.experienceSection = page.locator("#experience");
    this.skillsSection = page.locator("#skills");
    this.projectsSection = page.locator("#projects");
    this.contactSection = page.locator("#contact");

    this.linkedinBtn = page.locator("#contact a[aria-label='LinkedIn']");
    this.githubBtn = page.locator("#contact a[aria-label='GitHub']");
    this.twitterBtn = page.locator("#contact a[aria-label='Twitter']");
    this.emailBtn = page.locator("#contact-me");

    this.scrollToTopBtn = page.locator("#scroll-to-top");
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
}

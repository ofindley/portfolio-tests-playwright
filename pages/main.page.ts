import { Page, Locator, expect } from "@playwright/test";
import { urls } from "../data/urls.data";

export class MainPage {
  readonly page: Page;

  readonly favicon: Locator;

  readonly aboutSection: Locator;
  readonly experienceSection: Locator;
  readonly skillsSection: Locator;
  readonly projectsSection: Locator;
  readonly contactSection: Locator;

  constructor(page: Page) {
    this.page = page;

    this.favicon = page.locator('link[rel="icon"]');

    this.aboutSection = page.locator("#about");
    this.experienceSection = page.locator("#experience");
    this.skillsSection = page.locator("#skills");
    this.projectsSection = page.locator("#projects");
    this.contactSection = page.locator("#contact");
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
}

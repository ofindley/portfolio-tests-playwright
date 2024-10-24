import { Page, Locator } from "@playwright/test";
import { urls } from "../data/urls.data";

export class NavBar {
  readonly page: Page;

  readonly homeBtn: Locator;
  readonly aboutBtn: Locator;
  readonly experienceBtn: Locator;
  readonly skillsBtn: Locator;
  readonly projectsBtn: Locator;
  readonly contactBtn: Locator;

  constructor(page: Page) {
    this.page = page;

    this.homeBtn = page.getByRole("link", { name: "Home", exact: true });
    this.aboutBtn = page.getByRole("link", { name: "About", exact: true });
    this.experienceBtn = page.getByRole("link", {
      name: "Experience",
      exact: true,
    });
    this.skillsBtn = page.getByRole("link", { name: "Skills", exact: true });
    this.projectsBtn = page.getByRole("link", {
      name: "Projects",
      exact: true,
    });
    this.contactBtn = page.getByRole("link", { name: "Contact", exact: true });
  }

  async navigateToSection(section: string) {
    await this.page.goto(urls[section]);
    await this[section + "Btn"].waitFor({ state: "visible" });
  }
}

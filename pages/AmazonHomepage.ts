
import { Page, Locator, expect } from '@playwright/test';
import { TIMEOUT } from 'node:dns';

export class AmazonHomepage {
  readonly page: Page;
  readonly searchBox: Locator;
  readonly suggestions: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchBox = page.getByPlaceholder('Search Amazon.in');
    this.suggestions = page.locator('.s-suggestion-container');
  }

  
async open() {
  await this.page.goto('https://www.amazon.in/', {
    waitUntil: 'domcontentloaded',
    timeout: 45000,
  });

  console.log('URL:', this.page.url());
  console.log('Title:', await this.page.title());

  await this.page.screenshot({
    path: 'amazon-homepage-debug.png',
    fullPage: true,
  });

  await expect(this.searchBox).toBeVisible({
    timeout: 20000,
  });
}


  async searchForProduct(productName: string) {
    await this.searchBox.fill(productName);
  }
  async submitSearch(productName: string) {
  await this.searchBox.fill(productName);
  await this.searchBox.press('Enter');
}

  async selectSuggestion(index: number) {
    await expect(this.suggestions.nth(index)).toBeVisible();
    await this.suggestions.nth(index).click();
  }
}

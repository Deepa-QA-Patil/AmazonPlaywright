
import { Page, Locator, expect } from '@playwright/test';

export class AmazonHomepage {
  readonly page: Page;
  readonly searchBox: Locator;
  readonly suggestions: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchBox = page.locator('#twotabsearchtextbox');
    this.suggestions = page.locator('.s-suggestion-container');
  }

  async open() {

    // Capture browser errors
    this.page.on('pageerror', error => {
      console.log('PAGE ERROR:', error.message);
    });

    this.page.on('requestfailed', request => {
      console.log(
        'REQUEST FAILED:',
        request.url(),
        request.failure()?.errorText
      );
    });

    this.page.on('console', message => {
      if (message.type() === 'error') {
        console.log('CONSOLE ERROR:', message.text());
      }
    });

    // Navigate to Amazon
    const response = await this.page.goto('https://www.amazon.in/', {
      waitUntil: 'domcontentloaded',
      timeout: 60000
    });

    console.log('RESPONSE STATUS:', response?.status());
    console.log('RESPONSE URL:', response?.url());
    console.log('CURRENT URL:', this.page.url());
    console.log('PAGE TITLE:', await this.page.title());

    await this.page.waitForTimeout(5000);

    console.log(
      'BODY TEXT:',
      (await this.page.locator('body').innerText().catch(() => 'No body text')).slice(0, 500)
    );

    console.log(
      'SEARCH BOX COUNT:',
      await this.searchBox.count()
    );

    await this.page.screenshot({
      path: 'debug.png',
      fullPage: true
    });

    await expect(this.searchBox).toBeVisible({
      timeout: 20000
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

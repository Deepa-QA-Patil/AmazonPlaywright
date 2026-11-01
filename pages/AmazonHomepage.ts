
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

    // Navigate to Amazon
    const response = await this.page.goto(
      'https://www.amazon.in/',
      {
        waitUntil: 'domcontentloaded',
        timeout: 60000
      }
    );

    console.log('RESPONSE STATUS:', response?.status());
    console.log('CURRENT URL:', this.page.url());
    console.log('PAGE TITLE:', await this.page.title());

    await this.page.waitForTimeout(5000);

    // Detect intermediate page
    const continueButton = this.page.getByText(
      'Continue shopping',
      { exact: true }
    );

    if (await continueButton.count() > 0) {
      await this.page.screenshot({
        path: 'amazon-verification.png',
        fullPage: true
      });

      throw new Error(
        'Amazon displayed the Continue shopping page instead of the homepage.'
      );
    }

    // Validate search box
    const searchBoxCount = await this.searchBox.count();

    console.log('SEARCH BOX COUNT:', searchBoxCount);

    if (searchBoxCount === 0) {
      await this.page.screenshot({
        path: 'amazon-debug.png',
        fullPage: true
      });

      throw new Error(
        'Amazon homepage search box was not found. Check amazon-debug.png.'
      );
    }

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

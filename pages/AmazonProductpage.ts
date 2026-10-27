
import { Page, Locator, expect } from '@playwright/test';

export class AmazonProductpage {
  readonly page: Page;
  readonly productTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productTitle = page.locator('span[id="productTitle"]');
  }

  async verifyProductPageOpened() {
    // Print the product page URL
    console.log('Product page URL:', this.page.url());

    // Verify product URL
    await expect(this.page).toHaveURL(
      /\/(dp|gp\/product)\//,
      { timeout: 15000 }
    );

    // Pause here if you want to inspect the product page
    

    // Verify product title is visible
    await expect(this.productTitle).toBeVisible({
      timeout: 15000
    });

    console.log('Product details page opened successfully.');
  }
   async getProductTitle(): Promise<string> {
    return (await this.productTitle.innerText()).trim();
  }
}


import { Page, Locator, expect } from '@playwright/test';

export class AmazonResultPage {
  readonly page: Page;
  readonly products: Locator;

  constructor(page: Page) {
    this.page = page;
    this.products = page.locator(
      'div[data-component-type="s-search-result"]'
    );
  }

  async clickThirdProductFromLast(): Promise<Page> {
    const count = await this.products.count();

    expect(count).toBeGreaterThanOrEqual(3);

    const targetProduct = this.products.nth(count - 3);
    await targetProduct.scrollIntoViewIfNeeded();

    const productLink = targetProduct.locator('a:has(h2)').first();

    await expect(productLink).toBeVisible();

    // Wait for a new tab while clicking the product
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      productLink.click()
    ]);

    await newPage.waitForLoadState('domcontentloaded');

    console.log('New tab URL:', newPage.url());

    return newPage;
  }
  async verifyResultsDisplayed() {
    await expect(this.products.first()).toBeVisible({
      timeout: 15000
    });
  }
}

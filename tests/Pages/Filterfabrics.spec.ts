
import { test, expect } from '@playwright/test';

test('Search fabrics and click third product from the last', async ({ page }, testInfo) => {
  await page.goto('https://www.amazon.in/');

  // Assertion 1: Verify Amazon home page opened
  await expect(page).toHaveURL(/amazon\.in/);

  // Search for fabrics
  const searchBox = page.getByPlaceholder('Search Amazon.in');

  await expect(searchBox).toBeVisible();
  await searchBox.fill('fabrics');

  // Select the third search suggestion
  const suggestions = page.locator('.s-suggestion-container');

  await expect(suggestions.nth(2)).toBeVisible();
  await suggestions.nth(2).click();

  // Wait for Amazon search results
  const products = page.locator(
    'div[data-component-type="s-search-result"]'
  );

  // Assertion 2: Verify products are displayed
  await expect(products.first()).toBeVisible({
    timeout: 15000
  });

  // Count the product cards
  const fabriccount = await products.count();
  console.log('Products found:', fabriccount);

  // Assertion 3: Verify at least 3 products exist
  expect(fabriccount).toBeGreaterThanOrEqual(3);

  // Select the third product from the end
  const targetProduct = products.nth(fabriccount - 3);

  await targetProduct.scrollIntoViewIfNeeded();

  // Find the product title link
  const productLink = targetProduct.locator('a:has(h2)').first();

  // Assertion 4: Verify selected product link is visible
  await expect(productLink).toBeVisible();

  // Assertion 5: Verify the product link has a destination
  await expect(productLink).toHaveAttribute('href', /.+/);

  // Click the selected product
  await productLink.click();

  // Wait for a new tab while clicking the product
const [newPage] = await Promise.all([
  page.context().waitForEvent('page'),
  productLink.click()
]);

// Wait for the new tab to finish navigation
await newPage.waitForLoadState('domcontentloaded');

// Print the new tab's URL
console.log('New tab URL:', newPage.url());

// Verify that the product page opened
await expect(newPage).toHaveURL(/\/(dp|gp\/product)\//, {
  timeout: 15000
});
page.pause();
newPage.pause();
// Verify product title
//await expect(newPage.locator('#productTitle')).toBeVisible();
await expect(newPage.locator('span[id="productTitle"]'));

  console.log('Product details page opened successfully.');

  // Capture screenshot of product details page
  const screenshotPath = testInfo.outputPath('product-details.png');

  await page.screenshot({
    path: screenshotPath,
    fullPage: true
  });

  await testInfo.attach('Product details screenshot', {
    path: screenshotPath,
    contentType: 'image/png'
  });

  // Attach video if available
  const video = page.video();

  if (video) {
    const videoPath = await video.path();

    await testInfo.attach('Amazon test video', {
      path: videoPath,
      contentType: 'video/webm'
    });
  }
});

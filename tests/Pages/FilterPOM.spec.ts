
import { test, expect } from '@playwright/test';
import { AmazonHomepage } from '../../pages/AmazonHomepage';
import { AmazonResultPage } from '../../pages/AmazonResultPage';
import { AmazonProductpage } from '../../pages/AmazonProductpage';

test('Search fabrics and open third product from the last', async ({ page }, testInfo) => {

  // Step 1: Open Amazon and search
  const homePage = new AmazonHomepage(page);

  await homePage.open();
  await homePage.searchForProduct('fabrics');

  // Step 2: Select the third search suggestion
  await homePage.selectSuggestion(2);

  // Step 3: Verify search results
  const resultsPage = new AmazonResultPage(page);

  await resultsPage.verifyResultsDisplayed();

  // Step 4: Open the third product from the last
  const productTab = await resultsPage.clickThirdProductFromLast();

  // Step 5: Verify product details
  const productPage = new AmazonProductpage(productTab);

  await productPage.verifyProductPageOpened();

  const title = await productPage.getProductTitle();

  console.log('Selected product:', title);

  // Assertion: Product title should not be empty
  expect(title.trim().length).toBeGreaterThan(0);

  // Step 6: Capture screenshot
  const screenshotPath = testInfo.outputPath('product-details.png');

  await productTab.screenshot({
    path: screenshotPath,
    fullPage: true
  });

  await testInfo.attach('Product details screenshot', {
    path: screenshotPath,
    contentType: 'image/png'
  });

  // Step 7: Attach video if available
  const video = productTab.video();

  if (video) {
    const videoPath = await video.path();

    await testInfo.attach('Product details video', {
      path: videoPath,
      contentType: 'video/webm'
    });
  }
});

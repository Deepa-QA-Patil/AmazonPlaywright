import { test, expect } from '@playwright/test';
import { AmazonHomepage } from '../../pages/AmazonHomepage';
import { AmazonResultPage } from '../../pages/AmazonResultPage';
import { AmazonProductpage } from '../../pages/AmazonProductpage';

test('Products details testing', async({page},testInfo)=>{
    const homepage = new AmazonHomepage(page);

    await homepage.open();
    await homepage.searchForProduct('Gifts');
     
    await homepage.selectSuggestion(3);

    const resultPage = new AmazonResultPage(page);
     
    await resultPage.verifyResultsDisplayed();

    const productTab = await resultPage.clickThirdProductFromLast();

    const productPage = new AmazonProductpage(productTab);
    const URL = await productTab.url();

    await expect(productTab).toHaveURL(/gift/i);

    const title = await productPage.getProductTitle();
    if (title.toLowerCase().includes('gift')) {
  console.log('Title contains the word gift');
} else {
  console.log('Title does not contain the word gift');
}

     console.log('Selected product:', title);

     await productTab.locator('class="a-button-text"');
     await productTab.locator('a[id="nav-cart"]').click();
     await productTab.locator('button[data-a-selector="increment"]').nth(1);



    const screenshotPath = testInfo.outputPath('DetailOfProduct.png');

    await productTab.screenshot({
        path: screenshotPath,
        fullPage: true
    });
    await testInfo.attach('Details of product screenshot',{
        path:screenshotPath,
        contentType:'image/png'
    });
    const video = productTab.video();
    if (video) {
    const videoPath = await video.path();

    await testInfo.attach('Product details video', {
      path: videoPath,
      contentType: 'video/webm'
    });
}}
);
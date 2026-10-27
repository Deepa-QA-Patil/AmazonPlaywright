import { test, expect } from '@playwright/test';
import { AmazonHomepage } from '../../pages/AmazonHomepage';
import { AmazonResultPage } from '../../pages/AmazonResultPage';
import { TIMEOUT } from 'node:dns';

const searchData = [
    
    { product: 'Bottles'},
    { product: 'laptops', },
      { product: 'wireless mouse' },
];

test.describe('Amazon data-driven search tests', () => {

  for (const data of searchData) {

    test(`Search for ${data.product}`, async ({ page }) => {
        const homePage = new AmazonHomepage(page);

      await test.step('Open Amazon homepage', async () => {
        await homePage.open();
      });

      await test.step(`Search for ${data.product}`, async () => {
        await homePage.submitSearch(data.product);
      });
      await test.step('Verify search results', async () => {
        const resultsPage = new AmazonResultPage(page);

        await resultsPage.verifyResultsDisplayed();

        const resultCount = await resultsPage.products.count();

        expect(resultCount).toBeGreaterThan(0);

        console.log(
          `Search: ${data.product}, Results: ${resultCount}`
        );
      });

    });

  }

});
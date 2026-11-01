const continueButton = this.page.getByText('Continue shopping', {
  exact: true
});

if (await continueButton.count() > 0) {
  console.log('Continue shopping page detected');

  await continueButton.click();

  await this.page.waitForLoadState('domcontentloaded');
  await this.page.waitForTimeout(5000);

  console.log('URL after click:', this.page.url());
  console.log('Title after click:', await this.page.title());

  console.log(
    'Search box after click:',
    await this.searchBox.count()
  );

  await this.page.screenshot({
    path: 'after-continue-shopping.png',
    fullPage: true
  });
}

const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({headless: false, args: [
    '--start-maximized',
],
defaultViewport: null,});
  const page = await browser.newPage();
  await page.goto('https://github.com/truongduchuy');
  // await page.setViewport({ width: 350, height: 800 })
  await page.waitFor(2000)

  //click responsitories
  await page.click('.UnderlineNav-body a:nth-child(2)')

  await page.waitFor(2000)

  await page.screenshot({path: 'github.png', fullPage: true});

  await browser.close();
})();

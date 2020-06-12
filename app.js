const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://www.nhaccuatui.com/bai-hat/top-20.html");

  const songs = await page.evaluate(() => {
    let items = document.querySelectorAll(".name_song");
    let links = [];
    items.forEach(item => {
      links.push({
        title: item.innerText,
        url: item.getAttribute("href")
      });
    });
    return links;
  });
  console.log(songs);
  await browser.close();
})();
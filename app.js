const express = require('express')
const puppeteer = require('puppeteer');

const app = express()

const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send({test: 'hello'})
})

app.get('/test', (req, res) => {
    const { url } = req.query;

    (async () => {
    // const browser = await puppeteer.launch({headless: false});
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    await page.waitFor(2000)
    let fanpageData = await page.evaluate(() => {
      const backgroundImageElement = document.querySelector("._4on7");
      // ._u9q : about section
      let addressElement = document.querySelector('._u9q > div:nth-child(3) ._4bl9 > div')
      let phoneNumberElement = document.querySelector('._u9q > div:nth-child(4) ._4bl9 > div')
      let openTimeElement = document.querySelector('._u9q > div:nth-child(6) ._4bl9 > div')
      let numOfLikesElement = document.querySelector('._6590 > div:nth-child(2) ._4bl9 > div')
      let numOfFollowersElement = document.querySelector('._6590 > div:nth-child(3) ._4bl9 > div')
      // let rateReviewElement = document.querySelector('._1c02')
      // let reviewDataElement = [...document.querySelectorAll('._3-96 ._2w09 > div > span')]
  
      // const reviewData = { rate: reviewDataElement[0],
          // numOfReviewers: reviewDataElement[1].innerText.match(/\d*(?= người)/g)[0]}
      const imageUrl = backgroundImageElement && backgroundImageElement.src
      const address = addressElement && addressElement.innerText
      const phoneNumber = phoneNumberElement && phoneNumberElement.innerText
      const openTime = openTimeElement && openTimeElement.innerText
      // const rateReview = rateReviewElement && rateReviewElement.innerText
  
      // 8.615 người thích trang này => 8615
      const numOfLikes = numOfLikesElement && numOfLikesElement.innerText.replace('.', '').match(/\d*(?= người)/g)[0]
      const numOfFollowers = numOfFollowersElement && numOfFollowersElement.innerText.replace('.', '').match(/\d*(?= người)/g)[0]
  
      return {imageUrl, address, phoneNumber, openTime, numOfLikes, numOfFollowers, numOfLikes};
    });
    
    res.json({ fanpageData });
    await browser.close();
  })();
  });

app.listen(port, ()=>{
    console.log(`Server is up on port ${port}!`)
})

// require('./fanpageFb')

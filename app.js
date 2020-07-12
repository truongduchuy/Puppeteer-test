const express = require("express");
const puppeteer = require("puppeteer");

const app = express();

const port = process.env.PORT || 3000;

app.get("/test", (req, res) => {
  res.send(`${req.query.name}`);
});

app.get("/", async (req, res) => {
  const { url } = req.query;
  let fanpageData = {};

  try {
    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    console.log("browser is on");
    const page = await browser.newPage();
    await page.goto(url || "https://www.facebook.com/HelloCoffee125/");
    await page.waitFor(2000);
    fanpageData = await page.evaluate(() => {
      const backgroundImageElement = document.querySelector("._4on7");
      // ._u9q : about section
      let addressElement = document.querySelector(
        "._u9q > div:nth-child(3) ._4bl9 > div"
      );
      let phoneNumberElement = document.querySelector(
        "._u9q > div:nth-child(4) ._4bl9 > div"
      );
      
      const prefixOpenTime = ["Giờ", "Hours"];
      let openTimeElement = [
        ...document.querySelectorAll("._u9q > div"),
      ].find(element =>
        prefixOpenTime.some(prefix => element.innerText.includes(prefix))
      );

      let numOfLikesElement = document.querySelector(
        "._6590 > div:nth-child(2) ._4bl9 > div"
      );
      let numOfFollowersElement = document.querySelector(
        "._6590 > div:nth-child(3) ._4bl9 > div"
      );
      // let rateReviewElement = document.querySelector('._1c02')
      // let reviewDataElement = [...document.querySelectorAll('._3-96 ._2w09 > div > span')]

      // const reviewData = { rate: reviewDataElement[0],
      // numOfReviewers: reviewDataElement[1].innerText.match(/\d*(?= người)/g)[0]}
      const imageUrl = backgroundImageElement && backgroundImageElement.src;
      const address = addressElement && addressElement.innerText;
      const phoneNumber = phoneNumberElement && phoneNumberElement.innerText;
      const openTime = openTimeElement && openTimeElement.innerText;
      // const rateReview = rateReviewElement && rateReviewElement.innerText

      // 8.615 [người|people] thích trang này => 8615
      let numOfLikes =
        numOfLikesElement &&
        numOfLikesElement.innerText
          .replace(/[\.|\,]/, "")
          .match(/\d*(?= [người|people])/g);

      numOfLikes = numOfLikes && numOfLikes[0];

      let numOfFollowers =
        numOfFollowersElement &&
        numOfFollowersElement.innerText
          .replace(/[\.|\,]/, "")
          .match(/\d*(?= [người|followers])/g);

      numOfFollowers = numOfFollowers && numOfFollowers[0];

      return {
        imageUrl,
        address,
        phoneNumber,
        openTime,
        numOfLikes,
        numOfFollowers,
      };
    });

    await browser.close();

    res.send({ fanpageData });
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}!`);
});

# Puppeteer-test
A REST API that enables users to fetch information details of fanpage Facebook.
# Installation
```
npm install
npm run dev
```
# Usage 
Demo: https://puppeteer-tool.herokuapp.com/?url=https://www.facebook.com/HelloCoffee125/  
<br />
Change `https://www.facebook.com/HelloCoffee125/` to another Fanpage URL for testing.
# Deployment 
Download [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) and create an account.

Create an app: `heroku create [Appname]`.

Run `heroku buildpacks:add jontewks/puppeteer` in order to run puppeteer on heroku. Be sure to include `{ args: ['--no-sandbox'] }` in your call to `puppeteer.launch`.

After commit changes, you can push code to heroku: `git push heroku master`.

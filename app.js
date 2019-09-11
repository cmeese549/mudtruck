'use strict';

require('dotenv').config();

// const Twitter = require('twitter');
// const bot = new Twitter({
//     consumer_key: process.env.CONSUMER_KEY,
//     consumer_secret: process.env.CONSUMER_SECRET,
//     access_token_key: process.env.ACCESS_TOKEN_KEY,
//     access_token_secret: process.env.ACCESS_TOKEN_SECRET
// });

// bot.post('statuses/update', {status: 'mudtruck'},  function(error, tweet, response) {
//     if(error) console.log(error.body);
//     console.log(tweet);  // Tweet body.
//     console.log(response.body);  // Raw response object.
// });

const pup = require('puppeteer');
const email = process.env.EMAIL;
const pw = process.env.PW;

async function doit(){
    try{
        const browser = await pup.launch({ headless: true, args: ['--no-sandbox'] });
        const page = await browser.newPage();
        page.delay = function(time){ return new Promise(resolve => setTimeout(resolve, time))}
        const url = 'https://www.twitter.com/login';
        await page.goto(url);
        await page.$eval('.js-username-field.email-input.js-initial-focus', (e, email) => e.value = email, email);
        await page.$eval('.js-password-field', (e, pw) => e.value = pw, pw);
        await page.click('.submit.EdgeButton.EdgeButton--primary.EdgeButtom--medium');
        await page.waitForNavigation();
        await page.keyboard.press('N');
        await page.delay(200);
        await page.keyboard.type('mudtruck (posted by epic mudbot)');
        await page.delay(200);
        await page.keyboard.down('Meta');
        await page.delay(200);
        await page.keyboard.press('Enter');
        await page.delay(200);
        await page.keyboard.up('Meta');
        await page.delay(200);
        await browser.close();
    }catch(err){
        console.log(err);
    }
}

doit();
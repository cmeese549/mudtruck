'use strict';
require('dotenv').config();
const CronJob = require('cron').CronJob;
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

const cjob = new CronJob('1 20 16 * * *', function() {
    doit();
}, null, true, 'America/Denver');
cjob.start();


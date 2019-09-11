'use strict';

require('dotenv').config();

const Twitter = require('twitter');
const bot = new Twitter({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token_key: process.env.ACCESS_TOKEN_KEY,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

bot.post('statuses/update', {status: 'mudtruck'},  function(error, tweet, response) {
    if(error) console.log(error.body);
    console.log(tweet);  // Tweet body.
    console.log(response.body);  // Raw response object.
});
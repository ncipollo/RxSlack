let RxSlack = require('./lib/rxslack.js').RxSlack;
let fs = require('fs');
const token = process.env.TOKEN;

let slack = new RxSlack(token);

slack.rtm
    .onAuthenticated
    .subscribe(data => console.log(data));


slack.rtm
    .onMessage
    .subscribe(message => console.log(message));

slack.start();
let RxSlack = require('./lib/rxslack.js').RxSlack;
let fs = require('fs');
const token = process.env.TOKEN;

let slack = new RxSlack(token);

slack.onAuthenticated
    .subscribe(data => console.log(data));


slack.onMessage
    .subscribe(message => console.log(message));

slack.start();
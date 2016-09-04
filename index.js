let RxSlack = require('./lib/rxslack.js').RxSlack;
let fs = require('fs');
const token = process.env.TOKEN;
var Rx = require('rxjs/Rx');

let slack = new RxSlack(token);

slack.onMessage
    .subscribe(message => console.log(message) );


slack.start();


# RxSlack
[![Build Status](https://travis-ci.org/ncipollo/rxslack.svg?branch=master)](https://travis-ci.org/ncipollo/rxslack)

This library provides RxJS bindings on top of the slack SDK. It is intended to allow simple and elegant Rx chaining of slack events.
# Examples
## Connection State Observables
```js
bot.onConnected.subscribe(() => {
    // Your bot will be fully connected to slack at this point.
});
bot.onDisconnected.subscribe(() => {
    // Your bot is no longer connected.
});
```
## Messaging a User
```js
bot.fetchUsers()
    .filter(user => user.name == "nick")
    .subscribe(user => user.directMessage("hello human"))
```
## Messaging a Channel
```js
bot.fetchChannels()
    .filter(channel => channel.name == "dev")
    .subscribe(channel => channel.sendMessage("Hey Everyone!"));
```
## Receiving Messages
```js
bot.onMessage
    .filter(msg => msg.isDirectMention)
    .subscribe(msg => console.log(msg.text);
```
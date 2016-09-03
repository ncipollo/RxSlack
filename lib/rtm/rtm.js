/**
 * The RTM component of RxSlack
 * Created by Nick Cipollo on 8/25/16.
 */

const RtmClient = require('@slack/client').RtmClient;
var RTM_EVENTS = require('@slack/client').RTM_EVENTS;
const RTM_CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS.RTM;
var Rx = require('rxjs/Rx');

class RTM {

    constructor(token) {
        this._client = new RtmClient(token);
    }

    start() {
        this._client.start();
    }

    sendMessage(message, channelId) {
        let promise = this._client.sendMessage(message, channelId);
        if(promise == null) {
            promise = new Promise((resolve,reject) => reject({}))
        }
        return Rx.Observable.fromPromise(promise);
    }

    get onAuthenticated() {
        return Rx.Observable.fromEvent(this._client,RTM_CLIENT_EVENTS.AUTHENTICATED);
    }

    get onConnected() {
        return Rx.Observable.fromEvent(this._client,RTM_CLIENT_EVENTS.RTM_CONNECTION_OPENED);
    }

    get onDisconnected() {
        return Rx.Observable.fromEvent(this._client,RTM_CLIENT_EVENTS.DISCONNECT);
    }

    get onMessage() {
        return Rx.Observable.fromEvent(this._client,RTM_EVENTS.MESSAGE);
    }
}

module.exports = {
    RTM: RTM
};

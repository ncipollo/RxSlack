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
        // Setup callbacks for lifecycle events
        this._authSubject = new Rx.ReplaySubject(1);
        this._client.on(RTM_CLIENT_EVENTS.AUTHENTICATED, startData => this._authSubject.next(startData));
        this._connectedSubject = new Rx.ReplaySubject(1);
        this._client.on(RTM_CLIENT_EVENTS.RTM_CONNECTION_OPENED, startData => this._connectedSubject.next(startData));
        this._disconnectSubject = new Rx.ReplaySubject(1);
        this._client.on(RTM_CLIENT_EVENTS.DISCONNECT, discData => this._disconnectSubject.next(discData));
        // Setup callbacks for RTM events
        this._messageSubject = new Rx.Subject();
        this._client.on(RTM_EVENTS.MESSAGE, msg => this._messageSubject.next(msg));
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
        return this._authSubject.asObservable();
    }

    get onConnected() {
        return this._connectedSubject.asObservable();
    }

    get onDisconnected() {
        return this._disconnectSubject.asObservable();
    }

    get onMessage() {
        return this._messageSubject.asObservable();
    }
}

module.exports = {
    RTM: RTM
};

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
        this._authSubject = new Rx.BehaviorSubject(null);
        this._client.on(RTM_CLIENT_EVENTS.AUTHENTICATED, startData => this._authSubject.next(startData));
        this._connectedSubject = new Rx.BehaviorSubject(null);
        this._client.on(RTM_CLIENT_EVENTS.RTM_CONNECTION_OPENED, startData => this._connectedSubject.next(startData));
        this._disconnectSubject = new Rx.BehaviorSubject(null);
        this._client.on(RTM_CLIENT_EVENTS.DISCONNECT, discData => this._disconnectSubject.next(discData));
        // Setup callbacks for RTM events
        this._messageSubject = new Rx.Subject();
        this._client.on(RTM_EVENTS.MESSAGE, msg => this._messageSubject.next(msg));
    }

    start() {
        this._client.start();
    }


    get onAuthenticated() {
        return this._authSubject.asObservable().filter(auth => auth != null);
    }

    get onConnected() {
        return this._connectedSubject.asObservable().filter(c => c != null);
    }

    get onDisconnected() {
        return this._disconnectSubject.asObservable().filter(d => d != null);;
    }

    get onMessage() {
        return this._messageSubject.asObservable();
    }
}

module.exports = {
    RTM: RTM
};

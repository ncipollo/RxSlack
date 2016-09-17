/**
 * Created by ncipollo on 8/25/16.
 */

const RtmClient = require('@slack/client').RtmClient;
var RTM_EVENTS = require('@slack/client').RTM_EVENTS;
const RTM_CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS.RTM;
var Rx = require('rxjs/Rx');
const RxDataStore = require('./models/datastore/datastore.js').RxDataStore;
const RxUser = require('./models/user');
const RxMessage = require('./models/message').RxMessage;

class RxSlack {

    constructor(token) {
        this._datastore = new RxDataStore(null,this);
        this._client = new RtmClient(token,{
            dataStore: this._datastore
        });
    }

    start() {
        this._client.start();
        this.onAuthenticated
            .map(data => data["self"])
            .subscribe(self => {
                this._self = this._datastore.getUser(self["id"]);
            });
    }

    sendMessage(message, channelId) {
        let promise = this._client.sendMessage(message, channelId);
        if(promise == null) {
            promise = new Promise((resolve,reject) => reject({}))
        }
        return Rx.Observable.fromPromise(promise);
    }

    get self() {
        return this._self;
    }

    get datastore() {
        return this._datastore;
    }

    get onAuthenticated() {
        return this.onEvent(RTM_CLIENT_EVENTS.AUTHENTICATED);
    }

    get onConnected() {
        return this.onEvent(RTM_CLIENT_EVENTS.RTM_CONNECTION_OPENED);
    }

    get onDisconnected() {
        return this.onEvent(RTM_CLIENT_EVENTS.DISCONNECT);
    }

    get onMessage() {
        return this.onEvent(RTM_EVENTS.MESSAGE)
            .map(message => new RxMessage(message,this));
    }

    onEvent(event) {
        return Rx.Observable.fromEvent(this._client,event);
    }

    fetchUsers() {
        return this._datastore.fetchUsers();
    }

    fetchChannels() {
        return this._datastore.fetchChannels();
    }
}

module.exports = {
    RxSlack: RxSlack
};
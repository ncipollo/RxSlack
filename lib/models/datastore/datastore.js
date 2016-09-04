const RxUser = require('../user').RxUser;
const RxChannel = require('../channel').RxChannel;
const MemoryDataStore = require('@slack/client').MemoryDataStore;
var Rx = require('rxjs/Rx');

class RxDataStore extends MemoryDataStore {

    constructor(opts, rxSlack) {
        super(opts);
        this._rxUsers = {};
        this._rxChannels = {};
        this._rxSlack = rxSlack;
    }

    fetchUsers() {
        return Rx.Observable.of(this.allUsers())
    }

    allUsers() {
        return Object.keys(this._rxUsers)
            .map(key => this._rxUsers[key])
    }

    fetchChannels() {
        return Rx.Observable.of(this.allChannels())
    }

    allChannels() {
        return Object.keys(this._rxChannels)
            .map(key => this._rxChannels[key])
    }

    getUser(userId) {
        if(userId != null) {
            return this._rxUsers[userId];
        }
        return null;
    }

    getChannel(channelId) {
        if(channelId != null) {
            return this._rxChannels[channelId];
        }
        return null;
    }

    //noinspection JSUnusedGlobalSymbols
    setUser(user) {
        super.setUser(user);
        this.updateRxUserForUser(user);
    }

    //noinspection JSUnusedGlobalSymbols
    upsertUser(user) {
        super.upsertUser(user);
        this.updateRxUserForUser(user);
    }

    //noinspection JSUnusedGlobalSymbols
    removeUser(userId) {
        super.removeUser(userId);
        this.updateRxUser(userId, null, null);

    }

    //noinspection JSUnusedGlobalSymbols
    setDM(dm) {
        super.setDM(dm);
        this.updateRxUserForDM(dm);
    }

    //noinspection JSUnusedGlobalSymbols
    upsertDM(dm) {
        super.upsertDM(dm);
        this.updateRxUserForDM(dm);
    }

    //noinspection JSUnusedGlobalSymbols
    removeDM(dmId) {
        let dm = super.getDMById(dmId);
        if (dm != null) {
            this.updateRxUser(dm["user"], null, null);
        }
        super.removeDM(dmId);

    }

    updateRxUserForDM(dm) {
        if (dm != null) {
            let userId = dm["user"];
            if (userId != null) {
                let user = super.getUserById(userId);
                if (user != null) {
                    this.updateRxUser(user.id, user, dm);
                }
            }
        }
    }

    updateRxUserForUser(user) {
        if (user != null) {
            let name = user["name"];
            if (name != null) {
                let dm = super.getDMByName(name);
                this.updateRxUser(user.id, user, dm);
            }
        }
    }

    updateRxUser(userId, user, dm) {
        if (userId == null) {
            return;// Bail, nothing we can do
        }
        if (user != null) {
            this._rxUsers[userId] = new RxUser(user, dm, this._rxSlack)
        } else {
            // If user is null remove it.
            delete this._rxUsers[userId];
        }
    }

    //noinspection JSUnusedGlobalSymbols
    setChannel(channel) {
        super.setChannel(channel);
        let channelId = null;
        if(channel != null) {
            channelId = channel["id"];
        }
        this.updateRxChannel(channelId,channel);
    }

    //noinspection JSUnusedGlobalSymbols
    upsertChannel(channel) {
        super.setChannel(channel);
        let channelId = null;
        if(channel != null) {
            channelId = channel["id"];
        }
        this.updateRxChannel(channelId,channel);
    }

    //noinspection JSUnusedGlobalSymbols
    removeChannel(channelId) {
        super.removeChannel(channelId);
        this.updateRxChannel(channelId, null, null);

    }

    updateRxChannel(channelId,channel) {
        if(channelId == null) {
            return; // Bail, nothing we can do
        }
        if(channel != null) {
            this._rxChannels[channelId] = new RxChannel(channel,this._rxSlack);
        } else {
            // If channel is null remove it
            delete this._rxChannels[channelId];
        }
    }
}

module.exports = {
    RxDataStore: RxDataStore
};
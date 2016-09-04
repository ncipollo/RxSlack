var Rx = require('rxjs/Rx');
/**
 * Represents a slack user.
 */
class RxUser {
    constructor(user, ims, rxslack) {
        this._user = user;
        this._rxslack = rxslack;
        if(ims != null) {
            this._ims = ims;
        } else {
            this._ims = {};
        }
    }

    get id() {
        return this._user["id"];
    }

    get dm() {
        return this._ims["id"]
    }

    get teamId() {
        return this._user["team_id"];
    }

    get name() {
        return this._user["name"];
    }

    get realName() {
        return this._user["real_name"];
    }

    get presence() {
        return this._user["presence"];
    }

    directMessage(message) {
        if(this._rxslack != null && this.dm != null) {
            return this._rxslack.sendMessage(message,this.dm);
        }
        return Rx.Observable.throw(new Error("Can't send DM"))
    }

    toString() {
        return this.name;
    }
}

module.exports = {
    RxUser: RxUser
};
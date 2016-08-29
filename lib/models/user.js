/**
 * Represents a slack user.
 */
class User {
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

    get im() {
        return this.ims["id"]
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

    toString() {
        return this.name;
    }
}
var Rx = require('rxjs/Rx');

class RxChannel {
    constructor(channel,rxslack) {
        this._channel = channel;
        this._rxslack = rxslack;
    }

    get id() {
        return this._channel["id"];
    }

    get name() {
        return this._channel["name"];
    }

    get isGroup() {
        return this._channel["is_group"];
    }

    get isArchived() {
        return this._channel["is_archived"];
    }

    sendMessage(message) {
        if(this._rxslack != null && this.id != null) {
            return this._rxslack.sendMessage(message,this.id);
        }
        return Rx.Observable.throw(new Error("Can't send channel message."))
    }

    hereMessage(message) {
        if(this._rxslack != null && this.id != null) {
            return this._rxslack.sendMessage(`<!here|@here> ${message}`,this.id);
        }
        return Rx.Observable.throw(new Error("Can't send here message."))
    }

    channelMessage(message) {
        if(this._rxslack != null && this.id != null) {
            return this._rxslack.sendMessage(`<!channel|@channel> ${message}`,this.id);
        }
        return Rx.Observable.throw(new Error("Can't send channel message."))
    }

    toString() {
        return this.name;
    }
}

module.exports = {
    RxChannel: RxChannel
};

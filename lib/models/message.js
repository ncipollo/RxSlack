const RxMentions = require(`./mentions`).RxMentions;
class RxMessage {
    constructor(message, rxslack) {
        this._message = message;
        if (rxslack != null) {
            this._user = rxslack.datastore.getUser(this.userId);
            this._channel = rxslack.datastore.getChannel(this.channelId);
            this._rxslack = rxslack;
        }
    }

    get text() {
        return this._message["text"];
    }

    get time() {
        return this._message["ts"];
    }

    get userId() {
        return this._message["user"];
    }

    get user() {
        return this._user;
    }

    get channel() {
        return this._channel;
    }

    get channelId() {
        return this._message["channel"];
    }

    get isDirectMention() {
        return RxMentions.includesUser(this.text, this._rxslack.self);
    }

    get isMention() {
        return this.isDirectMention
            || RxMentions.includesChannel(this.text)
            || RxMentions.includesHere(this.text);
    }

    toString() {
        return this.text;
    }
}

module.exports = {
    RxMessage: RxMessage
};
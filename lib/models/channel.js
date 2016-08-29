class Channel {
    constructor(channel) {
        this._channel = channel;
    }

    get id() {
        return this._channel["id"];
    }

    get name() {
        return this._channel["name"];
    }

    get isArchived() {
        return this._channel["is_archived"];
    }

    toString() {
        return this.name;
    }
}

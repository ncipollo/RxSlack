class RxMentions {
    static get here() {
        return "<!here|@here>";
    }

    static get channel() {
        return "<!channel>";
    }

    static includesHere(text) {
        if(text != null) {
            return text.includes(this.here);
        }
        return false;
    }

    static includesChannel(text) {
        if(text != null) {
            return text.includes(this.channel);
        }
        return false;
    }

    static forUser(user) {
        if(user != null && user.id != null) {
            return `<@${user.id}>`
        }
        return ""
    }

    static includesUser(text,user) {
        if(text != null && user != null) {
            return text.includes(this.forUser(user))
        }
        return false;
    }
}

module.exports = {
    RxMentions: RxMentions
};
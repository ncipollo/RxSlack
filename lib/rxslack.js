/**
 * Created by ncipollo on 8/25/16.
 */

const RTM = require("./rtm/rtm.js").RTM;

class RxSlack {

    constructor(token) {
        this._rtm = new RTM(token)
    }

    start() {
        this.rtm.start();
    }

    get rtm() {
        return this._rtm;
    }
}

module.exports = {
    RxSlack: RxSlack
};
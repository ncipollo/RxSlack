const expect = require('chai').expect;
const RxSlack = require('../../lib/rxslack.js').RxSlack;
const RxUser = require('../../lib/models/user').RxUser;
const RxChannel = require('../../lib/models/channel').RxChannel;
const RxMessage = require('../../lib/models/message').RxMessage;
const token = process.env.TOKEN;

describe('Models', function () {
    let rxSlack = new RxSlack(token);
    describe('RxUser', function () {
        let userData = {
            id: "id",
            team_id: "team",
            name: "johnny5",
            real_name: "Johnny 5",
            presence: "away"
        };
        let ims = {id: "dmId"};
        let user = new RxUser(userData, ims, rxSlack);
        it('has valid properties', function () {
            expect(user.id).to.be.equal("id");
            expect(user.dm).to.be.equal("dmId");
            expect(user.teamId).to.be.equal("team");
            expect(user.name).to.be.equal("johnny5");
            expect(user.realName).to.be.equal("Johnny 5");
            expect(user.presence).to.be.equal("away");
        });

        it('toString method method matches the name', function () {
            expect(user.toString()).to.be.equal(user.name)
        });
    });

    describe(`RxChannel`, function () {
        let channelData = {
            id: "id",
            "name": "channel",
            "is_group": true,
            "is_archived": false
        };
        channel = new RxChannel(channelData,rxSlack);
        it('has valid properties', function () {
            expect(channel.id).to.be.equal("id");
            expect(channel.name).to.be.equal("channel");
            expect(channel.isGroup).to.be.equal(true);
            expect(channel.isArchived).to.be.equal(false);
        });

        it('toString method method matches the name', function () {
            expect(channel.toString()).to.be.equal(channel.name)
        });
    });

    describe(`RxMessage`, function () {
        let messageData = {
            text: "hi",
            user: "user",
            channel: "channel",
            ts: "100"
        };
        message = new RxMessage(messageData,rxSlack);
        it('has valid properties', function () {
            expect(message.text).to.be.equal("hi");
            expect(message.userId).to.be.equal("user");
            expect(message.channelId).to.be.equal("channel");
            expect(message.time).to.be.equal("100");

        });

        it('toString method method matches the text', function () {
            expect(message.toString()).to.be.equal(message.text)
        });

        it('mention method to be false for "hi" ', function () {
            expect(message.isMention).to.be.equal(false)
        });

        it('mention method to be true for "hi @here" ', function () {
            messageData.text = "hi <!here|@here>";
            expect(message.isMention).to.be.equal(true)
        });
    });
});
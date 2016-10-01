const expect = require('chai').expect;
const RxSlack = require('../lib/rxslack.js').RxSlack;
const recvToken = process.env.RECV_TOKEN;
const sendToken = process.env.SEND_TOKEN;

describe('Integration', function () {
    describe('Token', function () {
        it('has valid tokens', function () {
            expect(recvToken).to.not.be.null;
            expect(sendToken).to.not.be.null;
        });
    });

    describe('Bots', function () {
        let recvBot = new RxSlack(recvToken);
        let sendBot = new RxSlack(sendToken);
        it('bots connect correctly', function (done) {
            this.timeout(10000);
            let recvConnected = false;
            let sendConnected = false;
            checkConnected = function () {
                if(recvConnected && sendConnected) {
                    done();
                }
            };
            recvBot.onConnected.subscribe(() => {
                recvConnected = true;
                checkConnected();
            });
            sendBot.onConnected.subscribe(() => {
                sendConnected = true;
                checkConnected();
            });
            recvBot.start();
            sendBot.start();
        });
        it('bots send and receive messages', function (done) {
            this.timeout(2000);
            recvBot.onMessage.subscribe(msg => {
                expect(msg.text).to.be.equal("hi");
                done();
            });
            sendBot.fetchChannels()
                .filter(channel => channel.name == "tests")
                .subscribe(channel => channel.sendMessage("hi"));
        });
    });
});
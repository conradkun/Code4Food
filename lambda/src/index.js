'use strict';
var Alexa = require("alexa-sdk");

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    console.log("Init");
    alexa.registerHandlers(handlers);
    console.log("Launched");
    alexa.execute();
    console.log("Executed");
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('SayHello');
    },
    'Hello': function () {
        this.emit('SayHello')
    },
    'SayHello': function () {
        this.emit(':tell', 'Hello World!');
    }
};
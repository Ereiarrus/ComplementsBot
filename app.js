'use strict';
const readline = require('readline');
const lineReader = require('line-reader');
const fs = require('fs');


// add reference to the TMI library
const TMI = require('tmi.js');
// Bot Name and Password
const BOT_NAME = "ComplementsBot";
const TMI_OAUTH = "";
const TMI_OPTIONS = {
    identity: {
        username: BOT_NAME,
        password: TMI_OAUTH
    },
    channels: [
        
    ]
}

var last_complemented = "";
var complements = [];

// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr, port) {
    const complements_list_file = './complements_list.txt';
    lineReader.eachLine(complements_list_file, (line, last) => {
        complements.push(line);
    })
    console.log(`Successfully Connected to ${addr}:${port}`);
}

function onMessageHandler(target, tags, message, self) {
    // Just leave this function if the message is from self
    if (self) { return; }

    var rng_0_to_19 = Math.floor(Math.random() * 20);

    if (rng_0_to_19 == 0 && tags.username.toLowerCase() !== "nightbot" && tags.username.toLowerCase() !== "spri_bot") {
        var rng_msg_index = Math.floor(Math.random() * complements.length);
        var msg = "@" + tags.username + " " + complements[rng_msg_index];
        client.say(target, msg);
    }
}

// Connect bot to channels and get client instance
const client = new TMI.client(TMI_OPTIONS);
client.on('connected', onConnectedHandler);
client.connect();
client.on('message', onMessageHandler);

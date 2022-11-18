'use strict';
const readline = require('readline');
const lineReader = require('line-reader');
const fs = require('fs');
const TMI = require('tmi.js');

// Files:
const complements_list_file = './complements_list.txt';
const auth_token_file = './AUTH_TOKEN';
const complement_chance_file = './COMPLEMENT_CHANCE';
const channels_file = './CHANNELS';

var ignored_users = [];

const BOT_NAME = "ComplementsBot";
var TMI_OAUTH = "";
fs.readFile(auth_token_file, 'utf-8', (err, data) => {
    if (err) throw err;
    TMI_OAUTH = data.trim();
})

const channels_to_join = [];
var complements = [];
fs.readFile(channels_file, 'utf-8', (err, data) => {
    if (err) throw err;
    channels_to_join = data.trim().split("\n");
})


const TMI_OPTIONS = {
    identity: {
        username: BOT_NAME,
        password: TMI_OAUTH
    },
    channels: channels_to_join
}

//var complements = [];
const complements = readAsText(new FileReader()).split("\n");
fs.readFile(complements_list_file, 'utf-8', (err, data) => {
    if (err) throw err;
    complements = data.trim().split("\n");
})

// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr, port) {
    lineReader.eachLine(complements_list_file, (line, last) => {
        complements.push(line);
    })
    console.log(`Successfully connected to ${addr}:${port}`);
}

var complement_chance = 5;
fs.readFile(complement_chance_file, 'utf-8', (err, data) => {
    if (err) throw err;
    complement_chance = data.trim();
})

var last_complemented = "";
function onMessageHandler(target, tags, message, self) {
    // Just leave this function if the message is from self
    if (self) { return; }

    var should_complement = (Math.random() * 100) <= complement_chance;
    var is_user_bot = tags.username.length >= 3
        && tags.username.substring(tags.username.length - 3, tags.username.length).toLowerCase() === "bot";

    if (should_complement
        && last_complemented !== tags.username
        && !is_user_bot
        && !ignored_users.includes(tags.username)) {
        var rng_msg_index = Math.floor(Math.random() * complements.length);
        var msg = "@" + tags.username + " " + complements[rng_msg_index];
        client.say(target, msg);
        last_complemented = tags.username;
    }
}

// Connect bot to channels and get client instance
const client = new TMI.client(TMI_OPTIONS);
client.on('connected', onConnectedHandler);
client.connect();
client.on('message', onMessageHandler);

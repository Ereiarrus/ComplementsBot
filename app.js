'use strict';
require('dotenv').config();
const TMI = require('tmi.js');

const TMI_TOKEN = `${process.env.TMI_TOKEN}`;
const CLIENT_ID = `${process.env.CLIENT_ID}`;
const DATABASE_URL = `${process.env.DATABASE_URL}`;

const CMD_PREFIX = '!'
const BOT_NICK = "complementsbot"
const OWNER_NICK = 'ereiarrus'
const SHOULD_LOG = true
let IGNORED_USERS = [];
let TMI_OAUTH = "";
const DEFAULT_COMPLEMENTS = [
    "You're looking great today!",
    "I believe in you!",
    "Keep going! You will get there!",
    "You're doing great! Keep it up!",
    "You can do it! Don't let your dreams be memes!",
    "I care about you.",
    "You mean a lot to me.",
    "You're pretty.",
    "You're a smart cookie.",
    "I like your style.",
    "I appreciate you.",
    "You are the most perfect you there is.",
    "You're an awesome friend.",
    "You light up the room.",
    "You deserve a hug right now.",
    "You should be proud of yourself.",
    "You're more helpful than you realize.",
    "You've got all the right moves!",
    "I'm proud of you.",
    "Your kindness is a balm to all who encounter it.",
    "You're beautiful - inside and out.",
    "You have the courage of your convictions.",
    "You are making a difference.",
    "You are gorgeous.",
    "You're like sunshine on a rainy day.",
    "You bring out the best in other people.",
    "Everything would be better if more people were like you!",
    "Hanging out with you is always a blast.",
    "Being around you makes everything better!",
    "Colors seem brighter when you're around.",
    "You're wonderful.",
    "You're one of a kind!",
    "You're inspiring.",
    "Our community is better because you're in it.",
    "Someone is getting through something hard right now because you've got their back.",
    "The people you love are lucky to have you in their lives.",
    "You're like a breath of fresh air.",
    "Any team would be lucky to have you on it.",
    "There's ordinary, and then there's you.",
    "You're someone's reason to smile.",
    "You have a good head on your shoulders.",
    "You're really something special.",
    "You're a gift to those around you.",
    "You're looking mighty handsome today!",
    "I would kill a pantheon to make you happy."
];

let channels_to_join = ["ereiarrus", "complementsbot"];

const client = new TMI.Client({
    options: { debug: SHOULD_LOG },
    identity: {
        username: BOT_NICK,
        password: TMI_TOKEN
    },
    channels: channels_to_join
});
client.connect().catch(console.error);
client.on('message', (channel, tags, message, self) => {
    if(self) return;
    if(message.toLowerCase() === '!hello') {
        client.say(channel, `@${tags.username}, heya!`);
    }
});

/*

// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr, port) {
    lineReader.eachLine(complements_list_file, (line, last) => {
        DEFAULT_COMPLEMENTS.push(line);
    })
    console.log(`Successfully connected to ${addr}:${port}`);
}

var complement_chance = 10.0/3.0;

function onMessageHandler(target, tags, message, self) {
    // Just leave this function if the message is from self
    if (self) { return; }

    var should_complement = (Math.random() * 100) <= complement_chance;
    var is_user_bot = tags.username.length >= 3
        && tags.username.substring(tags.username.length - 3, tags.username.length).toLowerCase() === "bot";

    if (should_complement
        && !is_user_bot
        && !IGNORED_USERS.includes(tags.username)) {
        var rng_msg_index = Math.floor(Math.random() * DEFAULT_COMPLEMENTS.length);
        var msg = "@" + tags.username + " " + DEFAULT_COMPLEMENTS[rng_msg_index];
        //client.say(target, msg);
    }
}

// Connect bot to channels and get client instance
client.on('connected', onConnectedHandler);
client.connect();
client.on('message', onMessageHandler);
*/

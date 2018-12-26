const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json");
const hook = new Discord.WebhookClient('527436852563804173', 'Lgi0lzYmxFj8Av8OrHOIdx8cJVZnU7NpwHITmI1KYmEZqGEqr9peDvMA5SRhnTqYXcZT');

let API = {};

API.post = function (message) {
    hook.send(message);
}

module.exports = API;

// Create a new webhook

// Send a message using the webhook

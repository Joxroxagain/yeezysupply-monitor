// Extract the required classes from the discord.js module
// Extract the required classes from the discord.js module
const { Client, RichEmbed } = require('discord.js');
const Discord = require('discord.js');

// Create an instance of a Discord client
const client = new Client();
const hook = new Discord.WebhookClient('527469745163993108', 'PdO_DVZTSltnQ3gPh1HSW9N2U6ih4Lxpq8tEldt1DpqDnydqygGy5q5GrKfDPot8ZDE1');

let API = {};

API.post = function (message) {
    
    const embed = new RichEmbed()
      // Set the title of the field
      .setTitle('Test')
      // Set the color of the embed
      .setColor(0xFF0000)
      // Set the main content of the embed
      .setDescription(message);
    // Send the embed to the same channel as the message
    hook.send(embed);

}

module.exports = API;

// Create a new webhook

// Send a message using the webhook

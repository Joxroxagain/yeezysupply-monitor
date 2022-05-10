// Extract the required classes from the discord.js module
// Extract the required classes from the discord.js module
const { Client, RichEmbed } = require('discord.js');
const Discord = require('discord.js');

// Create an instance of a Discord client
const client = new Client();
const monitor = new Discord.WebhookClient('', '');
const update = new Discord.WebhookClient('', '');
const test = new Discord.WebhookClient('', '');

let API = {};

API.toMonitor = function (data) {



    const embed = new Discord.RichEmbed()
        .setTitle("This is your title, it can hold 256 characters")
        .setAuthor("Author Name", "https://i.imgur.com/lm8s41J.png")
        /*
         * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
         */
        .setColor(0x00AE86)
        .setDescription("")
        /*
         * Takes a Date object, defaults to current date.
         */
        .setTimestamp()
        .setURL("https://discord.js.org/#/docs/main/indev/class/RichEmbed")
        .addField("This is a field title, it can hold 256 characters",
            "This is a field value, it can hold 1024 characters.")
        /*
         * Inline fields may not display as inline if the thumbnail and/or image is too big.
         */
        .addField("Inline Field", "They can also be inline.", true)
        /*
         * Blank field, useful to create some space.
         */
        .addBlankField(true)
        .addField("Inline Field 3", "You can have a maximum of 25 fields.", true);
    monitor.send(embed);

}
API.toUpdate = function (message) {

    const embed = new RichEmbed()
        // Set the title of the field
        .setTitle('Status update')
        // Set the color of the embed
        .setColor(0xFF0000)
        // Set the main content of the embed
        .setDescription(message);
    // Send the embed to the same channel as the message
    update.send(embed);

}
API.toTesting = function (message) {


    const embed = new Discord.RichEmbed()
        .setTitle("This is your title, it can hold 256 characters")
        .setAuthor("Author Name", "https://i.imgur.com/lm8s41J.png")
        /*
         * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
         */
        .setColor(0x00AE86)
        .setDescription("")
        /*
         * Takes a Date object, defaults to current date.
         */
        .setTimestamp()
        .setURL("https://discord.js.org/#/docs/main/indev/class/RichEmbed")
        .addField("This is a field title, it can hold 256 characters",
            "This is a field value, it can hold 1024 characters.")
        /*
         * Inline fields may not display as inline if the thumbnail and/or image is too big.
         */
        .addField("Inline Field", "They can also be inline.", true)
        /*
         * Blank field, useful to create some space.
         */
        .addBlankField(true)
        .addField("Inline Field 3", "You can have a maximum of 25 fields.", true);
    test.send(embed);

}
module.exports = API;

// Create a new webhook

// Send a message using the webhook

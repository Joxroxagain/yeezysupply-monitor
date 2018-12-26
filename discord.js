// Extract the required classes from the discord.js module
// Extract the required classes from the discord.js module
const { Client, RichEmbed } = require('discord.js');
const Discord = require('discord.js');

// Create an instance of a Discord client
const client = new Client();
const monitor = new Discord.WebhookClient('527482856453439488', 'G81AnS_RRufL3xp9eaIACZ4d0l7ru7uFNlliEBe_s0Zr3NpV-1wUpLTNY2Qkx_t1LbLB');
const update = new Discord.WebhookClient('527476533208809479', 'dfACkGh-1g8homiAMcSttN-wpk5GkjdQ7oIl4RXL1TE41K2Y_MyBv8tc1JZI8cOPt-DV');
const test = new Discord.WebhookClient('527470904205377538', 'hl6ztklhJFlAaGacjb9dYADFdqLA9EK0NpIfGpDW_qQ7-Nn53u3rFUgxQXvQvEdAol_m');

let API = {};

API.toMonitor = function (message) {
    
    const embed = new RichEmbed()
      // Set the title of the field
      .setTitle('Yeezy 350 Static Reflective checkout link')
      // Set the color of the embed
      .setColor(0xFF0000)
      // Set the main content of the embed
      .setDescription(message);
    // Send the embed to the same channel as the message
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
    
    const embed = new RichEmbed()
      // Set the title of the field
      .setTitle('Test update')
      // Set the color of the embed
      .setColor(0xFF0000)
      // Set the main content of the embed
      .setDescription(message);
    // Send the embed to the same channel as the message
    test.send(embed);

}
module.exports = API;

// Create a new webhook

// Send a message using the webhook

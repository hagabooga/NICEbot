const Discord = require("discord.js");
const fs = require("fs");

/**
 * @param {Discord.Client} client The discord client
 * @param {Discord.Message} message The message
 * @param {Array<string>} args The string
 */
exports.run = (client, message, args) => {
    fs.readFile("counts.txt", function (err, data) {
        data = data.toString().split("\n");
        console.log(data);
        message.channel.send(
            `**Good/Bad Bot Ratio**\n**Time started:** ${data[2]}\`\`\`Good: ${data[0]} Bad: ${data[1]}\`\`\``
        );
    });
};

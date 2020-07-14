const Discord = require("discord.js");
/**
 * @param {Discord.Client} client The discord client
 * @param {Discord.Message} message The message
 * @param {Array<string>} args The string
 */

exports.run = (client, message, args) => {
    message.channel.send({
        files: [
            message.mentions.users.first().displayAvatarURL({
                format: "png",
                dynamic: false,
                size: 4096,
            }),
        ],
    });
};

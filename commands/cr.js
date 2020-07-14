const Discord = require("discord.js");
/**
 * @param {Discord.Client} client The discord client
 * @param {Discord.Message} message The message
 * @param {Array<string>} args The string
 */

exports.run = (client, message, args) => {
    const mention = message.mentions.users.first();
    args = args.filter((m) => !m.startsWith("<"));
    if (args.length == 0) return;
    if (mention) {
        message.channel.send(`<@${mention.id}>`).catch(console.error);
    }
    if (args.length > 0)
        message.channel
            .send(
                args
                    .reduce((acc, cur) => acc + " " + cur, "")
                    .toLowerCase()
                    .split("")
                    .reduce((acc, cur) => {
                        let add =
                            acc +
                            ("a" <= cur && cur <= "z"
                                ? `:regional_indicator_${cur}:`
                                : cur === "?"
                                ? ":question:"
                                : cur === " "
                                ? "\t"
                                : cur === "!"
                                ? ":exclamation:"
                                : "");
                        if (add !== "") add += " ";
                        return add;
                    }, "")
            )
            .catch(console.error);
};

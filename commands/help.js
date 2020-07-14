const Discord = require("discord.js");

const descriptions = [
    {
        Command: "cr",
        Description: "Convert text to Regional Indicator",
        Usage: "cr <message> [@mention_user]",
    },
    {
        Command: "dp",
        Description: "Get user display picture",
        Usage: "h <@mention_user>",
    },
    { Command: "h", Description: "Query a Rule 34 image", Usage: "h <query>" },
    {
        Command: "help",
        Description: "Get DMed this message",
        Usage: "!help",
    },
    { Command: "icit", Description: "I see it", Usage: "icit" },
    {
        Command: "r",
        Description: "Reload all/a command(s)",
        Usage: "r [command]",
    },

    {
        Command: "ratio",
        Description: "Display good/bad bot ratio",
        Usage: "ratio",
    },
    // { Command: "", Description: "", Usage: "" },
    // { Command: "", Description: "", Usage: "" },
    // { Command: "", Description: "", Usage: "" },
];

const table_gen = require("../util/table_gen");

/**
 * @param {Discord.Client} client The discord client
 * @param {Discord.Message} message The message
 * @param {Array<string>} args The string
 */
exports.run = (client, message, args) => {
    message.author.send(
        `**Commands List**
\`\`\`${table_gen.createTable(
            [Object.keys(descriptions[0])].concat(
                descriptions.reduce((acc, cur) => {
                    acc.push([
                        client.config.prefix + cur["Command"],
                        cur["Description"],
                        client.config.prefix + cur["Usage"],
                    ]);
                    return acc;
                }, [])
            )
        )}\`\`\``
    );
};

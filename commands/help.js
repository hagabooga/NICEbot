const Discord = require("discord.js");

// const descriptions = [
//     {
//         Command: "cr",
//         Description: "Convert text to Regional Indicator",
//         Usage: "cr <message> [@mention_user]",
//     },
//     {
//         Command: "dp",
//         Description: "Get user display picture",
//         Usage: "h <@mention_user>",
//     },
//     { Command: "h", Description: "Query a Rule 34 image", Usage: "h <query>" },
//     {
//         Command: "help",
//         Description: "Get DMed this message",
//         Usage: "!help",
//     },
//     { Command: "icit", Description: "I see it", Usage: "icit" },
//     {
//         Command: "r",
//         Description: "Reload all/a command(s)",
//         Usage: "r [command]",
//     },

//     {
//         Command: "ratio",
//         Description: "Display good/bad bot ratio",
//         Usage: "ratio",
//     },
//     {
//         Command: "whale",
//         Description: "List Whale game actions",
//         Usage: "whale",
//     },
//     // { Command: "", Description: "", Usage: "" },
//     // { Command: "", Description: "", Usage: "" },
// ];
const Command = require("../util/command").Command;
const table_gen = require("../util/table_gen");

exports.command = new Command(
    "help",
    "Get DMed this message",
    "help",
    (self, client, message, args) => {
        message.author.send(
            `**Commands List**
\`\`\`${table_gen.createTable(
                [["Command", "Description", "Usage"]].concat(
                    client.commands.array().reduce((acc, cur) => {
                        acc.push([
                            client.config.prefix + cur.command,
                            cur.desc,
                            client.config.prefix + cur.usage,
                        ]);
                        return acc;
                    }, [])
                )
            )}\`\`\``
        );
    }
);

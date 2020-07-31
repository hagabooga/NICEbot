const Command = require("../util/command").Command;
const table_gen = require("../util/table_gen");

exports.command = new Command(
    "help",
    "Get DMed this message",
    "help",
    (self, client, message, args) => {
        message.author.send("**Commands List**");

        /**
         * @type {Array}
         */
        let commands_array = client.commands.array();
        while (commands_array.length != 0) {
            let text = `\`\`\`${table_gen.createTable(
                [["Command", "Description", "Usage"]].concat(
                    commands_array.slice(0, 8).reduce((acc, cur) => {
                        acc.push([
                            client.config.prefix + cur.command,
                            cur.desc,
                            client.config.prefix + cur.usage,
                        ]);
                        return acc;
                    }, [])
                )
            )}\`\`\``;
            // console.log(text.length);
            message.author.send(text).catch(console.error);
            commands_array = commands_array.splice(8);
        }
    }
);

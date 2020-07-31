const Command = require("../util/command").Command;

exports.command = new Command(
    "nice",
    "Nice!",
    "nice",
    (self, client, message, args) => {
        message.channel.send("https://waa.ai/eA7W");
    }
);

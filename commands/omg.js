const Command = require("../util/command").Command;

exports.command = new Command(
    "omg",
    "Oh my God!",
    "omg",
    (self, client, message, args) => {
        message.channel.send("https://waa.ai/eA7S");
    }
);
